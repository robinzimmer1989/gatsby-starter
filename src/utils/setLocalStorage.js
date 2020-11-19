import isBrowser from "./isBrowser"

/**
 *
 * @param {string} key
 * @param {any} value
 */

const setLocalStorage = (key, value) => {
  if (!isBrowser) {
    return
  }

  if (key && value === null) {
    window.localStorage.removeItem(key)
    return
  }

  if (!key || !value || typeof value !== "object") {
    console.warn("setLocalStorage requires a key and an object")
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
}

export default setLocalStorage
