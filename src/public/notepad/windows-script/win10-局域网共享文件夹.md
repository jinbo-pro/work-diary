## 简介

windows 局域网共享文件夹可以快速传输文件，非常的方便

## 设置共享

1. 打开文件管理器，找到需要共享的文件夹例如 `E:\web`
2. 右键选择 `属性 -> 共享`
3. 添加用户，一般选择 Everyone 即所有用户都可以访问，然后设置读写权限
4. 等待几分钟后即可看到设置好共享了

## 访问共享文件夹

其他局域网的电脑按 win + R 运行 `\\共享电脑名\web` 示例： `\\LIJINBO-LXR7000\test`
然后输入共享电脑的登录账号密码就可以了
账号可以到 `C:\Users` 里看到，密码就是开机密码

> 如果没有权限打开共享网络就打开我的电脑，此电脑下面有个网络，然后点击一下它会自动提示你设置一下即可

## 查看和关闭共享

右键 `win -> 计算机管理 -> 共享文件夹 -> 共享` 里面就可以看到共享的文件夹
进入共享的文件夹点击属性就可以设置关闭共享
