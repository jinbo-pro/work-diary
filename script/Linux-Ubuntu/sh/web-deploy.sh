# 压缩文件
cd "../dist"
echo 压缩部署包
tar cvf production_test.tar.gz production_test

# 上传到服务器
echo 上传文件
scp -r production_test.tar.gz lijinbo@192.168.62.129:/home/lijinbo
 
# 登录到服务器
# 服务器环境开启
ssh lijinbo@192.168.62.129 -tt << EOF
 
# 进入目标目录
cd /home/lijinbo
rm -rf web
mkdir web
# 解压 并取出文件 放到 web 目录下
tar xf production_test.tar.gz --strip-components 1 -C web
# 删除线上压缩包
rm -f production_test.tar.gz

exit
EOF

# 服务器环境结束
echo 上传完成！
echo 删除本地压缩包！
rm -f production_test.tar.gz
