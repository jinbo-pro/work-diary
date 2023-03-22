/**海报配置 */
export const posterConfig = {
  width: 750,
  height: 1334,
  backgroundColor: '#fff',
  debug: false,
  pixelRatio: 1,
  blocks: [
    {
      width: 690,
      height: 808,
      x: 30,
      y: 183,
      borderWidth: 2,
      borderColor: '#f0c2a0',
      borderRadius: 20
    },
    {
      width: 634,
      height: 74,
      x: 59,
      y: 770,
      backgroundColor: '#fff',
      opacity: 0.5,
      zIndex: 100
    }
  ],
  texts: [
    {
      x: 113,
      y: 61,
      baseLine: 'middle',
      text: '伟仔',
      fontSize: 32,
      color: '#8d8d8d'
    },
    {
      x: 30,
      y: 113,
      baseLine: 'top',
      text: '发现一个好物，推荐给你呀',
      fontSize: 38,
      color: '#080808'
    },
    {
      x: 92,
      y: 810,
      fontSize: 38,
      baseLine: 'middle',
      text: '标题标题标题标题标题标题标题标题标题',
      width: 570,
      lineNum: 1,
      color: '#8d8d8d',
      zIndex: 200
    },
    {
      x: 59,
      y: 895,
      baseLine: 'middle',
      text: [
        {
          text: '2人拼',
          fontSize: 28,
          color: '#ec1731'
        },
        {
          text: '¥99',
          fontSize: 36,
          color: '#ec1731',
          marginLeft: 30
        }
      ]
    },
    {
      x: 522,
      y: 895,
      baseLine: 'middle',
      text: '已拼2件',
      fontSize: 28,
      color: '#929292'
    },
    {
      x: 59,
      y: 945,
      baseLine: 'middle',
      text: [
        {
          text: '商家发货&售后',
          fontSize: 28,
          color: '#929292'
        },
        {
          text: '七天退货',
          fontSize: 28,
          color: '#929292',
          marginLeft: 50
        },
        {
          text: '运费险',
          fontSize: 28,
          color: '#929292',
          marginLeft: 50
        }
      ]
    },
    {
      x: 360,
      y: 1065,
      baseLine: 'top',
      text: '长按识别小程序码',
      fontSize: 38,
      color: '#080808'
    },
    {
      x: 360,
      y: 1123,
      baseLine: 'top',
      text: '超值好货一起拼',
      fontSize: 28,
      color: '#929292'
    }
  ],
  images: [
    {
      width: 62,
      height: 62,
      x: 30,
      y: 30,
      borderRadius: 62,
      url: `https://img2.ali213.net/picfile/News/2021/03/17/584_2021031754445704.jpg`
    },
    {
      width: 634,
      height: 634,
      x: 59,
      y: 210,
      url: `https://img2.ali213.net/picfile/News/2021/03/17/584_2021031754445704.jpg`
    },
    {
      width: 220,
      height: 220,
      x: 92,
      y: 1020,
      url: `https://img2.ali213.net/picfile/News/2021/03/17/584_2021031754444310.jpg`
    },
    {
      width: 750,
      height: 90,
      x: 0,
      y: 1244,
      url: `https://img2.ali213.net/picfile/News/2021/03/17/584_2021031754445973.jpg`
    }
  ]
}
