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
    <script type="text/javascript" src="<%=path%>/static/js/page.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/convention.js"></script>
    <script type="text/javascript" >
        var expandAnswer= function (self) {
            var $a=$(self);
            var $div=$a.prev();
            $div.html($div.attr('title'));
            $a.hide();
        }
    </script>
    <title>首页</title>
</head>
<body>
<jsp:include page="../public/top_admin.jsp"/>
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
<c:choose>
    <c:when test="${recordList!=null && fn:length(recordList)!=0 }">
        <div class="divider">
            <h3>热门问题</h3>
            <ul>
                <c:forEach items="${recordList }" var="bbs" varStatus="status">
                    <li><a title="${bbs.testcase}" href="<%=path%>/test/${bbs.id}">【${bbs.testcase}】</a></li>
                </c:forEach>
            </ul>
        </div>
        <div class="divider">
            <h3>热门答案</h3>
            <ul>
                <c:forEach items="${conventions }" var="bbs" varStatus="status">
                    <li style="margin-bottom: 10px;">
                        <div style="border-radius: 3px;border: 1px solid #f38399;" title="<c:out value="${bbs.answer}" default="" escapeXml="true"/>" ><c:out value="${fn:substring(bbs.answer,0,19)   }" default="" escapeXml="true"/></div>
                        <c:if test="${fn:length(bbs.answer)>19}">
                        <a href="javascript:void(0)" style="cursor: hand" id="expand_${status.count}" onclick="expandAnswer(this)">加载更多</a> </c:if>
                        <a href="javascript:deleteConventionSearchPge(${bbs.id})">删除</a>
                    </li>

                </c:forEach>
            </ul>
        </div>
    </c:when>
    <c:otherwise>

    </c:otherwise>
</c:choose>


<div>
    <!-- <a href="http://localhost/export?name1=whuang">导出</a> -->
</div>
<script type="text/javascript">
    $(function () {
        $('input[type=text]').focus();
    })
</script>
</body>
</html>