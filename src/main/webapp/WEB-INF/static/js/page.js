if (window.console === undefined) {
    console = {
        log: function () {
        }, info: function () {
        }, debug: function () {
        }
    };
}
function toPageFirst($form, action) {
    var $currentPage = $form.find("#view\\.currentPage");
    if ($currentPage.val() != 1) {
//		$("#form")[0].reset();
        if ($form.find("#view\\.totalPages").val() >= 1) {
            $currentPage.val(1);
        }
        if (action && typeof action === 'function') {
            action();
        }

    }
}
// 符策鹏 修改view.currentPage为view.thisPage 2013/7/25
function toPagePre($form, action) {
    var $thisPage = $form.find("#view\\.thisPage");
    if ($thisPage.val() != 1) {
//		$("#form")[0].reset();
        var pageNumber = parseInt($thisPage.val()) - 1;
        if (isNaN(pageNumber)) {
            return;
        }
        if (pageNumber >= 0) {
            $form.find("#view\\.currentPage").val(pageNumber);
        }
        if (action && typeof action === 'function') {
        action();
    }
}
}
// 符策鹏 修改view.currentPage为view.thisPage 2013/7/25
function toPageNext($form, action) {
    var $thisPage = $form.find("#view\\.thisPage");
    var $currentPage = $form.find("#view\\.currentPage");
    if ($thisPage.val() != $form.find("#view\\.totalPages").val() && $currentPage.val() != 0) {
        //$("#form")[0].reset();
        $currentPage.val(parseInt($thisPage.val()) + 1);
        action();
    }
}
function toPageLast($form, action) {
    var $currentPage = $form.find("#view\\.currentPage");
    var $totalPages = $form.find("#view\\.totalPages")
    if ($currentPage.val() != $totalPages.val()) {
        //$("#form")[0].reset();
        $currentPage.val($totalPages.val());
        if (action && typeof action === 'function') {
        action();
    }
}
}
resetCurrentPage = function () {
    $("#view\\.currentPage").val(1);
};
function toPageGo(action) {

    var currentPage = parseInt($("#view\\.currentPage").val());
    var totalPages = parseInt($("#view\\.totalPages").val());
    //$("#form")[0].reset();
    // 判断转向页为是否为空

    if (isNaN(currentPage)) {
        jAlert("请输入页码！");
        return false;
    }

    // 转向页大于总页数
    if (currentPage > totalPages || currentPage <= 0 && totalPages != 0) {
        // $("#view\\.currentPage").val(totalPages);
        var msg = "页码不存在，请重新输入！";
        if (window.jAlert) {
            jAlert(msg);
        } else {
            alert(msg);
        }
        return;
    } else {
        $("#view\\.currentPage").val(currentPage);
    }
    if (action && typeof action === 'function') {
        action();
    }
}
/***
 * 获取节点的标签名称,比如INPUT,SPAN,DIV,IMG
 * @param domNode
 * @returns {string|*}
 */
var getTagName = function (domNode) {
    var tagNameTmp = domNode.tagName || domNode.localName;
    if (!tagNameTmp) {
        tagNameTmp = domNode.nodeName;//兼容IE8
    }
    return tagNameTmp;
};
function checkedAll(event) {
    var obj = com.whuang.hsj.getSrcElement(event);
    var nodeList = document.getElementsByName("checked");
    if (nodeList.length == 0) {
        jAlert("没有可选择的数据！");
        obj.checked = false;
        return false;
    } else {
        for (var i = 0; i < nodeList.length; i++) {
            nodeList[i].checked = obj.checked;
        }
    }
}

function dataListOnMouseOver(event) {
    var obj = com.whuang.hsj.getSrcElement(event);
    if (getTagName(obj) == "INPUT") {
        obj = obj.parentNode;
    }
    obj.parentNode.style.cursor = "pointer";
    obj.parentNode.style.backgroundColor = '#F0E68C';
}

function dataListOnMouseOut(event) {
    var obj = com.whuang.hsj.getSrcElement(event);
    if (getTagName(obj) == "INPUT") {
        obj = obj.parentNode;
    }
    obj.parentNode.style.backgroundColor = '#e5f1f4';
    obj.parentNode.style.cursor = "default";
}

