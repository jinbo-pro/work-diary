## 连接手机调试模拟器

1. 安装夜神模拟器【[官方下载连接](https://www.yeshen.com/)】

2. 打开夜神模拟器

3. 打开夜神模拟器的调试端口

   在`D:\Program Files\Nox\bin`目录下运行`debugReport.bat`即可

4. 进入夜神模拟器目录`D:/Program Files/Nox/bin/`输入` .\adb.exe connect 127.0.0.1:62001`使其连接到电脑

5. 添加 path 环境

   将`D:\app\HBuilderX\plugins\launcher\tools\adbs`添加到 path 环境使其可全局访问

   打开 cmd 输入`adb version`若输出`Android Debug Bridge version 1.0.32`则说明 path 路径添加成功

6. 设置端口

   打开 HBuilderX 的工具->设置->运行配置 将 Android 模拟器端口设置为 62001

7. 设置模拟器 adb 路径

   打开 HBuilderX 的工具->设置->运行配置 将 adb 路径设置为`D:/Program Files/Nox/bin/adb.exe`

8. 连接夜神模拟器

   cmd 继续输入`adb connect 127.0.0.1:62001`使 HBuilderX 连接夜神模拟器的端口

9. 运行到模拟器

   此时可在 HBuilderX 的运行->运行到手机或模拟器看到对应的模拟器信息，点击运行即可
