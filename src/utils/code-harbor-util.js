const expiryTime = 30 * 60 * 1000

const setLocalStorage = (key, data, time) => {
  const now = new Date()
  let setExpiry = expiryTime
  if (time && time > 0) {
    setExpiry = time
  }
  const item = {
    value: data,
    expiry: now.getTime() + setExpiry
  }
  localStorage.setItem(key, JSON.stringify(item))
}

const getLocalStorage = (key) => {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const now = new Date()
  item.expiry = now.getTime() + expiryTime
  localStorage.setItem(key, JSON.stringify(item))
  return item.value
}

const removeLocalStorage = (...keys) => {
  for (let i = 0; i < keys.length; i++) {
    localStorage.removeItem(keys[i])
  }
}

export { setLocalStorage, getLocalStorage, removeLocalStorage }
