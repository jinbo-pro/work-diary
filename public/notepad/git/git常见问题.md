# 常见问题处理

- 提交时 eslint 检测不通过 可删除以下文件然后提交
  .git\hooks\pre-commit
- 新建.gitignore 发现无效，需清除 git 缓存(注意后面有个点)
  git rm -r --cached .
- 使用 git 时账号密码输错了怎么办
  如果账户或密码输错只能手动在电脑设置中的【管理凭据】中进行清除然后重新输入
- git 总是需要输入账号密码
  加上用户本地凭证用于记录密码
  git config --global credential.helper store

# .gitignore 文件配置说明

> 以 / 开头表示根目录,防止递归
> 以 / 结尾表示指定目录
> 以 ! 开头表示不过滤（跟踪）此项配置匹配到的文件或目录
> 以 # 开头表示注释，如需转义在前面加斜杠，/#
>
> #常用配置 说明
>
> #忽略 node_modules 文件夹
> node_modules/
>
> #仅在当前目录下忽略 TODO 文件，但不包括子目录下的
> /TODO
>
> #忽略所有的.log 日志文件
> \*.log
>
> #前面忽略所有的.log 日志文件，但是保留 error.log 文件
> !error.log
>
> #忽略 doc 下的.txt, 不包括子级目录下的.txt 文件
> `doc/*.txt`
>
> #忽略 doc 下的.pdf, 包括所有子级目录下的.pdf 文件
> `doc/**/*.pdf`
>
> #匹配多个字符忽略，类似正则，忽略 test1.js~test9.js
> `*test[0-9].js`
