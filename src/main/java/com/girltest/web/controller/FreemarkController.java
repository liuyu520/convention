package com.girltest.web.controller;

import oa.web.controller.generic.GenericController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by 黄威 on 9/14/16.<br >
 */
@Controller
@RequestMapping("/demo2")
public class FreemarkController extends GenericController{

    @RequestMapping(value = "/search")
    public String index(Model model, HttpServletRequest request
            , HttpServletResponse response) {
        model.addAttribute("greetings","Hello world");
        return "framework";
    }
    @Override
    protected void beforeAddInput(Model model, HttpServletRequest request) {

    }

    @Override
    protected void errorDeal(Model model) {

    }

    @Override
    public String getJspFolder() {
        return null;
    }
}
