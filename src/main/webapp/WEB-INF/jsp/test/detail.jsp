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
    <script type="text/javascript" src="http://hbjltv.com/static/js/jquery.form.js"></script>
    <script type="text/javascript" src="http://hbjltv.com/static/js/common_util.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/page.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/convention.js"></script>
    <title>【${test.testcase}】-答案</title>
</head>
<body>
<jsp:include page="../public/top_admin.jsp"/>
<div class="errormessage" >${errorMessage}</div>
<a href="<%=path%>/test/add">添加测试</a>&nbsp; <a href="<%=path%>/test/list">列表</a> &nbsp; <a href="<%=path%>/search">首页</a>
<h4 class="test-detail">
    <img src="<%=path%>/static/img/minus.png" alt="隐藏" style="background-color: #fd05ae;padding: 1px;">
    <span>【${test.testcase}】</span></h4>
    <c:if test="${sessionScope.user!=null &&sessionScope.user.level==2}">
<a href="<%=path%>/test/${test.id}/delete" onclick="return confirm('确认删除吗')">删除问题</a>
&nbsp; <a href="<%=path%>/test/${test.id}/edit?targetView=test/edit">编辑问题</a>
        &nbsp; <a target="_blank" href="<%=path%>/share/test/${test.id}">分享问题</a>
</c:if>
&nbsp;&nbsp;<a href="javascript:anchorGoIndexTop('bottomHref')">回到底部</a>
<div>
    <a href="" name="topHref" ></a>
    <jsp:include page="./detail_common.jsp"></jsp:include>
    <div style="text-align: right;margin-top: 12px;">
        <a  name="bottomHref" href="javascript:anchorGoIndexTop('topHref')">回到顶部</a>
    </div>
</div>

</div>
</body>
</html>