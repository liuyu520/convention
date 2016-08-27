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
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="<%=path%>/static/css/global.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1">
    <script type="text/javascript" src="http://hbjltv.com/static/js/jquery-1.11.1.js"></script>
    <script type="text/javascript" src="http://hbjltv.com/static/js/common_util.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/convention.js"></script>
    <title>上传图片</title>
</head>
<body>
<div class="tips">
    <span class="success">${message}</span>
</div>
<div>
    <form action="<%=path%>/image/upload" method="post" enctype="multipart/form-data" >
        <table>
            <tr style="height: 40px"> <td  > <input type="file" name="image223" ></td></tr>
            <tr>
                <td>
                    <label class="cannot_select">相同文件名<input checked style="width:10px;border:none;padding-left:0;" type="checkbox"
                                                        name="sameFileName"
                                                        value="1"></input></label>
                </td>
            </tr>
            <tr>
                <td>
                    <label>文件名:</label>
                    <input type="text" name="fileName" >(前缀始终是"upload_")
                </td>
            </tr>
            <tr> <td><input style="margin-top: 10px;" type="submit" value="上传" ></td> </tr>
        </table>

    </form>

</div>
</body>
</html>