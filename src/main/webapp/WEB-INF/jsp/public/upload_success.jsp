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
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="<%=path%>/static/css/global.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1">
    <script type="text/javascript" src="http://hbjltv.com/static/js/jquery-1.11.1.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/common_util.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/convention.js"></script>
    <title>上传图片</title>
</head>
<body>
<div class="tips">
    <span class="success">${message}</span>
</div>
<div>
    <ul>
        <li><a href="${fullUrl}">${fullUrl}</a> </li>
        <li>${imgTab}</li>
        <li><textarea name="" id="" style="width: 100%;" rows="10">${imgTab}</textarea> </li>
        <li><img style="max-width: 100%" src="${fullUrl}" alt=""></li>
    </ul>

</div>
</body>
</html>