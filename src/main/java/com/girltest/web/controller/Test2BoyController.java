package com.girltest.web.controller;

import com.common.dict.Constant2;
import com.girltest.dao.ConventionDao;
import com.girltest.dao.Test2BoyDao;
import com.girltest.entity.Convention;
import com.girltest.entity.Test2Boy;
import com.girltest.util.ConventionUtil;
import com.string.widget.util.ValueWidget;
import com.time.util.TimeHWUtil;
import oa.web.controller.base.BaseController;
import org.apache.commons.collections.map.ListOrderedMap;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/test")
public class Test2BoyController extends BaseController<Test2Boy> {
    private ConventionDao conventionDao;

    @Override
    protected void beforeAddInput(Model model) {

    }

    @Override
    protected void errorDeal(Model model) {

    }

    @RequestMapping("/save_answer")
    public String addAnswer(Model model, HttpServletRequest request, Test2Boy test2Boy, int testBoyId, Convention convention) {
        init(request);
        test2Boy.setId(testBoyId);
        /*List<Convention> conventions=test2Boy.getConventions();
		if(conventions==null){
			conventions=new ArrayList<Convention>();
		}*/
        convention.setUpdateTime(TimeHWUtil.getCurrentDateTime());
        convention.setStatus(Constant2.NEWS_STATUS_ON);
        conventionDao.addAnswer(convention, testBoyId);
        model.addAttribute("test", test2Boy);
        convention.setAnswer(ConventionUtil.convertBr(convention.getAnswer()));
        model.addAttribute("convention", convention);
        return "convention/detail";
    }


    @RequestMapping(value = "/{id}/update2", method = RequestMethod.POST)
    public String update(@PathVariable int id, Test2Boy roleLevel, Model model, HttpServletRequest request, String targetView) throws SecurityException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException {
        init(request);
        beforeUpdate(roleLevel);
        Test2BoyDao test2BoyDao = (Test2BoyDao) getDao();
        test2BoyDao.update2(roleLevel.getTestcase(), id);

        String resultUrl = getRedirectViewAll() + "?fsdf=" + new Date().getTime();
        if (!ValueWidget.isNullOrEmpty(targetView)) {
            resultUrl = resultUrl + "&targetView=" + targetView;//先调用list刷新数据,在导向targetView
        }
        return resultUrl;
    }

    @Override
    public String getJspFolder() {
        return "test";
    }

    public ConventionDao getConventionDao() {
        return conventionDao;
    }

    @Resource
    public void setConventionDao(ConventionDao conventionDao) {
        this.conventionDao = conventionDao;
    }

    @Override
    protected void beforeList(Test2Boy roleLevel) {
        roleLevel.setStatus(Constant2.NEWS_STATUS_ON);//额外的条件
        super.beforeList(roleLevel);

    }

    @Override
    protected Test2Boy detailTODO(int id, Model model,
                                  HttpServletRequest request) {
        init(request);
        Test2BoyDao test2BoyDao = (Test2BoyDao) getDao();
        Test2Boy test2Boy = test2BoyDao.getConventions(id);
        if (null != test2Boy) {
            List<Convention> conventions = test2Boy.getConventions();
            for (Convention convention : conventions) {
                //因为在html中\n不会换行,所以要把\n转化为br
                convention.setAnswer(ConventionUtil.convertBr(convention.getAnswer()));
            }
        } else {//无conventions的时候
            test2Boy = test2BoyDao.get(id);
            test2Boy.setConventions(null);
        }
        return test2Boy;
    }

    @Override
    protected void beforeSave(Test2Boy roleLevel, Model model) {
        super.beforeSave(roleLevel, model);
        roleLevel.setUpdateTime(TimeHWUtil.getCurrentDateTime());
        roleLevel.setStars(0);
        roleLevel.setStatus(Constant2.NEWS_STATUS_ON);
    }

    @Override
    public ListOrderedMap getListOrderBy() {
        ListOrderedMap orderColumnModeMap = new ListOrderedMap();
        orderColumnModeMap.put("updateTime", "desc");
        orderColumnModeMap.put("stars", "desc");
        return orderColumnModeMap;
    }

    @Override
    protected void deleteTODO(int id, Test2Boy roleLevel, Model model,
                              HttpServletRequest request) {
        init(request);
        Test2BoyDao test2BoyDao = (Test2BoyDao) getDao();
        test2BoyDao.delete(roleLevel);
    }


}
