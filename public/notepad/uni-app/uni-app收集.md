[toc]

# uni-app 收集

## app 获取 mac 地址

```js
const net = plus.android.importClass('java.net.NetworkInterface')
const wl0 = net.getByName('wlan0')
const macByte = wl0.getHardwareAddress()
const list = macByte.map((e) => (e < 0 ? 256 + e : e))
const str = list.map((n) => n.toString(16)).join('-')
console.log('mac', str)
```
