# 安装

## 系统安装

Linux 常用的有 centos 和 Ubuntu 两个系统，这里以安装 Ubuntu 为例，centos 类似

- 进入下载页【[ubuntu](https://cn.ubuntu.com/download/server/step1)】下载系统
- 安装， 找台新电脑或者开个虚拟机，直接安装镜像即可， 官方的安装包很友好，直接一直点 done 就可以了

## 基本配置

### 开启 root 账户

不要问为什么， 刚开始很多操作都需要 root 账户， 但是不要随便删系统中的文件就行哈哈

在 ubuntu 中 root 用户的密码是随机的，所以需要我们自己起设置 root 用户的密码

在终端命令行中执行

```powershell
sudo passwd
```

然后设置 root 的密码就可以切换到 root 登录了

```powershell
su root
```

> 开启 ssh 远程登录
>
> 进入 /etc/ssh/sshd_config 将 PermitRootLogin 设置为 yes
>
> 然后就可以 ssh root@<ip> 进行连接了

### 配置国内镜像源地址

> 国内环境嘛 都懂的 ， 访问官方地址总是卡得很
>
> 修改 `/etc/apt/sources.list` 地址 然后执行 `sudo apt-get update`更新一下即可
>
> - [阿里云镜像开源社区镜像站](https://developer.aliyun.com/mirror/)
> - [网易开源镜像站](http://mirrors.163.com/.help/ubuntu.html)
> - [清华大学开源镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)

### git 配置

> - 设置账号和邮箱
>
>   输入指令`git config --global user.name "name"`和 `git config --global user.email "email"`
>
> - 设置记住密码
>
>   git config --global credential.helper store

## 安装软件

### nodejs 安装方式 1

首先安装个 nodejs 前端综合开发必备哈哈

```powershell
sudo apt-get install nodejs
sudo apt-get install npm
```

如果要安装最新的 nodejs 输入如下命令即可

```powershell
1.产看node版本，没安装的请先安装；

$  node -v

2.清除node缓存；

$  sudo npm cache clean -f

3.安装node版本管理工具'n';

$  sudo npm install n -g

4.使用版本管理工具安装指定node或者升级到最新node版本；

$  sudo n stable  （安装node最新版本）

$  sudo n 8.9.4 （安装node指定版本8.9.4）

5.使用node -v查看node版本，如果版本号改变为你想要的则升级成功。
```

当然了 npm 都安装了，那设置镜像地址也是必不可少的了

设置 npm 国内镜像地址，执行命令`npm config set registry https://registry.npm.taobao.org`

### nodejs 安装方式 2(推荐)

1. 下载
   打开 nodejs 官网下载 Linux Binaries (x64) [nodejs](https://nodejs.org/en/download/)
2. 上传到服务器
   将下载好的 node-v18.14.2-linux-x64.tar.xz 上传到服务器
3. 加压文件
   执行 `tar -xvf node-v18.14.2-linux-x64.tar.xz` 加压文件
4. 将解压的 node 文件进行重命名，方便后续的操作
   `mv node-v18.14.2-linux-x64 nodejs-18`
5. 设置软链接全局引用
   引入 npm
   `ln -sf /home/lijinbo/nodejs/nodejs-18/bin/npm /usr/local/bin`
   引入 node
   `ln -sf /home/lijinbo/nodejs/nodejs-18/bin/node /usr/local/bin`
6. 使用 pm2 管理项目
   - 执行 `npm install -g pm2` 全局安装
   - 执行 `ln -sf /home/lijinbo/nodejs/nodejs-18/bin/pm2 /usr/local/bin` 设置全局引用
   - 进入到项目根目录执行 `pm2 start index.js --watch` 启动项目
   - 执行 `pm2 save` 保存当前配置
   - 后续使用只需要一下几个命令即可
     `pm2 start appName` 启动项目
     `pm2 stop appName` 停止项目
     `pm2 restart appName` 重启项目
     > [更多 pm2 使用参考](https://www.cnblogs.com/kunmomo/p/14990703.html)

### docker

大名鼎鼎的 docker 容器，由于 docker 的环境统一，就有了，管理相当好用，开发异常舒适的优点，不多说了开始安装吧

输入`curl -sSL https://get.daocloud.io/docker | sh`即可执行安装命令自动安装了，超级简单

输入`docker version`即可查看是否安装成功

将当前用户添加到 docker 用户组

- 建立 docker 组：

  `sudo groupadd docker`

- 将当前用户加入 docker 组：

  `sudo usermod -aG docker $USER`

- 重启 docker 服务

  `sudo service docker restart`

- 切换当前会话到新 group 或者重启 X 会话

  `newgrp - docker`
  注意:最后一步是必须的，否则因为 groups 命令获取到的是缓存的组信息，刚添加的组信息未能生效，所以 docker images 执行时同样有错。

好了，这就完了， 剩下的环境配置就直接在 docker 里面搞吧！^\_^
