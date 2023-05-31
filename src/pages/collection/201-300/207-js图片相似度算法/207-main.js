import Presbyopic from './common/presbyopic.js'
import { loadImg } from '@/utils/collect.js'

new Vue({
  el: '#app',
  data: {
    orgImgList: [],
    algorithmList: [
      { name: 'average hash', title: '平均哈希法', result: '', imgList: [] },
      { name: 'perceive hash', title: '感知哈希法', result: '', imgList: [] },
      { name: 'color seperate', title: '颜色分布法', result: '', imgList: [] },
      { name: 'content feature', title: '内容特征法', result: '', imgList: [] }
    ],
    imgWidth: 8,
    zoneAmount: '4'
  },
  methods: {
    async selectFile(e) {
      let list = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      this.orgImgList = list
      for (let item of this.algorithmList) {
        let imgList = []
        for (let url of list) {
          const img = await loadImg(url)
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0, img.width, img.height)
          const prese = await this.getPresbyopic(canvas.toDataURL(), item.name)
          const features = prese.fingerprint
          imgList.push({
            zipImg: prese.getNewImg(),
            featuresValue: features,
            featuresLength: features.length
          })
        }
        item.imgList = imgList
        const [a, b] = imgList
        item.result = Presbyopic.compareFingerprint(a.featuresValue, b.featuresValue, item.name)
      }
    },
    async getPresbyopic(base64, name) {
      const presbyopic = new Presbyopic({
        imgSrc: base64,
        imgWidth: this.imgWidth
      })
      switch (name) {
        case 'average hash':
          return await presbyopic.getHash()
        case 'perceive hash':
          return await presbyopic.getHash(true)
        case 'color seperate':
          return await presbyopic.colorSeperate(Number(this.zoneAmount))
        case 'content feature':
          return await presbyopic.contentFeature()
      }
    }
  }
})
