import { CLONES, COL_W, STATE_ORDER, STATES, TIERS, TREE } from './model.js'

/**
 * Turns each state of the diagram into plain geometry: a rectangle for every
 * box, label, frame and arrow, in the diagram's own 600-wide coordinate space.
 *
 * Every box is laid out in every state, including the ones that are not
 * showing. A hidden box is parked on the bottom edge of the nearest visible
 * ancestor, so when a slide unfolds it, it grows out of its parent instead of
 * flying in from wherever it happened to sit two slides ago. That, plus stable
 * ids, is what lets the renderer animate with nothing but CSS transitions.
 *
 * The scale never changes — only the vertical offset does. A box therefore
 * reads at the same size on every slide, which is what makes size legible as
 * rank rather than as an accident of zoom.
 */

const SIB_GAP = { 1: 18, 2: 12, 3: 12 }
const PARENT_GAP = 12
const COL_GAP = 14
/** Section and column titles are set as pills: the height they stand. */
const PILL_H = 28
const LABEL_GAP = 8
/** Extra air above a column title, so it reads as a title and not as a caption
    stuck to the underside of the box it hangs from. */
const LABEL_LEAD = 10
/** The share of its row a spotlit picture takes, by how many share the row;
    its neighbours split the rest. Heights follow the widths, so the picture
    grows in both directions. A row of three gives less away, so the two
    that shrink stay wide enough to keep their labels. */
const SPOT_SHARE = { 2: 0.7, 3: 0.6 }

/** Air between two titled bands. The title carries its own lead above it, so
    this only has to part the bands, not re-state the gap. */
const SECTION_GAP = 8
/** A card's picture: its height as a share of its width, and the air between
    it and the badge it names. Sizing the picture off the column keeps every
    card the same shape whatever the row's width works out to. */
const ART_RATIO = 0.62
const ART_GAP = 10

/** The slot the diagram occupies on the 1600x900 stage. */
export const VIEW_X = 848
export const VIEW_Y = 40
export const VIEW_W = 632
export const VIEW_H = 820
export const WORLD_W = COL_W
export const WORLD_H = 900
/** Centres the 600-wide column in the 632-wide slot. */
export const WORLD_X = (VIEW_W - COL_W) / 2

/** Horizontal band a given tier always occupies, so same-rank borders align. */
const area = (tier) => ({
  x: TIERS[tier].inset,
  w: COL_W - 2 * TIERS[tier].inset,
})

// ------------------------------------------------------------------- walking

const flowStep = (state, id) => {
  const i = state.flow.indexOf(id)
  return i === -1 ? undefined : i
}

/** Titles over a box's children light up whenever that box is lit at all —
 *  as the subject or as the parent kept in view for it. */
const lit = (state, id) =>
  state.hl.includes(id) || !!state.parent?.includes(id)

/** A card's picture shares the badge's id, so the two travel together. */
const artId = (id) => `${id}:art`

/** artPad drops a card's picture so pictures of unequal height in one row
 *  share a bottom edge, and the badges under them stay on one line. */
function placeNode(node, state, x, y, w, out, artPad = 0) {
  const t = TIERS[node.tier]
  let top = y + artPad

  if (node.art !== undefined) {
    const h = artHeight(node, w)
    out.nodes.set(artId(node.id), {
      id: artId(node.id),
      label: '',
      x,
      y: top,
      w,
      h,
      font: t.font,
      radius: 14,
      art: node.art,
      hl: false,
      spot: node.id === state.spot,
      visible: true,
    })
    top += h + ART_GAP
  }

  const h = node.h ?? t.h
  out.nodes.set(node.id, {
    id: node.id,
    label: node.label,
    x,
    y: top,
    w,
    h,
    font: node.font ?? t.font,
    radius: node.radius ?? t.radius,
    badge: node.badge,
    hl: state.hl.includes(node.id),
    ctx: !!state.parent?.includes(node.id),
    // position along a drawn flow, so the renderer can stagger its pulse
    flow: state.arrows === 'flow' ? flowStep(state, node.id) : undefined,
    visible: true,
  })

  const bottom = top + h
  if (node.kids && state.expand.includes(node.id)) {
    const drop = PARENT_GAP + (state.dropKids?.[node.id] ?? 0)
    return placeKids(node, state, bottom + drop, out)
  }
  return bottom
}

