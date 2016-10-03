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
        欢迎 <span style="color:blue;font-weight:bolder;cursor: pointer;" onclick="$('ul:first').toggle('normal')">${sessionScope.user.username }</span>
        <ul style="display: none;z-index: 9999; background: chartreuse;position: absolute;width: 90px;border-radius: 3px;margin-top: 0; padding-top: 20px;">
            <li onclick="javascript:location.href='<%=path%>/user/logout';" class="user_profile" >
                <i class="iconExit"></i><span>退出</span>
            </li>
            <li  class="user_profile" >
                <i class=""></i><span>创建新用户</span>
            </li>
            <li>
                <a href="<%=path%>/diary/getCurrent">记录日记</a>
            </li>
        </ul>
        &nbsp;&nbsp;
    </c:otherwise>
</c:choose>
    <c:choose><c:when test="${sessionScope.logined==null ||sessionScope.logined==''}"><a
            href="<%=path%>/user/loginInput">登录</a> </c:when>
        <c:otherwise>
        </c:otherwise>
    </c:choose>
    &nbsp;<%--当前页面:${requestScope["javax.servlet.forward.servlet_path"]}--%>
    <a href="<%=path%>/image/convention">上传</a>
    &nbsp;
    <a href="http://hbjltv.com/html/blog.html">blog set</a>
<c:if test="${requestScope[\"javax.servlet.forward.servlet_path\"]!='/search'}">&nbsp;<a href="JavaScript:void(0)" onclick="$('#searchBox').toggle(&quot;slow&quot;,function() {console.log(this.style.display);if(this.style.display===&quot;block&quot;||this.style.display===''){$(this).find('input[type=text]').focus();}})" >search<img data-id="${bbs.id}" style="cursor: pointer"
                                                   src="<%=path%>/static/img/icon_3.png" alt="搜索"></a></c:if>
</div>
<c:if test="${requestScope[\"javax.servlet.forward.servlet_path\"]!='/search'}">
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
</c:if>