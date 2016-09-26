package com.girltest.web.controller;

import com.common.dict.Constant2;
import com.common.util.SystemHWUtil;
import com.common.web.view.PageView;
import com.girltest.dao.ConventionDao;
import com.girltest.dao.Test2BoyDao;
import com.girltest.entity.Convention;
import com.girltest.entity.Test2Boy;
import com.girltest.util.ConventionUtil;
import com.girltest.web.controller.intercept.RepeatToken;
import com.io.hw.json.HWJacksonUtils;
import com.string.widget.util.ValueWidget;
import com.time.util.TimeHWUtil;
import oa.entity.common.AccessLog;
import oa.web.controller.base.BaseController;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/***
 *
 */
@Controller
@RequestMapping("/convention")
public class ConventionController extends BaseController<Convention> {
    protected static Logger logger = Logger.getLogger(ConventionController.class);
    private Test2BoyDao test2BoyDao;
    /***
     * 是否真的存储到数据库
     */
    private boolean realSave = true;
    
    @Override
    protected void beforeAddInput(Model model, HttpServletRequest request) {
    }

    @Override
    protected void errorDeal(Model model) {
    }

    @Override
    public String getJspFolder() {
        return "convention";
    }

    @ResponseBody
    @RequestMapping(value = "/{id}/delete2/json")
    public String deleteOne(@PathVariable int id, Model model, HttpServletRequest request, String targetView) {
        init(request);
        ConventionDao conventionDao = (ConventionDao) this.getDao();
        conventionDao.deleteConvention(id);

        AccessLog accessLog = logDelete(request);
        accessLog.setDescription("delete convention");
        accessLog.setOperateResult("delete convention id:" + id);
        logSave(accessLog, request, realSave);
        return Constant2.RESPONSE_RIGHT_RESULT;
    }

    /***
     * 方法名称不能为"update333","update33","update3","update3333","update2","update22","update4","update44","update444","updatea"<br>
     *     否则,报400
     * @param id
     * @param answer
     * @param testBoyId
     * @param model
     * @param request
     * @param response
     * @param targetView
     * @return
     * @throws SecurityException
     * @throws NoSuchFieldException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws IOException
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST, produces = SystemHWUtil.RESPONSE_CONTENTTYPE_PLAIN_UTF)
    public String update334(int id, @RequestParam(required = true) String answer, int testBoyId, Model model, HttpServletRequest request, HttpServletResponse response, String targetView) throws SecurityException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException, IOException {
        ConventionDao conventionDao = (ConventionDao) this.getDao();
        Convention convention = conventionDao.get(id);
        String oldAnswer = convention.getAnswer();
        convention.setUpdateTime(TimeHWUtil.getCurrentDateTime());
        convention.setAnswer(answer);
        updateCommon(id, convention, model, request);
        test2BoyDao.updateTime(testBoyId);

        AccessLog accessLog = logUpdate(request);
        accessLog.setDescription("update convention");
        accessLog.setOperateResult("update convention id:" + id);
        accessLog.setReserved(oldAnswer);
        logSave(accessLog, request, realSave);

//        roleLevel.setAnswer(ConventionUtil.convertBr(answer));
        Test2Boy test2Boy = test2BoyDao.get(testBoyId);
        model.addAttribute("test", test2Boy);
        if(ValueWidget.isNullOrEmpty(targetView)){
            //解决中文乱码问题
            response.setCharacterEncoding(SystemHWUtil.CHARSET_UTF);
            response.setContentType(SystemHWUtil.RESPONSE_CONTENTTYPE_PLAIN_UTF);
            PrintWriter out = response.getWriter();
            out.write(ConventionUtil.convertBr(answer));
            out.flush();
            return null;
        }else{
            return targetView;
        }
        //getJspFolder() + "/detail";
    }

    //    @RequestMapping(value = "/updateImagePath")
    @ResponseBody
    public String updateImagePath() {
        ConventionDao conventionDao = (ConventionDao) this.getDao();
        List<Convention> conventionList = conventionDao.getList("answer", "src=\"http://hbjltv.com:8084/convention/upload/");
        int size = conventionList.size();
        for (int i = 0; i < size; i++) {
            Convention convention = conventionList.get(i);
            String answer = convention.getAnswer();
            if (!ValueWidget.isNullOrEmpty(answer) && answer.contains("hbjltv.com:8084/convention")) {
                answer = answer.replace("http://hbjltv.com:8084/convention/upload", "http://hbjltv.com:8084/convention2/upload");
                System.out.println(answer);
//                convention.setAnswer(answer);
//                conventionDao.update(convention);
            }

        }
        return HWJacksonUtils.getJsonP(conventionList);
    }
    @RequestMapping(value = "/add_answer")
    @RepeatToken(save = true)
    public String addAnswer(@RequestParam(value = "testBoyId", required = true) Integer testBoyId, Model model, HttpServletRequest request, String targetView) throws SecurityException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException {
        if (null == testBoyId) {
            return "redirect:/test/list";
        }
        Test2Boy test2Boy = test2BoyDao.get(testBoyId);
        model.addAttribute("test", test2Boy);
        if(!ValueWidget.isNullOrEmpty(targetView)){
            return targetView;
        }
        return getJspFolder() + "/add";
    }

    @RequestMapping(value = "/searchInput")
    public String searchInput(Model model, HttpServletRequest request, String targetView) throws SecurityException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException {

        if (!ValueWidget.isNullOrEmpty(targetView)) {
            return targetView;
        }
        return getJspFolder() + "/search";
    }

    @RequestMapping(value = "/getTestId")
    @ResponseBody
    public String getTestId(Model model, HttpServletRequest request, int conventionId, String targetView) throws SecurityException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException {
        ConventionDao conventionDao = (ConventionDao) this.getDao();
        int testId = conventionDao.getTestId(conventionId);
        return "{\"testId\":" + testId + "}";
    }


    @RequestMapping("/edit")
    public String editAnswer(Model model, HttpServletRequest request, /*Test2Boy test2Boy,  */int testBoyId, @RequestParam(value = "conventionId", required = true) Integer conventionId, String targetView) {
        init(request);
        Test2Boy test2Boy=new Test2Boy();
        test2Boy.setId(testBoyId);
        ConventionDao conventionDao = (ConventionDao) this.getDao();
        Convention convention = conventionDao.get(conventionId);
        model.addAttribute("test", test2Boy);
        model.addAttribute("convention", convention);
        if(!ValueWidget.isNullOrEmpty(targetView)){
            return targetView;
        }
        return "convention/edit";
    }

    public Test2BoyDao getTest2BoyDao() {
        return test2BoyDao;
    }

    @Resource
    public void setTest2BoyDao(Test2BoyDao test2BoyDao) {
        this.test2BoyDao = test2BoyDao;
    }

    @Override
    protected void listTODO(Model model, PageView view, HttpServletRequest request) {
        super.listTODO(model, view, request);
        List<Convention> conventions = view.getRecordList();
        int size = conventions.size();
        for (int i = 0; i < size; i++) {
            Convention convention = conventions.get(i);
            convention.setAnswer(ConventionUtil.convertBr(convention.getAnswer()));
        }
    }

    @Override
    protected void beforeList(Convention roleLevel) {
        super.beforeList(roleLevel);
        roleLevel.setStatus(Constant2.NEWS_STATUS_ON);
    }
}
