/**
 * ajax 请求包装
 * @param {string} method
 * @param {string} url
 * @param {any} data
 * @param {object} config
 * @returns
 */
export function ajaxRequest(method, url, data, config = {}) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      type: method,
      data,
      ...config,
      success: function (res) {
        resolve(res)
      },
      error: function (err) {
        reject(err)
      }
    })
  })
}

/**
 * get 请求
 * @param {string} url
 * @param {object} data
 */
export function apiGet(url, data) {
  return ajaxRequest('get', url, data)
}

/**
 * post formdata 请求
 * @param {string} url
 * @param {FormData} data
 */
export function apiPostForm(url, data) {
  return ajaxRequest('post', url, data, {
    contentType: false,
    processData: false
  })
}

/**
 * post json 请求
 * @param {string} url
 * @param {object} data
 */
export function apiPostJson(url, data) {
  return ajaxRequest('post', url, JSON.stringify(data), {
    contentType: 'application/json; charset=utf-8'
  })
}
