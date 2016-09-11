package com.girltest.web.controller;

import com.common.util.SystemHWUtil;
import com.girltest.dao.ShareArticleDao;
import com.girltest.dao.Test2BoyDao;
import com.girltest.entity.Convention;
import com.girltest.entity.ShareArticle;
import com.girltest.entity.Test2Boy;
import com.girltest.util.ConventionUtil;
import com.io.hw.json.HWJacksonUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

/**
 * Created by huangweii on 2016/2/28.
 */
@Controller
@RequestMapping("/share")
public class ShareController {
    protected static Logger logger = Logger.getLogger(ShareController.class);
    private Test2BoyDao test2BoyDao;
    private ShareArticleDao shareArticleDao;

    @RequestMapping(value = "/share/{id}/{uuid}")
    public String shareTest(@PathVariable int id, @PathVariable String uuid, Model model, HttpServletRequest request) {
        ShareArticle shareArticle = this.shareArticleDao.get(id);
        if (shareArticle.getShareCode().equals(uuid)) {
            int testId = shareArticle.getRelativeId();
            Test2Boy test2Boy = test2BoyDao.getConventions(testId);
            if (null != test2Boy) {
                List<Convention> conventions = test2Boy.getConventions();
                for (Convention convention : conventions) {
                    //因为在html中\n不会换行,所以要把\n转化为br
                    convention.setAnswer(ConventionUtil.convertBr(convention.getAnswer()));
                }
            } else {//无conventions的时候
                test2Boy = test2BoyDao.get(testId);
                test2Boy.setConventions(null);
            }
            model.addAttribute("test", test2Boy);
        } else {
            System.out.println("uuid is wrong");
        }


        /*String uuid = UUID.randomUUID().toString();
        ShareArticle shareArticle=new ShareArticle();
        shareArticle.setShareCode(uuid);
        shareArticle.setRelativeId(id);*/



        return "share/test";
    }

    /***
     * 1-test;<br >2-convention<br >
     *     创建共享链接<br>
     *  返回:
     {"id":1,"shareCode":"6c3511e3-d7c2-402f-ad31-99cd3135146e","type":1,"relativeId":10,"updateTime":"2016-09-11 20:05:46"}
     * @param id
     * @param model
     * @param request
     * @return :
    {"id":1,"shareCode":"6c3511e3-d7c2-402f-ad31-99cd3135146e","type":1,"relativeId":10,"updateTime":"2016-09-11 20:05:46"}
     */
    @RequestMapping(value = "/test/{id}/create", produces = SystemHWUtil.RESPONSE_CONTENTTYPE_PLAIN_UTF)
    @ResponseBody
    public String buildShareItem(@PathVariable int id, Model model, HttpServletRequest request) {
        String uuid = UUID.randomUUID().toString();
        ShareArticle shareArticle = this.shareArticleDao.share(uuid, 1, id);
        return HWJacksonUtils.getJsonP(shareArticle);
    }
    public Test2BoyDao getTest2BoyDao() {
        return test2BoyDao;
    }

    @Resource
    public void setTest2BoyDao(Test2BoyDao test2BoyDao) {
        this.test2BoyDao = test2BoyDao;
    }

    public ShareArticleDao getShareArticleDao() {
        return shareArticleDao;
    }

    @Resource
    public void setShareArticleDao(ShareArticleDao shareArticleDao) {
        this.shareArticleDao = shareArticleDao;
    }
}
