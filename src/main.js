import Segment from './segment'
import ui from './ui'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import persist from './persist'

const { get, set, middleware } = persist('sketch', ({ segments }) => {
  const segs = Object.keys(segments).reduce((state, key) => {
    state[key] = new Segment(segments[key].id, segments[key].points)
    return state
  },{})
  return { segments: segs }
})

const store = createStore(reducer, get({ segments: {} }), applyMiddleware(middleware))

const { dispatch } = store

const state = store.getState()
console.log('state:', state)
let _id = Math.max(Object.keys(state['segments'] || {}).length, 0)
console.log(_id)
const nextId = () => ++_id

function sketch (p) {
  let s = 1
  let r, g, b
  let prev, curr, seg

  window.getState = () => store
  
  p.setup = function setup () {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(255)
    ui(store, p)
    r = p.random(255)
    g = p.random(255)
    b = p.random(255)
    console.log({r,g,b})
  }

  p.draw = function draw () {
    p.background(255)

    const segments = store.getState().segments
    const ids = Object.keys(segments)
    for (let id of ids) {
      const segment = segments[id]
      segment.draw({r,g,b}, s, p)
    }
  }

  p.windowResized = function windowResized () {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }

  p.mouseDragged = function mouseDragged () {
    if (!seg) {
      seg = new Segment(nextId())
      dispatch({ type: 'ADD', payload: seg })
    }
    const point = { x: p.mouseX, y: p.mouseY }
    dispatch({ type: 'PUSH_POINT', payload: { point, id: seg.id } })
  }

  p.mouseClicked = function mouseClicked () {
    seg = null
  }
}


new p5(sketch)
