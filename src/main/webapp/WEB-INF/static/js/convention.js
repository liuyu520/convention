/**
 * Created by Administrator on 2015/12/27.
 */
var server_url = "http://" + location.host+""//+"/convention";
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
            ajaxHtml(server_url + "/test/" + id + "?targetView=test/detail_common&random22=" + Math.random()/*+"&sort="+newsSort*/,
                $('#answer_' + id), null, function () {
                    $progress.hide('normal');
                });//page.js
        } else {
            $('#answer_' + id).toggle('toggleClass');
        }

    });
    //add answer
    var $add_convention = $('#add_convention');
    $add_convention.find('.btn').click(function () {
        var $conventionTA=$add_convention.find('textarea');
        var answer = com.whuang.hsj.trim($conventionTA.val());
        if (answer) {
            document.forms[0].submit();
            return true;
        } else {
            alert("请输入内容");
            $conventionTA.focus();
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
                console.log(er)
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
var test = {};
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
        html = html + '<li> <a target="_blank" href="' + server_url + '/share/test/' + testId + '">分享</a> </li>';
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
            console.log(er)
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
}
