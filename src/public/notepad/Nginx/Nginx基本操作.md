# Nginx

[toc]

## 安装 Nginx

下载【[地址](http://nginx.org/en/download.html)】

## Windows

打开 cmd 到 Nginx 安装目录输入输入命令 nginx.exe 或者 start nginx ，回车即可

- 检测是否启动成功

  - 直接在浏览器地址栏输入网址 http://localhost:80，回车，出现以下页面说明启动成功

  - 在控制台输入 tasklist /fi "imagename eq nginx.exe" 出现如下内容说明启动成功

    ```js
    映像名称                       PID 会话名              会话#       内存使用
    ========================= ======== ================ =========== ============
    nginx.exe                     9960 Console                    1      8,112 K
    nginx.exe                    12740 Console                    1      8,280 K
    ```

- 重新加载配置文件

  当我们修改了 nginx 的配置文件 nginx.conf 时，不需要关闭 nginx 后重新启动 nginx

  只需要执行命令 nginx -s reload 即可让改动生效

- 关闭 Nginx

  输入 nginx 命令 nginx -s stop(快速停止 nginx) 或 nginx -s quit(完整有序的停止 nginx)

## 配置文件

nginx 的配置文件是 conf 目录下的 nginx.conf，默认配置的 nginx 监听的端口为 80，如果 80 端口被占用可以修改为未被占用的端口即可

```powershell
# user  nobody;                               # 用户操作权限
worker_processes  1;				        # 操作系统启动多少个工作进程运行Nginx
# error_log  logs/error.log  info;	            # 制定日志路径，级别。这个设置可以放入全局块，http 块，server 块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
# pid        logs/nginx.pid;			        # 指定nginx进程运行文件存放地址
events {
	accept_mutex on;                        # 设置网路连接序列化，防止惊群现象发生，默认为on
    multi_accept off;                       # 设置一个进程是否同时接受多个网络连接，默认为off
    # use epoll;                              # 事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    worker_connections  1024;		        # 每个进程最大连接数
}

http {
    include       mime.types;				# 文件扩展名与文件类型映射表
    default_type  application/octet-stream;	# 默认文件类型，默认为 text/plain
    # access_log off; 						# 服务日志开关off|on
    # access_log log/access.log myFormat;     # combined 为日志格式的默认值
        # 自定义格式
    # log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for';
    sendfile        on;                     # 允许 sendfile 方式传输文件，默认为off，可以在http块，server块，location块。
    # sendfile_max_chunk 0;                   # 每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
    keepalive_timeout  35;                  # 连接超时时间，默认为75s，可以在http，server，location块。
    # gzip  on;                               # 是否开启 gzip

        # 负载均衡配置 weight 表示访问权重，数值越大访问得越多 注意：服务器地址不能加 http:// 前缀否则无法访问
        # 注意负载均衡配置完成后要修改代理的地址为 proxy_pass http://deer_server/;
    upstream deer_server {
        server 192.168.2.98:8899 weight=5;
        server 192.168.2.98:8900 weight=3;
    }

    # 服务器1 localhost:9527
    server {
        # keepalive_requests 120;             # 单连接请求上限次数。
        listen       9527;					# 端口号
        server_name  localhost;				# 服务器地址
        # location  ~*^.+$ {                  # 请求的 url 过滤，正则匹配，~为区分大小写，~*为不区分大小写。
        location / {						# 请求 url
            root   html;					# 根目录
            index  index.html index.htm;	# 默认页面 （输入index.html 或 index.htm） 均可访问
            # proxy_pass  http://mysvr;       # 请求转向 mysvr 定义的服务器列表
            # deny 127.0.0.1;                 # 拒绝的ip
            # allow 172.18.5.54;              # 允许的ip
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {				# 错误页面
            root   html;
        }
	}

	# 服务器2 localhost:9500
    server {
        listen       9500;
        server_name  localhost;
        location / {
            root   static;
            index  test.html;
        }
        # 请求代理配置 通过该配置，访问nginx地址 http://localhost:9500/deer 的请求会被转发到 http://192.168.2.98:8899。
        location /deer/ {
            proxy_pass http://deer_server/;    # 添加 / 则会访问 http://192.168.2.98:8899
            # proxy_pass http://192.168.2.98:8899;     # 不加 / 则会访问 http://192.168.2.98:8899/deer
                # 设置代理头
            proxy_set_header   Host    $host;
            proxy_set_header   X-Real-IP   $remote_addr;
            proxy_set_header   REMOTE-HOST $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```
