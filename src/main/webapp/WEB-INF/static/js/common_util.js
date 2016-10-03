//Module.c("com.whuang.hsj");
//update to 2013-06-28
com = {};
com.whuang = {};
com.whuang.hsj = {};
if (window.console === undefined) {
    console = {
        log: function () {
        }, info: function () {
        }, debug: function () {
        }
    };
}
window.EVENT_BIND_PREFIX = 'on';
//IE 11 has problem
var userAgent = navigator.userAgent.toLowerCase();
var browser = navigator.appName;//IE11 is "Netscape"
var isIEtest = userAgent.indexOf("windows nt ") > 0 && userAgent.indexOf("trident") > 0;//&&browser=="Microsoft Internet Explorer";

//alert(isIEtest);
com.whuang.hsj.filerBlank22 = true;// whether filter whitespace
com.whuang.hsj.isWhitespace = function (input) {// whether has whitespace
    if (input == undefined || input == null) {
        return false;
    }
    var whitespace = " \t\n\r";
    for (var i = 0; i < input.length; i++) {
        var c = input.charAt(i);
        if (whitespace.indexOf(c) >= 0) {
            return true;
        }
    }
    return false;
};
/**
 * whether has value
 *
 * @param {Object}
 *            input
 */
com.whuang.hsj.isHasValue = function (input) {
    if (typeof input === "number" && input === 0) {
        return true;
    }
    if (!input) {
        return false;
    }
    if (input == undefined || input == null || input == "" || com.whuang.hsj.isWholeWhitespace(input)) {
        return false;
    }
    return true;
};
/***
 * is the same as com.whuang.hsj.isHasValue
 * @type {isHasValue}
 */
com.whuang.hsj.hasValue = com.whuang.hsj.isHasValue;

com.whuang.hsj.isEmpty = function (input2) {
    if (typeof input2 === "number" && input2 === 0) {
        return false;
    }
    if (input2 == undefined || input2 == null) {
        return true;
    } else {
        if (typeof input2 == 'object') {
            input2 = input2.value;
        }
        return (input2 == "" || input2 == undefined);
    }
};
com.whuang.hsj.empty = com.whuang.hsj.isEmpty;
/**
 * whether array2 contains one3
 *
 * @param {Array}
 *            array2
 * @param {Object}
 *            one3
 */
com.whuang.hsj.containsHw = function (array2, one3) {
    if (!('length' in array2)) {
        return false;
    }
    for (var i = 0; i < array2.length; i++) {
        var arrOne = array2[i];
        if (com.whuang.hsj.filerBlank22) {
            arrOne = com.whuang.hsj.trim(arrOne);
        }
        if (arrOne === one3) {
            return true;
        }
    }
    return false;
};
/***
 * if is radio ,please use com.whuang.hsj.$$arr
 * @param name22
 * @returns
 */
com.whuang.hsj.$$one = function (name22) {
    if (com.whuang.hsj.isHasValue(name22)) {
        var names222 = document.getElementsByName(name22);
        //alert("names222:"+names222);
        //alert("typeof:"+(typeof names222 ));
        var className = Object.prototype.toString.call(names222);
        var boolean_isArray;
        var ieHtmlCollection = '[object HTMLCollection]';
        if (isIEtest)//if browser is IE
        {
            boolean_isArray = ( className === '[object Object]') || (className === ieHtmlCollection) || names222 instanceof Array;
        } else {
            boolean_isArray = ( className === '[object Array]') || (className === '[object NodeList]'  ) || (className == ieHtmlCollection) || names222 instanceof Array || names222 instanceof NodeList;
        }
        if (names222) {
            if (boolean_isArray) {
                return names222[0];
            } else {
                return names222;
            }
        } else {
            return "";
        }
    } else {
        return "";
    }
};
/***
 *
 * @param name22 : value or form object
 * @returns {*}
 */
com.whuang.hsj.$$value = function (name22) {
    if (name22 == "" || name22 == undefined || name22 == null) {
        return "";
    }
    if ((typeof name22 != 'string') && ('value' in name22)) {
        // name22=name22.value;
        return name22.value;
    }
    if (com.whuang.hsj.isHasValue(name22)) {
        return com.whuang.hsj.$$one(name22).value;
    } else {
        return "";
    }
};
/*******************************************************************************
 * by name
 */
com.whuang.hsj.$$arr = function (name22) {
    return document.getElementsByName(name22);
};
/*******************************************************************************
 * by id
 */
com.whuang.hsj.$$id = function (name22) {
    if (!com.whuang.hsj.isHasValue(name22)) {
        return null;
    }
    return document.getElementById(name22);
};
/**
 * get value by given name and index for input type is text
 */
com.whuang.hsj.$$valueByIndex21 = function (name22, index) {
    if (!com.whuang.hsj.isHasValue(name22)) {
        return "";
    }
    var one22 = document.getElementsByName(name22)[index];
    return one22.value;
};
/***
 * [a,b,c]-->"a","b","c"
 */
com.whuang.hsj.string2ArrayQuotation = function (stringObj) {
    stringObj = stringObj.replace(/\[([\w, ]*)\]/, "$1");
    var arr = stringObj.split(",");
    var newArray = [];//new Array();
    for (var i = 0; i < arr.length; i++) {
        var arrOne = '"' + com.whuang.hsj.trim(arr[i]) + '"';
        newArray.unshift(arrOne);
    }
    // console.log(newArray);
    return newArray.reverse();
};
/***
 * convert string to Array object
 * right input:var jsonStr='[1,2, 3,"whuang"]';
 * wrong input:var jsonStr='[1,2, 3,whuang]';
 * @param arrStr
 */
com.whuang.hsj.parseArray = function parseArray(arrStr) {
    var tempKey = 'arr23' + new Date().getTime();//arr231432350056527
    var arrayJsonStr = '{"' + tempKey + '":' + arrStr + '}';
    var arrayJson;
    if (JSON && JSON.parse) {
        arrayJson = JSON.parse(arrayJsonStr);
    } else {
        arrayJson = eval('(' + arrayJsonStr + ')');
    }
    return arrayJson[tempKey];
};
com.whuang.hsj.string2Array = function string2Array(stringObj) {
    stringObj = stringObj.replace(/\[([\w, ]*)\]/, "$1");
    if (stringObj.indexOf("[") == 0) {// if has chinese
        stringObj = stringObj.substring(1, stringObj.length - 1);
    }
    var arr = stringObj.split(",");
    var newArray = [];//new Array();
    for (var i = 0; i < arr.length; i++) {
        var arrOne = com.whuang.hsj.trim(arr[i]);
        newArray.push(arrOne);
    }
    // console.log(newArray);
    return newArray;
};
com.whuang.hsj.string2ArrayString = function (stringObj) {
    stringObj = stringObj.replace(/\[([\w, ]*)\]/, "$1");
    // console.log(stringObj);
    return stringObj;
};
/**
 * whether is a normal string
 *
 * @param {Object}
 *            input
 */
com.whuang.hsj.isString = function (input) {
    if (typeof selectObj == 'string') {
        var regx = /^[0-9a-zA-Z]+[\w-.]*[0-9a-zA-Z]*$/i;
        if (regx.test(input)) {
            return true;
        }
    }
    return false;
};
com.whuang.hsj.isWholeNumber = function (input) {
    var regx = /^[0-9]+$/;
    if (regx.test(input)) {
        return true;
    } else {
        return false;
    }
};
/*******************************************************************************
 * input:18:20:05
 */
