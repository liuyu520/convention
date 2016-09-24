package com.girltest.entity;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;

/***
 * 惯例
 * 2015年12月27日
 */
@Entity
@Table(name = "t_convention")
@JsonAutoDetect
@JsonInclude(JsonInclude.Include.NON_NULL)//没有起作用
public class Convention {
    /***
     * 更新时间
     */
    protected String updateTime;
    /***
     * 热度 <br>
     * 值越大,表示越受关注
     */
    protected Integer stars;
    private int id;
    /***
     * 不是最佳
     *//*
    private Test2Boy test2Boy;*/
    /***
     * 答案
     */
    private String answer;
    /***
     * 图片路径
     */
    private String pic;
    /***
     * 1:有效;2:被删除
     */
    private int status;
    /**
     * 是否已经点赞
     */

    private boolean hasStar;

    @Transient
    public boolean isHasStar() {
        return hasStar;
    }

    public void setHasStar(boolean hasStar) {
        this.hasStar = hasStar;
    }
    @Column(name = "update_time")
    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getStars() {
        return stars;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }

    @Id
    @GeneratedValue
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

}