/** The children this state actually draws. One left out is parked with the
 *  rest of the folded-away boxes, so it still has somewhere to travel from. */
const shown = (items, state) =>
  state.hide ? items.filter((c) => !state.hide.includes(c.id)) : items

function placeKids(node, state, y, out) {
  const k = node.kids
  const tail = state.tails?.[node.id] ?? 0

  if (k.layout === 'stack') {
    let cy = y
    shown(k.items, state).forEach((child, i) => {
      if (i) cy += SIB_GAP[child.tier]
      const a = area(child.tier)
      cy = placeNode(child, state, a.x, cy, state.widths?.[child.id] ?? a.w, out)
    })
    return cy
  }

  if (k.layout === 'row') {
    const items = shown(k.items, state)
    const a = area(items[0].tier)
    const gap = k.gap ?? COL_GAP
    const cw = (a.w - gap * (items.length - 1)) / items.length
    let bottom = y
    items.forEach((child, i) => {
      const cx = a.x + i * (cw + gap)
      bottom = Math.max(bottom, placeNode(child, state, cx, y, cw, out))
    })
    return bottom + tail
  }

  if (k.layout === 'columns') {
    return placeColumns(node.id, k.columns, state, y, out)
  }

  if (k.layout === 'sections') {
    return placeSections(node.id, k.sections, state, y, out)
  }

  if (k.layout === 'grid') {
    const items = shown(k.items, state)
    const first = items[0]
    const a = area(first.tier)
    const gap = k.gap ?? COL_GAP
    const rowGap = k.rowGap ?? SIB_GAP[first.tier]
    const cw = (a.w - gap * (k.cols - 1)) / k.cols
    const rowH = first.h ?? TIERS[first.tier].h
    let bottom = y
    items.forEach((child, i) => {
      const cx = a.x + (i % k.cols) * (cw + gap)
      const cy = y + Math.floor(i / k.cols) * (rowH + rowGap)
      bottom = Math.max(bottom, placeNode(child, state, cx, cy, cw, out))
    })
    return bottom + tail
  }

  if (k.layout === 'branch') {
    const a = area(k.lead.tier)
    const leadBottom = placeNode(k.lead, state, a.x, y, a.w, out)
    return placeColumns(node.id, k.columns, state, leadBottom + k.leadGap, out)
  }

  return y
}

function placeColumns(ownerId, columns, state, y, out) {
  const a = area(columns[0].items[0].tier)
  // a column widens when the card heading it is spotlit
  const ws = rowWidths(
    columns.map((col) => ({ id: col.items[0].id })),
    a.w,
    state.spot,
  )
  // cards heading the columns share a bottom edge, like a section's row
  const heads = columns.map((col, i) =>
    col.items[0].art !== undefined ? artHeight(col.items[0], ws[i]) : 0,
  )
  const headArt = Math.max(...heads)
  const titled = columns.some((c) => c.label)
  const titleY = y + LABEL_LEAD
  // column titles are set as pills, like the section titles
  const top = titled ? titleY + PILL_H + LABEL_GAP : y
  let bottom = top
  let cx = a.x

  columns.forEach((col, ci) => {
    const cw = ws[ci]

    if (col.label) {
      out.labels.set(`${ownerId}:${ci}`, {
        id: `${ownerId}:${ci}`,
        kind: 'section',
        text: col.label,
        x: cx,
        y: titleY,
        w: cw,
        hl: lit(state, ownerId),
        visible: true,
      })
    }

    let cy = top
    col.items.forEach((child, i) => {
      if (i) cy += SIB_GAP[child.tier]
      const pad = i === 0 && heads[ci] ? headArt - heads[ci] : 0
      cy = placeNode(child, state, cx, cy, cw, out, pad)
    })
    bottom = Math.max(bottom, cy)
    cx += cw + COL_GAP
  })

  return bottom
}

