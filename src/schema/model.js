/**
 * The one diagram that runs behind slides 15–26.
 *
 * There is a single tree holding every box that ever appears. A slide does not
 * draw its own picture: it names a *state*, and the state says which branches
 * are unfolded, what is highlighted, and where the viewport should sit. Because
 * every box keeps its identity across states, moving between two slides is a
 * transition of one diagram rather than a cut between two.
 *
 * Tiers carry the taxonomy. A tier-1 box (Interfaces, Management Tools,
 * Infrastructure) is taller and set larger than a tier-2 box (Definitions &
 * Context), which in turn outranks tier 3 (Semantics, Metrics). Because every
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

const box = (id, label, tier) => ({ id, label, tier })

// ------------------------------------------------------------------ the tree
// `kids` describes how a box's children are arranged once it is unfolded:
//   stack   — one under another, full width for their tier
//   row     — side by side, sharing the tier's width
//   columns — side by side, each column optionally titled and holding a stack
//   branch  — one full-width lead box, then columns hanging below it
// `tailGap` reserves room under a row for an arrow into the next sibling.

export const TREE = {
  id: 'root',
  kids: {
    layout: 'stack',
    items: [
      {
        ...box('interfaces', 'Interfaces', 1),
        kids: {
          layout: 'columns',
          columns: [
            {
              label: 'Built-in',
              items: [box('uiapps', 'UI Apps', 2), box('agents', 'Agents', 2)],
            },
            {
              label: 'Building blocks',
              items: [box('sdk', 'SDK', 2), box('mcp', 'MCP', 2)],
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
              ...box('defs', 'Definitions & Context', 2),
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
              ...box('gov', 'Governance & Control', 2),
              kids: {
                layout: 'columns',
                columns: [
                  { label: 'Data', items: [box('catalog', 'Catalog', 3)] },
                  { label: 'Business', items: [box('aihub', 'AI Hub', 3)] },
                  { label: 'Agents', items: [box('builder', 'Builder', 3)] },
                ],
              },
            },
            {
              ...box('life', 'Lifecycle Management', 2),
              kids: {
                layout: 'row',
                items: [
                  box('evaluations', 'Evaluations', 3),
                  box('observability', 'Observability', 3),
                  box('selflearning', 'Self-Learning', 3),
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
              ...box('inference', 'Inference', 2),
              kids: {
                layout: 'branch',
                lead: box('router', 'Router', 3),
                leadGap: 46,
                columns: [
                  {
                    items: [
                      box('modelA', 'Model', 3),
                      box('profileA', 'Profile', 3),
                    ],
                  },
                  {
                    items: [
                      box('modelB', 'Model', 3),
                      box('profileB', 'Profile', 3),
                    ],
                  },
                ],
              },
            },
            {
              ...box('compute', 'Compute', 2),
              kids: {
                layout: 'row',
                tailGap: 44,
                items: [
                  box('mpp', 'MPP', 3),
                  box('inmemory', 'In-Memory', 3),
                ],
              },
            },
            box('storage', 'Storage', 2),
          ],
        },
      },
    ],
  },
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
// hl     — boxes drawn as the highlight; everything else recedes
// focus  — what the viewport centres on: `sub` takes a box with everything
//          unfolded beneath it, `box` takes the box alone
// widths — narrows named boxes to leave room for the arrows beside them

export const STATES = {
  box: {
    expand: [],
    hl: ['interfaces', 'mgmt', 'infra'],
    focus: { sub: ['interfaces', 'mgmt', 'infra'] },
  },

  builtin: {
    expand: ['interfaces'],
    hl: ['interfaces', 'uiapps', 'agents', 'sdk', 'mcp'],
    focus: { sub: ['interfaces'] },
  },

  management: {
    expand: ['mgmt'],
    hl: ['mgmt', 'defs', 'gov', 'life'],
    focus: { sub: ['mgmt'] },
  },

  context: {
    expand: ['mgmt', 'defs'],
    hl: [
      'defs',
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
    hl: ['gov', 'catalog', 'aihub', 'builder'],
    focus: { sub: ['mgmt'] },
  },

  lifecycle: {
    expand: ['mgmt', 'life'],
    hl: ['life', 'evaluations', 'observability', 'selflearning'],
    focus: { sub: ['mgmt'], box: ['infra'] },
  },

  // One authored stack, delivered to many tenants: a different arrangement of
  // the same two boxes, so they travel rather than being replaced.
  tenants: {
    mode: 'tenants',
    expand: [],
    hl: [],
    focus: null,
  },

  infra: {
    expand: ['infra'],
    hl: ['infra', 'inference', 'compute', 'storage'],
    focus: { sub: ['infra'] },
  },

  open: {
    expand: ['infra'],
    hl: [],
    widths: { inference: 336, compute: 336, storage: 336 },
    arrows: 'open',
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

  separation: {
    expand: ['infra', 'compute'],
    hl: ['compute', 'mpp', 'inmemory', 'storage'],
    arrows: 'merge',
    focus: { sub: ['infra'] },
  },

  inference: {
    expand: ['infra', 'inference'],
    hl: ['inference', 'router', 'modelA', 'profileA', 'modelB', 'profileB'],
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
  'open',
  'colocated',
  'separation',
  'inference',
]
