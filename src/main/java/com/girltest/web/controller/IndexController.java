package com.girltest.web.controller;

import com.girltest.dao.Test2BoyDao;
import com.girltest.entity.Test2Boy;
import org.apache.commons.collections.map.ListOrderedMap;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class IndexController {
    private Test2BoyDao test2BoyDao;

    @RequestMapping(value = "/")
    public String index(Model model) {
        List<Test2Boy> test2Boys = test2BoyDao.getFrontList(3, "testcase", getListOrderBy());
        model.addAttribute("recordList", test2Boys);
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
}
