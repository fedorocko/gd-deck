/**
 * The one diagram that runs behind slides 16–27.
 *
 * There is a single tree holding every box that ever appears. A slide does not
 * draw its own picture: it names a *state*, and the state says which branches
 * are unfolded, what is highlighted, and where the viewport should sit. Because
 * every box keeps its identity across states, moving between two slides is a
 * transition of one diagram rather than a cut between two.
 *
 * Tiers carry the taxonomy. A tier-1 box (Interfaces, Management Tools,
 * Infrastructure) is taller and set larger than a tier-2 box (Context), which in turn outranks tier 3 (Semantics, Metrics). Because every
 * tier has a fixed inset from the column edge, boxes of the same rank always
 * share their left and right border, whichever branch they hang off.
 */

/** Width of the diagram's column, in its own coordinate space. */
export const COL_W = 600

export const TIERS = {
  1: { h: 96, font: 27, radius: 16, inset: 0 },
  2: { h: 74, font: 21, radius: 13, inset: 24 },
  3: { h: 60, font: 17, radius: 10, inset: 40 },
}

const box = (id, label, tier, extra) => ({ id, label, tier, ...extra })

/**
 * A badge keeps its tier's width and gives up its height: it names one thing
 * rather than standing for a layer, so a single line is all it needs.
 */
const BADGE = { h: 46, font: 17, radius: 10, badge: true }

/** A tag rather than a box: a lime pill, centred in its column at its own
 *  width, for something that belongs to the box above it. */
const PILL = { h: 34, font: 15, radius: 999, pill: true, pillW: 172 }

/** Not shipped yet: the box carries a tilted "Soon" sticker on its corner. */
const SOON = { soon: true }

/** A badge tall enough for a two-line label. */
const ENGINE = { ...BADGE, h: 62 }

/**
 * A card is a badge with a picture above it — one tree node, drawn as two
 * rectangles. `art` is the image it shows; null holds the space as a
 * placeholder until the art is supplied.
 */
const card = (id, label, tier, art = null, extra) =>
  box(id, label, tier, { ...BADGE, art, ...extra })

/**
 * Pictures two to a row run wide, so they are cut shorter than a card's usual
 * 0.62 to keep the Interfaces branch inside the viewport.
 */
const WIDE = { artRatio: 0.5 }

/**
 * A picture that belongs to a whole section rather than to one box in it: a
 * section's `art` row sits above its items, as many across as it lists.
 */
const pic = (id, art = null) => ({ id, art, ...WIDE })

// ------------------------------------------------------------------ the tree
// `kids` describes how a box's children are arranged once it is unfolded:
//   stack   — one under another, full width for their tier
//   row     — side by side, sharing the tier's width
//   columns — side by side, each column optionally titled and holding a stack
//   branch  — one full-width lead box, then columns hanging below it
//   sections— titled bands stacked up, each holding a row of equal items
//   grid    — `cols` across and as many rows down as the items need
// `gap` widens the space between a row's items to make room for arrows in it.

