# git

[toc]

## 初始化

### init

git init 初始化

### 设置用户名和邮箱

git config --global user.name "jack"
git config --global user.email "1564677900@qq.com"

### 配置 SSH

1. 打开 git bash。
2. 使用`cd ~/.ssh`可以查看是否已配置 SSH。
3. 执行生成公钥和私钥的命令 ssh-keygen -t rsa 并按回车 3 下（为什么按三下，是因为有提示你是否需要设置密码，如果设置了每次使用 Git 都会用到密码，一般都是直接不写为空，直接回车就好了）。会在一个文件夹里面生成一个私钥 id_rsa 和一个公钥 id_rsa.pub。
4. .ssh 如果不做特殊处理的话，一般是在 C:\Users\Administrator 目录下。如果看不到.ssh 文件，可以使用 ls -ah 指令查看隐藏文件夹即可，这是存放秘钥的文件，打开这个文件会看到 id_rsa 和 id_rsa.pub。id_rsa 是私钥文件，id_rsa.pub 是公钥文件。
5. 执行查看公钥的命令 cat ~/.ssh/id_rsa.pub 。

## 基本操作

### 存文件

- 暂存
  git add ./one.txt 暂存 one.txt
  git add ./ 暂存所有文件
- 存到仓库
  git commit -m "大致说明" 将缓存文件放到仓库
  git commit --all -m "说明" 直接将所有文件文件放到仓库

### 拉取文件

- 克隆
  git clone 地址 将服务器的默认分支下载到本地
  git clone -b login 地址 将服务器的 login 分支下载到本地
- 拉取
  git pull 地址 将服务器的文件下载
- 推送
  推送前要创建远端地址
  git remote add origin https://github.com/xuanhun/vscode.git
  git pull origin master
  origin 是当前 remote 的别名
  git push 地址 master 将 master 分支上传到服务器

### 恢复文件

git reset --hard Head~0 后面的 0 是回退索引
git reset --hard 版本号 回退到指定版本

### 分支

git branch name 创建 name 分支
git branch 查看有哪些分支
git checkout name 切换到 name 分支
git checkout master 切换到默认主分支
git merge name 把当前分支与 name 分支合并

### 日志查询

git status 查询工作区的文件改动情况
git log 查询提交日志，每次都有唯一的版本值
git reflog 查询所有操作日志及版本号