const artHeight = (node, w) =>
  Math.round(w * (node.artRatio ?? ART_RATIO))

/**
 * Widths for a row of items: equal, unless one of them is spotlit, in which
 * case it takes SPOT_SHARE of the row and the rest split what is left.
 */
function rowWidths(items, total, spot) {
  const free = total - COL_GAP * (items.length - 1)
  const at = items.findIndex((it) => it.id === spot)
  if (at === -1 || items.length < 2) return items.map(() => free / items.length)
  const big = free * (SPOT_SHARE[items.length] ?? SPOT_SHARE[2])
  const small = (free - big) / (items.length - 1)
  return items.map((_, i) => (i === at ? big : small))
}

/**
 * Titled bands stacked one under another, each holding a row of equal items.
 *
 * The difference from `columns` is where the title sits: here it spans the
 * whole band, so it reads as the name of a group of siblings rather than as a
 * heading over the first of them.
 */
function placeSections(ownerId, sections, state, y, out) {
  const hl = lit(state, ownerId)
  let cy = y

  sections.forEach((sec, si) => {
    if (si) cy += SECTION_GAP
    const a = area(sec.items[0].tier)

    if (sec.label) {
      const titleY = cy + LABEL_LEAD
      out.labels.set(`${ownerId}:s${si}`, {
        id: `${ownerId}:s${si}`,
        kind: 'section',
        text: sec.label,
        x: a.x,
        y: titleY,
        w: a.w,
        hl,
        visible: true,
      })
      cy = titleY + PILL_H + LABEL_GAP
    }

    if (sec.art) {
      const ws = rowWidths(sec.art, a.w, state.spot)
      const hs = sec.art.map((p, i) => artHeight(p, ws[i]))
      const rowH = Math.max(...hs)
      let px = a.x
      sec.art.forEach((p, i) => {
        out.nodes.set(p.id, {
          id: p.id,
          label: '',
          x: px,
          y: cy + rowH - hs[i],
          w: ws[i],
          h: hs[i],
          font: TIERS[sec.items[0].tier].font,
          radius: 14,
          art: p.art,
          hl: false,
          spot: p.id === state.spot,
          visible: true,
        })
        px += ws[i] + COL_GAP
      })
      cy += rowH + ART_GAP
    }

    const ws = rowWidths(sec.items, a.w, state.spot)
    const hs = sec.items.map((c, i) =>
      c.art !== undefined ? artHeight(c, ws[i]) : 0,
    )
    const rowArt = Math.max(...hs)
    let bottom = cy
    let cx = a.x
    sec.items.forEach((child, i) => {
      const pad = child.art !== undefined ? rowArt - hs[i] : 0
      bottom = Math.max(
        bottom,
        placeNode(child, state, cx, cy, ws[i], out, pad),
      )
      cx += ws[i] + COL_GAP
    })
    cy = bottom
  })

  return cy
}

// ------------------------------------------------------- the multi-tenant view

const MASTER_W = 372
const MASTER_PAD = 16
const MASTER_BOX_H = 64
const TENANT_GAP = 16
const TENANT_PAD = 12
const TENANT_W = (COL_W - TENANT_GAP * 2) / 3
const TENANT_I_H = 52
const TENANT_M_H = 66
const MASTER_H = MASTER_PAD * 2 + MASTER_BOX_H * 2 + 10
const TENANT_Y = MASTER_H + 62
const TENANT_H = TENANT_PAD * 2 + TENANT_I_H + 8 + TENANT_M_H

const tenantX = (i) => i * (TENANT_W + TENANT_GAP)
const tenantCx = (i) => tenantX(i) + TENANT_W / 2

