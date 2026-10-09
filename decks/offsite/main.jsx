import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../shared/deck.css'
import '../../shared/slides.css'
import '../../shared/schema.css'
import './styles.css'
import Deck from '../../shared/Deck.jsx'
import Schema from '../../shared/Schema.jsx'
import Scene from './components/Scene.jsx'
import Sides from './components/Sides.jsx'
import slides from './slides/index.js'

// Slides 3–5 share one picture, slides 9–10 their two boxes, and slides
// 14–24 the ASP pitch's schema. Each is the deck's overlay, so it survives
// the slide change and moves into the next slide's arrangement instead of
// being redrawn.
const overlay = (Slide) =>
  (Slide.scene && <Scene run={Slide.scene} />) ||
  (Slide.sides && <Sides show={Slide.sides} />) ||
  (Slide.schema && <Schema state={Slide.schema} />)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Deck slides={slides} overlay={overlay} />
  </StrictMode>,
)
