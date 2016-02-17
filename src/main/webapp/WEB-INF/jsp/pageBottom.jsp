<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script type="text/javascript">
    var checkPageForm = function () {
        var currentPage22 = com.whuang.hsj.$$id('view.currentPage');
        if (currentPage22.value == '0') {
            //alert(11);
            return false;
        } else {
            return true;
        }
    };
    /* var disAbleA=function(object){
     if (object!=null) {
     object.onclick=function(){
     return false;
     }
     }
     } */
</script>
<style type="text/css">

    div.pagingDiv td a {
        color: #fff;
        background: #e60012;
        font-size: 14px;
        padding: 4px;
        border-radius: 3px;
    }

    div.pagingDiv td a:hover {
        /*color:#000;*/
        text-decoration: underline;
        background: #fd05ae;
    }

    input.pagingTextInput {
        border-radius: 3px;
    }
</style>
<div style="text-align:center;" class="pagingDiv">
    <form id="form_page" method="GET" onsubmit="return checkPageForm()">
        <table style="height: 35px; border-top-width:0;border-left-width: 0;width:auto;">
            <tr>
                <td nowrap="nowrap">
		<span style="color: black">共
				
				<c:choose>

                    <c:when test="${view.totalRecords==0}"><span style="color:#df625c">0</span> </c:when>
                    <c:otherwise>
                        ${view.totalRecords }
                    </c:otherwise>
                </c:choose>
				, <font color="#e60012"> <c:choose>
                <c:when test="${view.totalPages==0 }">0</c:when>
                <c:otherwise>
                    ${view.currentPage}
                </c:otherwise>
            </c:choose></font>/${view.totalPages}&nbsp;&nbsp;
		</span></td>


                <td nowrap="nowrap" style="display: none">
                    <!-- 首页,view.currentPage的值为1 -->
                <td colspan="9" style="color:#000; "><span>
		
				<c:choose>
                    <c:when test="${view.currentPage<=1}">首</c:when>
                    <c:otherwise>
                        <a name="firstPageHref" href="javascript:toPageFirst($('#form_page'),${param.action});"
                           style="color:#fff;">首页</a>
                    </c:otherwise>
                </c:choose>
				
				<c:choose>
                    <c:when test="${view.currentPage<=1}">上一页</c:when>
                    <c:otherwise>
                        <a name="previousPageHref" href="javascript:toPagePre($('#form_page'),${param.action});"
                           style="color:#fff;">上一页</a>
                    </c:otherwise>
                </c:choose>
				
				<c:choose>
                    <c:when test="${view.currentPage>=view.totalPages }">下一页</c:when>
                    <c:otherwise>
                        <a name="nextPageHref" href="javascript:toPageNext($('#form_page'),${param.action});">下一页</a>
                    </c:otherwise>
                </c:choose>
				
				<c:choose>
                    <c:when test="${view.currentPage>=view.totalPages}">尾</c:when>
                    <c:otherwise>
                        <a name="endPageHref" href="javascript:toPageLast($('#form_page'),${param.action});">尾页</a>
                    </c:otherwise>
                </c:choose>
			<c:if test="${view.totalPages>1 }">

                <c:choose>
                    <c:when test="${view.totalPages==0 || view.totalPages==1}">
                        <input type="text" id="view.currentPage" name="currentPage" disabled='disabled'
                               onkeyup="onlyIntegerKeyUp(event)" value="0"/>
                    </c:when>
                    <c:otherwise>
                        <input type="text" id="view.currentPage" style="width:15px;" onkeyup="onlyIntegerKeyUp(event)"
                               name="currentPage"
                               value="${view.currentPage }"/>
                    </c:otherwise>
                </c:choose>


                <a href="javascript:toPageGo(${param.action})">GO</a>
            </c:if>
		</span> <input type="hidden" id="view.thisPage" value="${view.currentPage }"/>
                    <input type="hidden" id="view.totalPages" name="totalPages"
                           value="${view.totalPages }"> <input type="hidden"
                                                               id="view.ascDesc" name="ascDesc"
                                                               value="${view.ascDesc }"> <input
                            type="hidden" id="view.sortKey" name="sortKey"
                            value="${view.sortKey }">
                    <input type="hidden" name="pageFlag" value="not_query">


                </td>

            </tr>

        </table>
        <c:if test="${param.numPerPage>0 }">
            <input type="hidden" name="recordsPerPage" value="${param.numPerPage}">
        </c:if>
    </form>
</div>