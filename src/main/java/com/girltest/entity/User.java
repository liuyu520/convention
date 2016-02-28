package com.girltest.entity;

import com.common.entity.user.interf.GenericUser;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "t_user")
public class User extends GenericUser implements Serializable {
    private static final long serialVersionUID = 2752201242171710474L;
    private int id;
    private String username;// 用户名
    private String password;// 密码
    /***
     * 昵称
     */
    private String nickname;// 姓名
    //	private UserOverheadInfo userOverheadInfo;
    private String email;
    /***
     * 个人头像(图片的url地址,不包括项目名)
     */
    private String potrait;
    /***
     * 用户级别(角色)<br>0,普通用户;<br>2,管理员
     */
    private Integer level;

    @Id
    @GeneratedValue
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(unique = true)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPotrait() {
        return potrait;
    }

    public void setPotrait(String potrait) {
        this.potrait = potrait;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

	/*public UserOverheadInfo getUserOverheadInfo() {
        return userOverheadInfo;
	}

	public void setUserOverheadInfo(UserOverheadInfo userOverheadInfo) {
		this.userOverheadInfo = userOverheadInfo;
	}*/

}
