/**
 * Created by Administrator on 2015/12/27.
 */
var server_url = "http://" + location.host+""//+"/convention";
function showAllAnswer(answerDetailId){
    var $answerDetail=$('#'+answerDetailId);
    $answerDetail.html($answerDetail.attr('originalval'))
};
$(function () {
    $('.test-list li img[data-id]').click(function () {
        var $progress = $('img.progress');
        var $imgDetail = $(this);
        var offset = $imgDetail.offset();


        var $next = $imgDetail.next();
        var detail = $next.next();
        //console.log(detail);
        var id = $imgDetail.data('id');
        if (detail.length === 0) {
            $progress.css('top', offset.top + 'px');
            $progress.css('left', offset.left + 'px');
            $progress.show();
            $next.after('<div id="answer_' + id + '"  ></div>');
            if (typeof(ajaxHtml)=== "undefined"){
                console.log(false);//没有声明
                alert('没有引入page.js');
                return;
            }else{
                console.log(true);
            }
            $imgDetail.css('background-color','red');
            ajaxHtml(server_url + "/test/" + id + "?targetView=test/detail_common&random22=" + Math.random()/*+"&sort="+newsSort*/,
                $('#answer_' + id), null, function () {
                    $progress.hide('normal');
                    $imgDetail.css('background-color','');
                    $('#answer_' + id).find('li.answer-list').each(function (i, li) {
                        var $li=$(li);
                        var $div=$li.find('>div');
                        var $answerDiv=$div.find('>div');
                        var answerContent=$answerDiv.html();
                        var limit=300;//字符限制
                        if(answerContent&&answerContent.length>limit){
                            com.whuang.hsj.setCustomAttr($answerDiv.get(0),'originalVal',answerContent);
                            answerContent=omitTooLongString(answerContent,limit,true);
                            $answerDiv.html(answerContent);
                            console.warn('超长');
                            $div.find('ul.operate-list').append('<li> <a href="javascript:showAllAnswer(\''+$answerDiv.attr('id')+'\')">显示全部</a> </li>');
                        }
                        // console.log(answerContent)
                    })
                });//page.js
            var $menu = $('#list-menu_' + id);
            if ($menu && $menu.length) {
                $menu.toggle('toggleClass');
            }
        } else {
            $('#answer_' + id).toggle('toggleClass');
        }

    });
    $('.diary-list li img[data-id]').click(function () {
        var $progress = $('img.progress');
        var $imgDetail = $(this);
        var offset = $imgDetail.offset();


        var $next = $imgDetail.next();
        var detail = $next.next();
        //console.log(detail);
        var id = $imgDetail.data('id');
        if (detail.length === 0) {
            $progress.css('top', offset.top + 'px');
            $progress.css('left', offset.left + 'px');
            $progress.show();
            $next.after('<div id="answer_' + id + '" style="margin:10px 4px;" ></div>');
            if (typeof(ajaxHtml)=== "undefined"){
                console.log(false);//没有声明
                alert('没有引入page.js');
                return;
            }else{
                console.log(true);
            }
            $imgDetail.css('background-color','red');
            ajaxHtml(server_url + "/diary/" + id + "/text",
                $('#answer_' + id), null, function () {
                    $progress.hide('normal');
                    $imgDetail.css('background-color','');
                });//page.js
        } else {
            $('#answer_' + id).toggle('toggleClass');
        }

    });
    //add answer
    var $add_convention = $('#add_convention');
    var addBtn=$add_convention.find('.submit');
    addBtn.click(function () {
        var $conventionTA=$add_convention.find('textarea');
        var answer = com.whuang.hsj.trim($conventionTA.val());
        if (answer) {
            if(uploadStatus==1){//只要ajax上传成功一次,则不再校验.防止点击了选择图片,忘了ajax上传图片的情况
                // alert("请先点击[ajax上传图片] 完成图片上传");
                // uploadStatus=0;//只拦截一次
                // $('#upload_pic').click();
                ajaxUploadFileCommon($('#upload_pic'),function () {
                    addBtn.click();
                });
                return false;
            }
            document.forms[1].submit();//因为现在增加了搜索框
            return true;
        } else {
            if(!ajaxUploadFileCommon($('#upload_pic'),$conventionTA,function () {
                addBtn.click();
            })){
                alert("请输入内容");
                $conventionTA.focus();
            }
            return false;
        }
    });
    var $test_detail = $('.test-detail');
    var $titleSpan = $test_detail.find('>span');
    $test_detail.find('>img').click(function () {
        $titleSpan.toggle('toggleClass');
    });
    $titleSpan.click(function () {
        $titleSpan.hide('normal');
    })
});//onload
var deleteConvention = function (conventionId,callback) {
    var isDel = confirm("确定要删除么");
    //alert(conventionId+":"+isDel)
    if (isDel) {
        var options = {
            url: server_url + "/convention/" + conventionId + "/delete2/json",
            type: "POST",
            dataType: 'json',
            success: function (json2) {
                if (json2.result) {
                    console.log('delete successfully,conventionId:'+conventionId);
                    if( typeof callback === 'function'){
                        callback();
                    }
                } else {
                    alert("失败")
                }
            },
            error: function (er) {
                console.log(er);
                dealResponseError(er);
            }
        };
        $.ajax(options);
    }
};
var deleteConventionInList=function (conventionId) {
    deleteConvention(conventionId,function (json) {
        $('li.answer-list[data-id=' + conventionId + ']').html('');
    });
};
var deleteConventionAfterAdd = function (conventionId) {
    deleteConvention(conventionId,function (json) {
        history.back();//返回到add 页面
    });
};
var deleteConventionSearchPge = function (conventionId) {
    deleteConvention(conventionId, function (json) {
        location.reload();
    });
};
var test = {};
diary={};
test.query = function () {
    var $form = $('#form_page');
    $form.action = server_url + "/test/list";
    $form.submit();
};
test.checkAddTestForm = function (form) {
    var $ta = $(form).find('textarea[name=testcase]');
    if (com.whuang.hsj.trim($ta.val())) {
        return true;
    } else {
        alert("请输入");
        return false;
    }
};
var selectAllTxt = function ($txt) {
    $txt.select();
};
var enlargeTxt = function ($txt) {
    var cols = $txt.attr('cols');
    var rows = $txt.attr('rows');
    // $txt.attr('cols', (Number(cols) + 8));
    $txt.attr('rows', (Number(rows) + 3));
};
var checkExist=function (val) {
    if(val){
        //ajax 调用接口判断是否存在该问题
        
    }

}
test.list_menu = function (imgSelf, testId) {
    //alert(getInner().width)
    console.log(testId);
    var $menu = $('#list-menu_' + testId);
    if ($menu && $menu.length) {
        $menu.toggle('toggleClass');
    } else {
        var $self = $(imgSelf);
        var offset2 = $self.offset();
        var left = Number(offset2.left) + 20;
        var delta = left + 90 - getInner().width;//90 表示下拉列表的最小宽度
        if (delta > 0) {
            left = left - delta;
        }
        var html = '<ul id="list-menu_' + testId + '" class="list-menu" style="top: ' + (Number(offset2.top))
            + 'px;left: ' + left + 'px;">';
        if (window.isAdmin) {
            html = html + '<li> <a href="' + server_url + '/test/' + testId + '/edit?targetView=test/edit">修改</a> </li>' +
                '<li> <a href="' + server_url + '/test/' + testId + '/delete" onclick="return confirm(\'确认删除吗\')">删除</a> </li>';
        }
        html = html + '<li> <a onclick="expandTest2(' + testId + ')">展开问题</a> </li>';
        html = html + '<li> <a onclick="collapseTest(' + testId + ')">收起问题</a> </li>';
        html = html + '<li> <a href="' + server_url + '/convention/add_answer?testBoyId=' + testId + '">添加答案</a> </li>';
        html = html + '<li> <a target="_blank" href="' + server_url + '/share/test/' + testId + '/create">分享</a> </li>';
        html = html + '<li> <a target="_blank" href="' + server_url + '/qrcode/cre?message=' + encodeURIComponent(server_url + '/share/test/' + testId + '/create') + '">生成二维码</a> </li>';
        html = html + '<li> <a  href="' + server_url + '/test/' + testId + '/alias">修改别名</a> </li>';
        html = html + '<li> <a onclick="hideTest(' + testId + ')">匿了</a> </li>' ;
        html = html +
            '</ul>';

        $('body div.draft').append(html);
    }

};
createQRCode=function (testId) {
    var options = {
        url: server_url + "/share/create/test/"+testId+"/json" ,
        type: "GET",
        dataType: 'json',
        success: function (json2) {
            var qrcodeurl=server_url + '/share/share/' + json2.id+'/'+json2.shareCode;
            console.log('qrcodeurl:'+qrcodeurl)
            location.href = server_url + '/qrcode/cre?message='+encodeURIComponent(qrcodeurl);
        },
        error: function (er) {
            console.log(er);
            dealResponseError(er);
        }
    };
    $.ajax(options);
};

