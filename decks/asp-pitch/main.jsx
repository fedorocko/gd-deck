import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../shared/deck.css'
import '../../shared/slides.css'
import '../../shared/schema.css'
import './styles.css'
import Deck from '../../shared/Deck.jsx'
import Schema from '../../shared/Schema.jsx'
import slides from './slides/index.js'

// Slides that carry a schema state share one diagram. It is the deck's overlay,
// so it survives the slide change and animates from the previous state instead
// of being redrawn.
const schema = (Slide) => Slide.schema && <Schema state={Slide.schema} />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Deck slides={slides} overlay={schema} />
  </StrictMode>,
)
