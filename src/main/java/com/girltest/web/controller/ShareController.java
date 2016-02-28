package com.girltest.web.controller;

import com.common.dict.Constant2;
import com.girltest.dao.Test2BoyDao;
import com.girltest.entity.Convention;
import com.girltest.entity.Test2Boy;
import com.girltest.entity.VoteLog;
import com.girltest.util.ConventionUtil;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by huangweii on 2016/2/28.
 */
@Controller
@RequestMapping("/share")
public class ShareController {
    private Test2BoyDao test2BoyDao;
    @RequestMapping(value = "/test/{id}")
    public String shareTest(@PathVariable int id, Model model, HttpServletRequest request){
        Test2Boy test2Boy = test2BoyDao.getConventions(id);
        if (null != test2Boy) {
            List<Convention> conventions = test2Boy.getConventions();
            for (Convention convention : conventions) {
                //因为在html中\n不会换行,所以要把\n转化为br
                convention.setAnswer(ConventionUtil.convertBr(convention.getAnswer()));
            }
        } else {//无conventions的时候
            test2Boy = test2BoyDao.get(id);
            test2Boy.setConventions(null);
        }
        model.addAttribute("test",test2Boy);
        return "share/test";
    }

    public Test2BoyDao getTest2BoyDao() {
        return test2BoyDao;
    }

    @Resource
    public void setTest2BoyDao(Test2BoyDao test2BoyDao) {
        this.test2BoyDao = test2BoyDao;
    }
}
