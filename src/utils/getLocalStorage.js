import isBrowser from "./isBrowser"

/**
 * @param {string} key
 */

const getLocalStorage = key => {
  if (!isBrowser) {
    return
  }

  if (!key) {
    console.warn("getLocalStorage requires a key!")
    return
  }

  const storageItem = JSON.parse(window.localStorage.getItem(key))

  if (storageItem) {
    return storageItem
  } else {
    return {}
  }
}

export default getLocalStorage
