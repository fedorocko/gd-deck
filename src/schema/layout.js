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
const LABEL_H = 22
const LABEL_GAP = 8
/** Extra air above a column title, so it reads as a title and not as a caption
    stuck to the underside of the box it hangs from. */
const LABEL_LEAD = 10

/** The slot the diagram occupies on the 1600x900 stage. */
export const VIEW_X = 848
export const VIEW_Y = 120
export const VIEW_W = 632
export const VIEW_H = 660
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

function placeNode(node, state, x, y, w, out) {
  const t = TIERS[node.tier]
  out.nodes.set(node.id, {
    id: node.id,
    label: node.label,
    x,
    y,
    w,
    h: t.h,
    font: t.font,
    radius: t.radius,
    hl: state.hl.includes(node.id),
    visible: true,
  })

  const bottom = y + t.h
  if (node.kids && state.expand.includes(node.id)) {
    const drop = PARENT_GAP + (state.dropKids?.[node.id] ?? 0)
    return placeKids(node, state, bottom + drop, out)
  }
  return bottom
}

function placeKids(node, state, y, out) {
  const k = node.kids

  if (k.layout === 'stack') {
    let cy = y
    k.items.forEach((child, i) => {
      if (i) cy += SIB_GAP[child.tier]
      const a = area(child.tier)
      cy = placeNode(child, state, a.x, cy, state.widths?.[child.id] ?? a.w, out)
    })
    return cy
  }

  if (k.layout === 'row') {
    const a = area(k.items[0].tier)
    const cw = (a.w - COL_GAP * (k.items.length - 1)) / k.items.length
    let bottom = y
    k.items.forEach((child, i) => {
      const cx = a.x + i * (cw + COL_GAP)
      bottom = Math.max(bottom, placeNode(child, state, cx, y, cw, out))
    })
    return bottom + (k.tailGap ?? 0)
  }

  if (k.layout === 'columns') {
    return placeColumns(node.id, k.columns, state, y, out)
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
  const cw = (a.w - COL_GAP * (columns.length - 1)) / columns.length
  const titled = columns.some((c) => c.label)
  const titleY = y + LABEL_LEAD
  const top = titled ? titleY + LABEL_H + LABEL_GAP : y
  let bottom = top

  columns.forEach((col, ci) => {
    const cx = a.x + ci * (cw + COL_GAP)

    if (col.label) {
      out.labels.set(`${ownerId}:${ci}`, {
        id: `${ownerId}:${ci}`,
        text: col.label,
        x: cx,
        y: titleY,
        w: cw,
        hl: state.hl.includes(ownerId),
        visible: true,
      })
    }

    let cy = top
    col.items.forEach((child, i) => {
      if (i) cy += SIB_GAP[child.tier]
      cy = placeNode(child, state, cx, cy, cw, out)
    })
    bottom = Math.max(bottom, cy)
  })

  return bottom
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
    out.nodes.set(node.id, {
      id: node.id,
      label: node.label,
      x: base.x,
      y: base.y + base.h - 10,
      w: base.w,
      h: t.h,
      font: t.font,
      radius: t.radius,
      hl: false,
      visible: false,
    })
  }

  childrenOf(node).forEach((c) => parkHidden(c, out, next))
}

/** Every box hanging directly off `node`, whatever arrangement it uses. */
function childrenOf(node) {
  const kids = []
  if (node.kids?.lead) kids.push(node.kids.lead)
  node.kids?.items?.forEach((c) => kids.push(c))
  node.kids?.columns?.forEach((col) => col.items.forEach((c) => kids.push(c)))
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
      arrow(out, `arrow:${id}`, `M ${x0} ${y} H ${x0 + 104}`)
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
    }
    return
  }

  if (state.arrows === 'merge') {
    const store = out.nodes.get('storage')
    const tip = store.y - 16
    const mid = COL_W / 2
    for (const id of ['mpp', 'inmemory']) {
      const r = out.nodes.get(id)
      const start = r.y + r.h
      arrow(
        out,
        `arrow:${id}`,
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

function buildLayout(key) {
  const state = STATES[key]
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
