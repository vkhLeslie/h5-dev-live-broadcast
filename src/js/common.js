/**
 * common Function
 * author: jiajun.he@partner.midea.com
 * createTime: 2017.02.13
 */
/**
 * 常用工具类
 * @export
 * @class 
 */
import platform from '../platform'
import CubeModule from '../../CubeModule.json';
var Rxports = {
    methods: {
        /**
          * @description:全局返回
          * @param 
          * @returns {*}
          */
        goBack: function () {
            window.history.back();
        },
      /**
       * 存储localStorage
       */
        setStore(name, content) {
            if (!name) return;
            if (typeof content !== 'string') {
                content = JSON.stringify(content);
            }
            window.localStorage.setItem(name, content);
        },
        /**
         * 获取localStorage
         */
        getStore(name) {
            if (!name) return;
            return window.localStorage.getItem(name);
        },
        /**
         * 删除localStorage
         */
        removeStore(name) {
            if (!name) return;
            window.localStorage.removeItem(name);
        },
        /**
    * 是否对象
    * @static
    * @param {*} value 值
    * @returns {boolean} 
    * @memberof UtilService
    */
        isObject(value) {
            return value !== null && typeof value === 'object';
        },

        /**
         * 是否数组
         * @static
         * @param {*} value 值
         * @returns {boolean} 
         * 
         * @memberof UtilService
         */
        isArray(value) {
            return Array.isArray(value);
            //return Object.prototype.toString.call(obj) === '[object Array]'; 
        },
        /**
         * 是否未定义
         * @static
         * @param {*} value 值
         * @returns {boolean} 
         * 
         * @memberof UtilService
         */
        isUndefined(value) {
            return typeof value === 'undefined';
        },

        /**
         * 是否字符串
         * @static
         * @param {*} value 
         * @returns {boolean} 
         * 
         * @memberof UtilService
         */
        isString(value) {
            return typeof value === 'string';
        },

        /**
         * 是否数字
         * @static
         * @param {*} value 
         * @returns {boolean} 
         * 
         * @memberof UtilService
         */
        isNumber(value) {
            return typeof value === 'number';
        },

        /**
         * 是否布尔类型
         * @static
         * @param {*} value 值
         * @returns {boolean} 
         * 
         * @memberof UtilService
         */
        isBoolean(value) {
            return typeof value === 'boolean';
        },

        /**
         * 去除字符串两端的空白字符
         *  @static
         *  @returns {str}
         * 
         * @memberof UtilService
         */
        trim(str) {
            return str == null ?
                "" :
                (str + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        },
        /**
         * 判断变量是否声明,是否有数据
         * int 0 也会判断为有数据true
         * object是否有数据应通过isNotData判断
         * 空返回true
         * @static
         * @author ex_chenxw
         * @param val 不接受obj对象
         * @returns {Boolean}
         * 
         * @memberof UtilService
         */
        isEmpty(val) {
            val = this.trim(val);
            if (val == null)
                return !0;
            if (val == undefined || val == 'undefined')
                return !0;
            if (val == "")
                return !0;
            if (val.length == 0)
                return !0;
            if (!/[^(^\s*)|(\s*$)]/.test(val))
                return true;
            return !1;
        },
        /**
         * 判断obj对象是否没有属性
         * 空返回true
         * @static
         * @param obj 只接收obj
         * @returns {boolean}
         * 
         * @memberof UtilService
         */
        isNotProperty(obj) {
            var p;
            for (p in obj)
                return !1;//false
            return !0;//true
        },
        add_zero(temp) {//数位控制
            if (temp < 10)
                return "0" + temp;
            else
                return temp;
        },
        /**
         * 调用方式:
         * uppercase(str)  //小写转大写
         * lowercase(str)  //大写转小写
         *  @static
         *  @returns {str}
         * @memberof UtilService
         */
        //转换大写
        uppercase(string) {
            return this.isString(string) ? string.toUpperCase() : string;
        },
        //转换小写
        lowercase(string) {
            return this.isString(string) ? string.toLowerCase() : string;
        },
        is_array(value) {
            return value &&
                typeof value === 'object' &&
                typeof value.length === 'number' &&
                typeof value.splice === 'function' &&
                !(value.propertyIsEnumerable('length'));
        },
        /**
        * @description:url拼接参数
        * @param 
        * @returns {*}
        */
        formatUrl(url, params) {
            var str = url;

            if (params) {
                for (var key in params) {
                    str.indexOf('?') > -1 ? str += '&' : str += '?';
                    str += key + '=' + params[key];
                }
            }
            return str;
        },
        /**
         * @description:json数据拼接
         * @param 
         * @returns {*}
         */
        extend(arr) {
            var des = {};
            if (!arr instanceof Array) return;
            for (var i = 0, len = arr.length; i < len; i++) {
                for (var key in arr[i]) {
                    des[key] = arr[i][key];
                }
            }
            return des;
        },
        /**
        * @description:是否是空对象
        * @param 
        * @returns {*}
        */
        isEmptyObject(obj) {
            for (var name in obj) {
                return false;
            }
            return true;
        },
        /**
         * @description:
         * @param 
         * @returns {*}
         */
        // isArray: Array.isArray || ((obj) => { return toString.call(obj) === '[object Array]' }),
        /**
         * @description:
         * @param 
         * @returns {*}
         */
        isIOSEnviron() {
            var u = window.navigator.userAgent;
            if (u.indexOf('iPhone') > -1) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * @description:
         * @param 
         * @returns {*}
         */
        isObjectValueEqual(a, b) {
            var aProps = Object.getOwnPropertyNames(a);
            var bProps = Object.getOwnPropertyNames(b);
            if (aProps.length != bProps.length) {
                return false;
            }
            for (var i = 0; i < aProps.length; i++) {
                var propName = aProps[i];
                if (a[propName] !== b[propName]) {
                    return false;
                }
            }
            return true;
        },
        dictFilter(input, type1) {
            try {
                if (!input && input !== 0) {
                    return '';
                }
                if (!type1) {
                    return '';
                }
                var resultStr = "";
                var prefix = "";
                var arr = [];
                if (isNaN(input)) {
                    arr = input.split(",");
                } else {
                    arr.push(input + "");
                }
                for (var k = 0; k < arr.length; k++) {
                    if (arr[k] || arr[k] === 0) {
                        for (var temp in _dict) {
                            if (temp == type1) {//todo
                                var _array = _dict[temp];// 到此，是一个数组
                                for (var j = 0; j < _array.length; j++) {
                                    var label_value = _array[j]; // 此对象必须是{"label":"_label","value":"_value"}
                                    var tmpArr = arr[k].split("-");
                                    if (!tmpArr[0] && tmpArr[0] !== 0) {
                                        tmpArr[0] = arr[k];
                                    }
                                    if (tmpArr[0] == label_value.value &&
                                        label_value.label) {
                                        resultStr += prefix + label_value.label;
                                        if (prefix == "")
                                            prefix = ",";
                                    }
                                }
                            }
                        }
                    }
                }
                return resultStr;
            }
            catch (e) {
                console.warn("获取 label:" + type1 + " 失败...");
                console.error(e);
            }
            return '';
        },
        /**
        * @description:全局退出应用
        * @param 
        * @returns {*}
        */
        exit() {
            platform.exit();
        },
    }
}
module.exports = Rxports.methods



































