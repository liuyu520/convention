<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    if (path.equals("/")) {
        path = "";
    }
%>

    <div id="add_convention_${convention.id}">
        <form  method="post">
            <input type="hidden" name="testBoyId" value="${test.id}">
            <input type="hidden" name="id" value="${convention.id}">
            <table  style="width: 100%;">
                <tr>
                    <td>
                        <textarea name="answer" style="width:100%" rows="5">${convention.answer}</textarea>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="button" onclick="updateConvention(this,${convention.id})" class="btn" value="修改">
                        <%--&nbsp;&nbsp;<a href="javascript:history.back();">返回</a>--%>
                        &nbsp;&nbsp;<a href="javascript:selectAllTxt($('#add_convention_${convention.id} textarea'));">全选</a>
                        &nbsp;&nbsp;<a href="javascript:enlargeTxt($('#add_convention_${convention.id} textarea'));">放大</a>
                        &nbsp;&nbsp;<a href="javascript:$('#add_convention_${convention.id} textarea').val('').focus();">清空</a>
                    </td>
                </tr>
            </table>
        </form>
    </div>
