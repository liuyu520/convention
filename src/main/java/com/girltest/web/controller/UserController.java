package com.girltest.web.controller;

import com.common.entity.user.interf.GenericUser;
import com.girltest.entity.User;
import oa.bean.LoginResultBean;
import oa.entity.common.AccessLog;
import oa.web.controller.common.UserBaseController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/user")
public class UserController extends UserBaseController<User> {


    @RequestMapping(value = "/login")
    public String login(Model model, User user, HttpServletRequest request
            , HttpServletResponse response, HttpSession session, String issaveUserName, String issavePasswd) {
        LoginResultBean loginResultBean = loginCommon(model, user, request, response, session, issaveUserName, issavePasswd);

        AccessLog accessLog = logLogin(request);
        accessLog.setDescription("user login:" + user.getUsername());
        String logDesc = null;
        if (loginResultBean.isFailed()) {
            logDesc = "failed";
        } else {
            logDesc = "success,session id:" + request.getSession().getId();
        }
        accessLog.setOperateResult(logDesc);
        logSave(accessLog, request);

        if (!loginResultBean.isFailed()) {

        }
        if (loginResultBean.isFailed()) {
            model.addAttribute("info", loginResultBean.getMessage());
            return "user/login";
        } else {
            if (user.getUsername().equals("whuang")) {
                session.setAttribute("isAdmin", true);//TODO 作为配置放到字典中
            }

            return "redirect:/search";
        }
    }

    @Override
    public String getLogoutReturnUrl() {
        return "redirect:/user/loginInput";
    }

    @Override
    public void afterLogout(HttpServletRequest request, HttpSession session, GenericUser user) {
        session.removeAttribute("isAdmin");
        //注销日志
        AccessLog accessLog = logLogout(request);
        accessLog.setDescription("logout");
        accessLog.setOperateResult("session id:" + session.getId());
        accessLog.setUserId(user.getId());
        accessLog.setUsername(user.getUsername());
        logSave(accessLog, request);
    }


}
