package com.girltest.web.controller;

import com.girltest.entity.Girl;
import oa.web.controller.base.BaseController;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by 黄威 on 5/9/16.<br >
 */
@Controller
@RequestMapping("/girl")
public class GirlController  extends BaseController<Girl> {
    protected static Logger logger = Logger.getLogger(GirlController.class);
    @Override
    protected void beforeAddInput(Model model, HttpServletRequest request) {

    }

    @Override
    protected void errorDeal(Model model) {

    }

    @Override
    public String getJspFolder() {
        return "girl";
    }
}
