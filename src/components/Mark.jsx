/**
 * A few words inside a statement, picked out.
 *
 * The deck already has three ways of saying "this is the point": the lime
 * text of an eyebrow, the solid lime badge, and the schema's tinted highlight.
 * `variant` chooses which of those voices the emphasis borrows, so a marked
 * phrase reads as part of the deck rather than as a new device:
 *
 *   tint  — set in the accent, nothing else
 *   pill  — solid lime, the badge voice carried inline
 *   wash  — the schema's highlight: lime tint behind a hairline
 *   rule  — left white, underscored in lime
 *
 * `keep` holds the phrase on one line. Use it where a break would read as a
 * mistake rather than as typography — a hyphenated phrase like "ready-made",
 * where the colour makes the break louder than the words. A phrase of more
 * than two or three words should be left to wrap, or it will run past the
 * column it is set in.
 */
export default function Mark({ variant = 'tint', keep = false, children }) {
  return (
    <span className={`mk mk--${variant}${keep ? ' mk--keep' : ''}`}>
      {children}
    </span>
  )
}
