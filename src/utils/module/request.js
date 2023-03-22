import * as RequestFetch from './RequestFetch'

export const request = {
  async main(method, url, data) {
    const res = await RequestFetch[method](url, data)
    if (res.code == 0) {
      return res.data
    } else {
      return Promise.reject(res.data)
    }
  },
  get(url, data) {
    return this.main('get', url, data)
  },
  post(url, data) {
    return this.main('post', url, data)
  },
  postJson(url, data) {
    return this.main('postJson', url, data)
  },
  postFormData(url, data) {
    return this.main('postFormData', url, data)
  }
}
