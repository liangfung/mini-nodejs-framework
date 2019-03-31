const compose = (middleware) => (cxt) => {
  let index = -1
  const dispatch = (i) => {
    index = i
    let fn = middleware[i]
    if (i === middleware.length) return Promise.resolve()
    try {
      return Promise.resolve(fn(cxt, () => dispatch(index + 1)))
    } catch (e) {
      return Promise.reject(e)
    }
  }
  return dispatch(0)
}