function clickCheckedData(event) {
    var obj = com.whuang.hsj.getSrcElement(event);

    var tagName = getTagName(obj);
    if (tagName == "INPUT") {
        return false;
    }
    obj = obj.parentNode.firstChild;
    while (!tagName) {
        obj = obj.nextSibling;
    }
    obj = obj.firstChild;
    while (!tagName) {
        obj = obj.nextSibling;
    }
    obj.checked = !obj.checked;
}

function dbClickCheckedData(event) {
    var obj = com.whuang.hsj.getSrcElement(event);
    var tagName = getTagName(obj);
    if (tagName == "INPUT") {
        return false;
    }
    obj = obj.parentNode.firstChild;
    while (!tagName) {
        obj = obj.nextSibling;
    }
    obj = obj.firstChild;
    while (!tagName) {
        obj = obj.nextSibling;
    }
    obj.checked = true;
}
function getSelections(checkedName, idName, ids) {
    var checkedNum = 0;
    var selecteds = document.getElementsByName(checkedName);
    var id = document.getElementsByName(idName);
    ids.value = "";
    for (var i = 0; i < selecteds.length; i++) {
        if (selecteds[i].checked == true) {
            checkedNum += 1;
            if (ids.value == "") {
                ids.value = id[i].value;
            } else {
                ids.value += "," + id[i].value;
            }
        }
    }
    return checkedNum;
}
function getSelectionsAndNames(checkedName, idName, nameList, ids) {
    var checkedNum = 0;
    var selecteds = document.getElementsByName(checkedName);
    var id = document.getElementsByName(idName);
    var name = document.getElementsByName(nameList);
    ids.value = "";
    for (var i = 0; i < selecteds.length; i++) {
        if (selecteds[i].checked == true) {
            checkedNum += 1;
            if (ids.value == "") {
                ids.value = id[i].value + "," + name[i].value;
            } else {
                ids.value += "," + id[i].value + "," + name[i].value;
            }
        }
    }
    return checkedNum;
}

var highlightcolor = '#eafcd5';
var clickcolor = '#51b2f6';
function changeto(event) {
    var source = com.whuang.hsj.getSrcElement(event);
    var tagName = getTagName(source);
    if (tagName == "TR" || tagName == "TABLE")
        return;

    while (source.parentNode != undefined && tagName != "TD")
        source = source.parentNode;
    if (source.parentNode != undefined) {
        source = source.parentNode;
    }
    if (source != undefined) {
        cs = source.children;
        if (cs.length > 0 && cs[1].style.backgroundColor != highlightcolor && source.id != "nc" && cs[1].style.backgroundColor != clickcolor) {
            for (var i = 0; i < cs.length; i++) {
                cs[i].style.backgroundColor = highlightcolor;
            }
        }
    }
}

function changeback(event) {
    var source = com.whuang.hsj.getSrcElement(event);

    var fromElement = event.fromElement ? event.fromElement : event.target;
    var toElement = event.toElement ? event.toElement : event.relatedTarget;
    if (fromElement == toElement || source == toElement || source.id == "nc")
        return
    while (source.parentNode != undefined && getTagName(source) != "TD")
        source = source.parentNode;

    if (source.parentNode != undefined) {
        source = source.parentNode;
    }
    if (source.parentNode != undefined) {
        var cs = source.children;
        if (toElement != source && cs.length > 0 && cs[1].style.backgroundColor != clickcolor)
            for (var i = 0; i < cs.length; i++) {
                cs[i].style.backgroundColor = "";
            }
    }
}

function clickto() {
    var source = com.whuang.hsj.getSrcElement(event);
    var tagName = getTagName(source);
    if (tagName == "TR" || tagName == "TABLE")
        return;
    while (tagName != "TD")
        source = source.parentElement;
    source = source.parentElement;
    cs = source.children;
    if (cs[1].style.backgroundColor != clickcolor && source.id != "nc")
        for (var i = 0; i < cs.length; i++) {
            cs[i].style.backgroundColor = clickcolor;
        } else {
        for (i = 0; i < cs.length; i++) {
            cs[i].style.backgroundColor = "";
        }
    }
}
/*
 * 将输入转成整数
 * 
 */
