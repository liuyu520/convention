package com.girltest.filter;

import com.girltest.entity.User;
import com.girltest.filter.infac.LoginResultFilter;
import oa.bean.LoginResultBean;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginLogFilter implements LoginResultFilter {

    @Override
    public void loginSuccess(User user, HttpServletRequest request, HttpServletResponse response,
                             HttpSession session, String issaveUserName, String issavePasswd, LoginResultBean loginResultBean) {

    }

}
