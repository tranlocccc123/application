// ####
// ####
// ####   File migrated from AlphaKit-JS-SDK repo
// ####
// ####

import axios from 'axios'

const DEFAULT_CONFIG = {
  timeout: 30000,
  validateStatus: (status) => {
    return status >= 200 && status < 400
  }
}

export const ErrNotAuthed = new Error('Invalid Auth Token')

/**
 * @callback statusCallback
 * @param {Object} request the original XMLHttpRequest sent to the server.
 * @param {Object} response the response object that came back from the server.
 * @returns {?Promise} a promise to be returned to axios.
 */

/**
 * @callback requestHook
 * @param {Object} config the request config used by axios to resolve request.
 * @returns {Promise} a promise which either resolves to a request config or rejected with an error.
 */

/**
 * @class Francis - wrapper around axios
 */
class Francis {
  /**
   * @constructor
   * @param {Object} [config] An Axios config for overriding any default axios functionality
   */
  constructor(config) {
    this.config = Object.assign({}, DEFAULT_CONFIG, config)
    this.axios = axios.create(this.config)
    this.statusCallbacks = {}
    this.requestHooks = []
    this.authToken = null
    this.init()
  }

  /**
   * @method init initializes stuff, such as adding the axios interceptors.
   */
  init() {
    this.axios.interceptors.request.use(this.requestInterceptor.bind(this), (error) => {
      Promise.reject(error)
    })
    this.axios.interceptors.response.use(undefined, this.errorResponseInterceptor.bind(this))
  }

  /**
   * @function requestInterceptor applies auth and token logic to all requests.
   */
  requestInterceptor(config) {
    // Check auth first
    if (config.useBearerToken) {
      if (!this.authToken) {
        return Promise.reject(ErrNotAuthed)
      }
      /* eslint-disable-next-line */
      config.headers.Authorization = `Bearer ${this.authToken}`
    }

    // Run through all requestHooks
    if (this.requestHooks.length) {
      return Promise.all(this.requestHooks).then((configs) => {
        const newConfig = configs.reduce((a, v) => Object.assign({}, a, v), config)
        return Promise.resolve(newConfig)
      }).catch((err) => {
        return Promise.reject(err)
      })
    } else {
      // Return resolved config
      return config
    }
  }

  /**
   * @function errorResponseInterceptor handles errors coming from responses. Runs any applicable status callbacks.
   */
  errorResponseInterceptor(error) {
    if (error.response) {
      const status = error.response.status
      const cb = this.statusCallbacks[status]
      let prom = null
      if (cb && typeof cb === 'function') {
        prom = cb(error.request, error.response)
      }
      if (prom !== null && prom !== undefined) {
        return prom
      }
    }
    return Promise.reject(error)
  }

  setAuthToken(token) {
    this.authToken = token
  }

  /**
   * @method addRequestHook sets a callback function to be called before a request is resolved.
   * @param {requestHook} cb the function to be called before the request is resolved.
   */
  addRequestHook(cb) {
    this.requestHooks.push(cb)
  }

  /**
   * @method setStatusCallback sets a callback function to be called whenever a response comes back with the cooresponding status.
   * @param {Number} code the status code the given function should handle.
   * @param {statusCallback} cb the function to handle the given status code.
   */
  setStatusCallback(code, cb) {
    this.statusCallbacks[code] = cb
  }

  /**
   * @method request proxies calls to axios's request method.
   * @returns {Promise} A Promise containing the response of the request
   */
  request(...args) {
    return this.axios.request(...args)
  }

  /**
   * @method get proxies calls to axios's get method.
   * @returns {Promise} A Promise containing the response of the get request
   */
  get(...args) {
    return this.axios.get(...args)
  }

  /**
   * @method post proxies calls to axios's post method.
   * @returns {Promise} A Promise containing the response of the post request
   */
  post(...args) {
    return this.axios.post(...args)
  }

  /**
   * @method put proxies calls to axios's put method.
   * @returns {Promise} A Promise containing the response of the put request
   */
  put(...args) {
    return this.axios.put(...args)
  }

  /**
   * @method del proxies calls to axios's del method.
   * @returns {Promise} A Promise containing the response of the del request
   */
  del(...args) {
    return this.axios.delete(...args)
  }
}

export default new Francis()
