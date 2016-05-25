package com.girltest.filter.chain;

import com.girltest.entity.User;
import com.girltest.filter.infac.LoginResultFilter;
import oa.bean.LoginResultBean;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
@Service
public class LoginResultFilterChain implements LoginResultFilter {
    private List<LoginResultFilter> loginResultFilters = new ArrayList<LoginResultFilter>();

    public List<LoginResultFilter> getLoginResultFilters() {
        return loginResultFilters;
    }

    public void setLoginResultFilters(List<LoginResultFilter> loginResultFilters) {
        this.loginResultFilters = loginResultFilters;
    }

    public LoginResultFilterChain add(LoginResultFilter fileFilter) {
        if (null == this.loginResultFilters) {
            this.loginResultFilters = new ArrayList<LoginResultFilter>();
        }
        this.loginResultFilters.add(fileFilter);
        return this;
    }

    public void removeFilter(LoginResultFilter fileFilter) {
        if (this.loginResultFilters.contains(fileFilter)) {
            this.loginResultFilters.remove(fileFilter);
        }
    }

    @Override
    public void loginSuccess(User user, HttpServletRequest request, HttpServletResponse response,
                             HttpSession session, String issaveUserName, String issavePasswd,
                             LoginResultBean loginResultBean) {
        for (int j = 0; j < loginResultFilters.size(); j++) {
            loginResultFilters.get(j).loginSuccess(user, request, response, session, issaveUserName, issavePasswd, loginResultBean);
        }
    }

}
