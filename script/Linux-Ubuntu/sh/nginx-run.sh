#!/bin/sh
echo "start mynginx -->> 9527:80";
docker run -d -p 9527:80 -v /home/lijinbo/work-diary/dist/public:/usr/share/nginx/html nginx;