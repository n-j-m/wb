export default function ui (store, p) {
  const clearButton = p.createButton('x')

  clearButton
    .position(10, 10)
    .mouseClicked(() => store.dispatch({ type: 'CLEAR' }))
}