function layoutTenants(state, out) {
  const put = (id, label, x, y, w, h, font, radius) =>
    out.nodes.set(id, {
      id,
      label,
      x,
      y,
      w,
      h,
      font,
      radius,
      hl: false,
      visible: true,
    })

  // The authored stack, boxed as one thing.
  const mx = (COL_W - MASTER_W) / 2
  const inner = MASTER_W - MASTER_PAD * 2
  put('interfaces', 'Interfaces', mx + MASTER_PAD, MASTER_PAD, inner, MASTER_BOX_H, 21, 12)
  put(
    'mgmt',
    'Management Tools',
    mx + MASTER_PAD,
    MASTER_PAD + MASTER_BOX_H + 10,
    inner,
    MASTER_BOX_H,
    21,
    12,
  )
  out.frames.set('frame:master', {
    id: 'frame:master',
    x: mx,
    y: 0,
    w: MASTER_W,
    h: MASTER_H,
    visible: true,
  })

  // …delivered to each tenant.
  const tw = TENANT_W - TENANT_PAD * 2
  for (let i = 0; i < 3; i += 1) {
    const tx = tenantX(i)
    out.frames.set(`frame:t${i + 1}`, {
      id: `frame:t${i + 1}`,
      x: tx,
      y: TENANT_Y,
      w: TENANT_W,
      h: TENANT_H,
      visible: true,
    })
    put(`t${i + 1}i`, 'Interfaces', tx + TENANT_PAD, TENANT_Y + TENANT_PAD, tw, TENANT_I_H, 15, 10)
    put(
      `t${i + 1}m`,
      'Management Tools',
      tx + TENANT_PAD,
      TENANT_Y + TENANT_PAD + TENANT_I_H + 8,
      tw,
      TENANT_M_H,
      15,
      10,
    )
  }

  // One shared infrastructure underneath them all.
  const t1 = TIERS[1]
  const iy = TENANT_Y + TENANT_H + 26
  put('infra', 'Infrastructure', 0, iy, COL_W, t1.h, t1.font, t1.radius)
}

// ------------------------------------------------------------------- filling

/** Park every box that is not showing on the lower edge of its nearest
 *  visible ancestor, so unfolding reads as the parent opening up. */
function parkHidden(node, out, anchor) {
  const rect = out.nodes.get(node.id)
  const next = rect?.visible ? rect : anchor

  if (!rect) {
    const t = TIERS[node.tier]
    const base = anchor ?? { x: 0, y: 0, w: COL_W, h: 0 }
    const parked = {
      x: base.x,
      y: base.y + base.h - 10,
      w: base.w,
      hl: false,
      visible: false,
    }

    if (node.art !== undefined) {
      out.nodes.set(artId(node.id), {
        id: artId(node.id),
        label: '',
        h: Math.round(base.w * (node.artRatio ?? ART_RATIO)),
        font: t.font,
        radius: 14,
        art: node.art,
        ...parked,
      })
    }

    out.nodes.set(node.id, {
      id: node.id,
      label: node.label,
      h: node.h ?? t.h,
      font: node.font ?? t.font,
      radius: node.radius ?? t.radius,
      badge: node.badge,
      ...parked,
    })
  }

  // a section's own pictures fold away into the same place as its items
  node.kids?.sections?.forEach((sec) =>
    sec.art?.forEach((p) => {
      if (out.nodes.has(p.id)) return
      const base = next ?? { x: 0, y: 0, w: COL_W, h: 0 }
      out.nodes.set(p.id, {
        id: p.id,
        label: '',
        x: base.x,
        y: base.y + base.h - 10,
        w: base.w,
        h: Math.round(base.w * (p.artRatio ?? ART_RATIO)),
        font: TIERS[sec.items[0].tier].font,
        radius: 14,
        art: p.art,
        hl: false,
        visible: false,
      })
    }),
  )

  childrenOf(node).forEach((c) => parkHidden(c, out, next))
}

/** Every box hanging directly off `node`, whatever arrangement it uses. */
function childrenOf(node) {
  const kids = []
  if (node.kids?.lead) kids.push(node.kids.lead)
  node.kids?.items?.forEach((c) => kids.push(c))
  node.kids?.columns?.forEach((col) => col.items.forEach((c) => kids.push(c)))
  node.kids?.sections?.forEach((sec) => sec.items.forEach((c) => kids.push(c)))
  return kids
}

