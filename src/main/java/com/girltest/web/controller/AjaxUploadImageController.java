package com.girltest.web.controller;

import oa.web.controller.common.UploadGenericController;
import oa.web.upload.UploadCallback;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/ajax_image")
public class AjaxUploadImageController extends UploadGenericController {

    @Override
    public UploadCallback getUploadCallback() {
        return new AjaxImageUploadCallback();
    }

    @Override
    protected void beforeAddInput(Model model) {

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
