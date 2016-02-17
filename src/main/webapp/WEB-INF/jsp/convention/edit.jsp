<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
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
    <script type="text/javascript" src="<%=path%>/static/js/convention.js"></script>
    <title>添加答案</title>
</head>
<body>
<div class="tips">
    <span class="success">${message}</span>
</div>
<div>
    <h4>【${test.testcase}】</h4>
    <a href="<%=path%>/test/${test.id}">返回详情</a>
    &nbsp;<a href="<%=path%>/test/list">列表</a> &nbsp; <a href="/">首页</a>
    <div id="add_convention">
        <form action="<%=path%>/convention/update" method="post">
            <input type="hidden" name="testBoyId" value="${test.id}">
            <input type="hidden" name="id" value="${convention.id}">
            <table>
                <tr>
                    <td>
                        <textarea name="answer" cols="40" rows="5">${convention.answer}</textarea>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="submit" class="btn" value="修改">
                        &nbsp;&nbsp;<a href="javascript:history.back();">返回</a>
                        &nbsp;&nbsp;<a href="javascript:selectAllTxt($('#add_convention textarea'));">全选</a>
                        &nbsp;&nbsp;<a href="javascript:enlargeTxt($('#add_convention textarea'));">放大</a>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</div>
</body>
</html>