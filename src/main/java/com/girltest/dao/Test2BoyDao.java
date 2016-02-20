package com.girltest.dao;

import com.common.dao.generic.GenericDao;
import com.common.dict.Constant2;
import com.girltest.dict.Constant;
import com.girltest.entity.Convention;
import com.girltest.entity.Test2Boy;
import com.time.util.TimeHWUtil;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

/**
 * Created by huangweii on 2015/12/27.
 */
@Component
public class Test2BoyDao extends GenericDao<Test2Boy> {
    public Test2Boy getConventions(int id) {
        Convention c = new Convention();
        c.setStatus(Constant2.NEWS_STATUS_ON);
        Test2Boy test2Boy = (Test2Boy) super.getCurrentSession().createCriteria(clz)
                .add(Restrictions.idEq(id))
//        		.add(Restrictions.eq("conventions", c))
//        		.setFetchMode(Constant.property_conventions, FetchMode.JOIN)
                .createAlias(Constant.property_conventions, "convention32", CriteriaSpecification.LEFT_JOIN)
//        		.setFetchMode("convention32", FetchMode.SELECT)
                .add(Restrictions.eq("convention32.status", Constant2.NEWS_STATUS_ON))
                .addOrder(Order.desc("convention32.stars"))
                .uniqueResult();
//    	System.out.println(test2Boy.getConventions().size());
        return test2Boy;
    }

    /***
     * 更新问题
     *
     * @param testcase
     * @param testId
     */
    public void update2(String testcase, int testId) {
        /*super.getCurrentSession().createQuery("update Test2Boy t set t.testcase=?,t.updateTime=? where t.id=?")
                .setString(0, testcase)
                .setString(1, TimeHWUtil.getCurrentDateTime())
                .setInteger(2, testId)
                .executeUpdate();*/
        updateSpecail(testId, "testcase", testcase, "updateTime", TimeHWUtil.getCurrentDateTime());
    }

    public void updateStatus(int status, int testId) {
        /*super.getCurrentSession().createQuery("update Test2Boy t set t.status=?,t.updateTime=? where t.id=?")
                .setInteger(0, status)
                .setString(1, TimeHWUtil.getCurrentDateTime())
                .setInteger(2, testId)
                .executeUpdate();*/
        updateSpecail(testId, "updateTime", TimeHWUtil.getCurrentDateTime(), "status", status);
    }

    public void updateTime(int testId) {
        /*super.getCurrentSession().createQuery("update Test2Boy t set t.updateTime=? where t.id=?")
                .setString(0, TimeHWUtil.getCurrentDateTime())
                .setInteger(1, testId)
                .executeUpdate();*/
        updateSpecail(testId, "updateTime", TimeHWUtil.getCurrentDateTime());
    }

    /***
     * 更新别名
     *
     * @param alias
     * @param testId
     */
    public void updateAlias(String alias, int testId) {
       /* super.getCurrentSession().createQuery("update Test2Boy t set t.alias=?,t.updateTime=? where t.id=?")
                .setString(0, alias)
                .setString(1, TimeHWUtil.getCurrentDateTime())
                .setInteger(2, testId)
                .executeUpdate();*/
        updateSpecail(testId, "updateTime", TimeHWUtil.getCurrentDateTime(), "alias", alias);
    }

    public void delete(Test2Boy test2Boy) {
        if (null == test2Boy) {
            return;
        }
        super.getCurrentSession().createSQLQuery("update " + ConventionDao.MID_TABLE_NAME + " set status=" + Constant2.NEWS_STATUS_OFF + " where test_id=" + test2Boy.getId()).executeUpdate();
        updateStatus(Constant2.NEWS_STATUS_OFF, test2Boy.getId());
    }
}
