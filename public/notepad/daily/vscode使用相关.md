[toc]

## Vetur 格式整理配置

在 settings.json 里面添加配置

```json
"vetur.format.options.tabSize": 4,  // 间隔4
"vetur.format.defaultFormatterOptions": {
    "prettier": {
        "semi": false,          // 不加分号
        "singleQuote": true,    // 使用单引号
        "trailingComma": "none" // 禁止随时添加逗号
    }
}
```

## 编译脚本报错【此系统禁止运行脚本】

需要管理员权限运行 vscode 然后终端执行`set-ExecutionPolicy RemoteSigned`即可

## 自定义用户代码片段

> 文件 -- 首选项 -- 用户片段 新建代码片段
> 代码片段存在`C:\Users\userNameNone\AppData\Roaming\Code\User\snippets`目录下

```json
{
  "Print to console": {
    "scope": "javascript,typescript", // 触发语言 .vue .php 需要去掉此选项
    "prefix": "clog", // 代码片段名字
    "body": [
      // 代码内容
      "console.log(678, '-->>> 678 $1')" // $1 生成代码后光标的初始位置. 还可以有$2,$3...
    ],
    "description": "console.log debug" // 片段简介
  }
}
```

> 注意：body 里面是数组，数组每一项代表一行
> 多行示例:

```json
{
  "body": ["console.log(678, '-->>> 678 $1')", "console.log(123, '-->>> 123 $2')"]
}
```
