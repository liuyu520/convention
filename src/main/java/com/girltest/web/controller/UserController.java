package com.girltest.web.controller;

import com.common.entity.user.interf.GenericUser;
import com.common.util.LoginUtil;
import com.common.util.SystemHWUtil;
import com.girltest.entity.User;
import com.girltest.filter.chain.LoginResultFilterChain;
import com.io.hw.json.HWJacksonUtils;
import com.string.widget.util.ValueWidget;
import oa.bean.LoginResultBean;
import oa.entity.common.AccessLog;
import oa.web.controller.common.UserBaseController;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

//import com.girltest.filter.chain.LoginResultFilterChain;

@Controller
@RequestMapping("/user")
public class UserController extends UserBaseController<User> {
    protected static Logger logger = Logger.getLogger(UserController.class);
    private LoginResultFilterChain loginResultFilterChain;

    /***
     * @param model
     * @param user
     * @param request
     * @param response
     * @param session
     * @param issaveUserName
     * @param issavePasswd
     * @param addPrefix      : 登录成功跳转时,是否增加http://hbjltv.com
     * @return
     * @throws IOException
     */
    @RequestMapping(value = "/login")
    public String login(Model model, User user, HttpServletRequest request
            , HttpServletResponse response, HttpSession session, String issaveUserName, String issavePasswd
            , boolean addPrefix) throws IOException {
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

        if(null!=loginResultFilterChain){
        	loginResultFilterChain.loginSuccess(user,request,response,session,issaveUserName,issavePasswd,loginResultBean);
        }
        if (!loginResultBean.isFailed()) {

        }
        if (loginResultBean.isFailed()) {
            model.addAttribute("info", loginResultBean.getMessage());
            return "user/login";
        } else {
            /*if (user.getUsername().equals("whuang")) {
                session.setAttribute("isAdmin", true);//
            }*/
            //登录之前访问的地址,所以在登录成功之后,应该回调
            String returnUrl = (String) session.getAttribute(LoginUtil.SESSION_KEY_LOGIN_RETURN_URL);
            if (!ValueWidget.isNullOrEmpty(returnUrl)) {
                if (addPrefix && returnUrl.endsWith("/test/list")) {
                    returnUrl = "http://www.hbjltv.com" + returnUrl;//避免跳转到http://hbjltv.com:8084/convention/test/list
                }
                session.removeAttribute(LoginUtil.SESSION_KEY_LOGIN_RETURN_URL);// /convention/test/list
                response.sendRedirect(returnUrl);
                return null;
            }
            return "redirect:/search";
        }
    }

    /***
     * {"failed":false} <br>
     * {"message":"您输入的密码有误.","failed":true}
     *
     * @param model
     * @param status
     * @param issavePasswd
     * @param user
     * @param session
     * @param request
     * @param response
     * @param callback
     * @return
     * @throws IOException
     */
    @ResponseBody
    @RequestMapping(value = "/json/login", produces = SystemHWUtil.RESPONSE_CONTENTTYPE_JSON_UTF)
    public String login(Model model, Integer status, Integer issavePasswd, User user,
                        HttpSession session, HttpServletRequest request, HttpServletResponse response, String callback)
            throws IOException {
        LoginResultBean loginResultBean = loginCommon(model, user, request, response, session, null, null);
        return HWJacksonUtils.getJsonP(loginResultBean);
    }

    @Override
    public String getLogoutReturnUrl() {
        return "redirect:/user/loginInput";
    }

    @Override
    public void afterLogout(HttpServletRequest request, HttpSession session, GenericUser user) {
        session.removeAttribute("isAdmin");
        session.removeAttribute(LoginUtil.SESSION_KEY_LOGIN_RETURN_URL);
        //注销日志
        AccessLog accessLog = logLogout(request);
        accessLog.setDescription("logout");
        accessLog.setOperateResult("session id:" + session.getId());
        accessLog.setUserId(user.getId());
        accessLog.setUsername(user.getUsername());
        logSave(accessLog, request);
    }

    public LoginResultFilterChain getLoginResultFilterChain() {
        return loginResultFilterChain;
    }

    @Resource
    public void setLoginResultFilterChain(LoginResultFilterChain loginResultFilterChain) {
        this.loginResultFilterChain = loginResultFilterChain;
    }
}
