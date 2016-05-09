package com.girltest.dao;

import com.common.dao.generic.GenericDao;
import com.girltest.entity.Girl;
import org.springframework.stereotype.Component;

@Component("girlDao")
public class GirlDao extends GenericDao<Girl> {

}
