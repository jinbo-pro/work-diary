import { getQueryObject, getQueryString } from '/utils/page.js'
/**转换函数 */
export const transformFn = {
  queryString: {
    toObj(str) {
      return getQueryObject(str)
    },
    toMe(obj) {
      return getQueryString(obj)
    }
  },
  queryFormStr: {
    toObj(str) {
      let obj = {}
      let list = str.split('\n')
      for (let item of list) {
        let [k, v] = item.split(':')
        obj[k] = v
      }
      return obj
    },
    toMe(obj) {
      return Object.keys(obj)
        .map((key) => {
          return `${key}:${obj[key]}`
        })
        .join('\n')
    }
  },
  queryObjectStr: {
    toObj(str) {
      return JSON.parse(str)
    },
    toMe(obj) {
      return JSON.stringify(obj)
    }
  }
}
