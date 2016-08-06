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
                    //提示语定时消失
                    com.whuang.hsj.setMessage(null,'upload_result_tip',"上传成功","correct");
                    $this.removeAttr('disabled',null);
                } else {
                    alert("服务器故障，稍后再试！");
                    console.log(data);
                }
            };
            param.error = function (data, status, e) {
                console.log(e);
                alert(e);
            };
            $('#upload_result_tip').text("上传中...").removeClass('correct');
            $this.attr('disabled','disabled');
            uploadStatus=2;
            com.whuang.hsj.ajaxUploadFile($uploadFile.get(0).id/*'fileToUpload'*/, param);
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
    <h3>修改别名</h3>
    <h4>【${test.testcase}】</h4>
    <a href="<%=path%>/test/add">添加测试</a>&nbsp; <a href="<%=path%>/test/${test.id}">返回详情</a>
    &nbsp;<a href="<%=path%>/test/list">列表</a> &nbsp; <a href="<%=path%>/search">首页</a>
    &nbsp;<a class="add-btn" href="<%=path%>/convention/add_answer?testBoyId=${test.id}">添加答案</a>
    <div id="add_convention">

                        <form action="<%=path%>/test/update_alias" method="post">
                            <input type="hidden" name="id" value="${test.id}">
                            <textarea name="alias" id="" style="width:100%"  rows="5"  placeholder="请填写别名" >${test.alias}</textarea>
                            <input type="submit" value="修改" >
                        </form>

    </div>
</div>
</body>
</html>