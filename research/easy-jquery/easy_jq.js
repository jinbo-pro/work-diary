; (function (window) {
    // Jquery类
    function Jquery(selector) {
        // 存储获取的dom
        this.elements = [];
        // id选择器
        if (selector.charAt(0) == "#") {
            this.elements.push(document.getElementById(selector.substr(1)));
        }
        // class选择器
        if (selector.charAt(0) == ".") {
            this.elements = document.getElementsByClassName(selector.substr(1));
        }
    }

    // css方法
    Jquery.prototype.css = function (attr, val) {
        if (typeof attr == 'string' && typeof val == 'string') {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].style[attr] = val;
            }
        }
        if (typeof attr == 'object') {
            for (var i = 0; i < this.elements.length; i++) {
                for (key in attr) {
                    this.elements[i].style[key] = attr[key];
                }
            }
        }
        return this;
    }

    // 事件处理
    Jquery.prototype.on = function (eventName, fn) {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].addEventListener(eventName, fn)
        }
    }

    // 实例输出
    function $(selector) {
        // ...
        return new Jquery(selector)
    }
    window.$ = $
})(window);