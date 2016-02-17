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
    <title>首页</title>
</head>
<body>
<c:choose>
    <c:when test="${recordList!=null && fn:length(recordList)!=0 }">
        <div class="divider">
            <h3>热门</h3>
            <ul>
                <c:forEach items="${recordList }" var="bbs" varStatus="status">
                    <li><a title="${bbs.testcase}" href="<%=path%>/test/${bbs.id}">${bbs.testcase}</a></li>
                </c:forEach>
            </ul>
        </div>
    </c:when>
    <c:otherwise>

    </c:otherwise>
</c:choose>

<div>
    <h3>搜索 <a href="<%=path%>/test/add">添加测试</a> &nbsp; <a href="<%=path%>/test/list">列表</a></h3>
    <form action="<%=path%>/test/list" method="post">
        <table>
            <tr>
                <td>
                    <input type="text" name="testcase" placeholder="请输入您要搜索的关键字" style="font-size: 18px;width: 320px;">
                </td>
            </tr>
            <tr>
                <td>
                    <input type="submit" value="搜索">
                </td>
            </tr>
        </table>
    </form>
</div>
<div>
    <a href="http://localhost/export?name1=whuang">导出</a>
</div>
<script type="text/javascript">
    $(function () {
        $('input[type=text]').focus();
    })
</script>
</body>
</html>