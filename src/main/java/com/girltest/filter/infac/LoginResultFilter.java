package com.girltest.filter.infac;

import com.girltest.entity.User;
import oa.bean.LoginResultBean;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public interface LoginResultFilter {
    public void loginSuccess(User user, HttpServletRequest request,
                             HttpServletResponse response, HttpSession session,
                             String issaveUserName, String issavePasswd,
                             LoginResultBean loginResultBean);
}
