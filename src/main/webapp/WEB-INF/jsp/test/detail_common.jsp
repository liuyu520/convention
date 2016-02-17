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
    <ul>
        <c:forEach items="${test.conventions }" var="convention" varStatus="status">
            <li class="answer-list" data-id="${convention.id}">
                <div>
                    <div id="answer-detail_${convention.id}">${convention.answer}</div>
                    <hr style="margin-right: 10px;width: inherit">
                    <ul class="operate-list">
                        <li><a href="javascript:deleteConvention(${convention.id})">删除</a></li>
                        <li>
                            <a href="<%=path%>/convention/edit?testBoyId=${test.id}&conventionId=${convention.id}&testcase=${test.testcase }">编辑</a>
                        </li>
                        <li><a href="javascript:enedit4copy(${convention.id})">复制</a></li>
                        <li><a href="javascript:deedit4copy(${convention.id})">取消</a></li>
                    </ul>
                </div>
            </li>
        </c:forEach>

    </ul>
</div>