## 常用操作

1. 创建容器

```shell
# 根据 node 镜像创建容器 deer
docker run -d -p 39003:8899 --name deer -v /home/lijinbo/deer:/home/deer node /bin/bash -c "cd home/deer;npm run start"

# 根据 node 镜像创建容器 work
docker run -d -p 39006:7586 --name work -v /home/lijinbo/work-diary:/home/work node /bin/bash -c "cd home/work;node app/index.js"
```

参数说明

`-d` 后台运行

`-p 39003:8899` 指定主机的 39003 端口与容器的 8899 端口映射

`--name deer` 创建的容器命名为 deer

`-v /home/lijinbo/deer:/home/deer` 设置主机文件夹/home/lijinbo/deer 与容器文件夹/home/deer 映射

`-c "cd home/deer;npm run start"`进入容器内部执行应用启动命令

2. 进入和退出容器

```shell
# 进入容器
docker exec -it deer /bin/bash # 进入deer容器，新开交互窗口
docker attach deer # 进入deer容器，进入正在执行的窗口
# 退出容器
exit # 退出并停止运行容器
ctrl + p + q # 仅退出容器返回主机
```

3. 停止和启动容器

```shell
# 启动容器
docker start deer
# 重启容器
docker restart deer
# 停止容器
docker stop deer
```

# 容器数据卷

将容器的数据挂载到宿主机上， 这样容器删除了， 数据也不会删除， 就是容器和宿主机共享文件夹

优势：数据安全， 更新方便

```shell
docker run -it -p 7586:7586 -v /home/lijinbo/work-diary:/home/work-diary node /bin/bash
```

`-v [主机文件夹]:[容器文件夹]`命令指定主机和容器的共享文件夹

> 注意：主机和容器都可以操作共享文件夹，可以理解为他们两个的操作指向的是同一个文件夹，所以不要乱删哦

# Dockerfile

dockerfile 是用来构建 docker 镜像的文件

## 指令

- FROM 设置镜像使用的基础镜像
- MAINTAINER 设置镜像的作者
- RUN 编译镜像是运行的脚本

![img](https://img2018.cnblogs.com/blog/450977/201905/450977-20190512115951746-136143052.png)

例子， 创建一个 centos

```dockerfile
# 设置基础镜像 centos
FROM centos
# 设置作者和邮箱
MAINTAINER lijinbo<lijinbode@foxmail.com>
# 设置环境变量目录
ENV MYPATH /usr/local
# 设置工作路径
WORKDIR $MYPATH
# 安装 vim 编辑器
RUN yum -y install vim
# 安装 网络工具
RUN yum -y install net-tools
# 对外暴露端口
EXPOSE 80
# 指定容器启动后的操作
CMD /bin/bash
```

然后构建 dockerfile 执行命令 `docker build -f [dockerfile名字] -t [生成的镜像名]:[tag] .` 注意后面有个点

> CMD 和 ENTRYPOINT 的区别
>
> CMD # 指定容器启动的时候要运行的命令，只有最有一个有效可能被代替
>
> ENTRYPOINT # 指定容器启动的时候要运行的命令，可以追击命令
