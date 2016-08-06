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
<%-- <c:choose>
    <c:when test="${test.best==null}">
    </c:when>
    <c:otherwise>
        <div>
            <h3>最佳答案</h3>
            <div>
                    ${test.best.answer}
            </div>
        </div>
    </c:otherwise>
</c:choose> --%>

<div>
    <span class="gray">全部答案</span> <a class="add-btn"
                                      href="<%=path%>/convention/add_answer?testBoyId=${test.id}">添加答案</a>
    &nbsp; <a href="<%=path%>/test/${test.id}/alias">修改别名</a>
    <c:choose>
    <c:when test="${test.conventions!=null && fn:length(test.conventions)!=0 }">
    <ul>
        <c:forEach items="${test.conventions }" var="convention" varStatus="status">
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
                    </ul>
                </div>
            </li>
        </c:forEach>

    </ul>
    </c:when>
        <c:otherwise>
            <div style="text-align:center;padding-top:20px;color: #f00;" >
                暂时没有答案
            </div>
        </c:otherwise>
    </c:choose>
</div>