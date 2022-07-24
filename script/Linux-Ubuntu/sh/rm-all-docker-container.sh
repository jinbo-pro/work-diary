#!/bin/bash

read -p "确认清除所有 docker 容器吗(y/n)?" a

case $a in

([Yy])

echo 'yes'
docker rm -f $(docker ps -aq)

;;

([Nn])

echo 'no'

;;

(*)

echo 'others'

esac