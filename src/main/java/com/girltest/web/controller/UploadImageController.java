package com.girltest.web.controller;

import oa.web.controller.common.UploadGenericController;
import oa.web.upload.UploadCallback;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/image")
public class UploadImageController extends UploadGenericController {

    @Override
    public UploadCallback getUploadCallback() {
        return new ImageUploadCallback();
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

    @RequestMapping(value = "/convention")
    public String index(Model model) {

        return "public/upload_img";
    }
}