diary.list_diarymenu = function (imgSelf, testId) {
    //alert(getInner().width)
    console.log(testId);
    var $menu = $('#list-menu_' + testId);
    if ($menu && $menu.length) {
        $menu.toggle('toggleClass');
    } else {
        var $self = $(imgSelf);
        var offset2 = $self.offset();
        var left = Number(offset2.left) + 20;
        var delta = left + 90 - getInner().width;//90 表示下拉列表的最小宽度
        if (delta > 0) {
            left = left - delta;
        }
        var html = '<ul id="list-menu_' + testId + '" class="list-menu" style="top: ' + (Number(offset2.top))
            + 'px;left: ' + left + 'px;">';
        if (window.isAdmin) {
            html = html + '<li> <a href="' + server_url + '/diary/' + testId + '/edit2">修改</a> </li>' +
                '<li> <a href="' + server_url + '/test/' + testId + '/delete" onclick="return confirm(\'确认删除吗\')">删除</a> </li>';
        }
        html = html + '<li> <a href="' + server_url + '/convention/add_answer?testBoyId=' + testId + '">添加答案</a> </li>';
        html = html + '<li> <a target="_blank" href="' + server_url + '/share/test/' + testId + '">分享</a> </li>';
        html = html + '<li> <a  href="' + server_url + '/test/' + testId + '/alias">修改别名</a> </li>';
        html = html + '<li> <a onclick="hideTest(' + testId + ')">匿了</a> </li>' ;
        html = html +
            '</ul>';

        $('body div.draft').append(html);
    }

};
var collapseTest=function (testId) {
    var $a=$('#test_li_'+testId+'>a');
    var content2=$a.html().trim();
    if(content2&&content2.length>50){
        $a.html(content2.substr(0,50));
        $('#list-menu_'+testId).hide();//隐藏下拉菜单
    }
};
var expandTest2=function (testId) {
    var $a=$('#test_li_'+testId+'>a');
    $a.html($a.data('content'));
    $('#list-menu_'+testId).hide();//隐藏下拉菜单
};
var hideTest=function (testId) {
    $('#test_li_'+testId).hide();//隐藏整个问题
    $('#list-menu_'+testId).hide();//隐藏下拉菜单
};
var crlf = '\r\n';
var enedit4copy = function (conventionId) {
    console.log(conventionId);
    $conventionDiv = $('#answer-detail_' + conventionId);
    var $textarea = $conventionDiv.find('>textarea');
    if ($textarea.length == 0) {
        console.log('create textarea');
        var content = $conventionDiv.html();
        $conventionDiv.data("content", content);
        $conventionDiv.html('<textarea   cols="40" rows="5"  >' + content.replace(/<br>/g, crlf) + '</textarea>')
    }
    if ($textarea.length == 0) {
        $textarea = $conventionDiv.find('>textarea');
    }
    $textarea.select();
};
var deedit4copy = function (conventionId) {
    $conventionDiv = $('#answer-detail_' + conventionId);
    var $textarea = $conventionDiv.find('>textarea');
    if ($textarea.length == 1) {
        $conventionDiv.html($conventionDiv.data("content"));
    }
};
var dealResponseError = function (er) {
    if (er.statusText == 'Internal Server Error') {
        alert("服务器内部错误")
    }
};
/***
 * 通过查找的答案,进入问题
 * @param conventionId
 */
