/**
 * @description:判断访问终端类型
 * @author：xingwu.chen@partner.midea.com
 * @update:2017-08-16
 * @version
 */
var browser = {
    versions: function () {
        var isBrowser = navigator.userAgent, app = navigator.appVersion;
        // navigator.appVersion
        return {
            trident: isBrowser.indexOf('Trident') > -1, //IE内核
            presto: isBrowser.indexOf('Presto') > -1, //opera内核
            webKit: isBrowser.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: isBrowser.indexOf('Gecko') > -1 && isBrowser.indexOf('KHTML') == -1,//火狐内核
            mobile: !!isBrowser.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!isBrowser.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: isBrowser.indexOf('Android') > -1 || isBrowser.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: isBrowser.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: isBrowser.indexOf('iPad') > -1, //是否iPad
            webApp: isBrowser.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    },
    //判断当前浏览类型  
    BrowserType: function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器  
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器  
        var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器  
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器  
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器  
        var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器  

        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7)
            { return "IE7"; }
            else if (fIEVersion == 8)
            { return "IE8"; }
            else if (fIEVersion == 9)
            { return "IE9"; }
            else if (fIEVersion == 10)
            { return "IE10"; }
            else if (fIEVersion == 11)
            { return "IE11"; }
            else
            { return "0" }//IE版本过低  
        }//isIE end  

        if (isFF) { return "FF"; }
        if (isOpera) { return "Opera"; }
        if (isSafari) { return "Safari"; }
        if (isChrome) { return "Chrome"; }
        if (isEdge) { return "Edge"; }
    },//myBrowser() end  
    //判断是否是IE浏览器  
    isIE: function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器  
        if (isIE) {
            return "1";
        }
        else {
            return "-1";
        }
    },
    //bug 
    //IE5与IE7浏览器暂不能区分，以下是IE5与IE7下userAgent的信息；通过userAgent发现，简单的通过以上方法，无法正确区分IE5和IE7。
    //IE5: userAgent  
    // "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; InfoPath.2; .NET4.0E)"
    // IE7: userAgent  
    //"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; InfoPath.2; .NET4.0E)"
    //判断是否是IE浏览器，包括Edge浏览器  
    IEVersion: function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器  
        var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器  
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7)
            { return "IE7"; }
            else if (fIEVersion == 8)
            { return "IE8"; }
            else if (fIEVersion == 9)
            { return "IE9"; }
            else if (fIEVersion == 10)
            { return "IE10"; }
            else if (fIEVersion == 11)
            { return "IE11"; }
            else
            { return "0" }//IE版本过低  
        }
        else if (isEdge) {
            return "Edge";
        }
        else {
            return "-1";//非IE  
        }
    },
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

export default browser