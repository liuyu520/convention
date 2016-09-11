package com.girltest.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by 黄威 on 8/7/16.<br >
 * 每次分享都会增加一条
 */
@Entity
@Table(name = "t_share_item")
public class ShareArticle {
    private int id;
    /***
     * 分享的code<br >
     *     每次产生的shareCode 必须不能重复
     */
    private String shareCode;
    /***
     * 1:test;<br >2:convention
     */
    private int type;
    /***
     * 关联的id
     */
    private Integer relativeId;
    private String updateTime;

    @Id
    @GeneratedValue
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getShareCode() {
        return shareCode;
    }

    public void setShareCode(String shareCode) {
        this.shareCode = shareCode;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public Integer getRelativeId() {
        return relativeId;
    }

    public void setRelativeId(Integer relativeId) {
        this.relativeId = relativeId;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }
}
