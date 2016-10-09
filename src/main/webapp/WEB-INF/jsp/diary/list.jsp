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
    <link rel="stylesheet" type="text/css" href="http://codeseven.github.io/toastr/build/toastr.min.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1">
    <script type="text/javascript" src="<%=path%>/static/js/jquery-1.11.1.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/jquery.form.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/common_util.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/page.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/convention.js"></script>
    <script type="text/javascript" src="http://hammerjs.github.io/dist/hammer.min.js" ></script>
    <script type="text/javascript" src="http://codeseven.github.io/toastr/build/toastr.min.js" ></script>
    <script type="text/javascript" >
    <c:if test="${sessionScope.user!=null &&sessionScope.user.level==2}">
    isAdmin=${sessionScope.user!=null &&sessionScope.user.level==2};
    </c:if>
        $(function () {
            console.log('onload');
            toastr.options = {"timeOut": "3000","preventDuplicates": true,"hideDuration": "1"};
            $('ul.diary-list>li').each(function (i, li) {
                var $li=$(li);
                var hammertime = new Hammer(li);
                hammertime.get('press').set({ time: 500 });//Minimal press time in ms.
                hammertime.on('press', function(ev) {
                    console.log(ev);
                    var updateTime=$li.data('datetime');
//                    alert(updateTime);
                    toastr.info(updateTime)
                }).on('swiperight',function (ev) {
                    var diaryContent=$li.find('a').attr('title');
                    if(!diaryContent){
                        diaryContent='暂无内容';
                        toastr.warning(diaryContent);
                    }else{
                        toastr.success(diaryContent);
                    }

                })
            })
        })

    </script>
    <title>日记列表</title>
    <style>
        #toast-container>div {
             opacity: 1;
            -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
            filter: alpha(opacity=100);
        }
    </style>
</head>
<body>
<jsp:include page="../public/top_admin.jsp"/>
<a href="<%=path%>/diary/getCurrent">记录日记</a> &nbsp; <a href="<%=path%>/search">首页</a>&nbsp;<a href="<%=path%>/test/list">列表</a>
&nbsp;<a href="<%=path%>/convention/searchInput">搜索答案</a>
&nbsp;<a href="javascript:anchorGoIndexTop('bottomHref')">回到底部</a>
<hr>
<div>
    <a href="" name="topHref" ></a>
    <ul class="diary-list">

        <c:choose>
            <c:when test="${view.recordList!=null && fn:length(view.recordList)!=0 }">
                <c:forEach items="${view.recordList }" var="diary" varStatus="status">
                    <li id="test_li_${diary.id}"  data-datetime="${diary.updateTime}" ><span class="gray">(${diary.id})</span>【<a title="<c:out value="${diary.content}" default="" escapeXml="true"/>" data-content="<c:out value="${diary.content}" default="" escapeXml="true"/>"
                                                                 ><c:choose>
                        <c:when test="${diary.content!=null && fn:length(diary.content)!=0 }">
                            <c:choose>
                                <c:when test="${fn:length(diary.content)>20 }">
                                    ${fn:substring(diary.content,0,20)}</c:when>
                                <c:otherwise>${diary.content}</c:otherwise>
                            </c:choose></c:when>
                        <c:otherwise>${diary.createTime}</c:otherwise>
                    </c:choose> </a>】
                        <img data-id="${diary.id}" style="padding-right: 20px;padding-top: 10px;padding-bottom: 5px;
    padding-left: 10px;cursor: pointer"
                             src="<%=path%>/static/img/icon_3.png" alt="详情">
                        <img onclick="diary.list_diarymenu(this,${diary.id})" style="cursor: pointer;" src="<%=path%>/static/img/col_list.gif" alt="菜单">
                    </li>
                </c:forEach>

                <jsp:include page="../pageBottom.jsp">
                    <jsp:param name="action" value="test.query"/>
                    <jsp:param name="numPerPage" value="10"/>
                </jsp:include>
                <div style="text-align: right;margin-top: 12px;">
                    <a  name="bottomHref" href="javascript:anchorGoIndexTop('topHref')">回到顶部</a>
                </div>
            </c:when>
            <c:otherwise>
            <script type="text/javascript" >
                setTimeout(function () {
                    history.back();
                },3000);
                </script>
                <div style="text-align:center;padding-top:20px;">
                    没有查询到符合条件的测试.
                </div>
                <div><a href="<%=path%>/test/add?content=${content}">添加测试</a></div>
            </c:otherwise>
        </c:choose>

    </ul>
</div>
<div class="draft"></div>
<img class="progress" style="position: absolute;display: none" src="<%=path%>/static/img/progress.gif" alt="正在加载...">

</body>
</html>