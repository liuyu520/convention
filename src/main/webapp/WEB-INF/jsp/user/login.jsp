<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    if (path.equals("/")) {
        path = "";
    }
%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=100"> <!-- IE8 mode -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>欢迎登录 后管系统</title>
    <link rel="stylesheet" type="text/css" href="<%=path%>/static/css/global.css">
    <%--<link rel="stylesheet" type="text/css" href="http://hbjltv.com/static/css/cannot_select.css">--%>

    <script type="text/javascript" src="http://hbjltv.com/static/js/jquery-1.11.1.js"></script>
    <script type="text/javascript" src="http://hbjltv.com/static/js/common_util.js"></script>
    <script type="text/javascript" src="http://hbjltv.com/static/js/md5.js"></script>
    <%--<script type="text/javascript" src="http://hbjltv.com/static/js/prohibition_back.js"></script>--%>
    <script type="text/javascript">
        var loginFlag = "${sessionScope.logined}";
        // alert(loginFlag);
        $(function () {
            if (loginFlag && loginFlag == 'success') {
                alert("您之前已经登录过了");
                location.href = "../search";
                return;
            }
        });
        formCheck = function () {

            var loginName22 = com.whuang.hsj.$$one("username");
            if (!com.whuang.hsj.isHasValue(loginName22.value)) {
                loginName22.focus();
                var li_info_id = com.whuang.hsj.$$id('li_info');
                li_info_id.innerHTML = "<span class='errormessage'> 请填写用户名.</span>";
                function cleanUp22() {
                    li_info_id.innerHTML = "";
                }

                setTimeout(cleanUp22, 4000);
                return false;
            } else {
                var usernameValue = loginName22.value;
                if (usernameValue.length < 3 || usernameValue.length > 16) {
                    com.whuang.hsj.setErrorMessage(loginName22, "li_info", "请输入3-16位用户名字符.");
                    return false;
                }
            }
            var password = com.whuang.hsj.$$one("password");
            var password_value = '';
            if (password.value.trim) {
                password_value = password.value.trim();
            } else {
                password_value = com.whuang.hsj.trim(password.value);
            }
            if (!com.whuang.hsj.isHasValue(password_value)) {
                var li_info_id = com.whuang.hsj.$$id('li_info');
                password.focus();
                li_info_id.innerHTML = "<span class='errormessage'> 请填写密码.</span>";
                function cleanUp22() {
                    li_info_id.innerHTML = "";
                }

                setTimeout(cleanUp22, 4000);
                return false;
            }
            if (password_value.length <= 20) {
                password.value = calcMD5(password_value);
            }
            /* else {
             com.whuang.hsj.$$id('li_info').innerHTML='密码过长';
             return false;
             }*/

            return true;
        };


        var username1 = '';
        var timingLogin;
        window.onload = function () {
            var loginName22 = com.whuang.hsj.$$one("username");
            var issavePasswd22 = com.whuang.hsj.$$one("issavePasswd");
            if (!loginName22 || loginName22 == undefined) {
                return;
            }
            loginName22.focus();

            //cookie的key是'userEmail'
            username1 = com.whuang.hsj.getCookie('userEmail');
            var issavePasswd = com.whuang.hsj.getCookie("<%=com.common.dict.Constant2.COOKIE_KEY_PASSWORD %>");
            // alert("自动登录:"+(isauto22Cookie));

            //alert("username1:"+username1);
            var passwordValue;
            var issaveUserName222 = com.whuang.hsj.$$one("issaveUserName");
            if (issavePasswd && issavePasswd != '' && issavePasswd != null && issavePasswd != undefined) {
                issavePasswd22.checked = true;
                com.whuang.hsj.$$one("password").value = issavePasswd;
                // timingLogin=setTimeout(function(){document.forms[0].submit();},1000);
            } else {
                issavePasswd22.checked = false;
            }

            if (username1 && username1 != '' && username1 != null && username1 != undefined) {
                loginName22.value = username1;
                issaveUserName222.checked = true;
                var password22 = com.whuang.hsj.$$one("password");
                password22.focus();
            } else {
                issaveUserName222.checked = false;
            }


            /**
             若登录失败,则情况密码输入框<br> 还是不要清空
             */
            var errorMesg = "${info }";
            /*if (com.whuang.hsj.isHasValue(errorMesg)) {
                com.whuang.hsj.$$one("password").value = '';
            }*/

        }//onload
        var usernamePress = function (event) {
            if (!event || event == undefined) {
                event = window.event;
            }
            if (event.keyCode == 13) {
                com.whuang.hsj.$$one("password").focus();
            }
        }
        var passwordPress = function (event) {
            if (!event || event == undefined) {
                event = window.event;
            }
            if (event.keyCode == 13) {
                ajaxLogin();
            }
        }
        var dealAutoSubmit = function (this22) {
            var isChecked = com.whuang.hsj.isCheckcheckbox(this22);
            // console.log(isChecked);
            if (isChecked) {
                if (!com.whuang.hsj.isCheckcheckbox("issaveUserName")) {
                    com.whuang.hsj.setCheckedCheckboxOne("issaveUserName");
                }

            }
            // else{
            // 	 clearTimeout(timingLogin);
            // }
        }
    </script>
</head>
<body>

<div class="">

    <h2>后管系统</h2>


    <c:if test="${sessionScope.logined==null && sessionScope.user==null}">
        <form action="<%=path%>/user/login" method="post" onsubmit="javascript:return formCheck() ">

            <ul>

                <li><label>用户名：</label><input type="text" name="username" value="${user.username}"
                                              onkeypress="usernamePress(event);"/></li>

                <li><label>密　码：</label><input type="password" name="password" onkeypress="passwordPress(event);"/></li>
                <li><label class="cannot_select"><input style="width:10px;border:none;padding-left:0;" type="checkbox"
                                                        name="issaveUserName" value="save"></input>记住用户名</label>

                    <label class="cannot_select"><input style="width:10px;border:none;padding-left:0;" type="checkbox"
                                                        name="issavePasswd" onclick="dealAutoSubmit(this);"
                                                        value="save"></input>记住密码</label>

                    &nbsp;&nbsp;&nbsp;&nbsp;  </li>

                <li><span id="li_info" class='errormessage'>${info } </span></li>

                <li><input class="submit" type="submit" value="登录"/> &nbsp; &nbsp; <input type="reset" value="重置"/></li>


            </ul>

        </form>
    </c:if>
</div>

</body>
</html>
