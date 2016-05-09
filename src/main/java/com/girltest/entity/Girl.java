package com.girltest.entity;

import javax.persistence.*;

/**
 * Created by 黄威 on 5/9/16.<br >
 */
@Entity
@Table(name = "t_girl")
public class Girl {
    /***
     * 更新时间
     */
    protected String updateTime;
    /***
     * 创建时间
     */
    protected String createTime;
    /***
     * 数据库ID
     */
    private int id;
    /***
     * 姓名
     */
    private String name;
    /***
     * 昵称
     */
    private String nickName;
    /***
     * 年龄
     */
    private int age;
    /***
     * 大学,例如"武汉理工大学"
     */
    private String college;
    /***
     * 出生年月<br>
     * 格式:1988-10-06
     */
    private String birthday;
    /***
     * 籍贯,比如"湖北应城"
     */
    private String hometown;
    /***
     * 岗位,例如"IT程序员","销售"
     */
    private String job;
    /***
     * 头像
     */
    private String portrait;
    /***
     * 图片,以"###"分割<br>
     * 例如"/upload/image/20160412220606_158_2d35c.jpg###/upload/image/20160426083922_44_rr0.jpg"
     */
    private String pics;
    /***
     * 爱好
     */
    private String hobby;
    /***
     * 忌讳,或特别讨厌的东西,比如rr讨厌猫
     */
    private String hate;
    /***
     * 星座,比如"处女座"或"天蝎座"
     */
    private String constellation;
    private String desc;
    /***
     * 1:有效;2:被删除
     */
    private int status;
    /***
     * 单位:厘米 cm
     */
    private int height;
    /***
     * 体重<br> 单位:KG
     */
    private int weight;
    /***
     * 工作地点
     */
    private String workPlace;
    /***
     * 生肖,例如"蛇","龙"
     */
    private String animalSign;
    /***
     * 民族,例如"汉族"
     */
    private String nation;

    @Id
    @GeneratedValue
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getHometown() {
        return hometown;
    }

    public void setHometown(String hometown) {
        this.hometown = hometown;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getPortrait() {
        return portrait;
    }

    public void setPortrait(String portrait) {
        this.portrait = portrait;
    }

    public String getPics() {
        return pics;
    }

    public void setPics(String pics) {
        this.pics = pics;
    }

    public String getHobby() {
        return hobby;
    }

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }

    public String getHate() {
        return hate;
    }

    public void setHate(String hate) {
        this.hate = hate;
    }

    public String getConstellation() {
        return constellation;
    }

    public void setConstellation(String constellation) {
        this.constellation = constellation;
    }

    @Column(name = "description")
    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    @Column(name = "work_place")
    public String getWorkPlace() {
        return workPlace;
    }

    public void setWorkPlace(String workPlace) {
        this.workPlace = workPlace;
    }

    @Column(name = "animal_sign")
    public String getAnimalSign() {
        return animalSign;
    }

    public void setAnimalSign(String animalSign) {
        this.animalSign = animalSign;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }
}
