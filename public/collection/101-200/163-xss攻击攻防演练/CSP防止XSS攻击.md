[toc]

参考文档
[Content Security Policy 入门教程](http://www.ruanyifeng.com/blog/2016/09/csp.html)

# 启用 CSP 的两种方式

## 通过 HTTP 头信息的 Content-Security-Policy 的字段。

```js
Content-Security-Policy: script-src 'self'; object-src 'none';
style-src cdn.example.org third-party.org; child-src https:
```

## 通过网页的<meta>标签。

```html
<meta
  http-equiv="Content-Security-Policy"
  content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:"
/>
```

上面代码中 CSP 做了如下配置

- 脚本：只信任当前域名
- `<object>`标签：不信任任何 URL，即不加载任何资源
- 样式表：只信任 cdn.example.org 和 third-party.org
- 框架（frame）：必须使用 HTTPS 协议加载
- 其他资源：没有限制

## 配置参数

- script-src：外部脚本
- style-src：样式表
- img-src：图像
- media-src：媒体文件（音频和视频）
- font-src：字体文件
- object-src：插件（比如 Flash）
- child-src：框架
- frame-ancestors：嵌入的外部资源（比如`<frame>、<iframe>、<embed>和 <applet>`）
- connect-src：HTTP 连接（通过 XHR、WebSockets、EventSource 等）
- worker-src：worker 脚本
- manifest-src：manifest 文件

## 常用配置

```html
<meta
  http-equiv="Content-Security-Policy"
  content="script-src https://lib.baomitu.com; object-src 'none'; child-src https:"
/>
```

js 加载自己的和 `https://lib.baomitu.com` 的
css 加载自己的
