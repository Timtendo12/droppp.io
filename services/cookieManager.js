import Cookies from 'js-cookie'

class CookieManager {
  getData(key) {
    return JSON.parse(Cookies.get(key) || '{}')
  }

  setData(key, data, expires) {
    Cookies.set(key, data, { expires })
  }

  removeData(key) {
    Cookies.remove(key)
  }
}

export default new CookieManager
