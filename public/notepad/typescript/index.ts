class Hello {
  public name: string
  constructor(name: string) {
    this.name = name
  }
  welcome() {
    console.log(`欢迎：${this.name}`)
  }
}

const person = new Hello('tom')
person.welcome()
