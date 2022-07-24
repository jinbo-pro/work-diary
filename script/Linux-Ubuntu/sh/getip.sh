#!/bin/sh
ip a|grep inet|grep -v 127.0.0.1|grep -v inet6|awk '{print $2}'|tr -d "addr:";

# ip a  　　　　 		和window下执行此命令一样道理，返回本机所有ip信息
# grep inet             截取包含ip的行
# grep -v 127.0.0.1     去掉本地指向的那行
# grep -v inet6         去掉包含inet6的行
# awk {print $2}        $2 表示默认以空格分割的第二组 同理 $1表示第一组​
# tr -d "addr:          删除"addr:"这个字符串