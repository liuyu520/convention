package com.girltest.web.controller;

import com.common.dict.Constant2;
import com.common.util.SystemHWUtil;
import com.girltest.dao.ConventionDao;
import com.girltest.dao.Test2BoyDao;
import com.girltest.dao.VoteLogDao;
import com.girltest.entity.Convention;
import com.girltest.entity.User;
import com.girltest.entity.VoteLog;
import com.io.hw.json.HWJacksonUtils;
import com.time.util.TimeHWUtil;
import oa.util.AuthenticateUtil;
import oa.web.controller.base.BaseController;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/vote")
public class VoteController extends BaseController<VoteLog> {
    protected static Logger logger = Logger.getLogger(VoteController.class);
    private VoteLogDao voteLogDao;
    private ConventionDao conventionDao;
    private Test2BoyDao test2BoyDao;


    public VoteLogDao getVoteLogDao() {
        return voteLogDao;
    }

    @Resource
    public void setVoteLogDao(VoteLogDao voteLogDao) {
        this.voteLogDao = voteLogDao;
    }

    @Override
    protected void beforeAddInput(Model model) {
    }

    @Override
    protected void errorDeal(Model model) {
    }

    @Override
    public String getJspFolder() {
        return null;
    }

    /***
     * @param model
     * @param conventionId
     * @param testBoyId
     * @param session
     * @param request
     * @param callback
     * @return :result:2--未登录;3--已经投票过
     * @throws IOException
     */
    @ResponseBody
    @RequestMapping(value = "/vote", produces = SystemHWUtil.RESPONSE_CONTENTTYPE_JSON_UTF)
    public String jsonVote(Model model, int conventionId, int testBoyId, HttpSession session,
                           HttpServletRequest request, String callback) throws IOException {
        User user2 = (User) session.getAttribute(Constant2.SESSION_KEY_LOGINED_USER);
        Map map = new HashMap();
        if (!AuthenticateUtil.isLogined(session)) {
            map.put(Constant2.LOGIN_RESULT_KEY, Constant2.MODIFY_PASS_RESULT_NOT_LOGINED_YET);//没有登录
            return HWJacksonUtils.getJsonP(map, callback);
        }
        VoteLog voteLogTmp = this.voteLogDao.get("user.id", user2.getId(), "convention.id", conventionId);


        if (voteLogTmp == null) {//说明还没有点赞
            Convention convention = conventionDao.get(conventionId);
            VoteLog voteLog = new VoteLog();
            voteLog.setConvention(convention);
            voteLog.setUser(user2);
            voteLog.setVoteTime(TimeHWUtil.getCurrentFormattedTime());
            this.voteLogDao.save(voteLog);
            int stars = convention.getStars();
            conventionDao.updateSpecail(conventionId, "stars", stars + 1);
            test2BoyDao.updateTime(testBoyId);
//			map.put("voteCount", voteCount);

            map.put(Constant2.LOGIN_RESULT_KEY, Constant2.LOGIN_RESULT_SUCCESS);
        } else {
            //查询投票数
            /*Vote vote=this.voteDao.get("type", type, "houseBuilding.id", houseBuildingIdInt);
			map.put("voteCount", vote==null?0:vote.getVoteCount());*/
            map.put(Constant2.LOGIN_RESULT_KEY, 3);//已经投票过
        }
        return HWJacksonUtils.getJsonP(map, callback);
    }

    /***
     * 投票结果
     *
     * @param model
     * @param type
     * @param houseBuildingId
     * @param session
     * @param request
     * @param callback
     * @return
     * @throws IOException
     */
    @ResponseBody
    @RequestMapping(value = "/result", produces = SystemHWUtil.RESPONSE_CONTENTTYPE_JSON_UTF)
    public String jsonVoteResult(Model model, Integer type/*投票的类型*/,/*String houseBuildingId,*/ HttpSession session,
                                 HttpServletRequest request, String callback) throws IOException {
        Map map = new HashMap();
        if (!AuthenticateUtil.isLogined(session)) {
            map.put(Constant2.LOGIN_RESULT_KEY, Constant2.MODIFY_PASS_RESULT_NOT_LOGINED_YET);//没有登录
            return HWJacksonUtils.getJsonP(map, callback);
        }
        init(request);
        voteLogDao = (VoteLogDao) getDao();
        if (type == null) {
            type = 1;
        }

        map.put(Constant2.LOGIN_RESULT_KEY, Constant2.LOGIN_RESULT_SUCCESS);
//		map.put("votes", votes);
        map.put("type", type);
        return HWJacksonUtils.getJsonP(map, callback);
    }

    public ConventionDao getConventionDao() {
        return conventionDao;
    }

    @Resource
    public void setConventionDao(ConventionDao conventionDao) {
        this.conventionDao = conventionDao;
    }

    public Test2BoyDao getTest2BoyDao() {
        return test2BoyDao;
    }

    @Resource
    public void setTest2BoyDao(Test2BoyDao test2BoyDao) {
        this.test2BoyDao = test2BoyDao;
    }
}
