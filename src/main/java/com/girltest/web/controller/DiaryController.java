package com.girltest.web.controller;

import com.common.util.SystemHWUtil;
import com.girltest.dao.DiaryDao;
import com.girltest.entity.Diary;
import com.girltest.util.ConventionUtil;
import com.string.widget.util.ValueWidget;
import com.time.util.TimeHWUtil;
import oa.web.controller.base.BaseController;
import org.apache.commons.collections.map.ListOrderedMap;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by 黄威 on 9/26/16.<br >
 * 上午:0:00-12:00<br>
 * 下午:12:01-23:59
 */
@Controller
@RequestMapping("/diary")
public class DiaryController extends BaseController<Diary> {
    @Override
    protected void beforeAddInput(Model model, HttpServletRequest request) {

    }

    @Override
    protected void errorDeal(Model model) {

    }

    @RequestMapping(value = "/getCurrent")
    public String getCurrentDiary(Model model, HttpServletRequest request) {
        init(request);
        DiaryDao diaryDao = (DiaryDao) getDao();
        Diary diary = diaryDao.create();
        return editDiaryPage(model, diary);
    }

    @Override
    public String getJspFolder() {
        return "diary";
    }

    @RequestMapping(value = "/{id}/edit2")
    public String edit(Model model, HttpServletRequest request, @PathVariable int id) {
        init(request);
        DiaryDao diaryDao = (DiaryDao) getDao();
        Diary diary = diaryDao.get(id);
        return editDiaryPage(model, diary);
    }

    @RequestMapping(value = "/{id}/text", produces = SystemHWUtil.RESPONSE_CONTENTTYPE_PLAIN_UTF)
    @ResponseBody
    public String detail(Model model, HttpServletRequest request, @PathVariable int id) {
        init(request);
        DiaryDao diaryDao = (DiaryDao) getDao();
        Diary diary = diaryDao.get(id);
        if (diary == null || ValueWidget.isNullOrEmpty(diary.getContent())) {
            return "暂无内容";
        }
        return ConventionUtil.convertBr(diary.getContent());
    }

    private String editDiaryPage(Model model, Diary diary) {
        diary.setFormatContent(ConventionUtil.convertBr(diary.getContent()));
        model.addAttribute(getJspFolder(), diary);
        return getJspFolder() + "/add";
    }

    /***
     * 更新updateTime,但是不能更新createTime
     * @param roleLevel
     * @param justQuery
     */
    @Override
    protected void beforeUpdate(Diary roleLevel, Diary justQuery) {
        super.beforeUpdate(roleLevel, justQuery);
        roleLevel.setCreateTime(justQuery.getCreateTime());
        roleLevel.setUpdateTime(TimeHWUtil.getCurrentDateTime());
    }

    @Override
    public ListOrderedMap getListOrderBy() {
        ListOrderedMap orderColumnModeMap = new ListOrderedMap();
        orderColumnModeMap.put("updateTime", "desc");
        orderColumnModeMap.put("createTime", "desc");
        return orderColumnModeMap;
    }
}
