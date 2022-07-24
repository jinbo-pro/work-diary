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