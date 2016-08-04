package com.girltest.web.controller;

import com.common.dict.Constant2;
import com.common.util.SystemHWUtil;
import com.common.web.view.PageView;
import com.girltest.dao.ConventionDao;
import com.girltest.dao.Test2BoyDao;
import com.girltest.dao.VoteLogDao;
import com.girltest.entity.Convention;
import com.girltest.entity.Test2Boy;
import com.girltest.entity.User;
import com.girltest.entity.VoteLog;
import com.girltest.util.ConventionUtil;
import com.io.hw.json.HWJacksonUtils;
import com.string.widget.util.RegexUtil;
import com.string.widget.util.ValueWidget;
import com.time.util.TimeHWUtil;
import oa.entity.common.AccessLog;
import oa.service.DictionaryParam;
import oa.web.controller.base.BaseController;
import org.apache.commons.collections.map.ListOrderedMap;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/test")
public class Test2BoyController extends BaseController<Test2Boy> {
    protected static Logger logger = Logger.getLogger(Test2BoyController.class);
    private ConventionDao conventionDao;
    private VoteLogDao voteLogDao;

    private static boolean canNotSee(User user2, Test2Boy test2Boy) {
        if (ValueWidget.isNullOrEmpty(test2Boy)) {
            return true;
        }
        return "private".equals(test2Boy.getOnlyIcanSee())
                && (!ValueWidget.isNullOrEmpty(test2Boy.getUser()))
                && test2Boy.getUser().getId() != user2.getId();
    }

    @Override
    protected void beforeAddInput(Model model) {

    }

    @Override
    protected void errorDeal(Model model) {

    }

    @RequestMapping("/save_answer")
    public String addAnswer(Model model, HttpServletRequest request, Test2Boy test2Boy, int testBoyId, Convention convention,String targetView) {
        init(request);
        test2Boy.setId(testBoyId);
        /*List<Convention> conventions=test2Boy.getConventions();
		if(conventions==null){
			conventions=new ArrayList<Convention>();
		}*/
        convention.setUpdateTime(TimeHWUtil.getCurrentDateTime());

        convention.setStatus(Constant2.NEWS_STATUS_ON);
        String anser = convention.getAnswer();

        if (!ValueWidget.isNullOrEmpty(anser)) {
            anser = RegexUtil.filterExpression(anser);
            convention.setAnswer(anser);
        }
        conventionDao.addAnswer(convention, testBoyId);

        AccessLog accessLog = logAdd(request);
        accessLog.setDescription("add convention");
        accessLog.setOperateResult("add convention id:" + convention.getId());
        accessLog.setReserved("test id:" + testBoyId);
        logSave(accessLog, request);

        model.addAttribute("test", test2Boy);
        convention.setAnswer(ConventionUtil.convertBr(convention.getAnswer()));
        model.addAttribute("convention", convention);
        if(!ValueWidget.isNullOrEmpty(targetView)){
            return targetView;
        }
        return "convention/detail";
    }

    @RequestMapping(value = "/{id}/update2", method = RequestMethod.POST)
    public String update(@PathVariable int id, Test2Boy roleLevel, Model model, HttpServletRequest request, String targetView) throws SecurityException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException {
        init(request);
        beforeUpdate(roleLevel);
        Test2BoyDao test2BoyDao = (Test2BoyDao) getDao();
        String oldTest = test2BoyDao.get(id).getTestcase();
        test2BoyDao.update2(roleLevel.getTestcase(), id);

        AccessLog accessLog = logUpdate(request);
        accessLog.setDescription("update test");
        accessLog.setOperateResult("update test id:" + id);
        accessLog.setReserved(oldTest);
        logSave(accessLog, request);

        String resultUrl =Constant2.SPRINGMVC_REDIRECT_PREFIX+"test/"+id;// getRedirectViewAll() + "?fsdf=" + new Date().getTime();
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

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        AccessLog accessLog = logInto(request);
        accessLog.setDescription("list test");
        accessLog.setOperateResult("list test conditon:" + HWJacksonUtils.getJsonP(roleLevel));
        logSave(accessLog, request);
    }

