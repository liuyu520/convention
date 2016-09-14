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
    <script type="text/javascript" src="http://hbjltv.com/static/js/ajaxfileupload.js" ></script>
    <script type="text/javascript" src="http://hbjltv.com/static/js/common_util.js"></script>
    <script type="text/javascript" src="http://hbjltv.com/static/js/page.js"></script>
    <script type="text/javascript" src="<%=path%>/static/js/convention.js"></script>
    <title>添加答案</title>
    <script type="text/javascript">

        var uploadStatus=0;//初始状态:0;  选择了图片但未上传:1;  上传成功:2
        var ajaxUploadFile = function (self) {
            var $this=$(self);
            ajaxUploadFileCommon($this);
        };
        $(function () {
            //预览图片,没有真正上传
            com.whuang.hsj.previewLocalDiskImage($('#pic-file'), $("#previewImage"),function () {
                if(uploadStatus==0) {//只要ajax上传成功一次,则不再校验.防止点击了选择图片,忘了ajax上传图片的情况
                    uploadStatus=1;
                }
            },6/*单位是M*/);
            $('textarea[name=answer]').focus();
        })
    </script>
</head>
<body>
<jsp:include page="../public/top_admin.jsp"/>
<div class="tips">
    <span class="success">${message}</span>
</div>
<div>
    <h3>添加答案</h3>
    <h4>【${test.testcase}】</h4>
    <a href="<%=path%>/test/add">添加测试</a>&nbsp; <a href="<%=path%>/test/${test.id}">返回详情</a>
    &nbsp;<a href="<%=path%>/test/list">列表</a> &nbsp; <a href="<%=path%>/search">首页</a>
    &nbsp; <a href="<%=path%>/test/${test.id}/alias">修改别名</a>
    <div id="add_convention">

            <table style="width: 100%;" >
                <tr>
                    <td>
                        <form action="<%=path%>/test/save_answer" method="post">
                            <input type="hidden" name="testBoyId" value="${test.id}">
                            <%--<input type="hidden" name="testcase" value="${test.testcase}">--%>
                            <textarea name="answer" id="" style="width:100%"  rows="5"  placeholder="请填写答案" ></textarea>
                            <input type="hidden" name="token" value="${sessionScope.token}" >
                        </form>
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom:20px">
                        <form action="/image/upload" id="pic-form"  method="post" enctype="multipart/form-data" >
                            <input type="file" id="pic-file" name="image223" > <br><br>
                            <input type="button" onclick="ajaxUploadFile(this)" id="upload_pic" value="ajax上传图片" > <span  id="upload_result_tip" ></span>
                        </form>
                        <br>
                        <input type="button" class="submit" value="添加">
                            <div style="width: 100%;" >
                            <img style="max-width: 100%;" alt="暂无预览图片" id="previewImage" >
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>

                        &nbsp;&nbsp;<a href="javascript:history.back();">返回</a>
                        &nbsp;&nbsp;<a href="javascript:selectAllTxt($('#add_convention textarea'));">全选</a>
                        &nbsp;&nbsp;<a href="javascript:enlargeTxt($('#add_convention textarea'));">放大</a>
                        &nbsp;&nbsp; <select  id="font_select">
                        <options>
                            <option value="red">红色</option>
                            <option value="bold">加粗</option>
                            <option value="red_bold">红色并加粗</option>
                        </options>
                    </select>
                    </td>
                </tr>
            </table>

    </div>
</div>
</body>
</html>