function parkClones(out) {
  for (const clone of CLONES) {
    if (out.nodes.has(clone.id)) continue
    const base = out.nodes.get(clone.from)
    out.nodes.set(clone.id, {
      id: clone.id,
      label: clone.label,
      x: base.x + base.w * 0.25,
      y: base.y + base.h - 10,
      w: base.w * 0.5,
      h: TENANT_I_H,
      font: 15,
      radius: 10,
      hl: false,
      visible: false,
    })
  }
}

// --------------------------------------------------------------- decorations

/** Air an arrow leaves between its ends and the boxes it runs between. */
const FLOW_PAD = 5

const cx = (r) => r.x + r.w / 2
const arrow = (out, id, d, extra = {}) =>
  out.arrows.set(id, { id, d, head: true, visible: true, ...extra })

function addFrame(state, out) {
  if (!state.frame) return
  const rects = state.frame.map((id) => out.nodes.get(id))
  const pad = 16
  const x = Math.min(...rects.map((r) => r.x)) - pad
  const y = Math.min(...rects.map((r) => r.y)) - pad
  const right = Math.max(...rects.map((r) => r.x + r.w)) + pad
  const bottom = Math.max(...rects.map((r) => r.y + r.h)) + pad
  out.frames.set('frame:colo', {
    id: 'frame:colo',
    x,
    y,
    w: right - x,
    h: bottom - y,
    visible: true,
  })
}

const OPEN_LABELS = {
  inference: 'Other models',
  compute: 'Flex connect',
  storage: 'Other engines',
}

/** How far an arrow in the open state reaches, and the air after it. */
const OPEN_ARROW = 104
const LOGO_GAP = 16
const LOGO_SIZE = 42

/** Who each layer opens out to, drawn at the far end of its arrow. A layer
 *  with nothing named simply has none. */
const OPEN_LOGOS = {
  inference: ['/media/icon-anthropic.png', '/media/icon-openai.png'],
  compute: ['/media/icon-arrow.png'],
  storage: ['/media/icon-databricks.png', '/media/icon-snowflake.png'],
}

