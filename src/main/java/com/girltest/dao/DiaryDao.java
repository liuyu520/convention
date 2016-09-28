package com.girltest.dao;

import com.common.dao.generic.GenericDao;
import com.girltest.entity.Diary;
import com.time.util.TimeHWUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Component("diaryDao")
public class DiaryDao extends GenericDao<Diary> {


    /***
     * 获取当前时段的日记
     * @return
     */
    public Diary getCurrent(){
        Calendar morning0Calendar=Calendar.getInstance();
        morning0Calendar.set(Calendar.HOUR_OF_DAY,0);
        morning0Calendar.set(Calendar.MINUTE,0);
        morning0Calendar.set(Calendar.SECOND,0);
        Date morning0=morning0Calendar.getTime();
        System.out.println(TimeHWUtil.formatDateTime(morning0));

        morning0Calendar.set(Calendar.HOUR_OF_DAY,12);
        Date morning12=morning0Calendar.getTime();


        morning0Calendar.set(Calendar.HOUR_OF_DAY,23);
        morning0Calendar.set(Calendar.MINUTE,59);
        morning0Calendar.set(Calendar.SECOND,59);


        Date morning24=morning0Calendar.getTime();

        Date now=new Date();
        String startDate=null;
        String endDate=null;
        if(now.compareTo(morning12)>0){
            System.out.println("下午");
            startDate=TimeHWUtil.formatDateTime(morning12);
            endDate=TimeHWUtil.formatDateTime(morning24);
        }else{
            System.out.println("上午");
            startDate=TimeHWUtil.formatDateTime(morning0);
            endDate=TimeHWUtil.formatDateTime(morning12);
        }
        Criteria criteria= super.getCurrentSession().createCriteria(Diary.class).add(Restrictions.between("createTime",startDate,endDate));
        Diary diary= (Diary)criteria.uniqueResult();
        return diary;
    }

    /***
     * 获取今天的所有日记<br>
     *     正常情况下最多两篇
     * @return
     */
    public List<Diary> getToday() {
        Calendar morning0Calendar = Calendar.getInstance();
        morning0Calendar.set(Calendar.HOUR_OF_DAY, 0);
        morning0Calendar.set(Calendar.MINUTE, 0);
        morning0Calendar.set(Calendar.SECOND, 0);
        Date morning0 = morning0Calendar.getTime();

        morning0Calendar.set(Calendar.HOUR_OF_DAY, 23);
        morning0Calendar.set(Calendar.MINUTE, 59);
        morning0Calendar.set(Calendar.SECOND, 59);
        Date morning24 = morning0Calendar.getTime();
        Criteria criteria = super.getCurrentSession().createCriteria(Diary.class).add(Restrictions.between("createTime", TimeHWUtil.formatDateTime(morning0), TimeHWUtil.formatDateTime(morning24)));
        return criteria.list();
    }
    public Diary create(){
        Diary diary=getCurrent();
        if(null==diary){
            diary=new Diary();
            Date now=new Date();
            String nowStr=TimeHWUtil.formatDateTime(now);
            diary.setCreateTime(nowStr);
            diary.setUpdateTime(nowStr);
            save(diary);
        }
        return diary;
    }
}
