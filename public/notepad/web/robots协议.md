# robots 协议

robots.txt 放在服务器根目录下，用来告诉搜索引擎该网站下的哪些内容可以爬取、收录，哪些内容不可以爬取和收录

这只是一种相互的约定，当然你也可以无视这个约定

常用配置

```python
# 禁止所有搜索引擎抓取整个网站
User-agent: *
Disallow: /

# 禁止所有搜索引擎抓取某一目录及其内容
# 禁止抓取的目录字符串可以出现在路径中的任何位置，
# 因此 Disallow: /junk/ 与 https://example.com/junk/
# 和 https://example.com/for-sale/other/junk/ 均匹配。
User-agent: *
Disallow: /calendar/
Disallow: /junk/
Disallow: /books/fiction/contemporary/

# 只有 googlebot-news 可以抓取整个网站。
User-agent: Googlebot-news
Allow: /
User-agent: *
Disallow: /

# Unnecessarybot 不能抓取相应网站，所有其他漫游器都可以。
User-agent: Unnecessarybot
Disallow: /
User-agent: *
Allow: /

# 禁止所有搜索引擎抓取 useless_file.html 网页。
User-agent: *
Disallow: /useless_file.html

# 禁止访问 dogs.jpg 图片。
User-agent: Googlebot-Image
Disallow: /images/dogs.jpg


# 禁止 Google 图片访问您网站上的所有图片(如果无法抓取图片和视频，则 Google 无法将其编入索引。)
User-agent: Googlebot-Image
Disallow: /

# 禁止谷歌抓取所有 .gif 文件。
User-agent: Googlebot
Disallow: /*.gif$

# 禁止抓取整个网站，但允许 Mediapartners-Google 访问内容
User-agent: *
Disallow: /
User-agent: Mediapartners-Google
Allow: /

# 禁止谷歌抓取所有 .xls 文件。
User-agent: Googlebot
Disallow: /*.xls$

```