String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
/**
 * 邮箱校验
 *
 */
emailCheck = function (email) {
    var emailPattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9])+\.[a-zA-Z]{2,3}$/;
    return emailPattern.test(email);
};
/*
 * 验证输入是否是数字
 * 
 */
onlyNumber = function (event) {
    if (event === undefined) {
        event = window.event;
    }
    var key = window.event ? event.keyCode : event.which;
    var keychar = String.fromCharCode(key);
    if (!(key == 8 || key == 0)) {
        reg = /\d/;
        return reg.test(keychar);
    }
    return true;
};

/*
 * 校验是否为数字
 * 
 */
onlyChar = function (event) {
    if (event === undefined) {
        event = window.event;
    }
    var key = window.event ? event.keyCode : event.which;
    var keychar = String.fromCharCode(key);
    if (!(key == 8 || key == 0)) {
        reg = /^[a-zA-Z]*$/g;
        return reg.test(keychar);
    }
    return true;
};

/*
 * 只能输入数字,可以有小数点
 * 
 */
onlyNumberKeyUp = function (event) {
    if (event === undefined) {
        event = window.event;
    }
    var obj = com.whuang.hsj.getSrcElement(event);
    var pattern = /[^\d\.]/ig;
    if (pattern.test(obj.value)) {
        var i = getCursortPosition(event);
        obj.value = obj.value.replace(pattern, '');
        setCaretPosition(event, i);
    }
};

/*
 * 只能输入正整数,不能有小数点
 * 
 */
onlyIntegerKeyUp = function (e) {
    if (e === undefined) {
        e = window.event;
    }
    var obj = com.whuang.hsj.getSrcElement(e);
    var pattern = /[^\d]/ig;
    var val = obj.value;
    if (pattern.test(val)) {
        var i = getCursortPosition(e);
        obj.value = val.replace(pattern, '');
        setCaretPosition(e, i);
    }
};
/*
 * 只能输入字符,不能输入汉字或空格
 * 
 */
onlyCharKeyUp = function (event) {
    if (event === undefined) {
        event = window.event;
    }
    var obj = com.whuang.hsj.getSrcElement(event);
    var pattern = /^[a-zA-Z]*$/g;
    var val = obj.value;
    if (!pattern.test(val)) {
        var i = getCursortPosition(event);
        obj.value = val.replace(/[^a-zA-Z]*/ig, '');
        setCaretPosition(event, i);
    }
};

/*
 * 只能输入数字和字母
 * 
 */
onlyNumAndAlphKeyUp = function (event) {
    if (event === undefined) {
        event = window.event;
    }
    var obj = com.whuang.hsj.getSrcElement(event);
    var pattern = /[^\w]/ig;
    if (pattern.test(obj.value)) {
        var i = getCursortPosition(event);
        obj.value = obj.value.replace(pattern, '');
        setCaretPosition(event, i);
    }
};
/***
 * only .
 * @param event
 */
onlyDotKeyUp = function (event) {
    if (event === undefined) {
        event = window.event;
    }
    var obj = com.whuang.hsj.getSrcElement(event);
    var pattern = /[^\.]/ig;
    if (pattern.test(obj.value)) {
        var i = getCursortPosition(event);
        obj.value = obj.value.replace(pattern, '');
        setCaretPosition(event, i);
    }
};
/*
 * 用户名和邮箱输入规则，只能输入数字、字母、-、_、.
 * 
 */
accountNoRule = function (event) {
    if (event === undefined) {
        event = window.event;
    }
    var obj = com.whuang.hsj.getSrcElement(event);
    var pattern = /[^\a-zA-Z0-9\@\_\-\.]/g;
    if (pattern.test(obj.value)) {
        var i = getCursortPosition(event);
        obj.value = obj.value.replace(pattern, '');
        setCaretPosition(event, i);
    }
};
/**
 * 用户名邮箱格式校验
 *
 */