function addArrows(state, out) {
  if (state.mode === 'tenants') {
    const bar = MASTER_H + 32
    arrow(out, 'arrow:trunk', `M ${COL_W / 2} ${MASTER_H} V ${bar}`, { head: false })
    arrow(out, 'arrow:bar', `M ${tenantCx(0)} ${bar} H ${tenantCx(2)}`, { head: false })
    for (let i = 0; i < 3; i += 1) {
      arrow(out, `arrow:t${i + 1}`, `M ${tenantCx(i)} ${bar} V ${TENANT_Y - 4}`)
    }
    return
  }

  if (state.arrows === 'open') {
    for (const [id, text] of Object.entries(OPEN_LABELS)) {
      const r = out.nodes.get(id)
      const y = r.y + r.h / 2
      const x0 = r.x + r.w + 18
      arrow(out, `arrow:${id}`, `M ${x0} ${y} H ${x0 + OPEN_ARROW}`)
      out.labels.set(`arrow:${id}`, {
        id: `arrow:${id}`,
        text,
        x: x0 - 2,
        y: y - 36,
        w: 210,
        kind: 'arrow',
        hl: true,
        visible: true,
      })

      const logos = OPEN_LOGOS[id]
      if (!logos) continue
      out.labels.set(`logos:${id}`, {
        id: `logos:${id}`,
        logos,
        x: x0 + OPEN_ARROW + LOGO_GAP,
        y: y - LOGO_SIZE / 2,
        w: logos.length * LOGO_SIZE + (logos.length - 1) * 10,
        kind: 'logos',
        hl: false,
        visible: true,
      })
    }
    return
  }

  if (state.arrows === 'flow') {
    state.flow.forEach((id, i) => {
      const a = out.nodes.get(id)
      const b = out.nodes.get(state.flow[i + 1])
      if (!b) return
      const y = a.y + a.h / 2
      arrow(
        out,
        `arrow:flow${i}`,
        `M ${a.x + a.w + FLOW_PAD} ${y} H ${b.x - FLOW_PAD}`,
        { flow: i },
      )
    })
    return
  }

  if (state.arrows === 'merge') {
    // A curve out of each engine, converging on one storage: the shape is the
    // point of the slide. Only the engines this state shows are drawn, so a
    // state that folds some away does not leave curves coming from nowhere.
    const store = out.nodes.get('storage')
    const tip = store.y - 16
    const mid = COL_W / 2
    const engines = DESCENDANTS.get('compute')
      .filter((id) => id !== 'compute')
      .map((id) => out.nodes.get(id))
      .filter((r) => r.visible)

    for (const r of engines) {
      const start = r.y + r.h
      arrow(
        out,
        `arrow:${r.id}`,
        `M ${cx(r)} ${start} C ${cx(r)} ${start + 28} ${mid} ${tip - 26} ${mid} ${tip}`,
        { head: false },
      )
    }
    arrow(out, 'arrow:merge', `M ${mid} ${tip - 2} V ${store.y - 3}`)
    return
  }

  if (state.arrows === 'branch') {
    const router = out.nodes.get('router')
    const a = out.nodes.get('modelA')
    const b = out.nodes.get('modelB')
    const bar = router.y + router.h + 22
    arrow(out, 'arrow:rtrunk', `M ${cx(router)} ${router.y + router.h} V ${bar}`, {
      head: false,
    })
    arrow(out, 'arrow:rbar', `M ${cx(a)} ${bar} H ${cx(b)}`, { head: false })
    arrow(out, 'arrow:ra', `M ${cx(a)} ${bar} V ${a.y - 4}`)
    arrow(out, 'arrow:rb', `M ${cx(b)} ${bar} V ${b.y - 4}`)
  }
}

// -------------------------------------------------------------------- focus

/** Every box below `id` in the tree, itself included. */
const DESCENDANTS = (() => {
  const map = new Map()
  const walk = (node) => {
    const ids = [node.id]
    childrenOf(node).forEach((c) => ids.push(...walk(c)))
    map.set(node.id, ids)
    return ids
  }
  walk(TREE)
  return map
})()

/** Vertical span of everything on screen, boxes and frames alike. */
function contentBounds(out) {
  let top = Infinity
  let bottom = -Infinity
  for (const set of [out.nodes, out.frames]) {
    for (const d of set.values()) {
      if (!d.visible) continue
      top = Math.min(top, d.y)
      bottom = Math.max(bottom, d.y + d.h)
    }
  }
  return { top, bottom }
}

/** Vertical span of what this state is actually talking about. */
function focusBounds(state, out) {
  if (!state.focus) return contentBounds(out)

  let top = Infinity
  let bottom = -Infinity
  const add = (id) => {
    const r = out.nodes.get(id)
    if (!r?.visible) return
    top = Math.min(top, r.y)
    bottom = Math.max(bottom, r.y + r.h)
  }
  for (const id of state.focus.sub ?? []) DESCENDANTS.get(id).forEach(add)
  for (const id of state.focus.box ?? []) add(id)
  return { top, bottom }
}

/**
 * How far down the column sits in the slot.
 *
 * When the whole diagram fits, it is simply centred — nothing is worth cutting
 * to bring the subject a few pixels closer to the middle. When it does not, the
 * subject is centred instead and the rest runs off the edge, held back only by
 * a little slack so the view never drifts past the ends of the column.
 */
const SLACK = 24

function viewOffset(state, out) {
  const content = contentBounds(out)
  const height = content.bottom - content.top

  if (height <= VIEW_H) {
    return Math.round((VIEW_H - height) / 2 - content.top)
  }

  const focus = focusBounds(state, out)
  const wanted = VIEW_H / 2 - (focus.top + focus.bottom) / 2
  const lowest = VIEW_H - content.bottom - SLACK
  const highest = -content.top + SLACK
  return Math.round(Math.min(highest, Math.max(lowest, wanted)))
}

