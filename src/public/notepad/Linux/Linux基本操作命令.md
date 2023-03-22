## 系统信息

- arch 显示机器的处理器架构
- uname -m 显示机器的处理器架构
- uname -r 显示正在使用的内核版本
- dmidecode -q 显示硬件系统部件 - (SMBIOS / DMI)
- hdparm -i /dev/hda 罗列一个磁盘的架构特性
- hdparm -tT /dev/sda 在磁盘上执行测试性读取操作
- cat /proc/cpuinfo 显示 CPU info 的信息
- cat /proc/interrupts 显示中断
- cat /proc/meminfo 校验内存使用
- cat /proc/swaps 显示哪些 swap 被使用
- cat /proc/version 显示内核的版本
- cat /proc/net/dev 显示网络适配器及统计
- cat /proc/mounts 显示已加载的文件系统
- lspci -tv 罗列 PCI 设备
- lsusb -tv 显示 USB 设备
- date 显示系统日期
- cal 2007 显示 2007 年的日历表
- date 041217002007.00 设置日期和时间 - 月日时分年.秒
- clock -w 将时间修改保存到 BIOS

## 关机 (系统的关机、重启以及登出 )

- shutdown -h now 关闭系统
- init 0 关闭系统
- telinit 0 关闭系统
- shutdown -h hours:minutes & 按预定时间关闭系统
- shutdown -c 取消按预定时间关闭系统
- shutdown -r now 重启
- reboot 重启
- logout 注销

## 文件和目录

- cd /home 进入 '/ home' 目录'
- cd .. 返回上一级目录
- cd ../.. 返回上两级目录
- cd 进入个人的主目录
- cd ~user1 进入个人的主目录
- cd - 返回上次所在的目录
- pwd 显示工作路径
- ls 查看目录中的文件
- ls -F 查看目录中的文件
- ls -l 显示文件和目录的详细资料
- ls -a 显示隐藏文件
- ls _[0-9]_ 显示包含数字的文件名和目录名
- tree 显示文件和目录由根目录开始的树形结构
- lstree 显示文件和目录由根目录开始的树形结构
- mkdir dir1 创建一个叫做 'dir1' 的目录'
- mkdir dir1 dir2 同时创建两个目录
- mkdir -p /tmp/dir1/dir2 创建一个目录树
- rm -f file1 删除一个叫做 'file1' 的文件'
- rmdir dir1 删除一个叫做 'dir1' 的目录'
- rm -rf dir1 删除一个叫做 'dir1' 的目录并同时删除其内容
- rm -rf dir1 dir2 同时删除两个目录及它们的内容
- mv dir1 new_dir 重命名/移动 一个目录
- cp file1 file2 复制一个文件
- cp dir/\* . 复制一个目录下的所有文件到当前工作目录
- cp -a /tmp/dir1 . 复制一个目录到当前工作目录
- cp -a dir1 dir2 复制一个目录
- cp -r dir1 dir2 复制一个目录及子目录
- ln -s file1 lnk1 创建一个指向文件或目录的软链接
- ln file1 lnk1 创建一个指向文件或目录的物理链接
- touch -t 0712250000 file1 修改一个文件或目录的时间戳 - (YYMMDDhhmm)

## 文件搜索

- find / -name file1 从 '/' 开始进入根文件系统搜索文件和目录
- find / -user user1 搜索属于用户 'user1' 的文件和目录
- find /home/user1 -name \*.bin 在目录 '/ home/user1' 中搜索带有'.bin' 结尾的文件
- find /usr/bin -type f -atime +100 搜索在过去 100 天内未被使用过的执行文件
- find /usr/bin -type f -mtime -10 搜索在 10 天内被创建或者修改过的文件
- find / -name \*.rpm -exec chmod 755 '{}' \; 搜索以 '.rpm' 结尾的文件并定义其权限
- find / -xdev -name \*.rpm 搜索以 '.rpm' 结尾的文件，忽略光驱、捷盘等可移动设备

## 打包和压缩文件

- bunzip2 file1.bz2 解压一个叫做 'file1.bz2'的文件
- bzip2 file1 压缩一个叫做 'file1' 的文件
- gunzip file1.gz 解压一个叫做 'file1.gz'的文件
- gzip file1 压缩一个叫做 'file1'的文件
- gzip -9 file1 最大程度压缩
- rar a file1.rar test_file 创建一个叫做 'file1.rar' 的包
- rar a file1.rar file1 file2 dir1 同时压缩 'file1', 'file2' 以及目录 'dir1'
- rar x file1.rar 解压 rar 包
- unrar x file1.rar 解压 rar 包
- tar -cvf archive.tar file1 创建一个非压缩的 tarball
- tar -cvf archive.tar file1 file2 dir1 创建一个包含了 'file1', 'file2' 以及 'dir1'的档案文件
- tar -tf archive.tar 显示一个包中的内容
- tar -xvf archive.tar 释放一个包
- tar -xvf archive.tar -C /tmp 将压缩包释放到 /tmp 目录下
- tar -cvfj archive.tar.bz2 dir1 创建一个 bzip2 格式的压缩包
- tar -jxvf archive.tar.bz2 解压一个 bzip2 格式的压缩包
- tar -cvfz archive.tar.gz dir1 创建一个 gzip 格式的压缩包
- tar -zxvf archive.tar.gz 解压一个 gzip 格式的压缩包
- tar -xzvf dist.tar.gz --strip-components 1 -C oa 解压 dist 目录取出 d 内层文件到 oa 文件夹
- zip file1.zip file1 创建一个 zip 格式的压缩包
- zip -r file1.zip file1 file2 dir1 将几个文件和目录同时压缩成一个 zip 格式的压缩包
- unzip file1.zip 解压一个 zip 格式压缩包

## APT 软件工具 (Debian, Ubuntu 以及类似系统)

- apt-get install package_name 安装/更新一个 deb 包
- apt-cdrom install package_name 从光盘安装/更新一个 deb 包
- apt-get update 升级列表中的软件包
- apt-get upgrade 升级所有已安装的软件
- apt-get remove package_name 从系统删除一个 deb 包
- apt-get check 确认依赖的软件仓库正确
- apt-get clean 从下载的软件包中清理缓存
- apt-cache search searched-package 返回包含所要搜索字符串的软件包名称

## 应用管理

- netstat -nultp 查看已使用的应用端口

## 用户管理

- 新建用户

sudo useradd -m aaa
新建用户名 aaa
-m: 自动建立用户的登入目录

sudo passwd aaa
设置用户 aaa 的密码

sudo userdel -r aaa
删除用户 aaa

- 查看用户
  权限
  sudo cat /etc/sudoers
  所有信息
  sudo cat /etc/passwd
