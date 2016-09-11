<?xml version="1.0" encoding="UTF-8" ?>
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
<div><c:choose>
    <c:when test="${sessionScope.logined==null ||sessionScope.logined==''}"><font
            color="#df625c">您还没有登录</font> </c:when>
    <c:otherwise>
        欢迎 <span style="color:blue;font-weight:bolder;">${sessionScope.user.username }</span>&nbsp;&nbsp;
    </c:otherwise>
</c:choose>
    <c:choose><c:when test="${sessionScope.logined==null ||sessionScope.logined==''}"><a
            href="<%=path%>/user/loginInput">登录</a> </c:when>
        <c:otherwise>
            <a href="<%=path%>/user/logout">注销</a>
        </c:otherwise>
    </c:choose>
    &nbsp;<%--当前页面:${requestScope["javax.servlet.forward.servlet_path"]}--%>
    <a href="<%=path%>/image/convention">上传</a>
    &nbsp;
    <a href="http://hbjltv.com/html/blog.html">blog set</a>
     &nbsp;<a href="JavaScript:void(0)" onclick="$('#searchBox').toggle( )" >search<img data-id="${bbs.id}" style="cursor: pointer"
                                                   src="<%=path%>/static/img/icon_3.png" alt="详情"></a>
</div>
<div id="searchBox" style="display: none;" ><%-- 下面的代码是从WEB-INF/jsp/test/index.jsp 中拷贝 ,并删除h3标签和"精确搜索"选项 --%>
    <form action="<%=path%>/test/list" method="post">
        <table>
            <tr>
                <td>
                    <input type="text" name="keyword" placeholder="请输入您要搜索的关键字" style="font-size: 18px;width: 320px;">
                    <input type="hidden" name="columnsArr" value="testcase,alias,alias2"  >
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