accountNoRuleCheck = function (string) {
    var pattern = /[^\a-zA-Z0-9\@\_\-\.]/g;
    if (pattern.test(string)) {
        return false;
    }
    return true;
};
/*
 * 电话输入规则，只能输入数字、-、,
 * 
 */
phoneRule = function (event) {
    if (event === undefined) {
        event = window.event;
    }
    var obj = com.whuang.hsj.getSrcElement(event);
    var pattern = /[^\d\,\-]/g;
    if (pattern.test(obj.value)) {
        var i = getCursortPosition(event);
        obj.value = obj.value.replace(pattern, '');
        setCaretPosition(event, i);
    }
};
/**
 * 电话号码格式校验
 *
 */
phoneRuleCheck = function (string) {
    var pattern = /[^\d\,\-]/g;
    if (pattern.test(string)) {
        return false;
    }
    return true;
};
/*
 * 手机输入规则，只能输入数字、,
 * 
 */
telRule = function (event) {
    if (event === undefined) {
        event = window.event;
    }
    var obj = com.whuang.hsj.getSrcElement(event);
    var pattern = /[^\d\,]/g;
    if (pattern.test(obj.value)) {
        var i = getCursortPosition(event);
        obj.value = obj.value.replace(pattern, '');
        setCaretPosition(event, i);
    }
};
/**
 * 手机号码格式校验
 *
 */
telRuleCheck = function (string) {
    var pattern = /[^\d]/g;
    if (pattern.test(string)) {
        return false;
    }
    return true;
};
/***
 * check mobile phone:(1)must be digit;(2)must be 11
 * @param string
 * @returns {boolean}
 */
telRuleCheck2 = function (string) {
    var pattern = /^1[34578]\d{9}$/;
    if (pattern.test(string)) {
        return true;
    }
    console.log('check mobile phone ' + string + ' failed.');
    return false;
};
/*
 * gps坐标规则，只能输入数字和.
 * 
 */
gpsRule = function (event) {
    if (event === undefined) {
        event = window.event;
    }
    var obj = com.whuang.hsj.getSrcElement(event);
    var pattern = /[^\d\.]/g;
    if (pattern.test(obj.value)) {
        var i = getCursortPosition(event);
        obj.value = obj.value.replace(pattern, '');
        setCaretPosition(event, i);
    }
};
/**
 * gps格式校验
 *
 */
gpsRuleCheck = function (string) {
    var pattern = /[^\d\.]/g;
    if (pattern.test(string)) {
        return false;
    }
    return true;
};
/**
 * 校验上传图片格式
 *
 */
imgCheck = function (Sting) {
    var index = Sting.lastIndexOf(".");
    var ext = Sting.substring(index + 1, Sting.length);
    if (ext) {
        ext = ext.toLowerCase();
    }
    if (index < 0) {
        return false;
    } else if (ext != "png" && ext != "jpg") {
        return false;
    }
    return true;
};
/**
 * excel文件前端校验
 *
 */
excelCheck = function (Sting) {
    var index = Sting.lastIndexOf(".");
    var ext = Sting.substring(index + 1, Sting.length);
    if (ext) {
        ext = ext.toLowerCase();
    }
    if (index < 0) {
        return false;
    } else if (ext != "xls") {
        return false;
    }
    return true;
};
/**
 * 经度范围校验
 *
 */
longitudeCheck = function (String) {
    var longitude = parseFloat(String);
    if (longitude >= -180 && longitude <= 180) {
        return true;
    } else {
        return false;
    }
};
/**
 * 纬度范围校验
 *
 */
latitudeCheck = function (String) {
    var latitude = parseFloat(String);
    if (latitude >= -90 && latitude <= 90) {
        return true;
    } else {
        return false;
    }
};
/*
 * textarea字符长度限制
 * 
 */
isMaxLen = function (event) {
    var obj = com.whuang.hsj.getSrcElement(event);
    var target = $("#" + obj.getAttribute("id").replace(".", "\\."));
    var maxLength = target.attr("maxlength");
    if (target.val().length > maxLength) {
        target.blur();
        target.val(target.val().substring(0, maxLength));
        target.focus();
    }
};
/*
 * 回车+CTRL换行
 * 
 */
