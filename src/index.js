const http = require('http')
const compose = (middleware) => (res, req) => {
  let index = -1
  const dispatch = (i) => {
    index = i
    let fn = middleware[i]
    if (i === middleware.length) return Promise.resolve()
    try {
      return Promise.resolve(fn(res, req, () => dispatch(index + 1)))
    } catch (e) {
      return Promise.reject(e)
    }
  }
  return dispatch(0)
}

module.exports = class Koa {
  constructor() {
    this.middleware = []
  }

  use(fn) {
    this.middleware.push(fn)
  }

  listen(...args) {
    let server = http.createServer(this.callback.bind(this))
    return server.listen(...args)
  }

  callback(req, res) {
    const fn = compose(this.middleware)
    const handleError = () => { }
    const handleResponse = () => { }
    return fn(req, res).then(handleResponse).catch(handleError)
  }
}