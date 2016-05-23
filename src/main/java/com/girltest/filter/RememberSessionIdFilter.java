package com.girltest.filter;

import com.common.dict.Constant2;
import com.girltest.entity.User;
import com.girltest.filter.infac.LoginResultFilter;
import oa.bean.LoginResultBean;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class RememberSessionIdFilter implements LoginResultFilter {

    @Override
    public void loginSuccess(User user, HttpServletRequest request, HttpServletResponse response,
                             HttpSession session, String issaveUserName, String issavePasswd,
                             LoginResultBean loginResultBean) {
        Cookie c = new Cookie(Constant2.COOKIE_KEY_JSESSIONID, request.getSession().getId());
        c.setPath("/");
        //先设置cookie有效期为2天
        c.setMaxAge(48 * 60 * 60);
        response.addCookie(c);
    }

}
