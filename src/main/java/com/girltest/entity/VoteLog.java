package com.girltest.entity;

import java.util.List;

import javax.persistence.*;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 * Created by huangweii on 2016/2/21.
 */
@Entity
@Table(name = "t_vote_log")
public class VoteLog {
    private int id;
    private User user;
    /**
     * 点赞的时间
     */
    private String voteTime;
    private int status;
    private Convention convention;
    
    @Id
    @GeneratedValue
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	@ManyToOne
	@JoinColumn (name="userId")
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	@Column(name = "vote_time")
	public String getVoteTime() {
		return voteTime;
	}
	public void setVoteTime(String voteTime) {
		this.voteTime = voteTime;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}

	@ManyToOne
	@JoinColumn (name="conventionId")
	public Convention getConvention() {
		return convention;
	}

	public void setConvention(Convention convention) {
		this.convention = convention;
	}
}
