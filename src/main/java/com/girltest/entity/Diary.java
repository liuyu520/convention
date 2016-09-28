package com.girltest.entity;


import javax.persistence.*;

/**
 * Created by 黄威 on 9/18/16.<br >
 */
@Entity
@Table(name = "t_diary")
public class Diary {
    /***
     * 更新时间
     */
    protected String updateTime;
    /***
     * 创建时间
     */
    protected String createTime;
    /***
     * 热度 <br>
     * 值越大,表示越受关注
     */
    protected Integer stars;
    private int id;
    private String content;
    /***
     * 格式化之后的<br>
     *     换行替换为br
     */
    private String formatContent;
    /***
     * 创建者
     */
    private User user;
    /***
     * 1:有效;2:被删除
     */
    private int status;

    @Id
    @GeneratedValue
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @ManyToOne
    @JoinColumn(name = "userId")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Integer getStars() {
        return stars;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }

    @Transient
    public String getFormatContent() {
        return formatContent;
    }

    public void setFormatContent(String formatContent) {
        this.formatContent = formatContent;
    }
}