export const TREE = {
  id: 'root',
  kids: {
    layout: 'stack',
    items: [
      {
        ...box('interfaces', 'Interfaces', 1),
        kids: {
          layout: 'sections',
          sections: [
            {
              label: 'Built-in',
              // two pictures over the three apps: the apps are named in the
              // strip below rather than each carrying a picture of its own
              art: [
                pic('builtinArtA', '/media/ss-ai.png'),
                pic('builtinArtB', '/media/ss-publisher.png'),
              ],
              items: [
                box('copilot', 'Dashboard Copilot', 2, BADGE),
                box('analyst', 'AI Analyst', 2, BADGE),
                box('publisher', 'AI Publisher', 2, BADGE),
              ],
            },
            {
              label: 'Building blocks',
              items: [
                card('sdk', 'SDK', 2, '/media/ss-sdk.png', WIDE),
                card('mcp', 'MCP/A2A', 2, '/media/ss-mcp.png', WIDE),
              ],
            },
            {
              // more building blocks, a row of badges under the two cards
              items: [
                box('mlfunctions', 'ML functions', 2, BADGE),
                box('dataflows', 'Data flows', 2, { ...BADGE, ...SOON }),
                box('aisearch', 'AI Search', 2, BADGE),
              ],
            },
          ],
        },
      },

      {
        ...box('mgmt', 'Management Tools', 1),
        kids: {
          layout: 'stack',
          items: [
            {
              ...box('defs', 'Context', 2),
              kids: {
                layout: 'columns',
                columns: [
                  {
                    label: 'Data',
                    items: [
                      box('semantics', 'Semantics', 3),
                      box('metrics', 'Metrics', 3),
                    ],
                  },
                  {
                    label: 'Business',
                    items: [
                      box('knowledge', 'Knowledge', 3),
                      box('memories', 'Memories', 3),
                    ],
                  },
                  {
                    label: 'Agents',
                    items: [
                      box('personalities', 'Personalities', 3),
                      box('skills', 'Skills', 3),
                    ],
                  },
                ],
              },
            },
            {
              ...box('gov', 'Governance', 2),
              kids: {
                layout: 'columns',
                columns: [
                  { label: 'Data', items: [card('catalog', 'Catalog', 3, '/media/catalog.png')] },
                  { label: 'Business', items: [card('aihub', 'AI Hub', 3, '/media/hub.png')] },
                  { label: 'Agents', items: [card('builder', 'Builder', 3, '/media/builder.png')] },
                ],
              },
            },
            {
              ...box('life', 'Lifecycle', 2),
              kids: {
                layout: 'row',
                // wider than the usual column gap: the arrows that run between
                // the three have to fit in it
                gap: 36,
                items: [
                  box('evaluations', 'Evaluations', 3),
                  box('observability', 'Observability', 3),
                  box('selflearning', 'Self-Learning', 3, SOON),
                ],
              },
            },
          ],
        },
      },

      {
        ...box('infra', 'Infrastructure', 1),
        kids: {
          layout: 'stack',
          items: [
            {
              ...box('inference', 'Inference', 2, SOON),
              kids: {
                layout: 'branch',
                lead: box('router', 'Router', 3),
                leadGap: 46,
                columns: [
                  {
                    items: [
                      box('modelA', 'Local Model', 3),
                      box('profileA', 'Customer Profile', 3, PILL),
                    ],
                  },
                  {
                    items: [
                      box('modelB', 'Local Model', 3),
                      box('profileB', 'Customer Profile', 3, PILL),
                    ],
                  },
                ],
              },
            },
            {
              ...box('compute', 'Compute', 2),
              kids: {
                // how data gets in and out sits over Compute, the engines
                // that run on it under; the connectors row is inset to leave
                // room for the arrows that lead out of it on either side
                layout: 'rows',
                rows: [
                  {
                    above: true,
                    inset: 56,
                    items: [
                      box('connectors', 'Connectors', 3, BADGE),
                      box('flexconnect', 'Flex Connect', 3, BADGE),
                    ],
                  },
                  {
                    // a third of the band each, so the labels take two lines
                    // and the badges stand taller to hold them
                    items: [
                      box('mpp', 'MPP Engine', 3, ENGINE),
                      box('inmemory', 'In-memory Datamart', 3, {
                        ...ENGINE,
                        ...SOON,
                      }),
                      box('realtime', 'Real-time', 3, { ...ENGINE, ...SOON }),
                    ],
                  },
                ],
              },
            },
            {
              ...box('storage', 'Storage', 2),
              kids: {
                layout: 'row',
                items: [
                  box('structured', 'Structured data', 3, BADGE),
                  box('documents', 'Documents', 3, BADGE),
                ],
              },
            },
          ],
        },
      },
    ],
  },
}

/**
 * Art for the three layers, keyed by box id.
 *
 * Only the tier-1 boxes carry one: the icon is what makes a layer recognisable
 * at a glance, and repeating it further down the tree would compete with the
 * labels rather than help them. The tenant copies in the multi-tenant state go
 * without it too — at that size the icon and the label would collide.
 */
export const ICONS = {
  interfaces: '/media/icon-interface.png',
  mgmt: '/media/icon-management.png',
  infra: '/media/icon-Infrastructure.png',
  // the building blocks carry a small one at badge size; the engines go
  // without, three to a row leaves them no room
  sdk: '/media/icon-box.png',
  mcp: '/media/icon-plug.png',
  structured: '/media/icon-table.png',
  documents: '/media/icon-documents.png',
}

/**
 * Boxes that exist only in the multi-tenant state. `from` names the box they
 * collapse into everywhere else, so a tenant copy grows out of the original
 * rather than arriving from nowhere.
 */
export const CLONES = [
  { id: 't1i', label: 'Interfaces', from: 'interfaces' },
  { id: 't1m', label: 'Management Tools', from: 'mgmt' },
  { id: 't2i', label: 'Interfaces', from: 'interfaces' },
  { id: 't2m', label: 'Management Tools', from: 'mgmt' },
  { id: 't3i', label: 'Interfaces', from: 'interfaces' },
  { id: 't3m', label: 'Management Tools', from: 'mgmt' },
]

// ---------------------------------------------------------------- the states
// expand — boxes whose children are showing (an ancestor must be expanded too)
// hl     — what the slide is about: drawn as the full highlight
// parent — the box those hang from, kept in view as their context: drawn as
//          an outline, a step below the highlight. Everything else recedes.
// focus  — what the viewport centres on: `sub` takes a box with everything
//          unfolded beneath it, `box` takes the box alone
// widths — narrows named boxes to leave room for the arrows beside them
// arrows — which set of arrows this state draws; `flow` runs one from each box
//          named in `flow` to the next
// hide   — boxes this state leaves folded away though their parent is open
// tails  — extra air under a box's children, where this state puts an arrow

