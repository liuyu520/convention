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
    <script type="text/javascript" src="http://hbjltv.com/static/js/jquery-1.11.1.js"></script>
    <script type="text/javascript" src="http://hbjltv.com/static/js/ajaxfileupload.js" ></script>
    <script type="text/javascript" src="http://hbjltv.com/static/js/jquery.form.js"></script>
    <script type="text/javascript" src="http://hbjltv.com/static/js/common_util.js"></script>
    <script type="text/javascript" src="http://hbjltv.com/static/js/page.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/convention.js"></script>
    <title>添加成功</title>
</head>
<body>
<jsp:include page="../convention/edit.jsp">
    <jsp:param name="embedded" value="yes"/>
</jsp:include>
<!-- embedded用于js方法updateConvention()的第三个参数 -->

</body>
</html>