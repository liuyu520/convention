package com.girltest.dao;

import com.common.dao.generic.GenericDao;
import com.girltest.entity.ShareArticle;
import com.time.util.TimeHWUtil;
import org.springframework.stereotype.Component;

@Component("shareArticleDao")
public class ShareArticleDao extends GenericDao<ShareArticle> {

    /***
     *
     * @param shareCode
     * @param type : 1-test;<br >2-convention
     * @param relativeId
     * @return
     */
    public ShareArticle share(String shareCode, int type, Integer relativeId) {
        ShareArticle shareArticle = new ShareArticle();
        shareArticle.setRelativeId(relativeId);
        shareArticle.setType(type);
        shareArticle.setShareCode(shareCode);
        shareArticle.setUpdateTime(TimeHWUtil.formatDateTime());
        int id = (Integer) this.save(shareArticle);
        if (shareArticle.getId() == 0) {
            shareArticle.setId(id);
        }
        return shareArticle;
    }
}
