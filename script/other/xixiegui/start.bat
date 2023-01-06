@echo off

echo 打开 chrome.exe
ping -n 3 127.1>nul
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "http://localhost:9500"

cmd /c %nodevars%&&node server.js

