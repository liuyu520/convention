package com.girltest.entity;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;

/***
 * @author huangweii
 *         2015年12月27日
 */
@Entity
@Table(name = "t_test_to_boy")
@JsonAutoDetect
@JsonInclude(JsonInclude.Include.NON_NULL)//没有起作用
public class Test2Boy {
    /***
     * 更新时间
     */
    protected String updateTime;
    /***
     * 热度 <br>
     * 值越大,表示越受关注
     */
    protected int stars;
    private int id;
    /***
     * 测试
     */
    private String testcase;
    /***
     * 最佳惯例
     *//*
    private Convention best;*/
    /***
     * 别名
     */
    private String alias;
    /***
     * 别名
     */
    private String alias2;
    /***
     * 所有惯例
     */
    private List<Convention> conventions;
    /***
     * 1:有效;2:被删除
     */
    private int status;
    /***
     * 创建者
     */
    private User user;
    /***
     * null或"everyone":都有权限<br >
     * "private" :只有作者能看见
     */
    private String onlyIcanSee;
    /***
     * 类型,预留
     */
    private int type;
    @Column(name = "update_time")
    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
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

    public String getTestcase() {
        return testcase;
    }

    public void setTestcase(String testcase) {
        this.testcase = testcase;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getAlias2() {
        return alias2;
    }

    public void setAlias2(String alias2) {
        this.alias2 = alias2;
    }

    /*@ManyToOne( fetch = FetchType.LAZY)
    @JoinColumn(name = "best_convention_id")
    public Convention getBest() {
        return best;
    }
    public void setBest(Convention best) {
        this.best = best;
    }*/
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "t_mid_test_convention",
            joinColumns = {@JoinColumn(name = "test_id")},
            inverseJoinColumns = {@JoinColumn(name = "convention_id")}
    )
    @Fetch(FetchMode.SUBSELECT)
    public List<Convention> getConventions() {
        return conventions;
    }

    public void setConventions(List<Convention> conventions) {
        this.conventions = conventions;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @ManyToOne
    @JoinColumn(name = "userId")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Column(name = "only_i_see")
    public String getOnlyIcanSee() {
        return onlyIcanSee;
    }

    public void setOnlyIcanSee(String onlyIcanSee) {
        this.onlyIcanSee = onlyIcanSee;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
