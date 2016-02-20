package com.girltest.dao;

import com.girltest.entity.User;
import oa.dao.common.GenericUserDao;
import org.springframework.stereotype.Component;

@Component("userDao")
public class UserDao extends GenericUserDao<User> {

}
