- IndexDBWarp 封装了 indexDb 的单表增删改查操作
- 如果要更好的使用 indexDb 推荐 [idb](https://www.npmjs.com/package/idb)

## IndexDBWarp 完整代码

```ts
export interface IFDbConfig {
  /**数据库名 */
  databaseName: string
  /**数据库版本 */
  version: number
  /**表名 */
  tableName: string
  /**表主键 */
  keyPath: string
}

export interface IFData {
  id: string
  [k: string]: any
}

export class IndexDBWarp {
  db = {} as IDBDatabase
  public config: IFDbConfig
  /**
   * indexDb 操作
   * @param config 数据库配置
   */
  constructor(config: IFDbConfig) {
    this.config = config
  }
  /**初始化 */
  async init() {
    this.db = await this.open()
    return this.db
  }
  /**打开/新建数据库 */
  open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const { databaseName, version } = this.config
      const request = indexedDB.open(databaseName, version)
      request.onsuccess = () => resolve(request.result)
      request.onerror = reject

      // 新建/更新数据版本时触发
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result
        const { tableName, keyPath } = this.config
        this.createdTabel(db, tableName, keyPath)
      }
    })
  }
  /**获取存储对象 */
  getObjectStore() {
    const tableName = this.config.tableName
    return this.db.transaction([tableName], 'readwrite').objectStore(tableName)
  }
  /**创建表 */
  createdTabel(db: IDBDatabase, tableName: string, keyPath = 'id') {
    if (!db.objectStoreNames.contains(tableName)) {
      db.createObjectStore(tableName, { keyPath })
    } else {
      console.warn('创建失败-表名重复')
    }
  }
  /**新增数据 */
  async add(data: IFData) {
    // 已存在对应的值则更新
    const cur = await this.read(data.id)
    if (cur) return this.update(data)
    return new Promise((resolve, reject) => {
      const request = this.getObjectStore().add(data)
      request.onsuccess = resolve
      request.onerror = reject
    })
  }
  /**获取数据 */
  read(id: string) {
    return new Promise((resolve, reject) => {
      const request = this.getObjectStore().get(id)
      request.onsuccess = () => resolve(request.result)
      request.onerror = reject
    })
  }
  /**更新数据 */
  update(data: IFData) {
    return new Promise((resolve, reject) => {
      const request = this.getObjectStore().put(data)
      request.onsuccess = resolve
      request.onerror = reject
    })
  }
  /**删除数据 */
  remove(id: string) {
    return new Promise((resolve, reject) => {
      const request = this.getObjectStore().delete(id)
      request.onsuccess = resolve
      request.onerror = reject
    })
  }
}
```

## 使用示例

```ts
import { IndexDBWarp } from './IndexDBWarp'

const mcDb = new IndexDBWarp({
  databaseName: 'mcDataBase',
  version: 1,
  tableName: 'person',
  keyPath: 'id'
})

const sleep = (t = 0) => new Promise((a) => setTimeout(a, t))

async function main() {
  // 初始化
  await mcDb.init()

  // 新增
  await mcDb.add({ id: '1', name: 'tom', age: 2 })
  await mcDb.add({ id: '2', name: 'jack', age: 3 })
  console.log(678, '-->>> 数据添加完毕')

  // 获取
  const a = await mcDb.read('1')
  const b = await mcDb.read('2')
  console.log(a, '-->>> a')
  console.log(b, '-->>> b')
  console.log('数据读取完毕')
  await sleep(300)

  // 删除
  mcDb.remove('1')
  const c = await mcDb.read('1')
  console.log(c, '-->>> 1 删除成功')

  // 修改
  mcDb.update({ id: '2', name: 'jack-update', age: 10 })
  const jack = await mcDb.read('2')
  console.log(jack, '-->>> jack')
}

main()
```
