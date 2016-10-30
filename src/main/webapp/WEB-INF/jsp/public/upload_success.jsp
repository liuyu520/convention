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
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="<%=path%>/static/css/global.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1">
    <script type="text/javascript" src="<%=path%>/static/js/jquery-1.11.1.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/common_util.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/convention.js"></script>
    <title>上传图片</title>
    <script type="text/javascript" >
        var first=true;
        function showpic(fullUrl){
            if(first){
                $('div>ul').append('<li><img style="max-width: 100%" src="'+fullUrl+'" alt="这不是图片,无法显示"></li>');
                first=false;
            }else {
                $('div>ul>li:last-child').toggle();
            }
        }
    </script>
</head>
<body>
<div class="tips">
    <span class="success">${message}</span>
</div>
<div>
    <ul>
        <li><a href="${fullUrl}">${fullUrl}</a> </li>
        <li>${imgTag}</li>
        <li><textarea name="" id="" style="width: 100%;" rows="10"><c:choose><c:when test="${imgTag==null||fn:length(imgTag)==0 ||fn:length(fn:trim(imgTag))==0 }">${imgTab}</c:when><c:otherwise>${imgTag}</c:otherwise></c:choose></textarea> </li>
        <li><a href="<%=path%>/image/convention">继续上传</a> </li>

    </ul>
<div>
    <input type="button" value="显示图片" onclick="showpic('${fullUrl}')">
</div>
</div>
</body>
</html>