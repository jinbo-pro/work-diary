[toc]

[详细借鉴](https://q.shanyue.tech/engineering/757.html)

browserslist (opens new window)用特定的语句来查询浏览器列表，如 last 2 Chrome versions。

# 一些常用的查询语法

## 根据用户份额:

- `> 5%`: 在全球用户份额大于 5% 的浏览器
- `> 5% in CN`: 在中国用户份额大于 5% 的浏览器

## 根据最新浏览器版本

- `last 2 versions`: 所有浏览器的最新两个版本
- `last 2 Chrome versions`: Chrome 浏览器的最新两个版本

## 不再维护的浏览器

- `dead`: 官方不在维护已过两年，比如 IE10

## 浏览器版本号

- `Chrome > 90`: Chrome 大于 90 版本号的浏览器
