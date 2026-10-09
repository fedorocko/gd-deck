import { useEffect, useRef, useState } from 'react'
import assetUrl from '../../../shared/asset.js'
import Media from '../../../shared/Media.jsx'
import media from '../media.js'

/**
 * Tiles two to a row, filling the slide. The two boxes of slides 9 and 10
 * (components/Sides.jsx) stand on the same grid, so slide 7's tiles are where
 * those will be.
 *
 * columns: 4 sets them four to a row instead, with the type stepped down to
 *   fit and the slide's margins drawn in to give the columns more room.
 *
 * tiles: [{ id, ... }], each set by what it holds:
 *   logo  — a logo from media.js, centred
 *   word  — the word a sentence opens on, when it is the one that matters:
 *           set far larger than the rest and in the accent, on a line of
 *           its own, with `text` following
 *   text  — one thought, set large
 *   pills — with `text`: what stands behind it, a filled pill each, under it
 *   soon  — more of those, not out yet: outlined, after the filled ones
 *   clip  — with `text`: a video from media.js behind the tile, dimmed. The
 *           tiles' clips take turns, in the tiles' order: each plays through
 *           once and rests on its last frame, and then the next begins.
 */
export default function TilesLayout({ tiles, columns = 2 }) {
  // Whose clip is playing. A clip hands on when it has played, so only one
  // moves at a time, and the slide is still once the last one has.
  const clips = tiles.filter((tile) => tile.clip).map((tile) => tile.id)
  const [turn, setTurn] = useState(0)

  return (
    <section className={columns === 4 ? 'slide slide--four' : 'slide'}>
      <ul className={columns === 4 ? 'tiles tiles--four' : 'tiles'}>
        {tiles.map(({ id, ...tile }) => (
          <Tile
            key={id}
            {...tile}
            playing={clips[turn] === id}
            onPlayed={() => setTurn(clips.indexOf(id) + 1)}
          />
        ))}
      </ul>
    </section>
  )
}

function Tile({ text, logo, word, pills, soon = [], clip, playing, onPlayed }) {
  if (logo) {
    return (
      <li className="tile tile--media">
        <Media name={logo} from={media} className="tile__media" />
      </li>
    )
  }

  if (word) {
    return (
      <li className="tile">
        <p className="tile__text">
          <span className="tile__word">{word}</span>
          {text}
        </p>
      </li>
    )
  }

  return (
    <li className={clip ? 'tile tile--clip' : 'tile'}>
      {clip && <Clip name={clip} playing={playing} onPlayed={onPlayed} />}
      <p className="tile__text">{text}</p>
      {pills && (
        <ul className="pills">
          {pills.map((pill) => (
            <li className="pill pill--filled" key={pill}>
              {pill}
            </li>
          ))}
          {soon.map((pill) => (
            <li className="pill pill--soon" key={pill}>
              {pill}
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

/**
 * A video behind a tile. It waits on its first frame until it is `playing`,
 * runs through once, and rests on its last frame.
 *
 * onPlayed: called when it has finished — or cannot be loaded at all, so
 *   that a missing file does not hold up the clips after it.
 */
function Clip({ name, playing, onPlayed }) {
  const video = useRef(null)

  useEffect(() => {
    // A browser that refuses to play it leaves it on its first frame.
    if (playing) video.current.play().catch(() => {})
  }, [playing])

  return (
    <video
      ref={video}
      className="tile__clip"
      src={assetUrl(media[name].src)}
      muted
      playsInline
      preload="auto"
      onEnded={onPlayed}
      onError={onPlayed}
    />
  )
}
