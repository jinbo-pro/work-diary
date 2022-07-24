console.log('141-axios适配器')

import axios from 'axios'
import settle from 'axios/lib/core/settle'
import buildURL from 'axios/lib/helpers/buildURL'
import createError from 'axios/lib/core/createError'

axios.defaults.adapter = (conf) => {
  return new Promise((resolve, reject) => {
    wx.request({
      // 这里需要手动拼接 url
      url: buildURL(
        conf.baseURL || '' + conf.url || '',
        conf.params,
        conf.paramsSerializer
      ).replace(/^\?/, ''),
      method: String(conf.method).toLowerCase(),
      responseType: conf.responseType,
      data: conf.data,
      success(response) {
        const defResponse = {
          data: response.data,
          status: response.statusCode,
          statusText: 'sucess',
          headers: response.header,
          config: conf
        }
        // 这里需要手动调用 settle 保证 validateStatus 可以生效
        settle(resolve, reject, defResponse)
      },
      fail: (response) => {
        reject(createError(response.errMsg, conf, null, null, response))
      }
    })
  })
}

export const Request = axios
