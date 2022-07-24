#!/bin/bash
# 配置

# 清除其他文件
ls|grep -v "\(parse-tar.sh\|dist.tar.gz\)" |xargs rm -rf
# 解压文件
tar -xzvf dist.tar.gz
# 移动文件
cd "./dist"
for dir in $(ls)
do
    mv $dir "../${dir}"
done
cd "../"
# 删除dist文件夹
rmdir dist
# 删除线上压缩包
rm -f dist.tar.gz
echo 部署完成