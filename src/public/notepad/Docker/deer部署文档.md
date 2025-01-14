## 基本操作

1. ssh 登录 Linux

```shell
ssh root@101.43.48.73
输入密码
```

> 如果出现如下错误
> @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
> @ WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! @
> @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
> 说明之前连接过该服务器，但是服务器重置或密码修改了，需要先清除连接指纹
> 打开 `C:\Users\lijin\.ssh\known_hosts` 文件 清除对应 ip 的指纹即可 2. 安装 docker
> 执行如下命令即可自动安装 docker

```shell
curl -sSL https://get.daocloud.io/docker | sh
```

3. 输入`docker version`即可查看是否安装成功
4. 输入`service docker start`启动 docker 服务
5. 安装 node 镜像 `docker pull node`
6. 创建 deerinit 容器 用于初始化 node_modules

```shell
docker run -it --name deerinit -v /home/lijinbo/deer:/home/deer node /bin/bash
```

7. 进入容器 `/home/deer` 执行 `npm i` 初始化 node_modules ， 完成后执行 `exit` 退出容器
8. 创建并后台 deer 容器服务

```shell
docker run -d -p 39003:8899 --name deer -v /home/lijinbo/deer:/home/deer node /bin/bash -c "cd home/deer;npm run start"
```

9. 删除 deerinit 容器
10. 浏览器访问 `http://101.43.48.73:39003` 查看服务器是否正常运行

## 辅助命令

```shell
# 查看已使用的应用端口
netstat -nultp

# 查看正在运行的程序
top

# 查看容器运行内存，任务管理器
docker stats
```
