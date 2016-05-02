<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
    <script type="text/javascript" src="<%=path%>/static/js/common_util.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/page.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/convention.js"></script>
<title>分享-${fn:substring(test.testcase,0,18)   }</title>
</head>
<body>
<div>
    <h4>【${test.testcase}】</h4>
<!-- JiaThis Button BEGIN -->
<div class="jiathis_style_m"></div>
<script type="text/javascript" src="http://v3.jiathis.com/code/jiathis_m.js" charset="utf-8"></script>
<br>
<!-- JiaThis Button END -->
    <div>
        <ul>
            <c:forEach items="${test.conventions }" var="convention" varStatus="status">
                <li class="" data-id="${convention.id}">
                    <div>
                        <div id="answer-detail_${convention.id}">${convention.answer}</div>
                        <%--<hr style="margin-right: 10px;width: inherit">
                        <ul class="operate-list">

                            <li><a href="javascript:enedit4copy(${convention.id})">复制</a></li>
                            <li><a href="javascript:deedit4copy(${convention.id})">取消</a></li>

                        </ul>--%>
                    </div>
                </li>
            </c:forEach>

        </ul>
    </div>
</div>

</body>
</html>