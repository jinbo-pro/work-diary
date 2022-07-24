## 使用

```html
<button @contextmenu="(e) => $refs.rightDom.open(e)">打开右键菜单</button>
<RightMenus ref="rightDom">
  <ul>
    <li>111</li>
    <li>222</li>
    <li>333</li>
  </ul>
</RightMenus>
```

[RightMenus.vue](./RightMenus.vue)
