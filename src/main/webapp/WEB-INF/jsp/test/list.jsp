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
    <script type="text/javascript" src="<%=path%>/static/js/jquery-1.11.1.js"></script>
    <script type="text/javascript" src="http://hbjltv.com/static/js/jquery.form.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/common_util.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/page.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/convention.js"></script>
    <script type="text/javascript" >
    <c:if test="${sessionScope.user!=null &&sessionScope.user.level==2}">
    isAdmin=${sessionScope.user!=null &&sessionScope.user.level==2};
    </c:if>
    </script>
    <title>测试列表</title>
</head>
<body>
<jsp:include page="../public/top_admin.jsp"/>
<a href="<%=path%>/test/add">添加测试</a> &nbsp; <a href="<%=path%>/search">首页</a>&nbsp;<a href="<%=path%>/test/list">列表</a>
<hr>
<div>
    <ul class="test-list">

        <c:choose>
            <c:when test="${view.recordList!=null && fn:length(view.recordList)!=0 }">
                <c:forEach items="${view.recordList }" var="bbs" varStatus="status">
                    <li><span class="gray">(${bbs.id})</span>【<a title="${bbs.testcase}"
                                                                 href="<%=path%>/test/${bbs.id}"><c:choose>
                        <c:when test="${bbs.testcase!=null && fn:length(bbs.testcase)!=0 }">${bbs.testcase}</c:when>
                        <c:otherwise>未命名</c:otherwise>
                    </c:choose> </a>】 &nbsp;
                        <img data-id="${bbs.id}" style="padding-right: 20px;padding-top: 5px;cursor: pointer"
                             src="<%=path%>/static/img/icon_3.png" alt="详情">
                        <img onclick="test.list_menu(this,${bbs.id})" src="<%=path%>/static/img/col_list.gif" alt="菜单">
                    </li>
                </c:forEach>

                <jsp:include page="../pageBottom.jsp">
                    <jsp:param name="action" value="test.query"/>
                    <jsp:param name="numPerPage" value="10"/>
                </jsp:include>
            </c:when>
            <c:otherwise>
            <script type="text/javascript" >
                setTimeout(function () {
                    history.back();
                },2000);
                </script>
                <div style="text-align:center;padding-top:20px;">
                    没有查询到符合条件的测试.
                </div>
            </c:otherwise>
        </c:choose>

    </ul>
</div>
<div class="draft"></div>
<img class="progress" style="position: absolute;display: none" src="<%=path%>/static/img/progress.gif" alt="正在加载...">
</body>
</html>