    @Override
    protected Test2Boy detailTODO(int id, Model model,
                                  HttpServletRequest request) {
        init(request);
        List recordList = (List) request.getSession(true).getAttribute("tests");
        Test2BoyDao test2BoyDao = (Test2BoyDao) getDao();
        if (!ValueWidget.isNullOrEmpty(recordList)) {
            try {
                if (SystemHWUtil.isContainObject(recordList, "id", String.valueOf(id))) {
                    test2BoyDao.updateTime(id);
                }
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }

        User user2 = getUser4Session(request);

        Test2Boy test2Boy = test2BoyDao.getConventions(id);

        if (null != test2Boy) {
            if (canNotSee(user2, test2Boy)) {//当前用户没权访问该test
                test2Boy.setConventions(null);
                model.addAttribute(Constant2.RESPONSE_KEY_ERROR_MESSAGE, "您没有权限");
                return test2Boy;
            }
            List<Convention> conventions = test2Boy.getConventions();
            int size = conventions.size();
            Object[] objects = new Object[size];
            for (int i = 0; i < size; i++) {
                Convention convention = conventions.get(i);
                convention.setAnswer(ConventionUtil.convertBr(convention.getAnswer()));
                objects[i] = convention.getId();
            }
            List voteLogTmps = this.voteLogDao.getList("user.id", user2.getId(), "convention.id", objects);
            int voteLogSize = voteLogTmps.size();
            for (int j = 0; j < voteLogSize; j++) {

                VoteLog voteLogTmp = (VoteLog) voteLogTmps.get(j);
                Convention convention = voteLogTmp.getConvention();
                if (null != convention) {
                    convention.setHasStar(true);
                }
            }
            /*for (Convention convention : conventions) {
                //因为在html中\n不会换行,所以要把\n转化为br
                convention.setAnswer(ConventionUtil.convertBr(convention.getAnswer()));
                VoteLog voteLogTmp=this.voteLogDao.get( "user.id", user2.getId(),"convention.id",convention.getId());
                if(null!=voteLogTmp){
                    convention.setHasStar(true);
                }
            }*/
        } else {//无conventions的时候
            test2Boy = test2BoyDao.get(id);
            test2Boy.setConventions(null);
        }
        return test2Boy;
    }

    private User getUser4Session(HttpServletRequest request) {
        return (User) request.getSession().getAttribute(Constant2.SESSION_KEY_LOGINED_USER);
    }

    @Override
    protected void beforeSave(Test2Boy roleLevel, Model model) {
        super.beforeSave(roleLevel, model);
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        User user2 = getUser4Session(request);
        roleLevel.setUser(user2);
        roleLevel.setUpdateTime(TimeHWUtil.getCurrentDateTime());
        roleLevel.setStars(0);
        roleLevel.setStatus(Constant2.NEWS_STATUS_ON);

        AccessLog accessLog = logAdd(request);
        accessLog.setDescription("add test");
        accessLog.setOperateResult("add test:" + roleLevel.getTestcase());
        logSave(accessLog, request);

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

        AccessLog accessLog = logDelete(request);
        accessLog.setDescription("delete test");
        accessLog.setOperateResult("delete test id:" + id);
        logSave(accessLog, request);
    }

    public VoteLogDao getVoteLogDao() {
        return voteLogDao;
    }

    @Resource
    public void setVoteLogDao(VoteLogDao voteLogDao) {
        this.voteLogDao = voteLogDao;
    }

    @Override
    protected void listTODO(Model model, PageView view,
                            HttpServletRequest request) {
        long count = view.getTotalRecords();
        List recordList = view.getRecordList();
        cacheSearchResult(request, recordList);
        int size = recordList.size();
        User user2 = getUser4Session(request);
        String superUserName = "whuang";//超级管理员的默认名称
        String superUserNameTmp = DictionaryParam.get("authority", "super");
        if (!ValueWidget.isNullOrEmpty(superUserNameTmp)) {
            superUserName = superUserNameTmp;
        }
        if (superUserName.equals(user2.getUsername())) {//如果是超级管理员,则不过滤
            return;
        } else {
            filterPrivate(view, count, recordList, size, user2);
        }
    }

    private void cacheSearchResult(HttpServletRequest request, List recordList) {
        String queryKeyword = request.getParameter("testcase");
        if (!ValueWidget.isNullOrEmpty(queryKeyword) && !ValueWidget.isNullOrEmpty(recordList)) {
            HttpSession session = request.getSession(true);
            session.setAttribute("tests", recordList);
        }
    }

    private void filterPrivate(PageView view, long count, List recordList, int size, User user2) {
        for (int i = 0; i < size; i++) {
            Test2Boy test2Boy = (Test2Boy) recordList.get(i);
            if (canNotSee(user2, test2Boy)) {
                recordList.remove(test2Boy);
                String errorMessage = "hide test id:" + test2Boy.getId() + ", content:" + test2Boy.getTestcase();
                System.out.println(errorMessage);
                logger.warn(errorMessage);
                size = size - 1;
                i = i - 1;
                count--;
            }
        }
        view.setTotalRecords(count);
    }

}
