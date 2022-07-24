/**queryObject转queryString */
function getQueryString(json) {
  if (!json) return ''
  return Object.keys(json)
    .map((key) => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
    .join('&')
}
/**检查响应状态 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    // 响应成功
    return response
  }
  if (response.status === 301 || response.status === 302) {
    // 重定向
    window.location = response.headers.get('Location')
  }
  const error = new Error(response.statusText)
  error.data = response
  throw error
}
/**解析返回的结果 */
async function parseResult(response) {
  const contentType = response.headers.get('Content-Type')
  if (contentType != null) {
    if (contentType.includes('text')) {
      return await response.text()
    }
    if (contentType.includes('form')) {
      return await response.formData()
    }
    if (contentType.includes('video')) {
      return await response.blob()
    }
    if (contentType.includes('json')) {
      return await response.json()
    }
  }
  return await response.text()
}
/**返回处理 */
async function processResult(response) {
  let _response = checkStatus(response)
  return await parseResult(_response)
}

/**
 * fetch request
 */
export class RequestFetch {
  constructor() {}
  async mainFetch(url, options = {}) {
    const res = await fetch(url, options)
    return await processResult(res)
  }
  /**get */
  async get(url, data) {
    if (data) {
      url += `?${getQueryString(data)}`
    }
    return this.mainFetch(url)
  }
  /**post */
  async post(url, data) {
    return this.mainFetch(url, {
      method: 'post',
      body: getQueryString(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
  /**postJson */
  async postJson(url, data) {
    return this.mainFetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  /**postFormData */
  async postFormData(url, data) {
    return this.mainFetch(url, {
      method: 'post',
      body: data
    })
  }
}
