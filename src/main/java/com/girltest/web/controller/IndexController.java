package com.girltest.web.controller;

import com.girltest.dao.ConventionDao;
import com.girltest.dao.Test2BoyDao;
import com.girltest.entity.Convention;
import com.girltest.entity.Test2Boy;
import com.girltest.util.ConventionUtil;
import org.apache.commons.collections.map.ListOrderedMap;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
public class IndexController {
    private Test2BoyDao test2BoyDao;
    private ConventionDao conventionDao;

    @RequestMapping(value = "/search")
    public String index(Model model, HttpServletRequest request
            , HttpServletResponse response) {
        List<Test2Boy> test2Boys = test2BoyDao.getFrontList(3, "testcase", getListOrderBy());
        model.addAttribute("recordList", test2Boys);
        List<Convention> conventions=conventionDao.getFrontList(3,"answer",getListOrderBy());
        for (Convention convention : conventions) {
            //因为在html中\n不会换行,所以要把\n转化为br
            convention.setAnswer(ConventionUtil.convertBr(convention.getAnswer()));
        }
        model.addAttribute("conventions", conventions);
        return "test/index";
    }

    public Test2BoyDao getTest2BoyDao() {
        return test2BoyDao;
    }

    @Resource
    public void setTest2BoyDao(Test2BoyDao test2BoyDao) {
        this.test2BoyDao = test2BoyDao;
    }

    public ListOrderedMap getListOrderBy() {
        ListOrderedMap orderColumnModeMap = new ListOrderedMap();
        orderColumnModeMap.put("stars", "desc");
        orderColumnModeMap.put("updateTime", "desc");
        return orderColumnModeMap;
    }

    public ConventionDao getConventionDao() {
        return conventionDao;
    }

    @Resource
    public void setConventionDao(ConventionDao conventionDao) {
        this.conventionDao = conventionDao;
    }
}
