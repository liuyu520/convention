package com.girltest.dao;

import com.common.dao.generic.GenericDao;
import com.common.dict.Constant2;
import com.girltest.entity.Convention;
import com.girltest.entity.Test2Boy;
import com.girltest.util.ConventionUtil;
import com.string.widget.util.ValueWidget;
import com.time.util.TimeHWUtil;
import org.apache.commons.collections.map.ListOrderedMap;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ConventionDao extends GenericDao<Convention> {
    public static final String MID_TABLE_NAME = "t_mid_test_convention";
    private Test2BoyDao test2BoyDao;

    /***
     * 做两件事情:<br />
     * (1)删除 表t_test_convention(中间表) 中相关记录
     * (2)更新表Convention中的status<br>
     * 1:有效;2:被删除
     *
     * @param conventionId
     */
    public void deleteConvention(int conventionId) {

        super.getCurrentSession().createSQLQuery("update " + MID_TABLE_NAME + " set status=" + Constant2.NEWS_STATUS_OFF + " where convention_id=" + conventionId).executeUpdate();
//        super.getCurrentSession().createSQLQuery("update t_convention set status=" + Constant2.NEWS_STATUS_OFF + " where id=" + conventionId).executeUpdate();
        updateSpecail(conventionId, "updateTime", TimeHWUtil.getCurrentDateTime(), "status", Constant2.NEWS_STATUS_OFF);
//        convention.setStatus(Constant2.NEWS_STATUS_OFF);
//        update(convention);
    }

    /***
     *  SELECT
     test_id
     FROM
     t_mid_test_convention
     where
     convention_id=397
     * @param conventionId
     * @return
     */
    public int getTestId(int conventionId) {
        List list = super.getCurrentSession().createSQLQuery("SELECT test_id FROM " + MID_TABLE_NAME + " where convention_id=" + conventionId).list();
        int testId = -1;
        if (!ValueWidget.isNullOrEmpty(list)) {
            testId = (Integer) list.get(0);
        }
        return testId;
    }
    public List<Convention> getFrontList(int maxRecordsNum, String notNullColumn, ListOrderedMap orderColumnModeMap) {
        Map map = new HashMap();
        map.put("status", Constant2.NEWS_STATUS_ON);
        return getFrontList(map, maxRecordsNum, notNullColumn, orderColumnModeMap);
    }
    /***
     * 仅仅插入中间表
     *
     * @param conventionId
     * @param testBoyId
     */
    public void addConvention(int conventionId, int testBoyId) {
        super.getCurrentSession().createSQLQuery("INSERT INTO  " + MID_TABLE_NAME + " (test_id, convention_id,status)values(" + testBoyId + "," + conventionId + "," + Constant2.NEWS_STATUS_ON + ")").executeUpdate();
    }

    /***
     * 添加答案 <br>
     *     INSERT
     INTO
     t_mid_test_convention
     (test_id, convention_id,status)
     values
     (221,1063,1)
     *
     * @param convention
     * @param test2Boy
     */
    public void addAnswer(Convention convention, Test2Boy test2Boy) {
        if (null == convention.getStars()) {
            convention.setStars(0);
        }
        this.save(convention);
        int testBoyId = test2Boy.getId();
        this.addConvention(convention.getId(), testBoyId);
//        Test2BoyDao test2BoyDao=(Test2BoyDao)getDao();
        if (ConventionUtil.filterKeyword(test2Boy.getTestcase())) return;
        test2BoyDao.updateTime(testBoyId);
    }

    public Test2BoyDao getTest2BoyDao() {
        return test2BoyDao;
    }

    @Resource
    public void setTest2BoyDao(Test2BoyDao test2BoyDao) {
        this.test2BoyDao = test2BoyDao;
    }
}
