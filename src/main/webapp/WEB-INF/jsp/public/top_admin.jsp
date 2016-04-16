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
    <a href="<%=path%>/image/convention">上传图片</a>
    &nbsp;
    <a href="http://hbjltv.com/html/blog.html">blog set</a>
    <%-- &nbsp;<a target="_blank" href="<%=path%>">首页</a> --%>
</div>