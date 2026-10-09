/**
 * Slide media. Every slot is a labelled placeholder until its file exists:
 * drop the file into `public/media/` and point `src` at it, e.g.
 * src: '/media/clerk-screenshot.png'. A video loops while its slide is up, unless
 * `plays` caps it — then it runs that many times and holds the last frame.
 */
const media = {
  // Slide 2. The ASP pitch's hero video, filling the stage behind the
  // question.
  hero: {
    src: '/media/hero.mp4',
    kind: 'video',
    label: 'Video — fast-cut clips of agents operating a computer',
  },
  // Slide 3. The Mona Lisa, half-length, cut out on a transparent ground,
  // 4 : 5, turned to the right, towards the screens: shown as it is, never
  // mirrored. It rises out of the stage's bottom edge, which hides where the
  // picture is cut off under the hands.
  person: { src: '/media/mona-lisa.png', label: 'Person' },
  // Slide 3. App screens, laid on a slanted plane, so they are cropped from
  // the top: landscape, about 3 : 2. These are 16 : 9, so each loses a sliver
  // off either side. They stand two to a row: 1 and 2 above, 3 and 4 below.
  screen1: { src: '/media/screen-excel.png', label: 'Screen — Excel' },
  screen2: { src: '/media/screen-workday.png', label: 'Screen — Workday' },
  screen3: { src: '/media/screen-slack.png', label: 'Screen — Slack' },
  screen4: { src: '/media/screen-salesforce.png', label: 'Screen — Salesforce' },
  // Slide 6. The mark alone, without the name beside it, on a transparent
  // ground. It is set in the headline, just taller than its capitals.
  claudeCodeLogo: {
    src: '/media/claude-code-logo.png',
    label: 'Logo — Claude Code',
  },
  // Slide 8. Framed at 1408 × 788, so 16:9 fits uncut; 2816 × 1584 is sharp.
  clerkScreenshot: {
    src: '/media/clerk-screenshot.png',
    label: 'Screenshot — Clerk',
  },
  // Slide 12. The ASP pitch's four pillar videos, the same files, each dimmed
  // behind its own pillar's column: portrait, 9 : 16, five seconds. They are
  // not looped here: the columns play theirs in turn, once (TilesLayout).
  pillarLanguage: {
    src: '/media/pil-1.mp4',
    kind: 'video',
    label: 'Video — code on a screen',
  },
  pillarCreativity: {
    src: '/media/pil-4.mp4',
    kind: 'video',
    label: 'Video — a glowing model city',
  },
  pillarPrivate: {
    src: '/media/pil-2.mp4',
    kind: 'video',
    label: 'Video — server racks',
  },
  pillarEfficiency: {
    src: '/media/pil-3.mp4',
    kind: 'video',
    label: 'Video — server cabling',
  },
}

export default media