var toTestDetail = function (conventionId) {
    var options = {
        url: server_url + "/convention/getTestId?conventionId=" + conventionId,
        type: "POST",
        dataType: 'json',
        success: function (json2) {
            if(json2.testId===-1){
                alert("未找到对应的测试");
                return;
            }
            location.href = server_url + "/test/oneTest?testId=" + json2.testId;
        },
        error: function (er) {
            console.log(er);
            dealResponseError(er);
        }
    };
    $.ajax(options);
};
var voteConvention = function (self, conventionId, testBoyId) {
    var options = {
        url: server_url + "/vote/vote?conventionId=" + conventionId + '&testBoyId=' + testBoyId,
        type: "POST",
        dataType: 'json',
        success: function (json2) {
            if (json2.result == 1) {
                $(self).parent().text("已赞");
                //alert("点赞成功");
            } else if (json2.result == 3) {
                alert("您已经点过赞")
            }
        },
        error: function (er) {
            console.log(er);
            dealResponseError(er);
        }
    };
    $.ajax(options);
};
var editConvention = function (conventionId) {
    ajaxHtml(server_url + "/convention/edit?testBoyId=3&conventionId=" + conventionId, $('#answer-detail_' + conventionId), null, null);
};
var updateConvention = function (self, conventionId,embedded) {
    var $form = com.whuang.hsj.getForm(self);
    var $answer_detail=$('#answer-detail_' + conventionId);
    var action=server_url + "/convention/update";
    if(embedded&&embedded=='yes'){
        action=action+"?targetView=/convention/detail";
    }
    if($answer_detail.length==0){
        $form.attr('action',action);
        $form.submit();
        return;
    }
    formAjaxHtml(action, $answer_detail, $form);
};
var ajaxUploadFileCommon=function ($this,$answer,successCallback) {
    console.log('ajaxUploadFileCommon222');
    var $thisForm = com.whuang.hsj.getForm($this);
    var $uploadFile = $thisForm.find('input[type=file]');
    if (!com.whuang.hsj.isHasValue($uploadFile.val())) {
        alert("请选择要上传的文件(仅支持jpg、jpeg、png、gif、bmp).");
        return false;
    }
    var param = {};
    param.formatTypeInvalid = "您上传的格式不正确，仅支持jpg、jpeg、png、gif、bmp,请重新选择！";
    param.url =  server_url+'/ajax_image/upload';
    param.success = function (data, status) {
        console.log(data);
        if (data && data.fullUrl) {
            // var $answer=$('textarea[name=answer]');
            var oldVal=$answer.val();
            if(oldVal){
                oldVal+='\r\n';
            }
            // $answer.val(oldVal+'<img style="max-width: 100%" src="'+data.relativePath+'" />');
            insertAfterText($answer[0], '<img style="max-width: 100%" src="' + data.relativePath + '" />');
            $("#previewImage").attr("src", data.relativePath);
            //提示语定时消失
            com.whuang.hsj.setMessage(null,'upload_result_tip',"上传成功","correct");
            $this.removeAttr('disabled',null);
            if(successCallback){
                successCallback(data);
            }
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
    return true;
};
/**
 * 在光标后插入文本
 * 参数：
 *     textDom  [JavaScript DOM String] 当前对象
 *     value  [String]  要插入的文本
 */
function insertAfterText(textDom, value) {
    var selectRange;
    if (document.selection) {
        // IE Support
        textDom.focus();
        selectRange = document.selection.createRange();
        selectRange.text = value;
        textDom.focus();
    } else if (textDom.selectionStart || textDom.selectionStart == '0') {
        // Firefox support
        var startPos = textDom.selectionStart;
        var endPos = textDom.selectionEnd;
        var scrollTop = textDom.scrollTop;
        textDom.value = textDom.value.substring(0, startPos) + value + textDom.value.substring(endPos, textDom.value.length);
        textDom.focus();
        textDom.selectionStart = startPos + value.length;
        textDom.selectionEnd = startPos + value.length;
        textDom.scrollTop = scrollTop;
    }
    else {
        textDom.value += value;
        textDom.focus();
    }
}