newline = function (event) {
    if (event.keyCode == 13 && event.ctrlKey) {
        if (document.selection) {
            var selectText = document.selection.createRange();
            if (selectText) {
                if (selectText.text.length > 0)
                    selectText.text += "\r\n";
                else
                    selectText.text = "\r\n";
                selectText.select();
            }
        }
        else {
            var obj = com.whuang.hsj.getSrcElement(event);
            obj.value += "\r\n";
        }
    }
};
/**
 * 字符串字节长度计算（按照GBK编码）
 */
var lenForStrGBK = function (str) {
    var byteLen = 0, len = str.length;
    if (str) {
        for (var i = 0; i < len; i++) {
            if (str.charCodeAt(i) > 255) {
                byteLen += 2;
            } else {
                byteLen++;
            }
        }
        return byteLen;
    } else {
        return 0;
    }
};
/**
 * 字符串字节长度计算（按照UTF-8编码）
 */
var lenForStr = function (str) {
    var totalLength = 0;
    var i;
    var charCode;
    for (i = 0; i < str.length; i++) {
        charCode = str.charCodeAt(i);
        if (charCode < 0x007F) {
            totalLength = totalLength + 1;
        } else if ((0x0080 <= charCode) && (charCode <= 0x07FF)) {
            totalLength += 2;
        } else if ((0x0800 <= charCode) && (charCode <= 0xFFFF)) {
            totalLength += 3;
        } else if ((0x10000 <= charCode) && (charCode <= 0x1FFFFF)) {
            totalLength += 4;
        }
    }
    return totalLength;
};
/*******************************************************************************
 * 获取光标位置
 *
 * @param ctrl
 * @returns {Number}
 */
getCursortPosition = function (event) {// 获取光标位置函数
    if (event === undefined || event === null) {
        event = arguments.callee.caller.arguments[0] || window.event;
    }
    var obj = com.whuang.hsj.getSrcElement(event);
    var CaretPos = 0;	// IE Support
    if (document.selection) {
        obj.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -obj.value.length);
        CaretPos = Sel.text.length;
    } else if (obj.selectionStart || obj.selectionStart == '0') {
        // Firefox support
        CaretPos = obj.selectionStart;
    }

    return (CaretPos);
};

/*******************************************************************************
 * 设置光标位置
 *
 * @param ctrl
 * @returns {Number}
 */
