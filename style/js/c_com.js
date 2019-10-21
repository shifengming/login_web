$.FX = {};

$.FX.Ajax = function (url, param, callback, httptype, datatype, async) {
	url = window.location.pathname.substring(0, window.location.pathname.substring(1).indexOf('/') + 1) + url;
	var tijiaoType = "GET";
	if (httptype == "POST") {
		tijiaoType = "POST";
	}

	if (datatype == "" || datatype == undefined || datatype == null) {
		datatype = "json";
	}
	if (async == "" || async == undefined || async == null) {
		async = true;
	}
	function err(err) {
		console.log(err);
	}
	$.ajax({
		type: tijiaoType,
		url: url + "?ts=" + Math.random(),
		data: param,
		async: async,
		dataType: datatype,
		success: callback,
		error: err,
		complete: function (XHR, TS) { XHR = null }
	});
};

$.FX.Ajax_Jsonp = function (url, param, callbackname, callback) {
	if (callbackname == "" || callbackname == null || callbackname == undefined) {
		callbackname = "callbackname";
	}
	$.ajax({
		url: url + "?ts=" + Math.random() + "&" + param,
		type: "get",
		data: param,
		dataType: "jsonp",
		jsonpCallback: callbackname,
		success: callback,
		complete: function (XHR, TS) { XHR = null }
	});
};

//验证手机号码[国际]
$.FX.isMobile = function (mobile) {
	var mobilePat = /^[+]{0,1}(\d{7,14})$/;
	if (mobilePat.test(mobile) == false) {
		return false;
	}
	else {
		return true;
	}
};

//验证单独验证各国手机号
$.FX.Mobile = function (areacode, mobile) {
	var moren = /^[+]{0,1}(\d{7,14})$/;//默认验证
	var result = false;
	switch (areacode) {
		case "0086":
			var t0086 = /^[1][3,4,5,7,8][0-9]{9}$/;
			result = t0086.test(mobile);
			break;
		default:
			result = moren.test(mobile);
			break;
	}
	return result;
};



//身份证号码的验证规则
$.FX.isIdCardNo = function (num) {
	//if (isNaN(num)) {alert("输入的不是数字！"); return false;} 
	var len = num.length, re;
	if (len == 15)
		re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
	else if (len == 18)
		re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
	else {
		//alert("输入的数字位数不对。"); 
		return false;
	}
	var a = num.match(re);
	if (a != null) {
		if (len == 15) {
			var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
			var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
		}
		else {
			var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
			var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
		}
		if (!B) {
			//alert("输入的身份证号 "+ a[0] +" 里出生日期不对。"); 
			return false;
		}
	}
	if (!re.test(num)) {
		//alert("身份证最后一位只能是数字和字母。");
		return false;
	}
	return true;
};

//验证邮箱
$.FX.isEmail = function (email) {
	var emailPat = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
	if (emailPat.test(email) == false) {
		return false;
	}
	else {
		return true;
	}
};

//获取url参数值
$.FX.GetQueryString = function (item, url) {
	if (url == null || url == "") {
		url = location.search;
	}
	var svalue = url.match(new RegExp('[\?\&]' + item + '=([^\&]*)(\&?)', 'i'));
	if (svalue != null)
		return svalue ? svalue[1] : svalue;
	else
		return null;
};

//读取COOKIE
$.FX.GetCookie = function (name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null) {
		if (arguments.length >= 2) {
			var childarr = arr[2].match(new RegExp('[\&]*?' + arguments[1] + '=([^\&]*)(\&?)'));
			return childarr ? childarr[1] : childarr;
		}
		else
			return unescape(arr[2]);
	}
	else
		return null;
};

$.FX.alert = function (tip, elem, time, location, color) {
	if (time == null || time == "") {
		time = 2000;
	}
	if (location == null || location == "") {
		location = 2;
	}
	if (color == null || color == "") {
		color = "#fee9e4";
	}
	layer.tips(tip, elem, {
		tips: [location, color],//更改1，2，3，4可以改变位置
		tipsMore: false,
		time: time
	});
}

//防刷
$.FX.clk = function (fn, delay) {
	var timer;
	return function () {
		var context = this;
		var args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(context, args);
		}, delay);
	}
}


$.FX.getdescookie = function (strcookie, matchcookie) {
	var getMatchCookie;
	var arrCookie = strcookie.split(";");
	for (var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (matchcookie === arr[0].replace(/(^\s*)|(\s*$)/g, "")) {
			getMatchCookie = arr[1];
			break;
		}
	}
	return getMatchCookie;
}

$.FX.ERRORNUMVALIDATE = 3;

$.FX.enter = function (el, fun) {
	$(el).off("keypress").on("keypress", function (e) {
		if (e.keyCode === 13) {
			fun();
		}
	});
};

var cookieurl = "//authorize.";

//$.FX.addcook = function (cookurl, url) {
//	$.FX.loadImg(cookieurl + "fxeye.com/AddCook/FxeyeCookie" + cookurl, function () {
//		$.FX.loadImg(cookieurl + "fxeye.com.cn/AddCook/EPCCookie" + cookurl, function () {
//			$.FX.loadImg(cookieurl + "wikifx.com.cn/AddCook/GJCookie" + cookurl, function () {
//				window.location.href = url;
//				return false;
//			});
//		});
//	});
//};


//$.FX.loadImg = function (imgur, calback) {
//	var img = new Image();
//	img.onload = function () {
//		calback();
//	};

//	img.onerror = function () {
//		window.location.href = "index.html#/grsz";
//		return false;
//	};

//	img.src = imgur;

//};

$.FX.addcook = function (cookurl, url) {
	var arr = [];
	arr.push(cookieurl + "fxeye.com/AddCook/FxeyeCookie" + cookurl);
	arr.push(cookieurl + "fxeye.com.cn/AddCook/EPCCookie" + cookurl);
	arr.push(cookieurl + "wikifx.com/AddCook/GJCookie" + cookurl);
	$.FX.loadImg(arr, url);
};
$.FX.loadImg = function (imgurlarr, url) {
	var successnum = 0;
	for (var i = 0; i < imgurlarr.length; i++) {
		var img = new Image();
		img.onload = function () {
			successnum += 1;
			if (imgurlarr.length == successnum) {
				if (url == "") {
					location.reload(true);
				} else if (url == "1") {
					console.log("");
				} else {
					window.location.href = url;
				}
			}
		};
		img.onerror = function () {
			location.reload();
		};
		img.src = imgurlarr[i];
	}
};

//关闭错误提示
$('#loginaccount,#loginpassword,#logincode,#phone1,#bindphone,#bindcode,#bindemail,#LastName,#NewPass,#NewPass2,#email').on('input propertychange', function () {
	$('.error-alert').hide();
});

