<%--
  Created by IntelliJ IDEA.
  User: whuanghkl
  Date: 9/24/16
  Time: 3:24 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="<%=path%>/static/css/global.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1">
    <script type="text/javascript" src="<%=path%>/static/js/jquery-1.11.1.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/page.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/convention.js"></script>
    <script type="text/javascript" >
        $(function () {
            $('input[name=answer]').focus()
        });
    </script>
    <title>搜索答案</title>
</head>
<body>
<div>
    <h3>搜索答案 <a href="<%=path%>/test/add">添加测试</a> &nbsp; <a href="<%=path%>/test/list">列表</a></h3>
    <form action="<%=path%>/convention/list" method="post">
        <table>
            <tr>
                <td>
                    <input type="text" name="answer" placeholder="请输入您要搜索的关键字" style="font-size: 18px;width: 320px;">
                </td>
            </tr>

            <tr>
                <td>
                    <input type="submit" style="margin-top: 20px;" value="搜索">
                </td>
            </tr>
        </table>
    </form>
</div>
</body>
</html>
