interface IFHandelFn {
  onsuccess: (event: any) => any
  onerror: (event: any) => any
}

export class IndexdbWrapper {
  public dbName: string
  public version: number
  public db: IDBDatabase
  /**
   * indexdb 操作类
   * @param dbName 数据库名
   * @param version 数据库版本
   */
  constructor(dbName: string, version: number) {
    this.dbName = dbName
    this.version = version
    this.db = {} as IDBDatabase
  }
  /**
   * 打开数据库没有则自动新建
   */
  async open(): Promise<IDBDatabase> {
    let indexedDB = window.indexedDB
    const request = indexedDB.open(this.dbName, this.version)
    const e = await this.handel(request)
    this.db = e.target.result
    return this.db
  }
  getStore(storeName: string) {
    return this.db.transaction([storeName], 'readwrite').objectStore(storeName)
  }
  handel(request: IFHandelFn): Promise<any> {
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(event)
      }
      request.onerror = (event) => {
        reject(event)
      }
    })
  }
  /**
   * 新增数据
   */
  add(storeName: string, data: any) {
    return this.handel(this.getStore(storeName).add(data))
  }
  /**
   * 通过主键读取数据
   */
  get(storeName: string, key: string) {
    return this.handel(this.getStore(storeName).get(key))
  }
  /**
   * 更新数据
   */
  put(storeName: string, data: any) {
    return this.handel(this.getStore(storeName).put(data))
  }
  /**
   * 删除数据
   */
  delete(storeName: string, id: string) {
    return this.handel(this.getStore(storeName).delete(id))
  }
  /**
   * 删除数据库
   */
  deleteDBAll() {
    let deleteRequest = window.indexedDB.deleteDatabase(this.dbName)
    return new Promise((resolve, reject) => {
      deleteRequest.onerror = (event) => {
        reject(event)
      }
      deleteRequest.onsuccess = (event) => {
        resolve(event)
      }
    })
  }
  /**
   * 关闭数据库
   */
  closeDB() {
    this.db.close()
  }
}
