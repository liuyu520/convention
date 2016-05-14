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
    <title>添加成功</title>
</head>
<body>
<jsp:include page="../public/top_admin.jsp"/>
<div>
    <h4>${test.testcase}</h4>
    <a href="<%=path%>/test/${test.id}">返回详情</a>&nbsp;<a href="<%=path%>/test/list">列表</a> &nbsp;
    <a href="<%=path%>/test/add">添加测试</a>&nbsp;<a href="<%=path%>/search">首页</a>
    &nbsp;<a href="<%=path%>/convention/add_answer?testBoyId=${test.id}">继续添加</a>
   <c:if test="${sessionScope.user!=null &&sessionScope.user.level==2}">
    &nbsp;<a
        href="<%=path%>/convention/edit?testBoyId=${test.id}&conventionId=${convention.id}&testcase=${test.testcase }">编辑答案</a>
        </c:if>
    <div>
        ${convention.answer}
    </div>
</div>
</body>
</html>