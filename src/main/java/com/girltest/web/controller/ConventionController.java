package com.girltest.web.controller;

import com.common.dict.Constant2;
import com.common.util.SystemHWUtil;
import com.girltest.dao.ConventionDao;
import com.girltest.dao.Test2BoyDao;
import com.girltest.entity.Convention;
import com.girltest.entity.Test2Boy;
import com.girltest.util.ConventionUtil;
import com.girltest.web.controller.intercept.RepeatToken;
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

/***
 *
 */
@Controller
@RequestMapping("/convention")
public class ConventionController extends BaseController<Convention> {
    protected static Logger logger = Logger.getLogger(ConventionController.class);
    private Test2BoyDao test2BoyDao;

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
        logSave(accessLog, request);
        return Constant2.RESPONSE_RIGHT_RESULT;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST, produces = SystemHWUtil.RESPONSE_CONTENTTYPE_PLAIN_UTF)
//    @ResponseBody
    public String update(int id, @RequestParam(required = true) Convention roleLevel, int testBoyId, Model model, HttpServletRequest request, HttpServletResponse response, String targetView) throws SecurityException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException, IOException {
        ConventionDao conventionDao = (ConventionDao) this.getDao();
        Convention convention = conventionDao.get(id);
        String oldAnswer = convention.getAnswer();
        convention.setUpdateTime(TimeHWUtil.getCurrentDateTime());
        convention.setAnswer(roleLevel.getAnswer());
        updateCommon(id, convention, model, request);
        test2BoyDao.updateTime(testBoyId);

        AccessLog accessLog = logUpdate(request);
        accessLog.setDescription("update convention");
        accessLog.setOperateResult("update convention id:" + id);
        accessLog.setReserved(oldAnswer);
        logSave(accessLog, request);

        roleLevel.setAnswer(ConventionUtil.convertBr(roleLevel.getAnswer()));
        Test2Boy test2Boy = test2BoyDao.get(testBoyId);
        model.addAttribute("test", test2Boy);
        if(ValueWidget.isNullOrEmpty(targetView)){
            //解决中文乱码问题
            response.setCharacterEncoding(SystemHWUtil.CHARSET_UTF);
            response.setContentType(SystemHWUtil.RESPONSE_CONTENTTYPE_PLAIN_UTF);
            PrintWriter out = response.getWriter();
            out.write(roleLevel.getAnswer());
            out.flush();
            return null;
        }else{
            return targetView;
        }
        //getJspFolder() + "/detail";
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
}
