 create table t_access_log (id integer not null auto_increment, access_day varchar(255), access_daytime varchar(255), access_type integer, description varchar(255), device_id varchar(255), device_type varchar(255), extranet_ip varchar(255), ip varchar(255), operate_result varchar(255), os_type varchar(255), query_string varchar(255), request_target varchar(255), requestURI varchar(255), reserved varchar(255), session2_id varchar(255), time bigint not null, user_agent varchar(255), userId integer not null, username varchar(255), primary key (id))
 create table t_compress_failed_pic (id integer not null auto_increment, cause varchar(255), failed_time datetime, original_size bigint, pic_path varchar(255), primary key (id));
 create table t_convention 
 (id integer not null auto_increment, 
 answer LONGTEXT,
 pic varchar(255),
   update_time VARCHAR(30),
   stars int DEFAULT 0,
   status TINYINT COMMENT '1:有效;2:被删除',
  primary key (id)
 );
 create table t_dictionary 
 (
	 id bigint not null auto_increment, 
	 description varchar(255), 
	 groupId varchar(255), 
	 key2 varchar(255), value varchar(255), 
	 primary key (id)
 );
 create table t_mid_test_convention (
	 test_id integer not null, 
	 convention_id integer not null,
   status TINYINT COMMENT '1:有效;2:被删除'
 );
 create table t_test_to_boy (
   id                 integer not null auto_increment,
   testcase           LONGTEXT,
   alias              LONGTEXT,
   alias2             LONGTEXT,
   update_time        VARCHAR(30),
   stars              int              DEFAULT 0,
   status             TINYINT COMMENT '1:有效;2:被删除',
   type               TINYINT          DEFAULT 0,
   best_convention_id integer, primary key (id)
 );
 alter table t_test_convention add index FK_91bx427t6kip2wibhjwqe9cdn (convention_id), 
 add constraint FK_91bx427t6kip2wibhjwqe9cdn foreign key (convention_id) references t_convention (id);
 
 alter table t_test_convention add index FK_mubyo2fsccqmvd4pd9gewyqqk (test_id), 
 add constraint FK_mubyo2fsccqmvd4pd9gewyqqk foreign key (test_id) references t_test_to_boy (id);
 
 alter table t_test_to_boy add index FK_8ne5od9idt81yb0pndbvoap7f (convention_id), 
 add constraint FK_8ne5od9idt81yb0pndbvoap7f foreign key (convention_id) references t_convention (id);
 CREATE TABLE t_user (
   id          INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
   username    VARCHAR(50),
   password    VARCHAR(50),
   nickname    VARCHAR(50),
   email       VARCHAR(50),
   potrait     VARCHAR(50),
   level       TINYINT,
   create_time DATETIME
 );
 INSERT INTO t_user (username, password) VALUES ('whuang', '0192023a7bbd73250516f069df18b500');
 CREATE TABLE t_vote_log (
   id           INTEGER NOT NULL AUTO_INCREMENT,
   status       INTEGER NOT NULL,
   vote_time    VARCHAR(255),
   conventionId INTEGER,
   userId       INTEGER,
   PRIMARY KEY (id)
 );
 ALTER TABLE t_vote_log ADD INDEX FK_8kad70wdy4b591d5g2ool1n1q (conventionId), ADD CONSTRAINT FK_8kad70wdy4b591d5g2ool1n1q FOREIGN KEY (conventionId) REFERENCES t_convention (id);


 ALTER TABLE t_vote_log ADD INDEX FK_j2d15o1md3j2a73mdn3b6gcep (userId), ADD CONSTRAINT FK_j2d15o1md3j2a73mdn3b6gcep FOREIGN KEY (userId) REFERENCES t_user (id)
 ALTER TABLE t_test_to_boy ADD COLUMN userId INTEGER;
 ALTER TABLE t_mid_test_convention ADD INDEX FK_dokxqj4c86atykj617tk3dtv5 (test_id), ADD CONSTRAINT FK_dokxqj4c86atykj617tk3dtv5 FOREIGN KEY (test_id) REFERENCES t_test_to_boy (id);
 ALTER TABLE t_test_to_boy ADD INDEX FK_a96knyonpt06sh6negxcf400h (userId), ADD CONSTRAINT FK_a96knyonpt06sh6negxcf400h FOREIGN KEY (userId) REFERENCES t_user (id);
 ALTER TABLE t_vote_log ADD INDEX FK_8kad70wdy4b591d5g2ool1n1q (conventionId), ADD CONSTRAINT FK_8kad70wdy4b591d5g2ool1n1q FOREIGN KEY (conventionId) REFERENCES t_convention (id);
 ALTER TABLE t_vote_log ADD INDEX FK_j2d15o1md3j2a73mdn3b6gcep (userId), ADD CONSTRAINT FK_j2d15o1md3j2a73mdn3b6gcep FOREIGN KEY (userId) REFERENCES t_user (id);
 INSERT INTO t_dictionary (groupid, key2, value, description) VALUES ('authority', 'super', 'whuang', '超级管理员的用户名');

 CREATE TABLE t_girl (
   id            INTEGER NOT NULL AUTO_INCREMENT,
   age           INTEGER NOT NULL,
   birthday      VARCHAR(255),
   college       VARCHAR(255),
   constellation VARCHAR(255) COMMENT '星座',
   createTime    VARCHAR(255),
   description   VARCHAR(255),
   hate          VARCHAR(255) COMMENT '忌讳,或讨厌的东西',
   hobby         VARCHAR(255),
   hometown      VARCHAR(255) COMMENT '籍贯',
   job           VARCHAR(255),
   name          VARCHAR(255),
   nickName      VARCHAR(255) COMMENT '昵称',
   pics          VARCHAR(255),
   portrait      VARCHAR(255) COMMENT '头像',
   status        INTEGER NOT NULL,
   updateTime    VARCHAR(255),
   PRIMARY KEY (id)
 )
