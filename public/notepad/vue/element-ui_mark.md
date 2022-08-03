[toc]

# 表格

## 二级表格

```html
<!-- 二级表格 -->
<el-table
  :data="tableData"
  row-key="ptId"
  :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  class="cateTable"
>
</el-table>
```

> 需要注意的是报`Error: for nested data item, row-key is required.`【嵌套 row-key 必填】
> 可能是 tree-props 里面的 hasChildren 属性异常
>
> 无语的是可能你刷新一下又好了 o(_￣ ▽ ￣_)o

## 有合并的表头

## 单元格合并

# 表单

## 表单验证

- 常规验证

```html
<el-form :model="formData" :rules="formDataRules" ref="formData" class="demo-formData">
  <el-form-item label="名称" prop="name">
    <el-input v-model="formData.name"></el-input>
  </el-form-item>
</el-form>
```

```js
// 自定义验证方法
 var validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'));
    } else {
        if (this.ruleForm.checkPass !== '') {
        this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
    }
};
// data
formData: {
    name: ''
},
formDataRules: {
    name: [
            { required: true, message: '请输入名称', trigger: 'blur', validator: validatePass },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
}
```

- 表单验证清除
  `this.$refs.formData.clearValidate();`
  新增时清除表单请调用`this.$refs.formData.resetFields()`
- 动态表单验证

> 表单中 `<el-input>` 不能输入的情况
> 使用方法--

# 级联选择器

## 异步加载级联

```html
<el-cascader v-model="activPc" :props="Pcprops" @change="handleChange"></el-cascader>
```

```js
Pcprops: {
    lazy: true,
        lazyLoad: (node, resolve) => {
            console.log(node)   // 节点信息 通过node.data 可以获取添加的节点属性
            this.api("product/category/pclist", {
                parentId: node.value || 0
            }).then(res => {
                let nodes = res.data.map(item => {
                    return {
                        value: item.pcId,
                        label: item.pcName,
                        parentId: item.parentId,
                        leaf: item.hasChildren == 0
                    };
                });
                resolve(nodes);
            });
        }
}
```

## 可多选的级联选择器

