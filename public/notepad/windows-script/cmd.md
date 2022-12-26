[toc]

## 常用指令

```batch
:: 进入到某目录
cd
:: 查看目录
dir
:: 清屏
cls
:: 打印文件夹目录树
tree
:: 打印目录树含文件
tree /f
:: 打印目录树含文件，输出到1.txt文件
tree /f >>1.txt
:: 显示ip连接信息
ipconfig /all
:: win10查看激活时间
slmgr.vbs -dlv
```

## 打开软件示例

```batch
:: 声明编码格式为UTF-8
@echo off
chcp 65001
echo 打开 360浏览器【(*^_^*)】
:: 延时
ping -n 3 127.1>nul
:: 打开软件
:: 如果文件路径中没有空格可以直接写为start C:\Users\aaa.exe，但是有空格就会报错，所以直接统一写为带引号的方式
echo 打开 Code.exe
ping -n 3 127.1>nul
start "" "C:\Users\userNameNone\AppData\Local\Programs\Microsoft VS Code\Code.exe"

echo 打开 chrome.exe
ping -n 3 127.1>nul
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe"

echo 打开 chrome.exe 并进入指定网址
ping -n 3 127.1>nul
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "https://www.baidu.com"

pause
```

## 自动运行项目

```batch
@echo off
d:
cd lijinbodata/mypoject/deer
cmd /c %nodevars%&&npm run dev
```

## 关机

```batch
shutdown -s -t 5
```

> -s 关机
> -t xxx 指定时间后关机（秒）
> shutdown /? 查看其他指令

## 重启桌面程序

ctrl+alt+. 打开控制面板运行新任务 explorer.exe 重启桌面程序即可
