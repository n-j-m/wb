export default function segments (state = { segments: {} }, action) {
  let newState = state
  switch (action.type) {
    case 'ADD':
      newState = Object.assign({}, state, { segments: Object.assign({}, state.segments, {
        [action.payload.id]: action.payload
      }) })
      return newState
    case 'PUSH_POINT':
      if (!state.segments[action.payload.id]) {
        return state
      }
      state.segments[action.payload.id].pushPoint(action.payload.point)
      newState = Object.assign({}, state, { segments: Object.assign({}, state.segments) })
      return newState
    case 'CLEAR':
      return Object.assign({}, state, { segments: [] })
    default:
      return state
  }
}