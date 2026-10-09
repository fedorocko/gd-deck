/**
 * What the two boxes of slides 9 and 10 hold: the customer's side first, the
 * vendor's second, as on slide 7.
 *
 *   title  — slide 10: the principle the side comes down to, set over its box
 *   groups — the side's features, sorted by what they are worth:
 *     features — slide 9: what Clerk does, a pill each
 *     value    — slide 10: what those are worth, the lime pill that comes in
 *                over them. It reads on from the title: “Take
 *                responsibility” “for security”, “Give flexibility” “to
 *                extend”.
 */
const sides = [
  {
    id: 'customer',
    title: 'Take responsibility',
    groups: [
      {
        features: [
          'Supports all the authentication options',
          'Implements latest best practices',
        ],
        // A stand-in: the word for calming FOMO is still to be settled.
        value: 'for innovation',
      },
      {
        features: [
          'You don’t store any password',
          'You have less risk of being hacked',
        ],
        value: 'for security',
      },
      {
        features: ['Ensures everything works smoothly'],
        value: 'for efficiency',
      },
    ],
  },
  {
    id: 'vendor',
    title: 'Give flexibility',
    groups: [
      { features: ['Headless sign-up components'], value: 'to customize' },
      {
        features: ['Sign-up and login hooks', 'APIs to manage Organizations'],
        value: 'to code',
      },
      {
        features: ['Extensible User model', 'Define roles and permissions'],
        value: 'to extend',
      },
    ],
  },
]

export default sides