- 准备工作
  【[el-cascader-multi github](https://github.com/Charming2015/el-cascader-multi)】

```js
// 安装模块
npm i el-cascader-multi --save
// 引入
import elCascaderMulti from "el-cascader-multi";
Vue.use(elCascaderMulti);
```

- 使用

```html
<template>
  <el-cascader-multi
    :disabled="addAttrForm.isPublic == 1"
    clearable
    v-model="checkList"
    :data="productOptions"
    @change="handleCategoryChange"
    label-key="pcName"
    value-key="pcId"
  ></el-cascader-multi>
</template>
<script>
  export default {
    data() {
      return {
        productOptions: [], // 与element级联选择器格式一致
        checkList: []
      }
    }
  }
</script>
```

- 注意事项
  > - 数据里面的 children 必须为 array 类型，不然组件里面获取不到 length 属性，可以收到数据之前递归处理
  > - 数据双向绑定的类型必须为数组，不能动态改变绑定的类型
  > - 有时会报这个错`[Vue warn]: Invalid prop: type check failed for prop "value". Expected String, Number, got Array `说应该传字符串和数字你传了数组，其实很可能是你的数据里面 children 为空数组，因此它检测不到，建议将空的 children 属性删除
  > - 级联加载器返回是 value 组成的数组，将数组直接赋值可以自动显示对应的层级
  >   组件内部会自动循环遍历，找到对应 value 的 label，多级也是这样，不过它是二维数组
  > - 如果开启了只显示最后一项` :show-leaf-label="true"`，需要注意所有的组后一项名字不能重复，否则会报`[Vue warn]: <transition-group> children must be keyed: <ElTag> `，没有唯一的键

# 文件上传

## 上传图片

- 简单图片

```html
<!-- 文件上传 -->
<el-upload
  accept="image/jpeg, image/gif, image/png"
  :action="actionUrl"
  list-type="picture-card"
  :file-list="imgFileList"
  :on-success="handleCoversSuccess"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleCoversRemove"
>
  <i class="el-icon-plus"></i>
</el-upload>
<!-- 图片预览 -->
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="" />
</el-dialog>
```

```js
// data
dialogImageUrl: '',
dialogVisible: false,
actionUrl: 'https://...',
imgFileList: []

// 数据请求之后，处理成组件适用的格式
// 形如：[{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
 res.data.list.forEach((item, index) => {
        this.imgFileList.push({
        name: index + "jpg",
        url: item
    });
});

// methods
/**
 * 添加图片时是直接将图片信息对象添加到fileList里面的所以fileList里面就有两种数据结构
 * 一种是之前渲染用的，一种是组件添加图片生成的，所以此处要判断，然后将链接取出
 * 【其实上述是由于接口返回问题导致】
*/
// 图片数组【上传】
handleCoversSuccess(res, file, fileList) {
    this.photoList = fileList.map(item =>
        item.response ? item.response.data : item.url
    );
},
// 图片数组【删除】
handleCoversRemove(file, fileList) {
    this.photoList = fileList.map(item =>
        item.response ? item.response.data : item.url
    );
},
// 图片预览
handlePictureCardPreview(file) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
},
```

> 其实解决图片的回显也可以不使用组件自带的`file-lise`可以自己单独写 img 进行循环渲染，然后重写增加和删除方法就可以很好的控制上传的图片和已上传的图片数组，此时也可以配合图片的拖动排序(`vuedraggable`)组件，可以达到更高的使用效果

## 上传视频

> 与上传图片类似，但是需要注意视频的回显

# 分页组件

## 原生 element-ui 分页

```html
<!-- 绑定total 和 page-size就可以响应显示页数和页码 -->
<el-pagination
  background
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  style="margin-top:15px"
  layout="total, prev, pager, next,sizes,jumper"
  :total="pageList.total"
  :page-size="pageList.rowNum"
  :page-sizes="[5, 10, 15, 20]"
></el-pagination>
```

```js
// 生命周期
 created () {
    this.getList()
},
// data
dataList: [],
pageList: {
    total: 10,  // 总条目数
    pageNow: 1, // 页数
    rowNum: 10  // 每页数量
},
// methods
// 获取列表
getList(){
    this.api('baidu', this.pageList).then(res => {
        this.dataList = res.data.list
        this.pageList.total = Number(res.data.total);
    })
},
// 改变参数，再次请求即可
// 分页大小改变
handleSizeChange(val) {
    this.pageList.rowNum = val;
    this.getList();
},
// 分页数改变
handleCurrentChange(val) {
    this.pageList.pageNow = val;
    this.getList();
}
```

## 对原生组件进行二次封装

```html
<Pagination
  style="margin-left:30px;"
  :total="pageList.total"
  :page="pageList.pageNow"
  :limit="pageList.rowNum"
  @pagination="paginationHandle"
/>
```

```js
// 引入
import Pagination from '@/components/Pagination'
// 注册
components: { Pagination },
// 生命周期
 created () {
    this.getList()
},
// data
dataList: [],
pageList: {
    total: 10,  // 总条目数
    pageNow: 1, // 页数
    rowNum: 10  // 每页数量
},
// methods
// 获取列表
getList(){
    this.api('baidu', this.pageList).then(res => {
        this.dataList = res.data.list
        this.pageList.total = Number(res.data.total);
    })
},
// 分页大小 页数改变
paginationHandle(e) {
    this.pageList.pageNow = e.page
    this.pageList.rowNum = e.limit
    this.getList()
}
```

# 更多记录

## 键盘事件

```html
<!-- 键盘事件需要添加修饰符native -->
<el-input
  placeholder="请输入"
  v-model="formInline.searchName"
  clearable
  @keyup.enter.prevent.native="getTagList"
></el-input>
```

> - 问题 1：element-ui 是封装组件所以 el 标签是自定义标签
>
>   解决方案：自定义标签绑定键盘事件需要加上 native 原生事件修饰符
>
> - 问题 2：表单的默认提交是 enter 所以触发了按键事件时会刷新页面
>
>   解决方案：加上 prevent 修饰符取消默认事件

## 弹窗遮罩层点击不关闭

```js
import ElementUI from 'element-ui'
// 修改 el-dialog 默认点击遮照为不关闭
// 测试发现不灵(⊙﹏⊙)而且还报错，说没有这个方法
ElementUI.Dialog.props.closeOnClickModal.default = false
```

- 改用在组件上面添加属性 `:close-on-click-modal="false"` 实现，示例

````html
<el-dialog title="提示" :visible.sync="centerDialogVisible" center :close-on-click-modal="false">
  <span></span>
</el-dialog>
​``` ## vue-element-admin配置文件 - webpack配置获取配置文件 > process.env.VUE_APP_BASE_API
````

## 图片拖动排序

- 安装依赖`npm install vuedraggable`

## 富文本多图

# 动态主题

## 安装依赖

1. 安装 element-ui@2.x

   npm i element-ui

2. 安装 sass-loader，node-sass

   > 注意：安装 node-sass 前要确保 node 版本不高于 10.19.0
   >
   > 否则报`primordials is not defined`的错

   npm i sass-loader node-sass -D

3. 安装 element-theme

   npm i element-theme -D

4. 安装 theme-chalk

   npm i element-theme-chalk -D

5. 初始化变量文件

   node_modules\.bin\et -i

   默认的文件是 element-variables.scss，也可以自定义文件名 et --init [file path]

6. 编译主题

   保存文件后，到命令行里执行 et 编译主题，如果你想启用 watch 模式，实时编译主题，增加 -w 参数；如果你在初始化时指定了自定义变量文件，则需要增加 -c 参数，并带上你的变量文件名

7. 引入自定义主题

   默认情况下编译的主题目录是放在 ./theme 下，你可以通过 -o 参数指定打包目录。像引入默认主题一样，在代码里直接引用 theme/index.css 文件即可。

   ```js
   import '../theme/index.css'
   import ElementUI from 'element-ui'
   import Vue from 'vue'

   Vue.use(ElementUI)
   ```

> 备注：如果只是想切换主题颜色那么就可以使用如下操作快捷替换主题颜色

```vue
<template>
  <el-tooltip effect="dark" content="theme" placement="bottom">
    <el-color-picker v-model="theme" class="theme-picker" size="small" popper-class="theme-picker-dropdown" />
  </el-tooltip>
</template>

<script>
const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF' // default color

export default {
  data() {
    return {
      chalk: '', // content of theme-chalk css
      theme: ORIGINAL_THEME
    }
  },
  watch: {
    theme(val, oldVal) {
      if (typeof val !== 'string') return
      const themeCluster = this.getThemeCluster(val.replace('#', ''))
      const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
      console.log(themeCluster, originalCluster)
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
          const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)

          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            document.head.appendChild(styleTag)
          }
          styleTag.innerText = newStyle
        }
      }

      const chalkHandler = getHandler('chalk', 'chalk-style')

      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
        this.getCSSString(url, chalkHandler, 'chalk')
      } else {
        chalkHandler()
      }

      const styles = [].slice.call(document.querySelectorAll('style')).filter((style) => {
        const text = style.innerText
        return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
      })
      styles.forEach((style) => {
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
      })
      this.$message({
        message: '换肤成功',
        type: 'success'
      })
    }
  },

  methods: {
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },

    getCSSString(url, callback, variable) {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
          callback()
        }
      }
      xhr.open('GET', url)
      xhr.send()
    },

    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }
      }

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }

      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    }
  }
}
</script>
```
