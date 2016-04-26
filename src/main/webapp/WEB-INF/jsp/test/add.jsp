<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    if (path.equals("/")) {
        path = "";
    }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="<%=path%>/static/css/global.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1">
    <script type="text/javascript" src="http://hbjltv.com/static/js/jquery-1.11.1.js"></script>
    <script type="text/javascript" src="http://hbjltv.com/static/js/common_util.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/convention.js"></script>
    <title>添加测试</title>
</head>
<body>
<h3>添加测试&nbsp;<a href="<%=path%>/test/list">列表</a>&nbsp; <a href="<%=path%>/search">首页</a></h3>
<div>
    <div id="add_test">
        <form action="<%=path%>/test/add?targetView=/convention/add" onsubmit="return test.checkAddTestForm(this)" method="post">
            <table>
                <tr>
                    <td>
                        <textarea name="testcase" id="" cols="40" rows="5" placeholder="请填写问题(测试)"></textarea>
                    </td>
                </tr>
                <c:if test="${sessionScope.user!=null &&sessionScope.user.level==2}">
                <tr>
                    <td >
                        <label style="float: right;" for="onlyIcanSee"><input type="checkbox" id="onlyIcanSee" value="private" name="onlyIcanSee"  >私有</label>
                    </td>
                </tr>
                </c:if>
                <tr>
                    <td>
                        <input type="submit" value="添加">
                        &nbsp;&nbsp;<a href="javascript:history.back();">返回</a>
                        &nbsp;&nbsp;<a href="javascript:selectAllTxt($('#add_test textarea'));">全选</a>
                        &nbsp;&nbsp;<a href="javascript:enlargeTxt($('#add_test textarea'));">放大</a>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</div>
</body>
</html>