com.whuang.hsj.isTime = function (input) {
    var regx = /[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/;
    if (regx.test(input)) {
        return true;
    } else {
        return false;
    }
};
/*******************************************************************************
 * input:2013-09-15
 */
com.whuang.hsj.isDate = function (input) {
    var regx = /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/;
    if (regx.test(input)) {
        return true;
    } else {
        return false;
    }
};
com.whuang.hsj.isDateTime = function (input) {
    var regx = /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}[ T][0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/;
    if (regx.test(input)) {
        return true;
    } else {
        return false;
    }
};
/**
 * the times <find> show up/found in <str>
 */
com.whuang.hsj.sumShowup = function (str, find) {
    var reg = new RegExp(find, "g");
    var c = str.match(reg);
    return (c ? c.length : 0);
};

/**
 * float number : 23.5(valid); 23..5 (invalid)
 */
com.whuang.hsj.isWholeFloatNumber = function (input) {
    var regx = /^[0-9.]+$/;
    if (regx.test(input)) {
        var sumShow = com.whuang.hsj.sumShowup(input, "\\.");
        if (Number(sumShow) < 2) {
            return true;
        }
    }
    return false;
};
/**
 * is whitespace entirely
 *
 * @param {Object}
 *            inputString
 */
com.whuang.hsj.isWholeWhitespace = function (inputString) {
    if (typeof inputString == "object") {
        return inputString;
    }
    if (typeof inputString == 'number') {
        return false;
    }
    var bootInit = true;
    if (inputString == "" || inputString == undefined) {
        return false;
    }
    for (var i = 0; i < inputString.length; i++) {
        var c = inputString.charAt(i);
        if (!com.whuang.hsj.isWhitespace(c)) {
            bootInit = false;
            break;
        }
    }
    return bootInit;
};
/**
 * get length of given string byte ,and not char
 *
 * @param {Object}
 *            input
 */
com.whuang.hsj.lengthStr = function (input) {
    var length2 = 0;
    for (var i = 0; i < input.length; i++) {
        if (input.charCodeAt(i) > 255) {
            length2 += 2;
        } else {
            length2++;
        }
    }
    return length2;
};
/**
 * select component
 *
 * @param {Object}
 *            selectObj
 * @param {Object}
 *            value33
 */
com.whuang.hsj.setSelectByValue = function (selectObj, value33) {
    if (selectObj == null || selectObj == undefined) {
        return;
    }
    var options22 = selectObj.options;
    if (options22 == null || options22 == undefined) {
        return;
    }
    for (var i = 0; i < options22.length; i++) {
        var option33 = options22[i];
        if (option33.value == value33) {
            option33.selected = true;
            // selectObj.selectedIndex=i;
            break;
        }
    }
};
/**
 * select component
 *
 * @param {Object}
 *            selectObj
 * @param {Object}
 *            value33
 */
com.whuang.hsj.setSelectByLabel = function (selectObj, value33) {
    if (typeof selectObj === 'string') {
        selectObj = com.whuang.hsj.$$one(selectObj);
    }
    var options22 = selectObj.options;
    if (!options22) {
        return;
    }
    for (var i = 0; i < options22.length; i++) {
        var option33 = options22[i];
        if (option33.label == value33) {
            option33.selected = true;
            // selectObj.selectedIndex=i;
            break;
        }
    }
};
/**
 * select component
 *
 * @param {Object}
 *            selectObj
 * @param {Object}
 *            index22
 */
com.whuang.hsj.setSelectByIndex = function (selectObj, index22) {
    if (typeof selectObj === 'string') {
        selectObj = com.whuang.hsj.$$one(selectObj);
    }
    selectObj.selectedIndex = index22;
};
com.whuang.hsj.setSelectByIndex = function (selectObj) {
    if (typeof selectObj == 'string') {
        selectObj = com.whuang.hsj.$$one(selectObj);
    }
    return selectObj.selectedIndex;
};
/**
 * checkbox component
 *
 * @param {Object}
 *            checkboxObj
 */
com.whuang.hsj.isCheckcheckbox = function (checkboxObj) {
    var boolinit = false;
    if (checkboxObj == undefined) {
        return boolinit;
    }
    if (typeof checkboxObj === 'string') {
        checkboxObj = com.whuang.hsj.$$one(checkboxObj);
    }

    if (!('length' in checkboxObj)) {// just only single checkbox .
        return checkboxObj.checked;
    }
    var length = checkboxObj.length;// if is many checkbox ,or checkbox array
    for (var i = 0; i < length; i++) {
        var checkboxOne = checkboxObj.item(i);
        if (checkboxOne.checked) {
            boolinit = true;
            break;
        }
    }
    return boolinit;
};
/**
 * just only single checkbox
 *
 * @param {Object}
 *            checkboxObj
 */
com.whuang.hsj.isCheckcheckboxOne = function (checkboxObj) {
    if ((!checkboxObj) || checkboxObj == undefined) {
        return false;
    }
    return checkboxObj.checked;
};

com.whuang.hsj.isCheckcheckboxByIndex = function (checkboxObj, index32) {
    if ((!checkboxObj) || checkboxObj == undefined) {
        return false;
    }
    var checkboxOne = checkboxObj.item(index32);
    if (checkboxOne.checked) {
        return true;
    }
    return false;
};
com.whuang.hsj.toggleCheckbox = function (checkboxOne) {
    if (checkboxOne.checked) {
        checkboxOne.checked = false;
    } else {
        checkboxOne.checked = true;
    }
}
/**
 * get sum count of checked checkbox(s)
 *
 * @param {Object}
 *            checkboxsObj
 */
com.whuang.hsj.getCheckboxCount = function (checkboxsObj) {
    var j = 0;
    var length = checkboxsObj.length;
    for (var i = 0; i < length; i++) {
        var checkboxOne = checkboxsObj.item(i);
        if (checkboxOne.checked) {
            j++;
        }
    }
    return j;
};
/**
 *
 * @param {Object}
 *            checkboxsObj
 * @return Array
 */
com.whuang.hsj.getCheckboxValue = function (checkboxsObj) {
    if (checkboxsObj == undefined) {
        return null;
    }
    var result = [];// new Array();
    var length = checkboxsObj.length;
    for (var i = 0; i < length; i++) {
        var checkboxOne = checkboxsObj.item(i);
        if (checkboxOne.checked) {
            var checkboxValue = checkboxOne.value;
            result.push(checkboxValue);
        }
    }
    return result;
};
com.whuang.hsj.getCheckboxValueByIndex = function (checkboxsObj, index23) {
    if (typeof checkboxsObj === 'string') {
        checkboxsObj = com.whuang.hsj.$$arr(checkboxsObj);
    }
    var checkboxOne = checkboxsObj.item(index23);
    return checkboxOne.value;
};
/**
 *
 * @param {Object}
 *            checkboxsObj
 * @return Array
 */
com.whuang.hsj.getCheckboxIndex = function (checkboxsObj) {
    if (typeof checkboxsObj === 'string') {
        checkboxsObj = com.whuang.hsj.$$arr(checkboxsObj);
    }
    var result = [];// new Array();
    var length = checkboxsObj.length;
    for (var i = 0; i < length; i++) {
        var checkboxOne = checkboxsObj.item(i);
        if (checkboxOne.checked) {
            result.push(i);
        }
    }
    return result;
};
/**
 * get last index checked
 *
 * @param {Object}
 *            checkboxsObj
 */
com.whuang.hsj.getCheckboxLastIndex = function (checkboxsObj) {
    if (typeof checkboxsObj === 'string') {
        checkboxsObj = com.whuang.hsj.$$arr(checkboxsObj);
    }
    var resultLastIndex = -1;
    var length = checkboxsObj.length;
    for (var i = length - 1; i >= 0; i--) {
        var checkboxOne = checkboxsObj.item(i);
        if (checkboxOne.checked) {
            resultLastIndex = i;
            return resultLastIndex;
        }
    }
    return resultLastIndex;
};
/**
 * checkbox component function :Choose the first
 *
 * @param {Object}
 *            checkboxess sequence22
 * @param {Object}
 *            sequence22
 */
com.whuang.hsj.setCheckboxByLastIndex = function (checkboxess, sequence22) {
    if (typeof checkboxsObj === 'string') {
        checkboxsObj = com.whuang.hsj.$$arr(checkboxsObj);
    }
    var length = checkboxess.length;
    for (var i = 0; i < length; i++) {
        var checkboxOne = checkboxess.item(i);
        if (i < sequence22) {
            checkboxOne.checked = true;
        } else {
            checkboxOne.checked = false;
        }
    }
};
/*******************************************************************************
 * cancel select the single checkbox
 */
com.whuang.hsj.deCheckedCheckboxOne = function (checkbox2233) {
    if (typeof checkbox2233 === 'string') {
        checkbox2233 = com.whuang.hsj.$$one(checkbox2233);
        if (checkbox2233 == null || checkbox2233 == undefined) {
            checkbox2233 = com.whuang.hsj.$$id(checkbox2233);
        }
    }
    if (checkbox2233.checked) {
        checkbox2233.checked = false;
    }
};
/*******************************************************************************
 * select the single checkbox
 */
com.whuang.hsj.setCheckedCheckboxOne = function (checkbox2233) {
    if (typeof checkbox2233 === 'string') {
        checkbox2233 = com.whuang.hsj.$$one(checkbox2233);
        if (checkbox2233 == null || checkbox2233 == undefined) {
            checkbox2233 = com.whuang.hsj.$$id(checkbox2233);
        }
    }
    checkbox2233.checked = true;
};
/**
 * checkbox component
 *
 * @param {Object}
 *            checkboxess
 * @param {Object}
 *            indexss
 */
com.whuang.hsj.setCheckboxByIndex2 = function (checkboxess, indexss, boolean23) {
    var indexsArr;
    if (typeof indexss === "object") {
        indexsArr = indexss;
    } else {
        indexss = com.whuang.hsj.trim(indexss);

        if (checkboxess == null || !com.whuang.hsj.isHasValue(indexss)) {
            indexsArr = [-1];// indexss is "" or null
        } else {
            if (!(typeof indexss === "number")) {// if input is not a number
                indexss = indexss.replace(/\s+/g, " ");// many blank to one
                // blank
                if (indexss.indexOf(",") >= 0) {// using ","
                    indexsArr = indexss.split(",");
                } else {
                    indexsArr = indexss.split(" ");// using " "
                }
            } else {
                indexsArr = new Array();
                indexsArr.unshift(indexss);
            }
        }
    }
    if ('length' in checkboxess) {
        var length = checkboxess.length;
        for (var i = 0; i < length; i++) {
            var checkboxOne = checkboxess.item(i);
            if (com.whuang.hsj.containsHw(indexsArr, i)) {
                checkboxOne.checked = boolean23;
            } else {
                checkboxOne.checked = !boolean23;
            }
        }
    } else {
        checkboxess.checked = boolean23;
    }
};
/*******************************************************************************
 * select checkbox by index(sequeence)
 */
com.whuang.hsj.setCheckboxByIndex = function (checkboxess, indexss) {
    com.whuang.hsj.setCheckboxByIndex2(checkboxess, indexss, true);
};
/*******************************************************************************
 * cancel select checkbox by index(sequeence)
 */
com.whuang.hsj.deSetCheckboxByIndex = function (checkboxess, indexss) {
    com.whuang.hsj.setCheckboxByIndex2(checkboxess, indexss, false);
};
com.whuang.hsj.deSetCheckbox = function (checkboxes222) {
    if (typeof checkboxes222 == 'string') {
        checkboxes222 = com.whuang.hsj.$$one(checkboxes222);
    }
    checkboxes222.checked = false;
}
/**
 * checkbox component
 *
 * @param {Object}
 *            checkboxess
 * @param {String}
 *            value of checkbox
 */
com.whuang.hsj.setCheckboxByValue = function (checkboxess, indexss) {
    var indexsArr;
    if (typeof indexss === "object") {
        indexsArr = indexss;
    } else {
        if (!com.whuang.hsj.isHasValue(indexss)) {
            return;
        }
        indexss = com.whuang.hsj.trim(indexss).replace(/\s+/g, " ");

        if (indexss.indexOf(",") >= 0) {// using ","
            indexsArr = indexss.split(",");
        } else {
            indexsArr = indexss.split(" ");// using " "
        }
    }
    var length = checkboxess.length;
    for (var i = 0; i < length; i++) {
        var checkboxOne = checkboxess.item(i);
        if (com.whuang.hsj.containsHw(indexsArr, com.whuang.hsj
                .trim(checkboxOne.value))) {
            checkboxOne.checked = true;
        } else {
            checkboxOne.checked = false;
        }
    }
};
/**
 * 1,3,5-->[1,3,5]
 */
com.whuang.hsj.string2ArrayCommon = function (stringObj) {
    if (typeof stringObj === "object") {
        return;
    }
    stringObj = stringObj.replace(/\[([\w, ]*)\]/, "$1");
    var arrOld = stringObj.split(",");
    return arrOld;
};
com.whuang.hsj.javaString2jsString = function (stringObj) {
    stringObj = stringObj.replace(/\[([\w, ]*)\]/, "$1");
    return stringObj;
};
/**
 * [2,5,4]-->[1,4,3]
 */
com.whuang.hsj.intArrayOffset = function (intArray, offset) {
    var newArray = [];// new Array();
    for (var i = 0; i < intArray.length; i++) {
        var one = String(Number(intArray[i]) - offset);
        newArray.unshift(one);
    }
    return newArray.reverse();
};
com.whuang.hsj.stringOffset = function (stringObj, offset) {
    var oldArray = com.whuang.hsj.string2Array(stringObj);
    return com.whuang.hsj.intArrayOffset(oldArray, offset);
};

com.whuang.hsj.trim = function (str) { //
    if (typeof str === "object") {
        return str;
    }
    if (str == null || str == "" || str == undefined) {
        return str;
    }
    if (typeof str === "number") {
        return str;
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
};
/**
 *
 * @param {Object}
 *            str
 */
com.whuang.hsj.ltrim = function (str) { //
    if (typeof str === "object") {
        return str;
    }
    if (str == null || str == "" || str == undefined) {
        return str;
    }
    return str.replace(/(^\s*)/g, "");
};
/**
 *
 * @param {Object}
 *            str
 */
com.whuang.hsj.rtrim = function (str) { //
    if (typeof str === "object") {
        return str;
    }
    if (str == null || str == "" || str == undefined) {
        return str;
    }
    return str.replace(/(\s*$)/g, "");
};

/**
 * radio component
 *
 */
com.whuang.hsj.isRadioChecked22 = function (objs) {
    if ((!objs) || objs == undefined) {
        return false;
    }
    var initBool = false;
    for (var i = 0; i < objs.length; i++) {
        var oneOption = objs.item(i);
        if (oneOption.checked) {
            initBool = true;
            break;
        }
    }
    return initBool;
};

/**
 * radio component
 *
 */
com.whuang.hsj.deSelRadioChecked22 = function (objs) {
    var initBool = false;
    for (var i = 0; i < objs.length; i++) {
        var oneOption = objs.item(i);
        if (oneOption.checked) {
            oneOption.checked = false;
        }
    }
    return initBool;
};
/**
 * radio component
 *
 * @param {Object}
 *            objs
 */
com.whuang.hsj.getRadioValue = function (objs) {
    for (var i = 0; i < objs.length; i++) {
        var oneOption = objs.item(i);
        if (oneOption.checked) {
            return oneOption.value;
            break;
        }
    }
    return null;
};
/**
 * get index of checked radio
 */
com.whuang.hsj.getRadioCheckedIndex = function (objs) {
    for (var i = 0; i < objs.length; i++) {
        var oneOption = objs.item(i);
        if (oneOption.checked) {
            return i;
            break;
        }
    }
    return -1;
};
/**
 * radio component
 *
 * @param {Object}
 *            objs
 * @param {Object}
 *            value2
 */
com.whuang.hsj.setCheckedRadioByValue = function (objs, value2) {
    if (typeof objs === 'string') {
        objs = com.whuang.hsj.$$arr(objs);
    }
    for (var i = 0; i < objs.length; i++) {
        var oneOption = objs.item(i);
        if (oneOption.value == value2) {
            // oneOption.checked='checked';
            oneOption.checked = true;
            break;
        }
    }
};
/**
 * radio component
 *
 * @param {Object}
 *            objs
 * @param {Object}
 *            radio
 */
com.whuang.hsj.getCheckedRadioByValue2 = function (objs, value2) {
    for (var i = 0; i < objs.length; i++) {
        var oneOption = objs.item(i);
        if (oneOption.value == value2) {
            // oneOption.checked='checked';
            return oneOption;
        }
    }
};
/**
 * according index to check
 *
 * @param {Object}
 *            objs
 * @param {Object}
 *            index2
 */
com.whuang.hsj.setCheckedRadioByIndex = function (objs, index2) {
    var oneOption = objs.item(index2);
    // oneOption.checked='checked';
    oneOption.checked = true;
};

/**
 * decide whether is selected
 *
 * @param {Object}
 *            selectObj
 */
com.whuang.hsj.isSelectedOption = function (selectObj) {
    if ((!selectObj) || selectObj == undefined) {
        return false;
    }
    var selectedIndex = selectObj.selectedIndex;
    if (selectedIndex >= 1) {
        return true;
    } else {
        return false;
    }
};
/**
 * select component
 */
com.whuang.hsj.getSelectedOptionLabel = function (selectObj) {
    if (typeof selectObj === 'string') {
        selectObj = com.whuang.hsj.$$one(selectObj);
        if (selectObj == null || selectObj == undefined) {
            selectObj = com.whuang.hsj.$$id(selectObj);
        }
    }
    var selectedIndex = selectObj.selectedIndex;
    if (selectedIndex >= 0) {// omit the first option
        var selectOption = selectObj.options[selectedIndex];
        /*if ("textContent" in selectOption) {// textContent is specific to
         // Internet explorer and firefox has
         // no this attribute
         return selectOption.textContent;
         } else {
         return selectOption.label;
         }*/
        return selectOption.textContent || selectOption.label;

    } else {
        return "";
    }

};
/*******************************************************************************
 * Get value of select component(drop-down box)
 */
com.whuang.hsj.getSelectedOptionValue = function (selectObj) {
    if (typeof selectObj === 'string') {
        selectObj = com.whuang.hsj.$$one(selectObj);
        if (selectObj == null || selectObj == undefined) {
            selectObj = com.whuang.hsj.$$id(selectObj);
        }
    }
    var selectedIndex = selectObj.selectedIndex;
    if (selectedIndex >= 0) {// omit the first option
        var selectOption = selectObj.options[selectedIndex];
        return selectOption.value;
    } else {
        return "";
    }

};
/**
 * radio component
 *
 * @param {Object}
 *            radios22
 */
com.whuang.hsj.getLastRadio = function (radios22) {
    var length = radios22.length;
    if (!length) {
        return null;
    }
    return radios22.item(length - 1);
};
/**
 * radio component
 *
 * @param {Object}
 *            radios22
 */
com.whuang.hsj.getFirstRadio = function (radios22) {
    return radios22.item(0);
};
/**
 * whether checkbox selected index is continual
 *
 * @param {Object}
 *            checkboxObj
 */
com.whuang.hsj.continuationCheckbox = function (checkboxObj) {
    var checkIndexes = com.whuang.hsj.getCheckboxIndex(checkboxObj);
    var lastIndex = com.whuang.hsj.getCheckboxLastIndex(checkboxObj);
    if (lastIndex == -1) {
        return false;
    }
    if (checkIndexes.length == lastIndex + 1) {
        return true;
    } else {
        return false;
    }
};
com.whuang.hsj.isUsername = function (username22) {
    if (username22 == undefined || username22 == null || username22 == "") {
        return false;
    }
    if (com.whuang.hsj.isHasValue(username22) && isString(username22)) {
        return true;
    }
    return false;
};

com.whuang.hsj.isEmail = function (email23) {
    var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    var chkFlag = pattern.test(email23);
    if (chkFlag) {
        return true;
    } else {
        return false;
    }
};
com.whuang.hsj.isValidMail = function (sText) {
    var reMail = /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
    return (reMail.test(sText));
};
/**
 * get indexes of textbox which has the same name
 *
 * @param {string}
 *            textbox33
 */
com.whuang.hsj.getTextboxIndexArr = function (textbox33) {
    var arr = [];// new Array();
    var textboxes;
    if (typeof textbox33 === "object") {
        textboxes = textbox33;
    } else {
        textboxes = com.whuang.hsj.$$arr(textbox33);
    }
    for (var i = 0; i < textboxes.length; i++) {
        if (com.whuang.hsj.isHasValue(textboxes[i].value)) {
            arr.unshift(i);
        }
    }
    return arr.reverse();
};
com.whuang.hsj.getTextboxLastIndex = function (textbox33) {
    var textboxes;
    if (typeof textbox33 === "object") {
        textboxes = textbox33;
    } else {
        textboxes = com.whuang.hsj.$$arr(textbox33);
    }
    var ii = 0;
    for (var i = 0; i < textboxes.length; i++) {
        if (com.whuang.hsj.isHasValue(textboxes[i].value)) {
            ii++;
        }
    }
    return ii;
};
/**
 * decide whether has any textbox with value
 *
 * @param {string}
 *            textbox33
 */
com.whuang.hsj.isHasValuetextboxes = function (textbox33) {
    var boolini = false;
    var textboxes;
    if (typeof textbox33 === "object") {
        textboxes = textbox33;
    } else {
        textboxes = com.whuang.hsj.$$arr(textbox33);
    }
    for (var i = 0; i < textboxes.length; i++) {
        if (com.whuang.hsj.isHasValue(textboxes[i].value)) {
            boolini = true;
            break;
        }
    }
    return boolini;
};
/**
 *
 * @param {name}
 *            checkbox22
 * @param {name}
 *            textbox23
 */
com.whuang.hsj.isValidCheckTextbox = function (checkbox2233, textbox23) {
    var boolini = true;
    var checkbox22;
    if (typeof checkbox2233 === "object") {
        checkbox22 = checkbox2233;
    } else {
        checkbox22 = com.whuang.hsj.$$arr(checkbox2233);
        ;
    }
    if (com.whuang.hsj.isHasValueOption(checkbox22, textbox23)) {
        var textboxes = com.whuang.hsj.$$arr(textbox23);
        for (var i = 0; i < textboxes.length; i++) {
            if (com.whuang.hsj.isHasValue(textboxes[i].value)) {
                var isCheckedByIndex = com.whuang.hsj.isCheckcheckboxByIndex(
                    checkbox22, i);
                if (!isCheckedByIndex) {
                    boolini = false;
                    break;
                }
            }
        }
    } else {
        return false;
    }
    return boolini;

};
/**
 *
 * @param {Object}
 *            checkbox223
 */
com.whuang.hsj.isHasValueOption = function (checkbox223, textboxName) {
    var indexes;
    var checkboxObj;
    if (typeof checkbox223 === "object") {
        checkboxObj = checkbox223;
    } else {
        /**
         * get selected indexes of checkbox
         */
        checkboxObj = com.whuang.hsj.$$arr(checkbox223);
    }
    indexes = com.whuang.hsj.getCheckboxIndex(checkboxObj);
    for (var i = 0; i < indexes.length; i++) {
        // var optionValue=com.whuang.hsj.$$valueByIndex21("options_value",i);
        // var optionValue=document.getElementsByName("options_value")[i];
        var optionValue = com.whuang.hsj.$$valueByIndex21(textboxName,
            indexes[i]);
        if (!com.whuang.hsj.isHasValue(optionValue)) {
            return false;
        }
    }
    return true;
};

/**
 * disable the component
 *
 * @param {Object}
 *            objArr
 */
com.whuang.hsj.disAbled = function (objArr) {
    if (!objArr) {
        console.log('objArr is undefined');
        return;
    }
    if (!('length' in objArr)) {// just only single checkbox .
        objArr.disabled = "disabled";
        // .disabled=true;
        return;
    }
    for (var i = 0; i < objArr.length; i++) {
        var objOne = objArr[i];
        objOne.disabled = "disabled";
    }
};
/**
 * O must be upper case
 *
 * @param objArr :
    *            can be string ,object or {object}
 */
com.whuang.hsj.readonly22 = function (objArr) {
    if (typeof objArr === "string") {// if argument is a string
        objArr = com.whuang.hsj.$$one(objArr);
    }
    if (!('length' in objArr)) {// just only single checkbox (not array).
        objArr.readOnly = "readonly";
        return;
    }
    for (var i = 0; i < objArr.length; i++) {
        var objOne = objArr[i];
        // objOne.readonly="readonly";//error
        objOne.readOnly = "readonly";// right
    }
};
/**
 * enable the component
 *
 * @param {Object}
 *            objArr
 */
com.whuang.hsj.enAbled = function (objArr) {
    if (!('length' in objArr)) {// just only single checkbox .
        objArr.disabled = false;
        // .disabled=true;
        return;
    }
    for (var i = 0; i < objArr.length; i++) {
        var objOne = objArr[i];
        objOne.disabled = false;
    }
};
com.whuang.hsj.deReadonlyOne = function (obj) {
    obj.readOnly = "";
}
/***
 * make input object can writable
 */
com.whuang.hsj.deReadonly22 = function (objArr) {
    if (typeof objArr == "string") {// if argument is a string
        objArr = com.whuang.hsj.$$one(objArr);
    }
    if (!('length' in objArr)) {// just only single checkbox (not array).
        objArr.readOnly = "";
        return;
    }
    for (var i = 0; i < objArr.length; i++) {
        var objOne = objArr[i];
        // objOne.readonly="readonly";//error
        objOne.readOnly = "";// right
    }
};

/**
 * com.whuang.hsj.hide22(document.getElementsByName('options_value'));
 *
 * @param {Object}
 *            objArr
 */
com.whuang.hsj.hide22 = function (objArr) {
    // alert(typeof objArr);
    for (var i = 0; i < objArr.length; i++) {
        var objOne = objArr[i];
        objOne.style.display = "none";
    }
};
/**
 * hide the component
 *
 * @param {Object}
 *            one33
 */
com.whuang.hsj.hideOne = function (one33) {
    one33.style.display = "none";
};
/*******************************************************************************
 * hide component object,and Parameters are variable length
 */
com.whuang.hsj.hideVariable = function () {
    var i, numargs = arguments.length;
    for (i = 0; i < numargs; i++) {
        com.whuang.hsj.hideOne(arguments[i]);
    }
};

/*******************************************************************************
 * show one component
 */
com.whuang.hsj.showOne = function (divObj) {
    divObj.style.display = "block";
};
/*******************************************************************************
 * show component object,and Parameters are variable length
 */
com.whuang.hsj.showVariable = function () {
    var i, numargs = arguments.length;
    for (i = 0; i < numargs; i++) {
        com.whuang.hsj.showOne(arguments[i]);
    }
};
/**
 * show component
 *
 * @param {Object}
 *            objArr
 */
com.whuang.hsj.show22 = function (objArr) {
    if (!('length' in objArr)) {// just only single component (not array).
        objArr.style.display = "block";
    } else {
        for (var i = 0; i < objArr.length; i++) {
            var objOne = objArr[i];
            objOne.style.display = "block";
        }
    }

};
/***
 * whether is  shown
 * @param obj22
 * @returns {boolean}
 */
com.whuang.hsj.isShow = function (obj22) {
    if (typeof obj22 == 'string') {
        obj22 = com.whuang.hsj.$$id(obj22);
    }
    var dispalyValue = obj22.style.display;
    if (dispalyValue == '' || dispalyValue == 'block' || dispalyValue == 'inline-block') {
        return true;
    } else {
        return false;
    }
}
/**
 * validate int type textbox
 *
 * @param Object
 *            textbox22
 * @param string
 *            desc
 */
com.whuang.hsj.checkIntTextbox = function (textbox22, desc) {
    if (!com.whuang.hsj.isHasValue(textbox22.value)) {
        alert(desc + " should not be null.");
        textbox22.focus();
        return false;
    } else {
        if (!com.whuang.hsj.isWholeNumber(textbox22.value)) {
            alert(desc + " invalid,please input again.");
            textbox22.select();
            return false;
        }
    }
    return true;
};

com.whuang.hsj.setTextboxs = function (textboxs22, values) {
    for (var i = 0; i < textboxs22.length; i++) {
        textboxs22[i].value = values[i];
    }
};
/**
 *
 * @param {Object}
 *            obj23
 */
com.whuang.hsj.isDisabled = function (obj23) {
    if (obj23.disabled) {
        return true;
    } else {
        return false;
    }
};
/**
 * need to be valied
 */
com.whuang.hsj.isReadOnly = function (obj23) {
    if (obj23.readOnly) {
        return true;
    } else {
        return false;
    }
};
/**
 *
 * @param {Object}
 *            msg
 */
com.whuang.hsj.confirmDelete = function (msg) {
    if (!com.whuang.hsj.isHasValue(msg)) {
        msg = "Are you sure to delete ?";
    }
    var bl = confirm(msg);
    return bl;
};

/**
 * input22:name of input tag
 */
com.whuang.hsj.isHasValueByName = function (input22) {
    var realName = com.whuang.hsj.$$one(input22);
    var initBool = com.whuang.hsj.isHasValue(realName.value);
    realName = null;// free memory
    return initBool;
};
/**
 * example:input type="checkbox" name="id_selected_1" Determine whether there
 * are multiple checkbox in which one or more checkbox is selected
 *
 * @param {Object}
 *            prefixStr
 * @param {Object}
 *            countMin
 * @param {Object}
 *            countMax
 */
com.whuang.hsj.isSel4CheckboxbySequence = function (prefixStr, countMin,
                                                    countMax) {
    var initBool = false;
    for (var ik = countMin; ik <= countMax; ik++) {
        var checkbox227 = com.whuang.hsj.$$arr(prefixStr + ik);
        if (checkbox227 == null || checkbox227 == undefined) {

        } else {
            if (com.whuang.hsj.isCheckcheckbox(checkbox227)) {
                initBool = true;
                checkbox227 = null;// free memory
                break;
            }
        }
    }
    return initBool;
};

com.whuang.hsj.isSelectlAll4CheckboxbySequence = function (prefixStr, countMin,
                                                           countMax) {
    var initBool = true;
    for (var ik = countMin; ik <= countMax; ik++) {
        var checkbox227 = com.whuang.hsj.$$arr(prefixStr + ik);
        if (checkbox227 == null || checkbox227 == undefined) {

        } else {
            if (!com.whuang.hsj.isCheckcheckbox(checkbox227)) {
                initBool = false;
                checkbox227 = null;// free memory
                break;
            }
        }
    }
    return initBool;
};
/*******************************************************************************
 * select all
 */
com.whuang.hsj.setSel4CheckboxbySequence = function (prefixStr, countMin,
                                                     countMax) {
    for (var ik = countMin; ik <= countMax; ik++) {
        var checkbox227 = com.whuang.hsj.$$arr(prefixStr + ik);
        if (checkbox227 == null || checkbox227 == undefined) {
        } else {
            if (!com.whuang.hsj.isCheckcheckbox(checkbox227)) {
                com.whuang.hsj.setCheckboxByIndex(checkbox227, 0);
            }
        }
    }
};
/*******************************************************************************
 * cancel select
 */
com.whuang.hsj.deSetSel4CheckboxbySequence = function (prefixStr, countMin,
                                                       countMax) {
    for (var ik = countMin; ik <= countMax; ik++) {
        var checkbox227 = com.whuang.hsj.$$one(prefixStr + ik);
        if (checkbox227 == null || checkbox227 == undefined) {
        } else {
            if (com.whuang.hsj.isCheckcheckbox(checkbox227)) {
                // com.whuang.hsj.deSetCheckboxByIndex(checkbox227, 0, false);
                com.whuang.hsj.deSetCheckbox(checkbox227);
            }
        }
    }
};

com.whuang.hsj.deSetSel4CheckboxbySequence2 = function (prefixStr, countMax) {
    com.whuang.hsj.deSetSel4CheckboxbySequence(prefixStr, 1, countMax);
};
com.whuang.hsj.setSel4CheckboxbySequence2 = function (prefixStr, countMax) {
    com.whuang.hsj.setSel4CheckboxbySequence(prefixStr, 1, countMax);
};
/***
 * make checkbox selected
 * @param checkbox2
 */
com.whuang.hsj.setSelectedCheckbox = function (checkbox2) {
    checkbox2.checked = true;
};
/**
 * example:input type="checkbox" name="id_selected_1" Determine whether there
 * are multiple checkbox in which one or more checkbox is selected
 *
 * @param {Object}
 *            prefixStr
 * @param {Object}
 *            countMax function name must use diffrent name !!!
 */
com.whuang.hsj.isSel4CheckboxbySequence2 = function (prefixStr, countMax) {
    return com.whuang.hsj.isSel4CheckboxbySequence(prefixStr, 1, countMax);
};
/**
 * example:input type="checkbox" name="id_selected_1"
 *
 * @param {Object}
 *            prefix23
 * @param {Object}
 *            countMin
 * @param {Object}
 *            countMax
 */
com.whuang.hsj.getCheckboxArrByPrefix = function (prefix23, countMin, countMax) {
    var arr = new Array();
    for (var ik = countMin; ik <= countMax; ik++) {
        arr.unshift(com.whuang.hsj.$$arr(prefix23 + ik));
    }
    return arr.reverse();// reverse sequence
};
/**
 * example:input type="checkbox" name="id_selected_1"
 *
 * @param {Object}
 *            prefix23
 * @param {Object}
 *            countMax
 */
com.whuang.hsj.getCheckboxArrByPrefix2 = function (prefix23, countMax) {
    return com.whuang.hsj.getCheckboxArrByPrefix(prefix23, 1, countMax);
};

/*******************************************************************************
 * batch toggle checkbox
 */
com.whuang.hsj.selectAllcheckbox = function (checkboxobj, prefixStr, sum_int) {
    if (com.whuang.hsj.isCheckcheckboxOne(checkboxobj)) {
        com.whuang.hsj.setSel4CheckboxbySequence2(prefixStr, sum_int);
    } else {
        com.whuang.hsj.deSetSel4CheckboxbySequence2(prefixStr, sum_int);
    }
};
/*******************************************************************************
 * batch toggle checkbox
 */
// com.whuang.hsj.toggleAllCheckboxs=function(checkboxobj,sum_int,prefixion){
// var plicySize=endId- startId+1;//${fn:length(examPolicyes) }
// com.whuang.hsj.selectAllcheckbox(checkboxobj,prefixion,sum_int);
// };
/*******************************************************************************
 * check email
 *
 */
com.whuang.hsj.isEmail = function (email2) {
    if (typeof email2 == 'object') {
        email2 = email2.value;
    }
    var pattern = /^\w+([_+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return pattern.test(email2);
};
com.whuang.hsj.setBatchInputValue = function (inputName, valueArray) {
    var choic_length = valueArray.length;
    for (var i = 0; i < choic_length; i++) {
        document.getElementsByName(inputName)[i].value = valueArray[i];
    }
};

function warning_msg(decs) {
    return "<font color=\"red\" >" + decs + "</font>";
}
function right_msg(decs) {
    return "<font color=\"green\" style=\"font-weight:bold\" >" + decs
        + "</font>";
}

/**
 * check input box:whether is blank
 *
 * @param sefObj :
    *            object of input box
 * @param property_name:description,such
 *            as "goods name"; is not necessary
 * @returns {Boolean}
 */
com.whuang.hsj.checkName = function (sefObj, property_name) {
    var value = sefObj.value;// value of input box
    var name = sefObj.name;// name of input box
    /*
     * if (name == "dateTimeBean.time" || name == "dateTimeBean.date") { var
     * picker = dojo.widget.byId("picker"); // string value value =
     * picker.getValue(); }
     */
    if (property_name == undefined) {// the second argument is not
        // given/offered
        property_name = name.replace('.', ' ').replace('_', ' ');// eg.
        // name:goods.alias
    }
    var div2 = document.getElementById(name + "_div");// id of div
    // tag:goods.alias_div
    // alert(div2);
    if (com.whuang.hsj.isEmpty(value)) {
        // sefObj.focus();
        // sefObj.select();

        div2.innerHTML = warning_msg(property_name + " can not be null.");// in
        // common_util.js
        return false;
    } else {
        div2.innerHTML = right_msg("ok");// in common_util.js
        return true;
    }

};
/*******************************************************************************
 *
 * @param confirm_password:string(not
 *            value,is name)/obj
 * @param passwd2:string(not
 *            value,is name)/obj
 */
com.whuang.hsj.checkConfirmPasswd = function (confirm_password, passwd2) {
    if (typeof confirm_password == 'string') {
        confirm_password = com.whuang.hsj.$$one(confirm_password);
        if (confirm_password == null || confirm_password == undefined) {
            confirm_password = com.whuang.hsj.$$id(confirm_password);
        }
    }
    var password_value = confirm_password.value;// value of input box
    var password_name = confirm_password.name;// name of input box
    var property_name = password_name.replace('.', ' ').replace('_', ' ');// eg.
    // name:goods.alias
    var div2 = document.getElementById(password_name + "_div");// id of div
    if (typeof passwd2 == 'string') {
        passwd2 = com.whuang.hsj.$$one(passwd2);
        if (passwd2 == null || passwd2 == undefined) {
            passwd2 = com.whuang.hsj.$$id(passwd2);
        }
    }
    if (password_value != passwd2.value) {
        div2.innerHTML = warning_msg(property_name
            + " do not agree with password.");
        return false;
    } else {
        div2.innerHTML = right_msg(property_name + " is ok.");
        return true;
    }
};

com.whuang.hsj.addButton = function (parent22, onClickMethod) {
    var newInput = document.createElement("input");
    newInput.type = "button";
    parent22.appendChild(newInput);
    newInput.onclick = onClickMethod;
    return newInput;
};
com.whuang.hsj.addTextbox = function (parent22, name) {
    var newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = name;
    parent22.appendChild(newInput);
    return newInput;
};
/***
 * convert [request query string] to [json string]
 */
com.whuang.hsj.queryString2JsonStr = function (queryString) {
    return (com.whuang.hsj.object2jsonStr(com.whuang.hsj.queryString2Object(queryString)));
};

/***
 * convert [request query string] to [js object]
 */
com.whuang.hsj.queryString2Object = function (queryString) {
    if (queryString == '' || queryString == undefined) {
        return null;
    }
    var queryArray = queryString.split('&');
    var queryObj = new Object();
    for (var i = 0; i < queryArray.length; i++) {
        var oneQuery = queryArray[i];
        var oneQueryKeyValue = oneQuery.split('=');
        if (oneQueryKeyValue.length > 1) {
            queryObj[oneQueryKeyValue[0]] = oneQueryKeyValue[1];
        }
    }
    return queryObj;
};
/***
 * convert js object to json string
 */
com.whuang.hsj.object2jsonStr = function (requestObj) {
    return JSON.stringify(requestObj);
};

isCheck_checkbox = function () {
    var checkboxs22 = document.getElementsByName("hobby");
    var isChecked = com.whuang.hsj.isCheckcheckbox(checkboxs22);
    if (isChecked) {
        alert("has checked!" + " ,"
            + com.whuang.hsj.getCheckboxValue(checkboxs22));
    } else {
        alert("not has checked yet" + " ,"
            + com.whuang.hsj.getCheckboxValue(checkboxs22));
    }
};
function countCheckbox() {
    var checkboxs22 = document.getElementsByName("hobby");
    alert(com.whuang.hsj.getCheckboxCount(checkboxs22));
}

function allCheckboxIndex() {
    var checkboxs22 = document.getElementsByName("hobby");
    alert(com.whuang.hsj.getCheckboxIndex(checkboxs22));
}

function setCheckboxByIndexMethod() {
    var checkboxs22 = document.getElementsByName("hobby");
    var indexeswe = document.forms[3].checkboxIndexs23.value;
    com.whuang.hsj.setCheckboxByIndex(checkboxs22, indexeswe);
}

function setCheckboxByValuesMethod() {
    var checkboxs22 = document.getElementsByName("hobby");
    var indexeswe = document.forms[3].checkboxValues23.value;
    com.whuang.hsj.setCheckboxByValue(checkboxs22, indexeswe);
}

function CheckboxLastIndex() {
    var checkboxs22 = document.getElementsByName("hobby");
    var lastIndex = com.whuang.hsj.continuationCheckbox(checkboxs22);
    alert(lastIndex);
};
/*******************************************************************************
 * Only compatible with IE(Internet Explorer)
 */
function Addme2Favorite() {
    var userAgent = navigator.userAgent.toLowerCase();
    var browser = navigator.appName;
//	var b_version = navigator.appVersion;
//	var version = b_version.split(";");

    isIE9test = userAgent.indexOf("windows nt ") > 0
        && userAgent.indexOf("trident/5.0") > 0
        && browser == "Microsoft Internet Explorer";
    if (isIE9test) {

        var kdocTitle = document.title;// title
        if (kdocTitle == null) {
            var t_titles = document.getElementByTagName("title");
            if (t_titles && t_titles.length > 0) {
                kdocTitle = t_titles[0];
            } else {
                kdocTitle = "";
            }
        }
        var currentHref = location.href;
        window.external.AddFavorite(currentHref, kdocTitle);
    } else {//not IE
        alert("browser does not support 'window.external.AddFavorite'.");
    }
}
/***
 * 设置错误信息或成功信息(tips)
 * @param obj
 * @param spanId
 * @param message
 * @param styleClass
 * @param keepSpace
 */
com.whuang.hsj.setMessage = function (obj, spanId, message, styleClass, keepSpace) {
    if (obj != null) {
        if (obj && obj.focus) {//if include focus method
            obj.focus();
        }
    }
    var leaveMessageResultSpan;
    if (typeof spanId == 'string') {//if argument "spanId" just is a String
        leaveMessageResultSpan = com.whuang.hsj.$$id(spanId);
        if (leaveMessageResultSpan == null || leaveMessageResultSpan == undefined) {
            leaveMessageResultSpan = com.whuang.hsj.$$one(spanId);
        }
    } else {
        leaveMessageResultSpan = spanId;
    }
    var tagName2 = getTagName(leaveMessageResultSpan);
    if (tagName2 === 'span' || tagName2 === 'SPAN') {
        leaveMessageResultSpan.innerHTML = message;
    } else {
        leaveMessageResultSpan.innerHTML = message;
    }
    leaveMessageResultSpan.className = styleClass;
    function cleanUp22() {
        if (keepSpace) {
            leaveMessageResultSpan.innerHTML = "&nbsp;";
        } else {
            leaveMessageResultSpan.innerHTML = "";
        }
    }

    setTimeout(cleanUp22, 8000);
};
/***
 error message
 */
com.whuang.hsj.setErrorMessage = function (obj, spanId, message, isBig, keepSpace) {
    if (obj != null) {
        if (obj && obj.focus) {//if include focus method
            obj.focus();
        }
    }

    var leaveMessageResultSpan;
    if (typeof spanId == 'string') {//if argument "spanId" just is a String
        leaveMessageResultSpan = com.whuang.hsj.$$id(spanId);
        if (leaveMessageResultSpan == null || leaveMessageResultSpan == undefined) {
            leaveMessageResultSpan = com.whuang.hsj.$$one(spanId);
        }
    } else {
        leaveMessageResultSpan = spanId;
    }
    var styleClass;
    if (isBig) {
        styleClass = 'errormessageBig';
    } else {
        styleClass = 'errormessage';
    }
    // leaveMessageResultSpan.innerHTML="<span class='"+styleClass+"' >"+message+"</span>";
    leaveMessageResultSpan.innerHTML = message;
    if (message == undefined || !com.whuang.hsj.isHasValue(message)) {//empty message  is mean to cleanup errorMessage
        return;
    }
    leaveMessageResultSpan.className = styleClass;
    function cleanUp22() {
        if (keepSpace) {
            leaveMessageResultSpan.innerHTML = "&nbsp;";
        } else {
            leaveMessageResultSpan.innerHTML = "";
        }
    }

    setTimeout(cleanUp22, 8000);
};

com.whuang.hsj.checkNullValue = function (obj, spanId, message, keepSpace) {
    if (obj == undefined || obj == null) {
        alert("obj is undefined");
        return;
    }
    if (!obj) {
        alert("obj is undefined");
        return;
    }
    if (typeof obj == 'string') {//
        obj = com.whuang.hsj.$$one(obj);
        if (obj == null || obj == undefined) {
            obj = com.whuang.hsj.$$id(company_module_pic);
        }
    }
    if (typeof spanId == 'string') {//
        var spanIdTmp = com.whuang.hsj.$$id(spanId);
        if (spanIdTmp == null || spanIdTmp == undefined) {
            spanId = com.whuang.hsj.$$one(spanId);
        } else {
            spanId = spanIdTmp;
        }
    }
    if (!com.whuang.hsj.isHasValue(obj.value)) {
        if (spanId) {
            com.whuang.hsj.setErrorMessage(obj, spanId, message, keepSpace);
        }
        return false;
    }
    return true;
};
com.whuang.hsj.checkSelectNullValue = function (obj, spanId, message) {
    if (typeof obj == 'string') {//
        obj = com.whuang.hsj.$$one(obj);
        if (obj == null || obj == undefined) {
            obj = com.whuang.hsj.$$id(company_module_pic);
        }
    }
    if (typeof spanId == 'string') {//
        spanId = com.whuang.hsj.$$id(spanId);
        if (spanId == null || spanId == undefined) {
            spanId = com.whuang.hsj.$$one(spanId);
        }
    }
    if (!com.whuang.hsj.isSelectedOption(obj)) {
        com.whuang.hsj.setErrorMessage(obj, spanId, message);
        return false;
    }
    return true;
};
com.whuang.hsj.startWith = function (str, regex) {
    if (typeof str != 'string' || typeof regex != 'string') {
        return false;
    }
    if (!regex || !str) {
        return false;
    }
    return str.indexOf(regex) == 0;
};
com.whuang.hsj.startsWith = com.whuang.hsj.startWith;
com.whuang.hsj.endWith = function (str, regex) {
    return str.lastIndexOf(regex) == str.length - regex.length;
};
com.whuang.hsj.endsWith = com.whuang.hsj.endWith;

com.whuang.hsj.endWithArray = function (str, array2) {
    for (var i = 0; i < array2.length; i++) {
        var arrOne = array2[i];
        if (com.whuang.hsj.endsWith(str, arrOne)) {
            return true;
        }
    }
    return false;
};
//get value of cookie
com.whuang.hsj.getCookie = function (cookieKey) {
    var cookies = document.cookie ? document.cookie.split('; ') : [];

    for (var i = 0, l = cookies.length; i < l; i++) {
        var parts = cookies[i].split('=');
        if (parts && parts.length > 1) {
            if (parts[0] == cookieKey || com.whuang.hsj.trim(parts[0]) == cookieKey) {
                //username1=;
                return parts[1];
            }
        }
    }
    return '';
};
/***
 * whether is digit,1.2 is allowed
 */
com.whuang.hsj.isNumber = function (int22) {
    if (!int22 || int22 == undefined) {
        return false;
    }
    if (int22.match(/^[\d\\.]+$/i)) {
        return true;
    } else {
        return false;
    }
};
/***
 * whether is Integer,1.2 is not allowed
 */
com.whuang.hsj.isInteger = function (int22) {
    if (!int22 || int22 == undefined) {
        return false;
    }
    if (int22.match(/^[\d]+$/i)) {
        return true;
    } else {
        return false;
    }
};
/***
 * Zoom picture
 */
com.whuang.hsj.scale22 = function (isBig, company_module_pic) {
    if (typeof company_module_pic == 'string') {
        company_module_pic = com.whuang.hsj.$$id(company_module_pic);
        if (company_module_pic == null || company_module_pic == undefined) {
            company_module_pic = com.whuang.hsj.$$one(company_module_pic);
        }
    }
    if (company_module_pic == null || company_module_pic == undefined) {
        return;
    }
    var oldWidth = company_module_pic.width;
    if (oldWidth == 0) {
        return;
    }
    var speed33 = 50;
    if (com.whuang.hsj.isHasValue(company_module_pic.src)) {
        if (isBig) {
            oldWidth += speed33;
            if (oldWidth > 1300) {
                alert("can't zoom any more.");
                return;
            }
        } else {
            oldWidth -= speed33;
            if (oldWidth < 400) {
                alert("can't zoom any more.");
                return;
            }
        }

        company_module_pic.width = oldWidth;
    }


};
com.whuang.hsj.contains = function contains(source, key2, key3) {
    var isDownload = (source.indexOf(key2) > -1);
    if (arguments.length > 2 && (typeof key3 === 'string')) {
        isDownload = isDownload || (source.indexOf(key3) > -1);
    }
    if (isDownload) {
        return true;
    } else {
        return false;
    }
};
/***
 * add new className<br> test ok
 * @param obj22
 * @param className22
 */
com.whuang.hsj.addClassName = function (obj22, className22) {
    var className = obj22.className;
    obj22.className = className + " " + className22;
}
/***
 * just replace className<br> test ok
 * @param obj22
 * @param className22
 */
com.whuang.hsj.setClassName = function (obj22, className22) {
    obj22.className = '';
    obj22.className = className22;
}
/***
 * get browser type and browser version and language
 when page open,the function will be executed automaticly
 * @param write22
 * @returns {{systemLanguage,userLanguage,ver}}
 */
com.whuang.hsj.getBrowserVersion = (function (write22) {
    var browser = {};
//    console.dir(navigator);
    var userAgent = navigator.userAgent.toLowerCase();
    /*for(osvId in navigator){
     var value222=navigator[osvId];
     document.writeln(osvId+":&nbsp;"+value222+'<br>');
     }*/
    var lang22 = navigator.language;
//    document.writeln(userAgent+'<br>');
//    document.writeln(navigator.appCodeName+'<br>');
    var s;
    (s = userAgent.match(/msie ([\d.]+)/)) ? browser.ie = s[1] : (s = userAgent.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] : (s = userAgent.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] :
        (s = userAgent.match(/opera.([\d.]+)/)) ? browser.opera = s[1] : (s = userAgent.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;
    var version = "";
    if (browser.ie) {
        version = browser.ie;
        if (write22 && write22 != false && write22 != 'false') {
            document.writeln('IE<br>');
        }
        if (!browser.lang || browser.lang == undefined) {
            lang22 = navigator.browserLanguage;
            browser.systemLanguage = navigator.systemLanguage;
            browser.userLanguage = navigator.userLanguage;
        }
    }
    else if (browser.firefox) {
        version = browser.firefox;
        browser.mozilla = browser.firefox;
        if (write22 && write22 != false && write22 != 'false') {
            document.writeln('firefox<br>');
        }
    }
    else if (browser.chrome) {
        version = browser.chrome;
        if (write22 && write22 != false && write22 != 'false') {
            document.writeln('chrome<br>');
        }
    }
    else if (browser.opera) {
        version = browser.opera;
        if (write22 && write22 != false && write22 != 'false') {
            document.writeln('opera<br>');
        }
    }
    else if (browser.safari) {
        version = browser.safari;
        if (write22 && write22 != false && write22 != 'false') {
            document.writeln('Safari<br>');
        }
    }
    else {
        version = 'unknown browser';
    }
    browser.ver = version;
    if (lang22 && lang22 != undefined) {
        browser.lang = lang22.toLowerCase();
    }
    browser.isIE8 = (browser.ie && (version === '8.0' || version === '8'));
    return browser;
})();

com.whuang.hsj.slowDisplayJQuery = function (obj, function2) {
    var timer;
    obj.mouseover(function () {
        var elem = $(this);
        timer = setTimeout(function2, 1000);
    });
    obj.mouseout(function () {
        clearTimeout(timer);
    });
}
com.whuang.hsj.slowDisplay = function (obj, function33) {
    if (typeof obj == 'string') {
        obj = com.whuang.hsj.$$id(obj);
    }
    var timer322;
    obj.onmouseover = function () {
        var elem = $(this);
        timer322 = setTimeout(function33, 1000);
    };
    obj.onmouseout = function () {
        clearTimeout(timer322);
    };
}
/***
 *
 * @param obj
 * @param function33 : function name ,just is String
 * @param arg22
 */
com.whuang.hsj.slowDisplayArg = function (obj, function33, arg22) {
    if (typeof obj == 'string') {
        obj = com.whuang.hsj.$$id(obj);
    }
    var timer322;
    obj.onmouseover = function () {
        var elem = $(this);
        timer322 = setTimeout(function33 + '("' + arg22 + '")', 1000);
    };
    obj.onmouseout = function () {
        clearTimeout(timer322);
    };
}
/***
 * return  the location of mouse
 * @param e
 * @returns {{x: (Number|pageX|*), y: (Number|pageY|*)}}
 */
var getCoordInDocument = function (e) {
    if (!e || e == undefined) {
        return undefined;
    }
    e = e || window.event;
    var x = e.pageX || (e.clientX +
        (document.documentElement.scrollLeft
        || document.body.scrollLeft));
    var y = e.pageY || (e.clientY +
        (document.documentElement.scrollTop
        || document.body.scrollTop));
    return {'x': x, 'y': y};
}
/***
 * whether mouse is in the Div
 * @param divObj
 * @returns {boolean}
 */
com.whuang.hsj.isInDiv = function (event22, divObj, isFixed) {
    if (!divObj) {
        console.log('divObj is undefined');
        return;
    }
    if (typeof divObj == 'string') {
        divObj = com.whuang.hsj.$$id(divObj);
    }
    var pointer = getCoordInDocument(event22);//the location of mouse
    var divHeight = divObj.offsetHeight;//the height of div self,containing the width of the  border
    var divWidth = divObj.offsetWidth;//the width of div,containing the width of the  border
    var left22 = divObj.offsetLeft;
    var top22 = divObj.offsetTop;
    if (isFixed) {//whether position'value is 'fixed'
        top22 += com.whuang.hsj.getScroll().top
    }
    var maxX = divWidth + left22;//On the right side of the X coordinates
    var maxY = divHeight + top22;//The bottom of the Y coordinate
    if (pointer.x >= left22 && pointer.x <= maxX && pointer.y >= top22 && pointer.y <= maxY) {
        return true;
    } else {
        return false;
    }
};
//Cross browser gets the position of scroll
/***
 *
 * @returns {{top: number, left: number, height: 整个文档的高度,包括看不到的部分}}
 */
com.whuang.hsj.getScroll = function () {
    return {
        top: document.documentElement.scrollTop || document.body.scrollTop,
        left: document.documentElement.scrollLeft || document.body.scrollLeft,
        //等价于 $(document).height()
        height: document.documentElement.scrollHeight || document.body.scrollHeight
    };
};

/***
 * get iframe window'scroll
 */
com.whuang.hsj.getIframeScroll = function (iframeObj) {
    var document22 = iframeObj.contentWindow.document;
    return {
        top: document22.documentElement.scrollTop || document22.body.scrollTop,
        left: document22.documentElement.scrollLeft || document22.body.scrollLeft,
        height: document22.documentElement.scrollHeight || document22.body.scrollHeight,
        width: document22.documentElement.scrollWidth || document22.body.scrollWidth
    }
}
/***
 * Get scroll of div
 * @param divObj
 * @returns {{scrollHeight: (*|number), scrollWidth: (*|number)}}
 */
com.whuang.hsj.getDivScroll = function (divObj) {
    if (typeof divObj == 'string') {
        divObj = com.whuang.hsj.$$id(divObj);
    }
    return {
        scrollHeight: divObj.scrollHeight,
        scrollWidth: divObj.scrollWidth
    }
}

/***
 * Get the Coordinate/Location of div
 * @param divObj
 * @returns {{width: number, height: number, left: *, top: Window}}
 */
com.whuang.hsj.divCoordinate = function (divObj) {
    if (typeof divObj == 'string') {
        divObj = com.whuang.hsj.$$id('divObj');
    }
    return {
        'width': divObj.offsetWidth, 'height': divObj.offsetHeight,
        'x': divObj.offsetLeft, 'y': divObj.offsetTop,
        'scrollLeft': com.whuang.hsj.getScroll().left, 'scrollTop': com.whuang.hsj.getScroll().top
    };
}
/***
 * copy text
 * @param _sTxt
 * @returns {boolean}
 */
function setCopy(_sTxt) {
    try {
        if (window.clipboardData) {
            window.clipboardData.setData("Text", _sTxt);
        } else {
            netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
            var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
            if (!clip) return;
            var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
            if (!trans) return;
            trans.addDataFlavor('text/unicode');
            var str = new Object();
            var len = new Object();
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var copytext = _sTxt;
            str.data = copytext;
            trans.setTransferData("text/unicode", str, copytext.length * 2);
            var clipid = Components.interfaces.nsIClipboard;
            if (!clip) return false;
            clip.setData(trans, null, clipid.kGlobalClipboard);
        }
    } catch (e) {
    }
}
/***
 * add a image in Hn(H1,H2...)
 * @param jqueryObj
 * @param imageExpand
 * @param imageCollapse
 * @param imageClass
 */
function hnToggleCollapse(jqueryObj, imageExpand, imageCollapse, imageClass, speed22) {
    var imageCreate = '<img class="' + imageClass + '"  title="expand/collapse" src="' + imageCollapse + '">';
    var toggleImg = $(imageCreate);
    jqueryObj.append(toggleImg);
    if (!speed22 || speed22 == undefined) {
        speed22 = "normal";
    }
    toggleImg.click(function () {
        var this22 = $(this);
        if (com.whuang.hsj.isShow(this22.parent().next().get(0))) {
            this22.parent().next().slideUp(speed22, function () {
                this22.attr("src", imageExpand);
            });
        } else {
            this22.parent().next().slideDown(speed22, function () {
                this22.attr("src", imageCollapse);
            });
        }

    });
}
var getImage = function (ulObj) {
    var parent22 = ulObj.parent().first().children().get(0);
    var img22 = parent22.firstElementChild;//firstElementChild ,IE9 and chrome is ok
    if (img22 == null || img22 == undefined) {
        img22 = parent22.lastChild;//if IE8
    }
    return img22;
}
function hnSlideToggle(jqueryObj, isParent, imageExpand, imageCollapse, imageClass, speed22) {
    var navIconStr = '<img class="' + imageClass + '"  title="expand/Collapse" src="' + imageCollapse + '">';
    var navIcon = $(navIconStr);
    jqueryObj.append(navIcon);
    if (!speed22 || speed22 == undefined) {
        speed22 = "slow";
    }
    jqueryObj.click(function () {
        var callback = function () {
//            var img22=$(this).get(0). firstElementChild;
//            var img22=$(this).parent().first().children().first().get(0). firstElementChild;//.get(0). firstElementChild;
            var img22 = navIcon.get(0);
            if (com.whuang.hsj.isShow($(this).get(0))) {
                img22.src = imageCollapse;
            } else {
                $(this).next().css("width", "100%");//right div will expand to full screen
                $(this).get(0).display = 'none';
                img22.src = imageExpand;
            }

        };
        var target22;
        if (isParent) {
            $(this).parent().slideToggle(speed22, callback);
        } else {
            $(this).next().slideToggle(speed22, callback);
        }


    });
}

function hnSlideToggle2(jqueryObj, imageExpand, imageCollapse, imageClass, speed22) {
    var navIconStr = '<img class="' + imageClass + '"  title="expand/Collapse" src="' + imageCollapse + '">';
    var navIcon = $(navIconStr);
    jqueryObj.append(navIcon);
    if (!speed22 || speed22 == undefined) {
        speed22 = "slow";
    }
    jqueryObj.click(function () {
        var callback = function () {
//            var img22=$(this).get(0). firstElementChild;
//            var img22=$(this).parent().first().children().first().get(0). firstElementChild;//.get(0). firstElementChild;
//            var img22=navIcon.get(0);
            var img22 = getImage($(this));
            if (com.whuang.hsj.isShow($(this).get(0))) {
                img22.src = imageCollapse;
            } else {
                img22.src = imageExpand;
            }

        };

        $(this).next().slideToggle(speed22, callback);


    });
}
/**
 * Deprecated
 */
function hnHorizontalToggle(jqueryObj, isNext, imageExpand, imageCollapse, imageClass, speed22) {
    var navIconStr = '<img class="' + imageClass + '"  title="expand/Collapse" src="' + imageCollapse + '">';
    var navIcon = $(navIconStr);
    jqueryObj.append(navIcon);
    if (!speed22 || speed22 == undefined) {
        speed22 = "slow";
    }
    navIcon.click(function () {
        var target22;
        if (isNext) {
            target22 = $(this).parent().parent().next();
        } else {
            target22 = $(this).parent().parent();
        }
//            console.log($(this).next());
        target22.slideToggle(speed22, function () {
//            var img22=$(this).get(0). firstElementChild;
//            var img22=getImage(jqueryObj.next());
            var img22 = navIcon.get(0);
            if (com.whuang.hsj.isShow($(this).get(0))) {
                img22.src = imageCollapse;
                jqueryObj.parent().css("width", "30%");//should not be fixed.
            } else {
                img22.src = imageExpand;
                if (isNext) {
                    jqueryObj.parent().css("width", "100%");
                } else {
                    $(this).next().css("width", "100%");//right div will expand to full screen
                    $(this).get(0).display = 'none';
                }
            }

        });
    });
}

function hnHorizontalToggle2(jqueryObj, width22, imageExpand, imageCollapse, imageClass, speed22) {
    /*var oldWidthColumn='oldWith23';
     var oldHeightColumn='oldHeight32';
     if(jqueryObj.attr(oldWidthColumn)==undefined
     ||jqueryObj.attr(oldWidthColumn)==null){//the attribute does not exist on first access
     var oldWidth=jqueryObj.parent().width();
     var oldHeight=jqueryObj.parent().height();
     jqueryObj.attr(oldWidthColumn,oldWidth);
     jqueryObj.attr(oldHeightColumn,oldHeight);

     }
     */
    if (!speed22 || speed22 == undefined) {
        speed22 = "slow";
    }

    var navIconStr = '<img class="' + imageClass + '"  title="expand/Collapse" src="' + imageCollapse + '">';
    var navIcon = $(navIconStr);
    jqueryObj.append(navIcon);

    navIcon.click(function () {
        var target22;

        target22 = $(this).parent().parent().next();

//    	var img22=getImage(jqueryObj.next());
        var img22 = navIcon.get(0);
        if (jqueryObj.attr('flag1212') && jqueryObj.attr('flag1212') != 'f') {
            jqueryObj.parent().css("width", width22);//should be %,but is px
            target22.slideDown(speed22);

            jqueryObj.attr('flag1212', 'f');
            img22.src = imageCollapse;
        } else {
            target22.slideUp(speed22, function () {
                // jqueryObj.parent().css("width", "100%");
                jqueryObj.parent().animate({"width": "100%"}, 500/*speed*/, function () {
                    img22.src = imageExpand;
                });
            });

            jqueryObj.attr('flag1212', 't');

        }
    });


}
/***
 enter to make next object focus
 */
var pressFocusNext = function (event, next22) {
    if (!event || event == undefined) {
        event = window.event;
    }
    if (event.keyCode == 13) {//Enter
        if (typeof next22 == 'string') {
            next22 = com.whuang.hsj.$$one(next22);
        }
        if (next22 && next22 != undefined) {
            next22.focus();
        }

    }
}
/***
 * attr() can add custom attribute;
 */
var toggleHW = function (jqueryObj, fn1, fn2) {
    if (jqueryObj.attr('flag1212') && jqueryObj.attr('flag1212') != 'f') {
        fn2();
        jqueryObj.attr('flag1212', 'f');
    } else {
        fn1();
        jqueryObj.attr('flag1212', 't');
    }
}
var toggleTwice = function (jqueryObj, params1, params2, times) {
    var speed11 = 1000;
    if (com.whuang.hsj.isHasValue(params1.speed)) {
        speed11 = Number(params1.speed);
    }
    var speed22 = 1000;
    if (com.whuang.hsj.isHasValue(params2.speed)) {
        speed22 = Number(params1.speed);
    }
    if (!times || times == undefined) {
        times = 1;
    }
    for (var ii = 0; ii < times; ii++) {
        jqueryObj.animate(params1, speed11);
        jqueryObj.animate(params2, speed22);
    }

}
/**
 * go and come again
 */
var toggleTwice2 = function (jqueryObj, params22, speed1, speed2, times22) {
    toggleAnimateCommon(jqueryObj, params22, true, speed1, speed2, times22);
}
/***
 * jqueryObj is jquery object
 */
var toggleAnimate = function (jqueryObj, params1, params2) {
    // alert(jqueryObj.attr('flag1212'));
    if (jqueryObj.attr('flag1212') && jqueryObj.attr('flag1212') != 'f') {
        if (params2 && params2 != undefined && params2 != null) {
            var speed22 = 1000;
            if (com.whuang.hsj.isHasValue(params2.speed)) {
                speed22 = Number(params2.speed);
            }
            jqueryObj.animate(params2, speed22);
        }
        jqueryObj.attr('flag1212', 'f');
    } else {
        if (params1 && params1 != undefined && params1 != null) {
            var speed233 = 1000;
            if (com.whuang.hsj.isHasValue(params1.speed)) {
                speed233 = Number(params1.speed);
            }
            jqueryObj.animate(params1, speed233);
        }
        jqueryObj.attr('flag1212', 't');
    }
}
/***
 *
 * params22'value is diff,for example:50,-20
 */
var toggleAnimateDiff = function (jqueryObj, params22, speed1, speed2) {
    toggleAnimateCommon(jqueryObj, params22, false, speed1, speed2);
}

var toggleAnimateCommon = function (jqueryObj, params22, isTwice, speed1, speed2, times22) {
    var oldWidthColumn = 'oldWith23';
    var oldHeightColumn = 'oldHeight32';
    var whRate22 = "whRate";
    if (jqueryObj.attr(oldWidthColumn) == undefined
        || jqueryObj.attr(oldWidthColumn) == null) {//the attribute does not exist on first access
        var oldWidth = jqueryObj.width();
        var oldHeight = jqueryObj.height();
        var oldWhRate = oldWidth / oldHeight;
//        var oldWidth=jqueryObj.attr('width');
//        if(oldWidth==undefined||oldWidth==''){
//            oldWidth=jqueryObj.width()+"px";
//        }
//        var oldHeight=jqueryObj.attr('height');
//        if(oldHeight==undefined||oldWidth==''){
//            oldHeight=jqueryObj.height()+"px";
//        }
        jqueryObj.attr(oldWidthColumn, oldWidth);
        jqueryObj.attr(oldHeightColumn, oldHeight);

    }

    var newWidth22 = jqueryObj.attr(oldWidthColumn);
    var newHeight22 = jqueryObj.attr(oldHeightColumn);
    if (params22.width) {
        newWidth22 = Number(newWidth22) + params22.width;
        if (!params22.height) {
            newHeight22 = Number(newHeight22) + params22.width * Number(newHeight22) / Number(jqueryObj.attr(oldWidthColumn));
        }
    }
    if (params22.height) {
        newHeight22 = Number(newHeight22) + params22.height;
        if (!params22.width) {
            var oldWidthInt = Number(jqueryObj.attr(oldWidthColumn));
            newWidth22 = oldWidthInt + params22.height * oldWidthInt / Number(jqueryObj.attr(oldHeightColumn));
        }
    }
    var param1 = {
        width: newWidth22 + "px", height: newHeight22 + "px"
    };
    if (speed1 && speed1 != undefined) {
        param1.speed = speed1;
    }
    var param2 = {
        width: jqueryObj.attr(oldWidthColumn) + "px",
        height: jqueryObj.attr(oldHeightColumn) + "px"
    };
    if (speed2 && speed2 != undefined) {
        param2.speed = speed2;
    }
    if (isTwice || isTwice == 'true') {
        toggleTwice(jqueryObj, param1, param2, times22);
    } else {
        toggleAnimate(jqueryObj, param1, param2);
    }

}
//Cross browser gets the size of Visual area window,Have nothing to do with scroll bars
/***
 * 仅获取可视区域的大小
 */
var getInner = (function () {
    // alert(typeof window.innerWidth !== 'undefined');
    if (typeof window.innerWidth !== 'undefined') {//Notice:'undefined' is right
        return function () {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
                top: document.body.scrollTop,
                left: document.body.scrollLeft
            }
        }
    } else {
        return function () {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                top: document.documentElement.scrollTop,
                left: document.documentElement.scrollLeft
            }
        }
    }
})();
/***
 format date or time
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "H+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
Date.prototype.format2 = function (fmt) { //author: meizz
    var o = {
        "%m": this.getMonth() + 1 + '',                 //月份
        "%d": this.getDate() + '',                  //日
        "%H": this.getHours() + '',                   //小时
        "%M": this.getMinutes() + '',                 //分
        "%S": this.getSeconds() + ''                //秒
        //"q+" : Math.floor((this.getMonth()+3)/3), //季度
    };
    // 年份  2015
    if (/(%Y)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));

    // 两位年份  15
    if (/(%y)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(2));

    //getTime返回的是以毫秒为单位的，转为秒
    if (/(%s)/.test(fmt))
    //fmt=fmt.replace(RegExp.$1, this.getTime()/1000);
        fmt = fmt.replace(RegExp.$1, (this.getTime() + '').slice(0, 10));

    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (o[k].length == 2 ? o[k] : '0' + o[k]));
        }
    return fmt;
};
/**
 * 字符串转时间（yyyy-MM-dd HH:mm:ss）
 */
var stringToDate = function (fDate) {
    var fullDate = fDate.split(" ")[0].split("-");
    var fullTime;
    if (fDate.length > 10) {
        fullTime = fDate.split(" ")[1].split(":");
        return new Date(fullDate[0], fullDate[1] - 1, fullDate[2], (fullTime[0] != null ? fullTime[0] : 0), (fullTime[1] != null ? fullTime[1] : 0), (fullTime[2] != null ? fullTime[2] : 0));
    }
    else {
        return new Date(fullDate[0], fullDate[1] - 1, fullDate[2]);
    }
};
/***
 input:jquery object
 */
function setCheckboxFalseJquery(jqueryObj) {
    if (jqueryObj.get(0)) {
        jqueryObj.get(0).checked = false;
    }
}
/***
 input:jquery object
 */
function setCheckboxTrueJquery(jqueryObj) {
    if (jqueryObj.get(0)) {
        jqueryObj.get(0).checked = true;
    }
}
/***
 * get custom attribute
 * is same as jquery attr().eg:var inputId=$(this).attr('targetTF');
 * @param htmlNode22
 * @param attr
 * @returns {*}
 */
com.whuang.hsj.getCustomAttr = function (htmlNode22, attr) {
    if (!htmlNode22) {
        return;
    }
    if ('length' in htmlNode22) {//jquery 对象
        htmlNode22 = htmlNode22[0];
    }
    var hospitalId = htmlNode22[attr];
    if (hospitalId == undefined || hospitalId == null) {
        hospitalId = htmlNode22.getAttribute(attr);
    }
    if (hospitalId == undefined || hospitalId == null) {
        if (htmlNode22.attributes) {
            hospitalId = htmlNode22.attributes[attr].nodeValue;
        }
    }
    return hospitalId;
};
/***
 * set custom attribute
 * @param htmlNode22
 * @param attr22
 * @param attrValue
 */
com.whuang.hsj.setCustomAttr = function (htmlNode22, attr22, attrValue) {
    if ('length' in htmlNode22) {
        htmlNode22 = htmlNode22[0];
    }
    if (htmlNode22.setAttribute === undefined) {
        htmlNode22.attributes[attr22].nodeValue = attrValue;
    } else {
        htmlNode22.setAttribute(attr22, attrValue);  // 设置自定义属性的值
    }
};
var addEvent = (function () {
    if (document.addEventListener) {
        return function (type, element, fun) {
            if (typeof element === 'string') {
                element = com.whuang.hsj.$$id(element);
            }
            element.addEventListener(type, fun, false);
        }
    }
    else if (document.attachEvent) {
        return function (type, element, fun) {
            if (typeof element === 'string') {
                element = com.whuang.hsj.$$id(element);
            }
            element.attachEvent(window.EVENT_BIND_PREFIX + type, fun);
        }
    }
    else {
        return function (type, element, fun) {
            if (typeof element === 'string') {
                element = com.whuang.hsj.$$id(element);
            }
            element[window.EVENT_BIND_PREFIX + type] = fun;
        }
    }
})();
/***
 * bind many event.e.g:addEventMul(com.whuang.hsj.$$id('myBtn'),'click , mouseover',sayHello);
 */
var addEventMul = (function () {
    if (window.addEventListener) {
        return function (elem, type, fn) {
            if (typeof elem === 'string') {
                elem = com.whuang.hsj.$$id(elem);
            }
            if (type.indexOf(",") !== -1) {
                var types = type.split(/(?:\s+)?\,(?:\s+)?/);
                for (var i = 0; i < types.length; i++) {
                    elem.addEventListener(types[i], fn, false);
                }
            } else {
                elem.addEventListener(type, fn, false);
            }
        }
    } else {
        return function (elem, type, fn) {
            if (typeof elem === 'string') {
                elem = com.whuang.hsj.$$id(elem);
            }
            if (type.indexOf(",") !== -1) {
                var types = type.split(/(?:\s+)?\,(?:\s+)?/);
                for (var i = 0; i < types.length; i++) {
                    elem.attachEvent(window.EVENT_BIND_PREFIX + types[i], fn);
                }
            } else {
                elem.attachEvent(window.EVENT_BIND_PREFIX + type, fn);
            }
        }
    }
})();
var removeEvent = (function () {
    if (document.removeEventListener) {
        return function (type, element, fun) {
            if (typeof element === 'string') {
                element = com.whuang.hsj.$$id(element);
            }
            element.removeEventListener(type, fun, false);
        }
    }
    else if (document.detachEvent) {
        return function (type, element, fun) {
            if (typeof element === 'string') {
                element = com.whuang.hsj.$$id(element);
            }
            element.detachEvent(window.EVENT_BIND_PREFIX + type, fun);
        }
    }
    else {
        return function (type, element) {
            if (typeof element === 'string') {
                element = com.whuang.hsj.$$id(element);
            }
            element[window.EVENT_BIND_PREFIX + type] = null;
        }
    }
})();


var eventUtil = {//定义一个对象
    addEventHandler: function (element, type, handler) {//handler是触发时的操作，即function，传参数时，function不用加括号。
        if (typeof element === 'string') {
            element = com.whuang.hsj.$$id(element);
        }
        if (element.addEventListener) {//支持dom2级
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {//支持ie
            element.attachEvent(window.EVENT_BIND_PREFIX + type, handler);
        } else {
            element[window.EVENT_BIND_PREFIX + type] = handler;//这里不用.的原因是因为.不能连接一个变量跟一个字符串，事实上任何.的都可以用中括号表示
        }
    },

    removeEventHander: function (element, type, hander) {
        if (typeof element === 'string') {
            element = com.whuang.hsj.$$id(element);
        }
        if (element.removeEventListener) {//不要加括号，检测它是否有这个属性
            element.removeEventListener(type, hander, false);//这里才需要加括号
        } else if (element.detachEvent) {
            element.detachEvent(window.EVENT_BIND_PREFIX + type, hander);
        } else {
            element[window.EVENT_BIND_PREFIX + type] = null;
        }
    }
}
Boolean.parse = function (str) {
    if (str && 'true' === str.toLowerCase()) {
        return true;
    } else {
        return false;
    }
};
com.whuang.hsj.drag = function ($obj, hn) {
    if (arguments.length == 0) {
        return;
    }
    if ($obj == null || $obj == undefined) {
        return;
    }
    if (typeof  $obj == 'string') {//when $obj is a string
        if (!com.whuang.hsj.startsWith($obj, '#') && (!com.whuang.hsj.startsWith($obj, '.'))) {
            $obj = '#' + $obj;
        }
        $obj = $($obj);
    }
    var $hn = null;
    if (arguments.length > 1) {
        $hn = $obj.find(hn);//div h1,h2...
    } else {
        $hn = $obj.find("h2");
    }
    $hn && $hn.css("cursor", 'move');
    $hn.on({
        mousedown: function (e) {
            e.preventDefault();
            var t = $obj.offset(),
                o = e.pageX - t.left,
                i = e.pageY - t.top;
            //$obj.css("position", 'fixed');
            $(document).on("mousemove.drag", function (e) {
                $obj.offset({
                    top: e.pageY - i,
                    left: e.pageX - o
                })
            })
        },
        mouseup: function () {
            $(document).unbind("mousemove.drag");
            $obj.css("position", 'fixed');
        }
    });
};//drag
/***
 * prevent browser default event handler
 * @param event
 */
var cleanUpDefaultEvent = function cleanUpDefaultEvent(event) {
    event = event || window.event || arguments.callee.caller.arguments[0];
    if (event.preventDefault) {//IE not have
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
};
/***
 * 阻止事件冒泡
 * @param event
 */
var cancelBubble = function (event) {
    event = event || window.event || arguments.callee.caller.arguments[0];
    event.cancelBubble = true;
    if (event.stopPropagation) {
        event.stopPropagation();
    }
};
/***
 * make dialog in center
 */
com.whuang.hsj.centerJQueryPos = function ($div22, isApplyVertical, isIncludeScroll) {
    var width = $div22.width();
    var height = $div22.height();


    var left = (getInner().width - width) / 2 + com.whuang.hsj.getScroll().left;
    var param = {'left': left};
    if (arguments.length === 1 || isApplyVertical) {//Vertical direction
        var top = (getInner().height - height) / 2;
        if (isIncludeScroll) {
            top = top + com.whuang.hsj.getScroll().top;
        }
        if (top < 0) {
            top = 0;
        }
        // alert(top)
        param['top'] = top;
    }
    $div22.css(param);
};//centerJQueryPos
com.whuang.hsj.centerX = function ($div22) {
    com.whuang.hsj.centerJQueryPos($div22, false, false);
};
com.whuang.hsj.centerXY = function ($div22) {
    com.whuang.hsj.centerJQueryPos($div22, true, false);
};
/***
 * Get form jquery object by form element
 * @param formElement
 * @returns {*|jQuery}
 */
com.whuang.hsj.getForm = function (formElement) {
    var $that = $(formElement).parent();
    var max = 6;//limit the depth
    var fieldsetElement = null;//form element
    var tagName = null;//html tag name
    while ((fieldsetElement = $that.get(0)) && fieldsetElement.tagName !== undefined && (tagName = fieldsetElement.tagName.toLowerCase()) !== 'form' && max > 0) {
        if (tagName === 'fieldset') {//html5 new tag
            $that = $(fieldsetElement.form);
            break;
        }
        $that = $that.parent();
        max--;
    }
    //console.log(max);
    return $that;
};
/***
 *
 * @param event : textarea onkeydown event
 * @param formElement : textarea itself
 */
com.whuang.hsj.ctrlEnter2Submit = function (event, formElement) {
    if (event.keyCode == 13 && event.ctrlKey) {
        var $thisForm = com.whuang.hsj.getForm(formElement);
        var submitBtn = $thisForm.find(":button:first");
        submitBtn.get(0).click();
    }
};
/***
 * 获取事件源
 * @param evt
 * @returns {*|Object}
 */
com.whuang.hsj.getSrcElement = function (evt) {
    var event = window.event || evt;//兼容ie7 8
    var eventTarget = event.srcElement || event.target || event.toElement || event.currentTarget;
    return eventTarget;
};
com.whuang.hsj.imgURL = null;
var URL = null;
/***
 * preview image in local disk,Must HTML5
 * @param $fileElement
 * @param $previewImage
 */
com.whuang.hsj.previewLocalDiskImage = function ($fileElement, $previewImage, callback, maxSizeM) {
    $fileElement.change(function (event) {
        var eventTarget = com.whuang.hsj.getSrcElement(event);
        var files = eventTarget.files, file;
        if (files && files.length > 0) {
            file = files[0];
            //console.log(file);
            if (!maxSizeM) {
                maxSizeM = 2;
            }
            if (file.size > 1024 * 1024 * maxSizeM) {
                alert('image size Can\'t be more than ' + maxSizeM + 'MB');
                event.returnValue = false;
                return false;
            }

            URL = window.URL || window.webkitURL;
            if (com.whuang.hsj.imgURL != null) {
                URL.revokeObjectURL(com.whuang.hsj.imgURL);//free the memory;
            }
            com.whuang.hsj.imgURL = URL.createObjectURL(file);
//                    $('body').append($('<img/>').attr('src', imgURL));
            if ($previewImage && $previewImage.length) {
                $previewImage.attr("src", com.whuang.hsj.imgURL);
            }
            if (typeof callback === 'function') {
                callback(com.whuang.hsj.imgURL);
            }
        }
    });
};
/***
 *
 * @param fileId : file input id
 * @param param : {url,formatTypeInvalid,success,error}
 */
com.whuang.hsj.ajaxUploadFile = function (fileId, param) {
    var $file = $('#' + fileId);
    var url = $file.val();//如果没有选择文件,那么url为空
    if (!url) {
        alert('请选择上传的文件');
        return;
    }
    var extend = url.substring(url.indexOf(".") + 1).toLowerCase();
    var ext = new Array("jpg", "jpeg", "png", "gif", "bmp");
    if (param.isValidateExt && ext.toString().indexOf(extend) == -1) {
        alert(param.formatTypeInvalid);
        return;
    }

    $.ajaxFileUpload({
        url: param.url,
        secureuri: false,//asynchronous
        fileElementId: fileId,//file input's ID
        dataType: 'json',
        type: "post",
        success: param.success, error: param.error
    });
};

//get the IP addresses associated with an account
function getIPs(callback) {
    var ip_dups = {};

    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;
    var mediaConstraints = {
        optional: [{RtpDataChannels: true}]
    };

    //firefox already has a default stun server in about:config
    //    media.peerconnection.default_iceservers =
    //    [{“url”: "stun:stun.services.mozilla.com"}]
    var servers = undefined;

    //add same stun server for chrome
    if (window.webkitRTCPeerConnection)
        servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);

    //listen for candidate events
    pc.onicecandidate = function (ice) {

        //skip non-candidate events
        if (ice.candidate) {

            //match just the IP address
            var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
            var candidate22 = ip_regex.exec(ice.candidate.candidate);
            var ip_addr = null;
            if (candidate22 != null) {
                ip_addr = candidate22[1];
            }

            //remove duplicates
            if (ip_dups[ip_addr] === undefined)
                callback(ip_addr);

            ip_dups[ip_addr] = true;
        }
    };

    //create a bogus data channel
    pc.createDataChannel("");

    //create an offer sdp
    pc.createOffer(function (result) {

        //trigger the stun server request
        pc.setLocalDescription(result, function () {
        });

    }, function () {
    });
}
/***
 * copy property from s to base
 * @param base:baseline
 * @param s
 * @param is_overwrite :no offer ,then overwrite force
 * @returns {*}
 */
com.whuang.hsj.mix = function (base, s, is_overwrite) {
    if (!s || !base) return base;//base or s either not offer
    for (var p in s) {//p is property,will access properties and method of __proto__
        if (is_overwrite !== false || !(p in base)) {
            base[p] = s[p];
        }
    }
    return base;
};

/***
 * child extend parent
 * @param child
 * @param parent
 */
com.whuang.hsj.extend = function (child, parent) {
    var p1 = child.prototype;
    var p2 = parent.prototype;//p2 is added property or method by prototype
    com.whuang.hsj.mix(p1, p2, false);//copy property from p2 to p1
    parent.prototype = p1;
    child.prototype = new parent();
    parent.prototype = p2;
    delete p1;
    delete p2;
    return child;
};
/***
 * copy a object
 * @param src
 * @returns {{}}
 */
com.whuang.hsj.clone = function (src) {
    var target = {};
    for (var i in src) {
        if (typeof src[i] === 'object') {
            target[i] = arguments.callee(src[i]);

        } else {
            target[i] = src[i];
        }
    }
    return target;
};

//color convert
var Color3 = function () {
    if (!(this instanceof Color3)) {
        var color = new Color3();
        color._init.apply(color, arguments);
        return color;
    }
    if (arguments.length) {
        this._init.apply(this, arguments);
    }
};

//getter,setter
var methods = ["red", "green", "blue", "colorValue", "colorHex"];
var defineSetGetMethod = function (fn, methods) {
    var fnPrototype = fn.prototype;
    for (var i = 0; i < methods.length; i++) {
        var methodName = methods[i].charAt(0).toLocaleUpperCase() + methods[i].substring(1);
        fnPrototype['set' + methodName] = new Function("value", "this." + methods[i] + "= value;");
        fnPrototype['get' + methodName] = new Function("return this." + methods[i] + ";");
        fnPrototype['toString'] = new Function('return "rgb("+this.red+","+this.green+","+this.blue+")";');
    }
};
defineSetGetMethod(Color3, methods);
var extend = function (fn, option) {
    var fnPrototype = fn.prototype;
    for (var i in option) {
        if (typeof option[i] === 'object') {
            fnPrototype[i] = com.whuang.hsj.clone(option[i]);

        } else {
            fnPrototype[i] = option[i];
        }
    }
};
extend(Color3, {
    _init: function () {
        if (arguments.length == 3) {
            this.red = arguments[0];
            this.green = arguments[1];
            this.blue = arguments[2];
            this.getColorValue();
            this.colorHex = this.colorValue.substr(1);
        } else {
            var colorValue = arguments[0].replace(/^\#{1}/, "");
            if (colorValue.length == 3) {
                colorValue = colorValue.replace(/(.)/g, '$1$1');
            }
            this.red = parseInt('0x' + colorValue.substring(0, 2), 16);
            this.green = parseInt('0x' + colorValue.substring(2, 4), 16);
            this.blue = parseInt('0x' + colorValue.substring(4), 16);
            this.colorHex = colorValue;
            this.colorValue = "#" + colorValue;
        }
    },
    getColorValue: function () {
        if (this.colorValue) {
            return this.colorValue;
        }
        var hR = this.red.toString(16);
        var hG = this.green.toString(16);
        var hB = this.blue.toString(16);
        return this.colorValue = "#" + (this.red < 16 ? ("0" + hR) : hR) + (this.green < 16 ? ("0" + hG) : hG) + (this.blue < 16 ? ("0" + hB) : hB);
    }
});


/***
 * deep clone array
 * @param arry1
 * @param arry2
 */
com.whuang.hsj.cloneArray = function deepCopyArry(arry1, arry2) {
    var tempArry = [];
    for (var i = 0, l = arry1.length; i < l; i++) {
        if (arry1[i] instanceof Array) {
            arguments.callee(arry1[i], tempArry)
            arry2[i] = tempArry;
        } else if (typeof arry1[i] === 'object') {
            arry2[i] = com.whuang.hsj.clone(arry1[i]);
        }
        else {
            arry2[i] = arry1[i];
        }
    }
};

/***
 * deep copy object
 * @param source
 * @returns {{}}
 */
var deepCopy = function (source) {
    var result = {};
    for (var key in source) {
        result[key] = typeof source[key] === 'object' ? arguments.callee(source[key]) : source[key];
    }
    return result;
};
/***
 * merge two path
 */
var mergePath = function (path1, path2) {
    if ((!com.whuang.hsj.endsWith(host, '/')) && (!com.whuang.hsj.startsWith(action, '/'))) {
        return path1 + '/' + path2;
    } else {
        return path1 + path2;
    }
};
/***
 * because typeof NaN===='number' return true
 * @param value
 * @returns {boolean}
 */
var isNumber = function isNumber(value) {
    return (typeof value === 'number' && isFinite(value));
};
/***
 * Switch field
 * @param scope
 * @param method
 * @returns {Function}
 */
var switchScope = function switchScope(scope, method) {
    return function () {
        return method.apply(scope, arguments);
    }
};
var xhr = null;
/*function createXHR() {
 if (window.XMLHttpRequest) {
 // 新浏览器
 xhr = new XMLHttpRequest();
 } else if (window.ActiveXObject) {
 // IE5,IE6
 xhr = new ActiveXObject("Microsoft.XMLHTTP");
 }
 return xhr;
 };*/
var createXHR = function () {
    //var xhr;
    try {
        xhr = new XMLHttpRequest();
        return xhr;
    } catch (e) {
        try {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
            return xhr;
        } catch (ee) {
            xhr = false;
        }
    }
    if (!xhr && typeof XMLHttpRequest != 'undefined') {
        new ActiveXObject("Msxml2.XMLHTTP");
        return xhr;
    }
};
// 判断两个矩形是否相交,返回一个布尔值
function intens(rec1, rec2) {
    var lc1, lc2, tc1, tc2, w1, h1;
    lc1 = rec1.left + rec1.width / 2;
    lc2 = rec2.left + rec2.width / 2;
    tc1 = rec1.top + rec1.height / 2;
    tc2 = rec2.top + rec2.height / 2;
    w1 = (rec1.width + rec2.width) / 2;
    h1 = (rec1.height + rec2.height) / 2;
    return Math.abs(lc1 - lc2) < w1 && Math.abs(tc1 - tc2) < h1;
}
/***
 * e.g:console.log(isType('abc','String'));
 console.log(isType(111,'number'));
 console.log(isType([],'array'));
 console.log(isType(new Object(),'object'));
 * @param obj
 * @param type
 * @returns {boolean}
 */
function isType(obj, type) {
    var toStr = Object.prototype.toString.call(obj);
    //console.log(toStr);
    return (new RegExp('\\[object[\\s]*' + type + '\\]', "i")).test(toStr);
}
/***
 enter to to something specified by responseEvent
 */
var pressEnterTo = function pressEnterTo(event, responseEvent, arguments2) {
    if (!event || event == undefined) {
        event = window.event || arguments.callee.caller.arguments[0];
    }
    var eventTarget = com.whuang.hsj.getSrcElement(event);
    if (event.keyCode == 13 && typeof responseEvent === 'function') {//Enter
        if (arguments2 == undefined) {
            arguments2 = eventTarget;
        }
        responseEvent(arguments2);
    }
};
/*
 * 设置输入域(input/textarea)光标的位置
 * @param {HTMLInputElement/HTMLTextAreaElement} elem
 * @param {Number} index
 */
function setCursorPosition(elem, index) {
    var val = elem.value
    var len = val.length

    // 超过文本长度直接返回
    if (len < index) return
    setTimeout(function () {
        elem.focus()
        if (elem.setSelectionRange) { // 标准浏览器
            elem.setSelectionRange(index, index)
        } else { // IE9-
            var range = elem.createTextRange()
            range.moveStart("character", -len)
            range.moveEnd("character", -len)
            range.moveStart("character", index)
            range.moveEnd("character", 0)
            range.select()
        }
    }, 10)
}
/***
 * convert Decimal str into hex(must be two bit,eg:02,f5)<br>
 *     '153'-->99
 * @param str
 */
to2Hex = function to2Hex(str) {
    var hex = parseInt(str).toString(16);
    if (hex.length === 1) {
        hex = '0' + hex;
    }
    return hex;
};

cssColor2Hex = function (cssColor) {
    var stringObj = cssColor.replace(/RGB[\s]*\(([\w,\s]+)\)[\s]*/i, "$1");
    //console.log(stringObj);
    var arr = stringObj.split(',');
    var r = com.whuang.hsj.trim(arr[0]);
    var g = com.whuang.hsj.trim(arr[1]);
    var b = com.whuang.hsj.trim(arr[2]);
    var rHex = to2Hex(r);
    var gHex = to2Hex(g);
    var bHex = to2Hex(b);
    return (rHex + gHex + bHex);
};
/***
 *
 * @param hexColor : #ccc
 * @param cssColor : [string]rgb(153, 153, 153)
 * @returns {boolean}
 */
compareColor = function compareColor(hexColor/*#789*/, cssColor/*rgb(153, 153, 153)*/) {
    if (typeof cssColor !== 'string') {
        return false;
    }
    if (hexColor === cssColor) {//IE8,jquery.css('color') will get '#ddd',but 'rgb(204, 204, 204)'
        return true;
    }
    if (com.whuang.hsj.startsWith(hexColor, '#')) {
        hexColor = hexColor.substr(1);//delete '#' in front
    }
    if (hexColor.length == 3) {//'789'-->'778899'
        hexColor = hexColor.substr(0, 1) + hexColor.substr(0, 1)
            + hexColor.substr(1, 1) + hexColor.substr(1, 1) + hexColor.substr(2, 1) + hexColor.substr(2, 1);
    }
    var cssResult = cssColor2Hex(cssColor);
    return (cssResult === hexColor);
};
/***
 * [0-9]<br>
 *     12:ok;1.2:error
 * @param event
 * @returns {boolean}
 */
onlyIntegerKeyPress = function onlyIntegerKeyPress(event) {
    event = event || window.event || arguments.callee.caller.arguments[0];
    //console.log(event);
    var charCode2;
    if ('charCode' in event) {//IE7 and IE8 no charCode
        charCode2 = event.charCode;
    } else {
        //console.log('no charCode');
        charCode2 = event.keyCode;
    }
    //console.log(charCode2);
    if (event.keyCode === 8/*back*/ || event.keyCode === 13/*Enter*/ || event.keyCode === 9/*Tab*/ || event.keyCode === 37/*<- */ || event.keyCode === 39/* ->*/) {
        return true;
    } else if (charCode2 < 48 || charCode2 > 57) {/*0-9*/
        event.returnValue = false;
        return false;
    } else {
        return true;
    }
};
/***
 * [0-9] or .
 * @param event
 * @returns {boolean}
 * @constructor
 */
onlyNumberKeyPress = function (event) {
    event = event || window.event || arguments.callee.caller.arguments[0];
//        console.log(event);
    var charCode2;
    if ('charCode' in event) {//IE7 and IE8 no charCode
        charCode2 = event.charCode;
    } else {
        //console.log('no charCode');
        charCode2 = event.keyCode;
    }
    if (event.keyCode === 8/*back*/ || event.keyCode === 13/*Enter*/ || event.keyCode === 9/*Tab*/ || event.keyCode === 37/*<- */ || event.keyCode === 39/* ->*/) {
        return true;
    } else if ((charCode2 < 48 || charCode2 > 57) && charCode2 !== 46/*.*/) {
        event.returnValue = false;
        return false;
    } else {
        return true;
    }
};
/***
 * [a-zA-Z]
 * @param event
 * @returns {boolean}
 */
onlyAlphaKeyPress = function (event) {
    event = event || window.event || arguments.callee.caller.arguments[0];
//        console.log(event);
    var charCode2;
    if ('charCode' in event) {//IE7 and IE8 no charCode
        charCode2 = event.charCode;
    } else {
        //console.log('no charCode');
        charCode2 = event.keyCode;
    }
    //console.log(charCode2);
    if (event.keyCode === 8/*back*/ || event.keyCode === 13/*Enter*/ || event.keyCode === 9/*Tab*/ || event.keyCode === 37/*<- */ || event.keyCode === 39/* ->*/) {
        return true;
    } else if (charCode2 < 65 || ( charCode2 > 90 && charCode2 < 97) || charCode2 > 122) {
        event.returnValue = false;
        return false;
    } else {
        return true;
    }
};

onlyAlphaNumberKeyPress = function (event) {
    event = event || window.event || arguments.callee.caller.arguments[0];
//        console.log(event);
    var charCode2;
    if ('charCode' in event) {//IE7 and IE8 no charCode
        charCode2 = event.charCode;
    } else {
        //console.log('no charCode');
        charCode2 = event.keyCode;
    }
    if (event.keyCode === 8/*back*/ || event.keyCode === 13/*Enter*/ || event.keyCode === 9/*Tab*/ || event.keyCode === 37/*<- */ || event.keyCode === 39/* ->*/) {
        return true;
    } else if (charCode2 < 48 || ( charCode2 > 57 && charCode2 < 65) || ( charCode2 > 90 && charCode2 < 97) || charCode2 > 122) {
        event.returnValue = false;
        return false;
    } else {
        return true;
    }
};

var getEventKeyCode = function getEventKeyCode(event) {
    event = event || window.event || arguments.callee.caller.arguments[0];
    var charCode2;
    if ('charCode' in event) {//IE7 and IE8 no charCode
        charCode2 = event.charCode;
    } else {
        //console.log('no charCode');
        charCode2 = event.keyCode;
    }
    return charCode2;
};
/***
 * get request query string
 * @returns {{}}
 */
var getQueryParams = function () {
    var i, ilen, strs, keyName, keyValue,
        params = {},
        path = window.location.pathname,
        url = window.location.href;
    if (url.indexOf("?") > -1) {
        var index = url.indexOf("?");
        strs = url.substring(index + 1);
        strs = strs.split("&");
        ilen = strs.length;
        for (i = 0; i < ilen; i++) {
            var indexEqual = strs[i].indexOf('=');
            if (indexEqual == -1) {
                keyName = strs[i];
                keyValue = '';
            } else {
                keyName = strs[i].substring(0, indexEqual);
                keyValue = strs[i].substring(indexEqual + 1) || "";
            }

            if (keyName == "callback") keyValue = decodeURIComponent(keyValue);
            params[keyName] = keyValue;
        }
    }
    return params;
};
var isMobile = function (mobile) {
    return mobile.match(/^1[\d]{10}$/);
};

/***
 * 判断是否包含空格
 * @param str
 * @returns {boolean}
 */
var isContainBlank = function (str) {
    return /\s/g.test(str);
}
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var anchorGoIndexTop = function (anchorName) {
    anchorGoWhereCommon($("html,body"), anchorName);
    //$("html,body").animate({scrollTop: $("#box").offset().top}, 1000);
};
var anchorGoWhereCommon = function ($target, anchorName) {
    $target.animate({scrollTop: $("a[name=" + anchorName + "]").offset().top}, 200);
    //$("html,body").animate({scrollTop: $("#box").offset().top}, 1000);
};
//切换作用域
hitch = function (scope, method) {
    return function () {
        return method.apply(scope, arguments);
    }
};

/***
 * 需要注意:分支二走完之后,需要清空t_start 吗?<br>
 *     如果不清空,会有这种情况:执行完分支二之后,马上执行分支一<br>
 *         e.g:var func3=throttle3(myFunc,2000,2100);<br>
 *         需要保证:(1)连续频繁地点击,则每隔runDelay 秒,必须执行一次;<br>
 *         (2)随意的乱点击,一定会执行至少一次<br>
 *         定时器执行时,需要重置t_start,否则执行完分支二之后,马上执行分支一<br>
 * @param fn
 * @param delay : 延迟执行的倒计时,如果多次调用,新的会把旧的倒计时冲掉
 * @param runDelay
 * @returns {Function}
 */
function throttle3(fn, delay, runDelay, scope) {
    var timer = null;
    var t_start;
    return function () {
        //没有传递参数runDelay,但是传递scope
        if (runDelay && (typeof runDelay != 'number') && (!scope)) {
            scope = runDelay;
        }
        var context = scope || this,
            args = arguments,
            t_cur = new Date();
        // console.log(context);
        timer && clearTimeout(timer);
        if (!t_start) {
            t_start = t_cur;
        }
        // console.log('t_start:'+t_start);
        // console.log('t_cur:'+t_cur);
        // console.log('t_cur - t_start:'+(t_cur - t_start));
        //runDelay的类型等于'undefined',表示没有传递参数runDelay
        if ((typeof runDelay != 'undefined') && (t_cur - t_start >= runDelay)) {
            fn.apply(context, args);//分支一
            t_start = t_cur;
            // console.log('一:' + new Date());
        } else {
            timer = setTimeout(function () {//分支二
                fn.apply(context, args);
                // console.log('二:' + new Date());
                t_start = new Date();
            }, delay);
        }
    }
}
/***
 * 可以以相同的时间间隔来执行<br>
 *     但是有个问题:当停止的时刻在当前周期中时,不会执行.<br>
 *     所以不适用于窗口的resize事件
 * @param delay
 * @param action
 * @returns {Function}
 */
var throttle = function (delay, action) {
    var last = 0;
    return function () {
        var curr = +new Date();
        console.log('curr - last:' + (curr - last))
        if (curr - last > delay) {
            action.apply(this, arguments);
            last = curr;
        }
    };
};