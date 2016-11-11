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
    <script type="text/javascript" src="<%=path%>/static/js/jquery.form.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/common_util.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/page.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/convention.js"></script>

    <title>答案列表</title>
</head>
<body>
<jsp:include page="../public/top_admin.jsp"/>
<a href="<%=path%>/test/add">添加测试</a> &nbsp;
<a href="<%=path%>/convention/searchInput">搜索答案</a> &nbsp;
<a href="<%=path%>/search">首页</a>&nbsp;<a href="<%=path%>/test/list">列表</a>
&nbsp;<a href="javascript:anchorGoIndexTop('bottomHref')">回到底部</a>
<div>
    <c:choose>
        <c:when test="${view.recordList!=null && fn:length(view.recordList)!=0 }">
            <ul>
                <c:forEach items="${view.recordList }" var="convention" varStatus="status">
                    <li class="answer-list" data-id="${convention.id}">
                        <div>
                            <div style="overflow-x: auto;word-wrap: break-word;" id="answer-detail_${convention.id}">${convention.answer}</div>
                            <hr style="margin-right: 10px;width: inherit">
                            <ul class="operate-list">
                                <c:if test="${sessionScope.user!=null &&sessionScope.user.level==2}">
                                    <li><a href="javascript:deleteConventionInList(${convention.id})">删除</a></li>
                                    <li>
                                        <a href="javascript:editConvention(${convention.id})">编辑</a>
                                    </li>
                                </c:if>
                                <li><a href="javascript:enedit4copy(${convention.id})">复制</a></li>
                                <li><a href="javascript:deedit4copy(${convention.id})">取消</a></li>
                                <li>

                                    <c:choose>
                                        <c:when test="${convention.hasStar }">已赞(${convention.stars})</c:when>
                                        <c:otherwise><a onclick="voteConvention(this,${convention.id},${test.id})" href="javascript:void(0)">赞(${convention.stars})</a></c:otherwise>
                                    </c:choose>

                                </li>
                                <li><a href="javascript:toTestDetail(${convention.id})">进入问题</a></li>

                            </ul>
                        </div>
                    </li>
                </c:forEach>
                <jsp:include page="../pageBottom.jsp">
                    <jsp:param name="action" value="test.query"/>
                    <jsp:param name="numPerPage" value="10"/>
                </jsp:include>
            </ul>
        </c:when>
        <c:otherwise>
            <div style="text-align:center;padding-top:20px;color: #f00;" >
                暂时没有答案
            </div>
        </c:otherwise>
    </c:choose>
</div>
</body>
</html>