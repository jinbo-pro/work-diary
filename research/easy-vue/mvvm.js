//双向数据绑定核心

function EasyVue(options) {//ps:vm是Vue的实例
    this.$options = options; //将配置对象保存到vm中
    var data = this._data = this.$options.data; //将data对象保存到vm和变量data中
    var _this = this; //保存vm到变量_this
    //遍历data中所有的属性
    Object.keys(data).forEach(function (key) { //key是data的属性名,键值对里面的键
        _this._proxy(key);
    })

    //keys()方法是取出对象的属性名,保存为数组形式
    // var obj = {
    //     'a': '123',
    //     'b': '345'
    // };
    // console.log(Object.keys(obj)); //['a','b']

    //对data中所有层次的属性通过数据劫持实现数据绑定
    observe(data, this);//创建dep

    //创建一个编译对象(解析模板)
    this.$compile = new Compile(options.el || document.body, this);//创建watcher

}
EasyVue.prototype = {
    constructor: EasyVue,
    /* 
     @method 实现指定属性代理的方法 
     @param key:属性名 
    */
    _proxy: function (key) {
        var _this = this;
        //给vm添加指定属性名的属性(使用的是属性描述符)
        Object.defineProperty(_this, key, {
            configurable: false,//不能重新定义
            //官方定义:表示能否通过delete删除此属性，能否修改属性的特性，或能否修改把属性修改为访问器属性，默认为 false。如果直接使用字面量定义对象，默认值为true

            enumerable: true,//枚举,就是遍历,循环
            //官方定义:表示该属性是否可枚举，即是否通过for-in循环或Object.keys()返回属性，默认为 false。如果直接使用字面量定义对象，默认值为true

            get: function () {//当通过vm.xxx读取属性值时调用,从data中获取相对应的属性值放回  代理读操作
                return _this._data[key];
            },
            //官方定义:一个给属性提供 getter 的方法(访问对象属性时调用的函数,返回值就是当前属性的值)，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined

            set: function (newValue) {//当通过vm.xxx = value时,value被保存到data中对应的属性上 代理写操作
                _this._data[key] = newValue;
            }
            //官方定义:一个给属性提供 setter 的方法(给对象属性设置值时调用的函数)，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined
        })
    }
}