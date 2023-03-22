# 概述

【[Docker 最新超详细版教程通俗易懂](https://www.bilibili.com/video/BV1og4y1q7M4?p=1)】

# 简介

docker 将环境和代码一起打包运行， 类似于虚拟机的机制，只是他比虚拟机要轻量一些

vm 虚拟机，模拟一台电脑会模拟他的软件和硬件等，这样就比较笨重

docker 就只是把 电脑的核心程序模拟，然后在和代码的环境一起打包成一个镜像，所以这样就比较轻便小巧

# 安装

输入`curl -sSL https://get.daocloud.io/docker | sh`即可执行安装命令自动安装了，超级简单

输入`docker version`即可查看是否安装成功

输入`docker run hello-world`运行 hello-world 示例，检测是否能够正常运行

# 卸载

`sudo rm -rf /var/lib/docker`即可

# 基本命令

### 镜像

`docker images`查看已安装的镜像列表

`docker search [name]` 在 dockerhub 上搜索镜像

`docker pull [name]:[tag]`下载镜像 tag 是镜像版本， 不写 :tag 则默认下载 latest，最后一个版本

`docker rmi -f [id]`删除指定 id 的 docker 镜像

`docker rmi -f $(docker images -aq) `删除所有的 docker 镜像[慎用]

### 容器

`docker run -it [name] /bin/bash`通过镜像创建容器并进入容器

`exit`退出并停止运行容器

`ctrl + p + q`仅退出容器返回主机

`docker ps`查看正在运行的容器列表

`docker ps -a`查看历史运行的容器列表

`docker exec -it [id] /bin/bash`进入指定 id 的容器，新开交互窗口

`docker attach [id]`进入指定 id 的容器，进入正在执行的窗口

`docker rm [id]`删除指定 id 的 docker 容器，不能删除正在运行的

`docker rm -f $(docker ps -aq) `删除所有的 docker 容器

`docker start [id]`启动容器

`docker stop [id]`关闭容器

## 其他命令

### 容器信息

`docker inspect id`查看容器的运行详情

`docker stats`查看容器运行内存，任务管理器

### 从容器中拷贝文件到主机

`docker cp [id]:[容器路径] [主机路径]`拷贝文件

# 实例

## 测试 nginx

```shell
docker pull nginx	# 下载nginx
docker run -d --name nginx01 -p 9527:80 nginx	# 后台启动 nginx 设置默认端口映射为9527
curl localhost:9527 # 访问一下即可看到 Welcome to nginx!页面
```

`-p [主机端口]:[容器端口]`-p 指定端口映射
