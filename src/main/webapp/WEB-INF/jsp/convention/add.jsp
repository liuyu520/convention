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
    <script type="text/javascript" src="<%=path%>/static/js/convention.js"></script>
    <title>添加答案</title>
    <script type="text/javascript">
        var ajaxUploadFile = function (self) {
            var $thisForm = com.whuang.hsj.getForm(self);
            var $uploadFile = $thisForm.find('input[type=file]');
            if (!com.whuang.hsj.isHasValue($uploadFile.val())) {
                alert("请选择要上传的文件(仅支持jpg、jpeg、png、gif、bmp).");
                return false;
            }
            var param = {};
            param.formatTypeInvalid = "您上传的格式不正确，仅支持jpg、jpeg、png、gif、bmp,请重新选择！";
            param.url =  '<%=path%>/ajax_image/upload';
            param.success = function (data, status) {
                console.log(data);
                if (data && data.fullUrl) {
                    var $answer=$('textarea[name=answer]');
                    var oldVal=$answer.val();
                    if(oldVal){
                        oldVal+='\r\n';
                    }
                    $answer.val(oldVal+'<img style="max-width: 100%" src="'+data.relativePath+'" />');
                    $("#previewImage").attr("src", data.relativePath);
                    alert("上传成功");
                } else {
                    alert("服务器故障，稍后再试！");
                    console.log(data);
                }
            };
            param.error = function (data, status, e) {
                console.log(e);
                alert(e);
            };
            com.whuang.hsj.ajaxUploadFile($uploadFile.get(0).id/*'fileToUpload'*/, param);
        };
        $(function () {
            //预览图片,没有真正上传
            com.whuang.hsj.previewLocalDiskImage($('#pic-file'), $("#previewImage"));
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
    <div id="add_convention">
        <form action="<%=path%>/test/save_answer" method="post">
            <input type="hidden" name="testBoyId" value="${test.id}">
            <input type="hidden" name="testcase" value="${test.testcase}">
            <table style="width: 100%;" >
                <tr>
                    <td>
                        <textarea name="answer" id="" style="width:100%"  rows="5"  placeholder="请填写答案" ></textarea>
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom:20px">
                        <form action="/image/upload" id="pic-form"  method="post" enctype="multipart/form-data" >
                            <input type="file" id="pic-file" name="image223" > <br><br>
                            <input type="button" onclick="ajaxUploadFile(this)" value="ajax上传图片" >
                        </form>
                            <div style="width: 100%;" >
                            <img style="max-width: 100%;" alt="暂无预览图片" id="previewImage" >
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="submit" class="btn" value="添加">
                        &nbsp;&nbsp;<a href="javascript:history.back();">返回</a>
                        &nbsp;&nbsp;<a href="javascript:selectAllTxt($('#add_convention textarea'));">全选</a>
                        &nbsp;&nbsp;<a href="javascript:enlargeTxt($('#add_convention textarea'));">放大</a>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</div>
</body>
</html>