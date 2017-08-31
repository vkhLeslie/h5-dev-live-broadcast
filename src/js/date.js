
/**
 * @description:常用时间工具类  分析参数类型，容错判断
 * @author：xingwu.chen@partner.midea.com
 * @update:2017-08-08
 * @version
 */

var dateService = {
	/**
	* @description:日期的加减，只是天数的加减
	* @param date,num
	* @return date
	*/
	addDate(date, num) {
		if (!date) {
			date = new Date();//如果没有传入，默认为当前时间
		}
		if (!num) {
			num = 0;//如果没有传入，默认为0
		}
		if (typeof (date) == "number") {//考虑纯秒数传入情况
			date = new Date(date);
		}
		if (typeof (date) == "string") {
			let dateArr = date.replace(/-/g, "/");
			date = new Date(dateArr);//转date对象
		} else {
			date = date.toString();
			let dateArr = date.replace(/-/g, "/");
			date = new Date(dateArr);
		}
		date = date.valueOf();
		date = date + num * 24 * 60 * 60 * 1000
		date = new Date(date);
		return date;
	},
    /**
     * @description:返回一个七天的数组
     * [{01月01....},{01月02...}....]
     */
	getSevenDay() {
		let Arr = new Array();
		let date = new Date()
		let dayAdd;
		for (let i = 0; i < 7; i++) {//测试版的日期，后期优化
			dayAdd = this.addDate(date, i);
			let obj = { mDd: '', label: '', date: '' };
			obj.mDd = this.add_zero(dayAdd.getMonth() + 1) + "月" + this.add_zero(dayAdd.getDate()) + "日";
			obj.date = dayAdd.getFullYear() + "-" + this.add_zero(dayAdd.getMonth() + 1) + "-" + this.add_zero(dayAdd.getDate());//字符串类型日期
			switch (i) {//此switch,暂时留着
				case 0:
					obj.label = '今天';
					break;
				case 1:
					obj.label = '明天';
					break;
				case 2:
					obj.label = '后天';
					break;
				default:
					break;
			}
			Arr.push(obj);
		}
		return Arr;
	},
	/**
  * @description:转换时间,时间格式为约多少时间，但参考时间为传入值的endTime-startTime 例如：约1小时32分8秒
  *如果没有传endTime,则endTime默认当前时间
  * @param startTime endTime
  */
	countTime(startTime, endTime) {
		if (!startTime) {
			return ""
		}
		if (!endTime) {
			endTime = new Date();//如果没有传endTime，则endtime默认当前时间
		}
		if (typeof (startTime) == "string") {
			let dateArr = startTime.replace(/-/g, "/");
			startTime = new Date(dateArr);//转date对象
		} else {
			startTime = startTime.toString();
			let dateArr = startTime.replace(/-/g, "/");
			startTime = new Date(dateArr);
		}
		if (typeof (endTime) == "string") {
			let dateArr = endTime.replace(/-/g, "/");
			endTime = new Date(dateArr);//转date对象
		} else {
			endTime = endTime.toString();
			let dateArr = endTime.replace(/-/g, "/");
			endTime = new Date(dateArr);
		}
		let t = endTime.getTime() - startTime.getTime();
		if (t >= 0) {
			// let seconds = Math.floor((t / 1000) % 60);
			let minutes = Math.floor((t / 1000 / 60) % 60);
			let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			let days = Math.floor(t / (1000 * 60 * 60 * 24));

			// return (days > 0 ? days + '天' : '') + hours + '小时' + minutes + '分' + seconds + '秒';
			return (days > 0 ? days + '天' : '') + hours + '小时' + minutes + '分';
		} else if (t < 0) {
			t = t * (-1);
			let minutes = Math.floor((t / 1000 / 60) % 60);
			let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			let days = Math.floor(t / (1000 * 60 * 60 * 24));

			// return (days > 0 ? days + '天' : '') + hours + '小时' + minutes + '分' + seconds + '秒';
			return (days > 0 ? days + '天' : '') + hours + '小时' + minutes + '分';
		} else {
			return "";
		}
	},
	/**
	* @description:32分8秒
	* 倒计时
	* @param Time 必须以秒或纯数字传进
	*/
	countDownTime(time) {
		if (typeof (time) != "number") {//考虑不是纯秒数传入情况
			return "";
		}
		if (!time) {
			time = 0;//如果没有传time，则默认为0；
		}
		if (time > 0) {
			let seconds = Math.floor((time) % 60);
			let minutes = Math.floor((time / 60) % 60);
			// let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
			// let days = Math.floor(time / (1000 * 60 * 60 * 24));

			//return (days > 0 ? days + '天' : '') + hours + '小时' + minutes + '分' + seconds + '秒';
			return minutes + '分' + seconds + '秒';;
		} else {
			return time;
		}
	},

	/**
	  * @description:转换日期，格式 <!--2月18日 后天（周三）---start
	  * @param date format
	  */
	getCurDate(date, format) {
		let nowDate = new Date();
		let week;
		if (!date) {
			date = nowDate;
		}
		if (typeof (date) == "string") {
			let dateArr = date.replace(/-/g, "/");
			date = new Date(dateArr);//转换对象
		} else {
			date = date.toString();
			let dateArr = date.replace(/-/g, "/");
			date = new Date(dateArr);
		}
		if (!format) {
			return date;
		}
		switch (date.getDay()) {
			case 1:
				week = "星期一";
				break;
			case 2:
				week = "星期二";
				break;
			case 3:
				week = "星期三";
				break;
			case 4:
				week = "星期四";
				break;
			case 5:
				week = "星期五";
				break;
			case 6:
				week = "星期六";
				break;
			default:
				week = "星期日";
		}

		let toDate = date.getDay() - nowDate.getDay();//判断几天后，例如：今天或明天或后天,其他返回空
		let intervalDate;
		let currentDate;

		let years = date.getFullYear();//获取年月日时分秒
		let month = this.add_zero(date.getMonth() + 1);
		let days = this.add_zero(date.getDate());
		let hours = this.add_zero(date.getHours());
		let minutes = this.add_zero(date.getMinutes());
		let seconds = this.add_zero(date.getSeconds());
		if (format == "mm-dd-day-week") {////2月18日 今天 星期一
			switch (toDate) {
				case 0:
					intervalDate = "今天";
					break;
				case 1:
					intervalDate = "明天";
					break;
				case 2:
					intervalDate = "后天";
					break;
				default:
					intervalDate = "";
			}
			let currentDate = month + "月" + days + "日" + " " + intervalDate + " " + week
			return currentDate;
		} else {
			switch (format) {
				case "mm-dd-week":
					currentDate = month + "月" + days + "日" + " " + week
					break;
				case "yyyy-mm-dd-week":
					currentDate = years + "年" + month + "月" + days + "日" + " " + week
					break;
				case "yyyy-mm-dd HH:mm:ss":
					currentDate = years + "-" + month + "-" + days + "-" + hours + ":" + minutes + ":" + seconds
					break;
				case "mm-dd HH:mm":
					currentDate = month + "月" + days + "日" + " " + hours + ":" + minutes;
					break;
				case "yyyy-mm-dd":
					currentDate = years + "年" + month + "月" + days + "日"
					break;
			}
			return currentDate;
		}

	},

	add_zero(temp) {
		if (temp < 10)
			return "0" + temp;
		else
			return temp;
	},
	/************ 转换日期，格式 <!--2月18日 后天（周三）***********---end*

	/**
	  *@description:为年月日添加时分秒 字符串类型
	  * 转换日期，格式 "2008-08-08 00:00:00"---start
	  * @param dateStr 
	  */
	appendTime(dateStr) {
		if (dateStr && dateStr.indexOf(" 00:00:00") == -1) {
			return dateStr + " 00:00:00";
		} else {
			return dateStr;
		}
	},
	/************ 转换日期，格式 "2008-08-08 00:00:00"***********---end*/

	/**
	  * by chenxingwu
	  * @description:转换日期格式 ios时间处理，格式 "2008-08-08"ios,safari不支持"需要格式是："2008/08/08";
	  * @param date, format
	  */
	formatDate(date, format) {
		if (!date) return;
		if (!format) format = "yyyy-MM-dd";
		switch (typeof date) {
			case "string":
				date = new Date(date.replace(/-/g, "/"));
				break;
			case "number"://考虑了纯秒数传入情况
				date = new Date(date);
				break;
		}
		if (!(date instanceof Date)) return;
		let dict = {
			"yyyy": date.getFullYear(),
			"M": date.getMonth() + 1,
			"d": date.getDate(),
			"H": date.getHours(),
			"m": date.getMinutes(),
			"s": date.getSeconds(),
			"MM": ("" + (date.getMonth() + 101)).substr(1),
			"dd": ("" + (date.getDate() + 100)).substr(1),
			"HH": ("" + (date.getHours() + 100)).substr(1),
			"mm": ("" + (date.getMinutes() + 100)).substr(1),
			"ss": ("" + (date.getSeconds() + 100)).substr(1)
		};
		return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
			return dict[arguments[0]];
		});
	},
	 /**
         * @description:获取当前系统时间（格式：2017-08-08）
         * @param 
         * @returns {*}
         */
        getNowDate() {
            let date = new Date();
            let dateTxt = date.getFullYear() + '-' + complete((date.getMonth() + 1)) + '-' + complete(date.getDate());
            function complete(num) {
                return num > 9 ? num : '0' + num;
            }
            return dateTxt;
        },
}

export default dateService