/**
 * Slide media. Drop real files into `public/media/` and point the `src` here
 * (e.g. src: '/media/datev-office.jpg'). While `src` is null the slide renders
 * a labelled placeholder frame instead.
 */
const media = {
  future: {
    src: '/media/hero.mp4',
    kind: 'video',
    label: 'Video — fast-cut clips of agents operating a computer',
  },
  pillarLanguage: {
    src: '/media/pil-1.mp4',
    kind: 'video',
    label: 'Portrait — agent / interface imagery',
  },
  pillarPrivate: {
    src: '/media/pil-2.mp4',
    kind: 'video',
    label: 'Portrait — on-premise / data centre',
  },
  pillarEfficiency: {
    src: '/media/pil-3.mp4',
    kind: 'video',
    label: 'Portrait — scale / throughput',
  },
  pillarCreativity: {
    src: '/media/pil-4.mp4',
    kind: 'video',
    label: 'Portrait — open architecture / craft',
  },
  datev: { src: '/media/datev.jpeg', label: 'Photo — Datev office' },
  mastercard: { src: '/media/mastercard.webp', label: 'Photo — Mastercard office' },
  boozt: { src: '/media/boozt.jpeg', label: 'Photo — Boozt office' },
}

export default media
