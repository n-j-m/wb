export default function persist (key, hydrate = (value) => value) {
  const set = (value) => localStorage.setItem(key, JSON.stringify(value))

  const get = (initial = {}) => {
    if (localStorage.key(key)) {
      const data = JSON.parse(localStorage.getItem(key))
      const values = hydrate(data)
      return values
    }
    set(initial)
    return get()
  }

  const middleware = (store) => (next) => (action) => {
    const result = next(action)
    const state = store.getState()
    set(store.getState())
    return result
  }

  return { get, set, middleware }
}
