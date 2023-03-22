const options = [
  {
    id: '1-1',
    pid: '0',
    name: '植物',
    data: [
      {
        id: '2-1',
        pid: '1-1',
        name: '孢子植物',
        data: [
          {
            id: '3-1',
            pid: '2-1',
            name: '海藻'
          },
          {
            id: '3-2',
            pid: '2-1',
            name: '苔癣'
          }
        ]
      },
      {
        id: '2-2',
        pid: '1-1',
        name: '种子植物',
        data: [
          {
            id: '3-3',
            pid: '2-2',
            name: '银杏树'
          },
          {
            id: '3-4',
            pid: '2-2',
            name: '苹果树'
          }
        ]
      }
    ]
  },
  {
    id: '1-2',
    pid: '0',
    name: '动物',
    data: [
      {
        id: '2-3',
        pid: '1-2',
        name: '无脊椎动物',
        data: [
          {
            id: '3-5',
            pid: '2-3',
            name: '水母'
          },
          {
            id: '3-6',
            pid: '2-3',
            name: '蚯蚓'
          }
        ]
      },
      {
        id: '2-4',
        pid: '1-2',
        name: '脊椎动物',
        data: [
          {
            id: '3-7',
            pid: '2-4',
            name: '爬行纲'
          },
          {
            id: '3-8',
            pid: '2-4',
            name: '哺乳纲',
            data: [
              {
                id: '4-1',
                pid: '3-8',
                name: '熊猫'
              },
              {
                id: '4-2',
                pid: '3-8',
                name: '拉布拉多犬'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '1-3',
    pid: '0',
    name: '微生物',
    data: [
      {
        id: '2-5',
        pid: '1-3',
        name: '真菌'
      },
      {
        id: '2-6',
        pid: '1-3',
        name: '细菌'
      },
      {
        id: '2-7',
        pid: '1-3',
        name: '病毒',
        data: [
          {
            id: '3-9',
            pid: '2-7',
            name: '新型冠状病毒'
          }
        ]
      }
    ]
  }
]
