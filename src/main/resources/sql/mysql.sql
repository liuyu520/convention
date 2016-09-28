CREATE TABLE t_access_log (
  id             INTEGER NOT NULL AUTO_INCREMENT,
  access_day     VARCHAR(255),
  access_daytime VARCHAR(255),
  access_type    INTEGER,
  description    VARCHAR(255),
  device_id      VARCHAR(255),
  device_type    VARCHAR(255),
  extranet_ip    VARCHAR(255),
  ip             VARCHAR(255),
  operate_result VARCHAR(255),
  os_type        VARCHAR(255),
  query_string   VARCHAR(255),
  request_target VARCHAR(255),
  requestURI     VARCHAR(255),
  reserved       VARCHAR(255),
  session2_id    VARCHAR(255),
  time           BIGINT  NOT NULL,
  user_agent     VARCHAR(255),
  userId         INTEGER NOT NULL,
  username       VARCHAR(255),
  PRIMARY KEY (id)
)
CREATE TABLE t_compress_failed_pic (
  id            INTEGER NOT NULL AUTO_INCREMENT,
  cause         VARCHAR(255),
  failed_time   DATETIME,
  original_size BIGINT,
  pic_path      VARCHAR(255),
  PRIMARY KEY (id)
);
CREATE TABLE t_convention
(
  id          INTEGER NOT NULL AUTO_INCREMENT,
  answer      LONGTEXT,
  pic         VARCHAR(255),
  update_time VARCHAR(30),
  stars       INT              DEFAULT 0,
  status      TINYINT COMMENT '1:有效;2:被删除',
  PRIMARY KEY (id)
);
CREATE TABLE t_dictionary
(
  id          BIGINT NOT NULL AUTO_INCREMENT,
  description VARCHAR(255),
  groupId     VARCHAR(255),
  key2        VARCHAR(255),
  value       VARCHAR(255),
  PRIMARY KEY (id)
);
CREATE TABLE t_mid_test_convention (
  test_id       INTEGER NOT NULL,
  convention_id INTEGER NOT NULL,
  status        TINYINT COMMENT '1:有效;2:被删除'
);
CREATE TABLE t_test_to_boy (
  id                 INTEGER NOT NULL AUTO_INCREMENT,
  testcase           LONGTEXT UNIQUE
  COMMENT '问题',
  alias              LONGTEXT,
  alias2             LONGTEXT,
  update_time        VARCHAR(30),
  stars              INT              DEFAULT 0,
  status             TINYINT COMMENT '1:有效;2:被删除',
  type               TINYINT          DEFAULT 0,
  best_convention_id INTEGER,
  PRIMARY KEY (id)
);
ALTER TABLE t_test_convention
  ADD INDEX FK_91bx427t6kip2wibhjwqe9cdn (convention_id),
  ADD CONSTRAINT FK_91bx427t6kip2wibhjwqe9cdn FOREIGN KEY (convention_id) REFERENCES t_convention (id);

ALTER TABLE t_test_convention
  ADD INDEX FK_mubyo2fsccqmvd4pd9gewyqqk (test_id),
  ADD CONSTRAINT FK_mubyo2fsccqmvd4pd9gewyqqk FOREIGN KEY (test_id) REFERENCES t_test_to_boy (id);

ALTER TABLE t_test_to_boy
  ADD INDEX FK_8ne5od9idt81yb0pndbvoap7f (convention_id),
  ADD CONSTRAINT FK_8ne5od9idt81yb0pndbvoap7f FOREIGN KEY (convention_id) REFERENCES t_convention (id);
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
ALTER TABLE t_vote_log
  ADD INDEX FK_8kad70wdy4b591d5g2ool1n1q (conventionId),
  ADD CONSTRAINT FK_8kad70wdy4b591d5g2ool1n1q FOREIGN KEY (conventionId) REFERENCES t_convention (id);


ALTER TABLE t_vote_log
  ADD INDEX FK_j2d15o1md3j2a73mdn3b6gcep (userId),
  ADD CONSTRAINT FK_j2d15o1md3j2a73mdn3b6gcep FOREIGN KEY (userId) REFERENCES t_user (id)
ALTER TABLE t_test_to_boy
  ADD COLUMN userId INTEGER;
ALTER TABLE t_mid_test_convention
  ADD INDEX FK_dokxqj4c86atykj617tk3dtv5 (test_id),
  ADD CONSTRAINT FK_dokxqj4c86atykj617tk3dtv5 FOREIGN KEY (test_id) REFERENCES t_test_to_boy (id);
ALTER TABLE t_test_to_boy
  ADD INDEX FK_a96knyonpt06sh6negxcf400h (userId),
  ADD CONSTRAINT FK_a96knyonpt06sh6negxcf400h FOREIGN KEY (userId) REFERENCES t_user (id);
ALTER TABLE t_vote_log
  ADD INDEX FK_8kad70wdy4b591d5g2ool1n1q (conventionId),
  ADD CONSTRAINT FK_8kad70wdy4b591d5g2ool1n1q FOREIGN KEY (conventionId) REFERENCES t_convention (id);
ALTER TABLE t_vote_log
  ADD INDEX FK_j2d15o1md3j2a73mdn3b6gcep (userId),
  ADD CONSTRAINT FK_j2d15o1md3j2a73mdn3b6gcep FOREIGN KEY (userId) REFERENCES t_user (id);
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
  status        TINYINT NOT NULL
  COMMENT '1:有效;2:被删除',
  updateTime    VARCHAR(255),
  height        TINYINT,
  weight        TINYINT,
  work_place    VARCHAR(255),
  animal_sign   VARCHAR(255) COMMENT '生肖',
  nation        VARCHAR(255) COMMENT '民族',
  PRIMARY KEY (id)
);
CREATE TABLE t_share_item (
  id         INTEGER NOT NULL AUTO_INCREMENT,
  relativeId INTEGER,
  shareCode  VARCHAR(255),
  type       TINYINT NOT NULL COMMENT '1:test; 2:convention',
  updateTime VARCHAR(255),
  PRIMARY KEY (id)
);
CREATE TABLE t_diary (
  id         INTEGER NOT NULL AUTO_INCREMENT,
  content    LONGTEXT,
  createTime VARCHAR(255),
  stars      INTEGER,
  status     TINYINT NOT NULL,
  updateTime VARCHAR(255),
  userId     INTEGER,
  PRIMARY KEY (id)
);
ALTER TABLE t_diary
  ADD INDEX FK_hbsm0eyqxw4j2mn4209fv7agg (userId),
  ADD CONSTRAINT FK_hbsm0eyqxw4j2mn4209fv7agg FOREIGN KEY (userId) REFERENCES t_user (id);

ALTER TABLE t_mid_test_convention
  ADD INDEX FK_on9disi985cvkwdtar3bumxg5 (convention_id),
  ADD CONSTRAINT FK_on9disi985cvkwdtar3bumxg5 FOREIGN KEY (convention_id) REFERENCES t_convention (id);
