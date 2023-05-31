const { BaseServer } = require('../Base')

const Mock = require('mockjs')

const imgList = [
  'https://img2.ali213.net/picfile/News/2021/03/17/584_2021031754445704.jpg',
  'https://img2.ali213.net/picfile/News/2021/03/17/584_2021031754444310.jpg',
  'https://img2.ali213.net/picfile/News/2021/03/17/584_2021031754445973.jpg',
  'https://img2.ali213.net/picfile/News/2022/06/02/584_2022060225009757.webp',
  'https://img2.ali213.net/picfile/News/2023/03/25/584_2023032593812151.jpg',
  'https://img2.ali213.net/picfile/News/2022/11/01/584_2022110150401309.jpg'
]

// mock 数据
class MockData extends BaseServer {
  // 评论列表
  commentList(num = 10) {
    let result = Mock.mock({
      [`data|${num}`]: [
        {
          'id|+3': 99, // 评论id
          'star|1-1000': 1, // 点赞数
          creator: '@cname()', // 创建人
          headImg: '@image("150x150")', // 用户头像
          name: '@ctitle(6, 20)', // 标题
          content: '@cparagraph(1, 3)', // 内容
          'createTime|1546300800-1640908800': 1 // 创建时间2019-01-01 ~ 2021-12-31
        }
      ]
    })
    return result.data
  }
  // 用户列表
  userList(pageSize = 10) {
    let result = Mock.mock({
      [`data|${pageSize}`]: [
        {
          'id|+3': 99, // id
          name: '@cname()', // 名字
          'age|10-99': 1, // 年龄
          'gender|1-2': 1, // 性别
          'status|0-3': 1, // 状态
          'headerImg|1-3': ['@image("150x150")'], // 头像
          content: '@cparagraph(1)', // 简介
          'createTime|1546300800-1640908800': 1 // 创建时间2019-01-01 ~ 2021-12-31
        }
      ]
    })
    return result.data
  }
  // 列表数据 - [主要用于mockjs测试]
  listData(count = 10) {
    let result = Mock.mock({
      [`data|${count}`]: [
        {
          id: '@id()', // 18位字符型id
          ip: '@ip()', // ipv4
          guid: '@guid()', // 全局唯一guid
          name: '@name()', // 英文姓名
          cname: '@cname()', // 中文姓名
          'cover|1': imgList, // 封面
          cfirst: '@cfirst()', // 中文姓
          province: '@province()', // 省
          city: '@city()', // 市
          county: '@county()', // 区县
          addressInfo: Mock.Random.county(true), // 省市县级联  @county(true) 与上面的county冲突了 不能一起写
          ctitle: '@ctitle(3,10)', // 中文标题3-10个字
          cword: '@cword(8,20)', // 中文文章8-20个字
          cparagraph: '@cparagraph(1,3)', // 中文句子1-3句
          title: '@title(1,3)', // 英文标题1-3个    英文文章和句子类似于中文的只是去掉c即可
          hex: '@hex()', // hex颜色
          rgb: '@rgb()', // rgb颜色
          now: '@now()', // 当前时间
          datetime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 随机时间 可设置格式
          'headerImg|1-3': ['@image("150x150", @hex())'], // 头像 Random.image( size?, background?, foreground?, format?, text? )
          range: '@range(2, 20, 2)', // 数列Random.range( start, stop, step )
          string: '@string(3,10)', // 字符串3-10个字里面有字母标点等
          float: '@float(10,500)', // 10-500之间的浮点数
          'number|10-999': 1, // 10-999之间的整数
          'numberAuto|+2': 2 // 输出整数初始为2每次自增2
        }
      ]
    })
    return result.data
  }
}

module.exports = new MockData()