// --------------------------------------------------------------------- build

function buildLayout(key, spot) {
  const state = spot ? { ...STATES[key], spot } : STATES[key]
  const out = {
    nodes: new Map(),
    labels: new Map(),
    frames: new Map(),
    arrows: new Map(),
  }

  if (state.mode === 'tenants') layoutTenants(state, out)
  else placeKids(TREE, state, 0, out)

  childrenOf(TREE).forEach((c) => parkHidden(c, out, null))
  parkClones(out)
  addFrame(state, out)
  addArrows(state, out)

  return { ...out, offset: viewOffset(state, out) }
}

export const MODELS = Object.fromEntries(
  STATE_ORDER.map((key) => [key, buildLayout(key)]),
)

/**
 * Labels, frames and arrows only exist in the states that use them. Give each
 * one an entry in every state — hidden, holding the geometry it last had — so
 * it fades in and out of a fixed place rather than popping.
 */
for (const kind of ['labels', 'frames', 'arrows']) {
  const first = new Map()
  for (const key of STATE_ORDER) {
    for (const [id, d] of MODELS[key][kind]) if (!first.has(id)) first.set(id, d)
  }
  const last = new Map()
  for (const key of STATE_ORDER) {
    const here = MODELS[key][kind]
    for (const [id, seed] of first) {
      if (here.has(id)) {
        last.set(id, here.get(id))
      } else {
        here.set(id, { ...(last.get(id) ?? seed), visible: false })
      }
    }
  }
}

/**
 * A state with a spotlight gets one extra layout per picture, keyed
 * `state@id`, with that picture grown in its row. They are the same state as
 * far as labels, frames and arrows go, so those are copied across.
 */
export const spotKey = (key, id) => `${key}@${id}`

for (const key of STATE_ORDER) {
  for (const id of STATES[key].spotlight ?? []) {
    const m = buildLayout(key, id)
    for (const kind of ['labels', 'frames', 'arrows']) {
      for (const [lid, d] of MODELS[key][kind]) {
        if (!m[kind].has(lid)) m[kind].set(lid, d)
      }
    }
    MODELS[spotKey(key, id)] = m
  }
}

/** Ids of everything on screen in a given state. */
const VISIBLE = new Map(
  STATE_ORDER.map((key) => {
    const m = MODELS[key]
    const ids = new Set()
    for (const kind of ['nodes', 'labels', 'frames', 'arrows']) {
      for (const [id, d] of m[kind]) if (d.visible) ids.add(id)
    }
    return [key, ids]
  }),
)

/**
 * What `to` shows that `from` did not — the pieces the transition uncovers,
 * which hold their fade until the boxes already on screen have made room.
 * With no `from` (the diagram has just appeared) everything counts as new.
 */
export function uncovered(from, to) {
  const arriving = VISIBLE.get(to)
  if (!from) return arriving
  const had = VISIBLE.get(from)
  return new Set([...arriving].filter((id) => !had.has(id)))
}

/**
 * One fixed render order per collection.
 *
 * Each state builds its own maps, so their iteration order follows the shape of
 * that state — Interfaces' children come before Management Tools once they are
 * unfolded, and after it when they are not. Rendering straight from the map
 * makes React reorder the DOM on a slide change, and re-inserting an element
 * resets its CSS transition: the box snaps to its new place instead of
 * travelling there. Rendering from a fixed order keeps every element put, so a
 * state change only rewrites styles and the transitions actually run.
 *
 * Order is free to be arbitrary because the diagram is absolutely positioned;
 * stacking is handled by the frames/arrows/labels/boxes grouping in the markup.
 */
export const ORDER = Object.fromEntries(
  ['nodes', 'labels', 'frames', 'arrows'].map((kind) => {
    const ids = []
    for (const key of STATE_ORDER) {
      for (const id of MODELS[key][kind].keys()) {
        if (!ids.includes(id)) ids.push(id)
      }
    }
    return [kind, ids]
  }),
)