setCaretPosition = function (event, pos) {// 设置光标位置函数
    if (event === undefined || event === null) {
        event = arguments.callee.caller.arguments[0] || window.event;
    }
    var obj = com.whuang.hsj.getSrcElement(event);
    if (pos > 0) {
        pos = pos - 1;//因为把不匹配的字符删除之后,光标会往后移动一个位置
    }
    if (obj.setSelectionRange) {
        obj.focus();
        obj.setSelectionRange(pos, pos);
    } else if (obj.createTextRange) {
        var range = obj.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};
/**
 * 验证只能为数字和字母的组合
 */
function onlyNumAndAlph(value) {
    var re = /^([a-zA-Z0-9]+)$/;
    if (!re.test(value)) {
        return false;
    }
    return true;
};

/*
 * 只能输入数字
 * 
 */
onlyFloat = function (value) {
    var pattern = /^\d+\.\d+$/;
    return pattern.test(value);
};
/**
 * form表单值是否改变，提示是否需要保存
 *
 * @param callBack
 */
formChange = function (callBack) {
    var formId = $("#saveFormType").attr("relForm");
    if (formId == undefined) {
        callBack();
        return;
    }

    var isChange = false;
    var inputs = $("#" + formId).find(":input");

    inputs.each(function () {
        var type = $(this).attr("type");
        if (type == 'radio' || type == 'checkbox') {
            if ($(this).attr("checked") != $(this).prop("defaultChecked")) {
                isChange = true;
                return;
            }
        } else if (type == "text" || $(this).is("textarea") || type == "hidden") {
            if ($(this).val() != $(this).prop("defaultValue")) {
                isChange = true;
                return;
            }
        } else if ($(this).is("select")) {
            var v = $(this).val();
            $(this).find("option").each(function () {
                if ($(this).prop("defaultSelected") && $(this).val() != v) {
                    isChange = true;
                    return;
                }
            });
        }
    });

    if (isChange) {
        var saveFormChange = function (result) {
            if (result) {
                callBack();
            } else {
                // 直接保存时，会出现两次提示，暂且屏蔽
                // var relClick = $("#saveFormType").attr("relClick");
                // $("#"+relClick).click();
            }
        };
        jConfirm("数据已经修改，确定不需要保存？", null, saveFormChange);
    } else {
        callBack();
    }
};
/**
 * 显示遮罩
 */
showLoadPanel = function (type22) {
    $("#loadPanel").height($(document).height());
    if (type22) {
        var brow;
        if (com.whuang.hsj.getBrowserVersion) {
            brow = com.whuang.hsj.getBrowserVersion;
        }
        if (type22 == 'mid' || type22 == 'middle') {
            $("#loadPanel").css("background-image", "url(\"../static/images/loading/loading_middle.gif\")");
            if (brow && brow.chrome) {//因为在chrome 中有时背景图片gif不显示
                $("#loading_gif").css("display", "block");
                $("#loading_gif").attr("src", "../static/images/loading/loading_middle.gif");
            }

        } else if (type22 == 'small' || type22 == 'little') {
            $("#loadPanel").css("background-image", "url(\"../static/images/loading/loading_small.gif\")");
            if (brow && brow.chrome) {//因为在chrome 中有时背景图片gif不显示
                $("#loading_gif").css("display", "block");
                $("#loading_gif").attr("src", "../static/images/loading/loading_small.gif");
            }
        } else {
            $("#loadPanel").css("background-image", "url(\"" + type22 + "\")");
        }

    }
    $("#loadPanel").show();
};
hideLoadPanel = function () {
    $("#loadPanel").hide();
};
/**
 * 功能区变化
 */

function loadJs(url, callback) {
    var done = false;
    var script = document.createElement('script');
    script.type = 'text/javascript';//do not 'application/javascript',because Low version of the browser is not compatible
    script.language = 'javascript';
    script.charset = "utf-8";
    script.src = url;
    //script.setAttribute('src', url);
    script.onload = script.onreadystatechange = function () {
        if (!done && (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')) {
            done = true;
            script.onload = script.onreadystatechange = null;
            if (callback) {
                console.log('load ' + url + ' success.');
                callback.call(script);
            }
        }
    };
    document.getElementsByTagName("head")[0].appendChild(script);
};
function loadJS2(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';//do not use 'application/javascript',because Low version of the browser is not compatible
    script.charset = "utf-8";
    if (script.readyState) {  // 兼容IE的旧版本
        script.onreadystatechange = function () {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null;
                callback();
            }
        }
    }
    else {
        script.onload = function () {
            callback();
        }
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function xhrLoadJS(url, callback) {
    var xhr = createXHR();
    xhr.open('get', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304/*页面未修改*/) {
                var script = document.createElement('script');
                script.type = 'text/script';//do not use 'application/javascript',because Low version of the browser is not compatible
                script.charset = "utf-8";
                script.text = xhr.responseText;
                eval(xhr.responseText);  // 执行代码
                document.body.appendChild(script);
                if (callback && typeof callback === 'function') {
                    callback();
                }
            }
        }
    };
    xhr.send(null);
}


/**
 * jqueryAjax通用选项
 *
 */
/*ajaxOption=function(url){
 var options = {
 url: url,
 type: "POST",
 dataType:'html',
 success:function(html) {
 functionChange(html);
 },
 error:function(er){
 functionChange(er.responseText);
 }
 };
 showLoadPanel();
 return options;
 };*/
/**
 * jquery ajax 请求
 *
 */
ajax = function (url, data, callback_s, callback_e) {
    var callBack = function () {
        showLoadPanel();
        if (data != null && data != undefined) {
            $.ajax({
                url: url,
                type: "POST",
                timeout: 18000,
                data: data,
                dataType: 'html',
                success: function (html) {
                    if (callback_s != null && callback_s != undefined) {
                        callback_s(html);
                        hideLoadPanel();
                    } else {
                        functionChange(html);
                    }
                },
                error: function (er) {
                    if (er.statusText == 'timeout') {
                        functionChange("<red>连接服务器超时！</red>");
                    } else {
                        if (callback_e != null && callback_e != undefined) {
                            callback_e(er);
                            hideLoadPanel();
                        } else {
                            functionChange(er.responseText);
                        }
                    }
                }
            });
        } else {
            $.ajax({
                url: url,
                type: "POST",
                timeout: 18000,
                dataType: 'html',
                success: function (html) {
                    if (callback_s != null && callback_s != undefined) {
                        callback_s(html);
                        hideLoadPanel();
                    } else {
                        functionChange(html);
                    }
                },
                error: function (er) {
                    if (er.statusText == 'timeout') {
                        functionChange("<red>连接服务器超时！</red>");
                    } else {
                        if (callback_e != null && callback_e != undefined) {
                            callback_e(er);
                            hideLoadPanel();
                        } else {
                            functionChange(er.responseText);
                        }
                    }
                }
            });
        }
    };

    // 有回调函数时，不做数据校验
    if (callback_s == null) {
        formChange(callBack);
    } else {
        callBack();
    }
};
/***
 *
 * @param url
 * @param jqueryObjParam has two attribute:jqueryObj,isCenter,dialogPanel
 * @param data
 * @param callback : 请求完成之后的回调函数
 */
ajaxHtml = function (url, jqueryObjParam, data, callback) {
    var argument_length = arguments.length;
    var jqueryObj = null;
    var isCenter = false;
    if ('jqueryObj' in jqueryObjParam) {//jqueryObjParam is not jqery object
        jqueryObj = jqueryObjParam.jqueryObj;
        jqueryObjParam.isCenter && (isCenter = jqueryObjParam.isCenter);
    } else {
        jqueryObj = jqueryObjParam;
    }

    var options22 = {
        url: url,
        type: "GET",
        timeout: 18000,
        dataType: 'html',
        success: function (html) {
            updateHtml(jqueryObj, html);

            if (isCenter) {
                jqueryObjParam.$dialogPanel.show('normal', function () {//只有控件显示(display不等于none)的时候,设置聚焦才有效
                    if (argument_length > 3 && callback) {
                        callback();
                    }
                    com.whuang.hsj.centerXY(jqueryObjParam.$dialogPanel);
                    jqueryObjParam.$dialogPanel.css("position", 'fixed');//保证固定在可视范围内
                });

            } else {
                if (argument_length > 3 && callback) {
                    callback();
                }
            }
            var $formInput = jqueryObj.find('textarea:first');//让subContent 中的textarea聚焦
            if ($formInput.length != 0) {//先判断能不能获取到textarea
                $formInput.get(0).focus();
            }
        },
        error: function (er) {
            if (er.statusText == 'timeout') {
                updateHtml(jqueryObj, "<red>连接服务器超时！</red>");
            } else {
                updateHtml(jqueryObj, er.responseText);

            }
        }
    };
    if (arguments.length > 2 && data != null && data != undefined) {
        options22.data = data;
        options22.type = "POST";
    }
    /*if(data==null&&data==undefined){
     options22.type="GET"
     }*/
    $.ajax(options22);

}
formAjaxHtml = function (url, jqueryObj, form) {
    var options = {
        url: url,
        type: "POST",
        dataType: 'html',
        success: function (html) {
            //  	jqueryObj.html(html);
            // hideLoadPanel();
            updateHtml(jqueryObj, html)
        },
        error: function (er) {
            alert(er);
            alert(er.responseText);
        }
    };
    //采用Ajax 提交表单,页面不会跳转
    if (form.length == 0) {
        alert("没有找到表单");
        return;
    }
    if (form && !form.ajaxSubmit) {
        window.formAjaxSubmit && formAjaxSubmit(form);
    }
    if (form) {
        form.ajaxSubmit(options);
    }
};
function updateHtml(jqueryObj, html2) {
    jqueryObj.html(html2);
    hideLoadPanel();
    $("#subPagePanel").css("background-image", "");
}