export const STATES = {
  box: {
    expand: [],
    hl: ['interfaces', 'mgmt', 'infra'],
    focus: { sub: ['interfaces', 'mgmt', 'infra'] },
  },

  builtin: {
    expand: ['interfaces'],
    hl: [
      'copilot',
      'analyst',
      'publisher',
      'sdk',
      'mcp',
      'mlfunctions',
      'dataflows',
      'aisearch',
    ],
    parent: ['interfaces'],
    // the screenshots are too small to read in place, so while the slide is
    // up each one takes a turn growing across its row, its neighbour giving
    // way. `sdk` and `mcp` are cards, so it is their picture that grows.
    spotlight: ['builtinArtA', 'builtinArtB', 'sdk', 'mcp'],
    focus: { sub: ['interfaces'] },
  },

  management: {
    expand: ['mgmt'],
    hl: ['defs', 'gov', 'life'],
    parent: ['mgmt'],
    focus: { sub: ['mgmt'] },
  },

  context: {
    expand: ['mgmt', 'defs'],
    parent: ['defs'],
    hl: [
      'semantics',
      'metrics',
      'knowledge',
      'memories',
      'personalities',
      'skills',
    ],
    focus: { sub: ['mgmt'] },
  },

  governance: {
    expand: ['mgmt', 'gov'],
    hl: ['catalog', 'aihub', 'builder'],
    parent: ['gov'],
    spotlight: ['catalog', 'aihub', 'builder'],
    focus: { sub: ['mgmt'] },
  },

  lifecycle: {
    expand: ['mgmt', 'life'],
    hl: ['evaluations', 'observability', 'selflearning'],
    parent: ['life'],
    arrows: 'flow',
    flow: ['evaluations', 'observability', 'selflearning'],
    focus: { sub: ['mgmt'], box: ['infra'] },
  },

  // One authored stack, delivered to many tenants: a different arrangement of
  // the same two boxes, so they travel rather than being replaced.
  tenants: {
    mode: 'tenants',
    expand: [],
    // the subject is the tree — one stack fanned out to many — so the lime
    // goes on its frames and arrows; the boxes inside are only named
    hl: [],
    plain: ['interfaces', 'mgmt', 't1i', 't1m', 't2i', 't2m', 't3i', 't3m'],
    focus: null,
  },

  // the three layers of Infrastructure, folded: each is opened on its own
  infra: {
    expand: ['infra'],
    parent: ['infra'],
    hl: ['inference', 'compute', 'storage'],
    focus: { sub: ['infra'] },
  },

  // Storage behind one catalog: our compute and outside engines all read
  // through it, and sources feed it from below. Storage drops to make room
  // for the catalog between it and Compute.
  storage: {
    expand: ['infra'],
    parent: ['infra'],
    hl: ['storage'],
    gaps: { storage: 112 },
    slots: { storage: '/media/icon-iceberg.png' },
    arrows: 'catalog',
    focus: { sub: ['infra'] },
  },

  colocated: {
    expand: ['infra'],
    hl: [],
    frame: ['inference', 'compute', 'storage'],
    // the three drop a little so the frame drawn round them clears
    // Infrastructure rather than butting against it
    dropKids: { infra: 14 },
    focus: { sub: ['infra'] },
  },

  // Compute opened up: connectors out to either side, and the engines below
  // all running on the one storage. Compute and its engines are the point;
  // the connectors are set a step down, as the way in and out, and storage
  // is only where the engines land.
  separation: {
    expand: ['infra', 'compute'],
    hl: ['compute', 'mpp', 'inmemory', 'realtime'],
    parent: ['infra'],
    ctx: ['connectors', 'flexconnect'],
    tails: { compute: 44 },
    arrows: 'merge',
    merge: ['mpp', 'inmemory', 'realtime'],
    sideways: { connectors: 'left', flexconnect: 'right' },
    focus: { sub: ['infra'] },
  },

  inference: {
    expand: ['infra', 'inference'],
    hl: ['router', 'modelA', 'profileA', 'modelB', 'profileB'],
    parent: ['inference'],
    arrows: 'branch',
    focus: { sub: ['inference'], box: ['infra'] },
  },
}

/** Presentation order — the sequence the transitions are authored against. */
export const STATE_ORDER = [
  'box',
  'builtin',
  'management',
  'context',
  'governance',
  'lifecycle',
  'tenants',
  'infra',
  'storage',
  'colocated',
  'separation',
  'inference',
]
