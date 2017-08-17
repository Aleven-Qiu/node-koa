/*
 Navicat Premium Data Transfer

 Source Server         : 测试数据库
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : localhost
 Source Database       : qmx_zane_npm

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : utf-8

 Date: 08/02/2017 11:45:30 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `npm_components_github_list`
-- ----------------------------
DROP TABLE IF EXISTS `npm_components_github_list`;
CREATE TABLE `npm_components_github_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `list` text NOT NULL COMMENT 'github组件名称json列表',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `npm_components_github_list`
-- ----------------------------
BEGIN;
INSERT INTO `npm_components_github_list` VALUES ('1', '[\"page\",\"nav\",\"side\",\"model\",\"time\"]');
COMMIT;

-- ----------------------------
--  Table structure for `npm_components_new`
-- ----------------------------
DROP TABLE IF EXISTS `npm_components_new`;
CREATE TABLE `npm_components_new` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `title` varchar(50) NOT NULL COMMENT '标题  组件名称',
  `describes` varchar(500) DEFAULT NULL COMMENT '组件描述',
  `version` varchar(20) NOT NULL COMMENT '版本号',
  `author` varchar(20) DEFAULT NULL COMMENT '创建者者',
  `collaborators` varchar(100) DEFAULT NULL COMMENT '贡献者 用,号隔开',
  `viewTimes` smallint(6) DEFAULT '0' COMMENT '组件浏览次数',
  `submitReason` varchar(1000) DEFAULT NULL COMMENT '组件提交原因',
  `text` text NOT NULL COMMENT '组件mackdown text数据',
  `html` text COMMENT '组件html描述',
  `createTime` datetime NOT NULL COMMENT '创建 || 修改时间',
  `size` varchar(20) DEFAULT NULL COMMENT '组件大小',
  `npmVersion` varchar(20) DEFAULT NULL COMMENT '支持的npm版本',
  `nodeVersion` varchar(20) DEFAULT NULL COMMENT '支持的node版本',
  `isUse` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否上线  1：上线    0：下线',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `npm_components_new`
-- ----------------------------
BEGIN;
INSERT INTO `npm_components_new` VALUES ('21', 'time', '时间组件', '2.0.6', 'wangwei', null, '17', '', '##运行方式\n```\n	开发环境：npm run dev\n\n	打包：npm run build\n\n	启动项目：npm run server\n\n	pm2启动方式：npm run pm2\n\n```\n45245245\n452452\n\n\n\n', null, '2017-07-31 10:28:26', '1KB', '4.2.0', '7.8.0', '1'), ('22', 'page', '分页组件 适用于vue2.0版本', '2.1.6', 'zane', null, '42', null, '#zane-koa2-restful-api\r\n\r\n\r\n### 项目采用 koa2+gulp+mysal 搭建的一套后台集成模板\r\n\r\n##项目通过gulp-nodemon 实时编译刷新node服务\r\n\r\n\r\n##项目目录结构\r\n```\r\n	assets    \r\n	build \r\n		server.js     	项目启动文件 babel 编译\r\n	dist   				打包好的项目文件	\r\n	logs                pm2运行时生成的日志文件\r\n	noode_modules      \r\n	src\r\n		controllers     \r\n			index.js    controller入口文件\r\n			email.js    nodemailer 邮件发送controller\r\n			common.js   公共接口，比如：验证接口来源，检测接口参数，公共用户信息等\r\n			......\r\n		models\r\n		routes\r\n			index.js    路由入口\r\n			......\r\n		tool\r\n			index.js    入口文件\r\n			getsql.js   对mysql 的增删改查 语句的封装\r\n			mysql.js    mysql配置文件\r\n			util.js     工具函数\r\n	.babelrc\r\n	.gitignore\r\n	gulpfile.js         gulp配置\r\n	package.json\r\n	pm2.config.json     pm2配置\r\n	README.md		\r\n\r\n```\r\n\r\n### 说明\r\n\r\n```\r\n	项目使用babel编译\r\n	项目通过gulp-nodemon 实时编译刷新node服务\r\n	提供了mysql的封装函数 和案例 （我自己开发使用时做的）\r\n	提供了邮件发送 nodemailer 配置\r\n\r\n```\r\n\r\n\r\n\r\n##运行方式\r\n```\r\n	开发环境：npm run dev\r\n\r\n	打包：npm run build\r\n\r\n	启动项目：npm run server\r\n\r\n	pm2启动方式：npm run pm2\r\n\r\n```\r\n\r\n\r\n\r\n\r\n', null, '2017-08-01 14:06:51', '2KB', '4.2.0', '7.8.0', '1');
COMMIT;

-- ----------------------------
--  Table structure for `npm_components_old`
-- ----------------------------
DROP TABLE IF EXISTS `npm_components_old`;
CREATE TABLE `npm_components_old` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `title` varchar(50) NOT NULL COMMENT '标题  组件名称',
  `describes` varchar(500) DEFAULT NULL COMMENT '组件描述',
  `version` varchar(20) NOT NULL COMMENT '版本号',
  `author` varchar(20) DEFAULT NULL COMMENT '创建者者',
  `collaborators` varchar(100) DEFAULT NULL COMMENT '贡献者 用,号隔开',
  `viewTimes` smallint(6) DEFAULT '0' COMMENT '组件浏览次数',
  `submitReason` varchar(1000) DEFAULT NULL COMMENT '组件提交原因',
  `text` text NOT NULL COMMENT '组件mackdown text数据',
  `html` text COMMENT '组件html描述',
  `createTime` datetime NOT NULL COMMENT '创建 || 修改时间',
  `size` varchar(20) DEFAULT NULL COMMENT '组件大小',
  `npmVersion` varchar(20) DEFAULT NULL COMMENT '支持的npm版本',
  `nodeVersion` varchar(20) DEFAULT NULL COMMENT '支持的node版本',
  `isUse` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否上线  1：上线    0：下线',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `npm_components_old`
-- ----------------------------
BEGIN;
INSERT INTO `npm_components_old` VALUES ('4', 'page', 'page分页组件', '2.0.1', 'zane', null, null, null, '#zane-koa2-restful-api\r\n\r\n\r\n### 项目采用 koa2+gulp+mysal 搭建的一套后台集成模板\r\n\r\n##项目通过gulp-nodemon 实时编译刷新node服务\r\n\r\n\r\n##项目目录结构\r\n```\r\n	assets    \r\n	build \r\n		server.js     	项目启动文件 babel 编译\r\n	dist   				打包好的项目文件	\r\n	logs                pm2运行时生成的日志文件\r\n	noode_modules      \r\n	src\r\n		controllers     \r\n			index.js    controller入口文件\r\n			email.js    nodemailer 邮件发送controller\r\n			common.js   公共接口，比如：验证接口来源，检测接口参数，公共用户信息等\r\n			......\r\n		models\r\n		routes\r\n			index.js    路由入口\r\n			......\r\n		tool\r\n			index.js    入口文件\r\n			getsql.js   对mysql 的增删改查 语句的封装\r\n			mysql.js    mysql配置文件\r\n			util.js     工具函数\r\n	.babelrc\r\n	.gitignore\r\n	gulpfile.js         gulp配置\r\n	package.json\r\n	pm2.config.json     pm2配置\r\n	README.md		\r\n\r\n```\r\n\r\n### 说明\r\n\r\n```\r\n	项目使用babel编译\r\n	项目通过gulp-nodemon 实时编译刷新node服务\r\n	提供了mysql的封装函数 和案例 （我自己开发使用时做的）\r\n	提供了邮件发送 nodemailer 配置\r\n\r\n```\r\n\r\n\r\n\r\n##运行方式\r\n```\r\n	开发环境：npm run dev\r\n\r\n	打包：npm run build\r\n\r\n	启动项目：npm run server\r\n\r\n	pm2启动方式：npm run pm2\r\n\r\n```\r\n\r\n\r\n\r\n\r\n', null, '2017-07-28 15:45:25', null, '4.2.0', '7.8.0', '1'), ('9', 'page', 'page分页组件', '2.0.9', 'zane', null, null, null, '#zane-koa2-restful-api\r\n\r\n\r\n### 项目采用 koa2+gulp+mysal 搭建的一套后台集成模板\r\n\r\n##项目通过gulp-nodemon 实时编译刷新node服务\r\n\r\n\r\n##项目目录结构\r\n```\r\n	assets    \r\n	build \r\n		server.js     	项目启动文件 babel 编译\r\n	dist   				打包好的项目文件	\r\n	logs                pm2运行时生成的日志文件\r\n	noode_modules      \r\n	src\r\n		controllers     \r\n			index.js    controller入口文件\r\n			email.js    nodemailer 邮件发送controller\r\n			common.js   公共接口，比如：验证接口来源，检测接口参数，公共用户信息等\r\n			......\r\n		models\r\n		routes\r\n			index.js    路由入口\r\n			......\r\n		tool\r\n			index.js    入口文件\r\n			getsql.js   对mysql 的增删改查 语句的封装\r\n			mysql.js    mysql配置文件\r\n			util.js     工具函数\r\n	.babelrc\r\n	.gitignore\r\n	gulpfile.js         gulp配置\r\n	package.json\r\n	pm2.config.json     pm2配置\r\n	README.md		\r\n\r\n```\r\n\r\n### 说明\r\n\r\n```\r\n	项目使用babel编译\r\n	项目通过gulp-nodemon 实时编译刷新node服务\r\n	提供了mysql的封装函数 和案例 （我自己开发使用时做的）\r\n	提供了邮件发送 nodemailer 配置\r\n\r\n```\r\n\r\n\r\n\r\n##运行方式\r\n```\r\n	开发环境：npm run dev\r\n\r\n	打包：npm run build\r\n\r\n	启动项目：npm run server\r\n\r\n	pm2启动方式：npm run pm2\r\n\r\n```\r\n\r\n\r\n\r\n\r\n', null, '2017-07-28 18:31:46', null, '4.2.0', '7.8.0', '1'), ('10', 'page', 'page分页组件', '2.1.0', 'zane', null, null, null, '#zane-koa2-restful-api\r\n\r\n\r\n### 项目采用 koa2+gulp+mysal 搭建的一套后台集成模板\r\n\r\n##项目通过gulp-nodemon 实时编译刷新node服务\r\n\r\n\r\n##项目目录结构\r\n```\r\n	assets    \r\n	build \r\n		server.js     	项目启动文件 babel 编译\r\n	dist   				打包好的项目文件	\r\n	logs                pm2运行时生成的日志文件\r\n	noode_modules      \r\n	src\r\n		controllers     \r\n			index.js    controller入口文件\r\n			email.js    nodemailer 邮件发送controller\r\n			common.js   公共接口，比如：验证接口来源，检测接口参数，公共用户信息等\r\n			......\r\n		models\r\n		routes\r\n			index.js    路由入口\r\n			......\r\n		tool\r\n			index.js    入口文件\r\n			getsql.js   对mysql 的增删改查 语句的封装\r\n			mysql.js    mysql配置文件\r\n			util.js     工具函数\r\n	.babelrc\r\n	.gitignore\r\n	gulpfile.js         gulp配置\r\n	package.json\r\n	pm2.config.json     pm2配置\r\n	README.md		\r\n\r\n```\r\n\r\n### 说明\r\n\r\n```\r\n	项目使用babel编译\r\n	项目通过gulp-nodemon 实时编译刷新node服务\r\n	提供了mysql的封装函数 和案例 （我自己开发使用时做的）\r\n	提供了邮件发送 nodemailer 配置\r\n\r\n```\r\n\r\n\r\n\r\n##运行方式\r\n```\r\n	开发环境：npm run dev\r\n\r\n	打包：npm run build\r\n\r\n	启动项目：npm run server\r\n\r\n	pm2启动方式：npm run pm2\r\n\r\n```\r\n\r\n\r\n\r\n\r\n', null, '2017-07-28 18:33:25', null, '4.2.0', '7.8.0', '1'), ('11', 'page', 'page分页组件', '2.1.1', 'zane', null, null, null, '#zane-koa2-restful-api\r\n\r\n\r\n### 项目采用 koa2+gulp+mysal 搭建的一套后台集成模板\r\n\r\n##项目通过gulp-nodemon 实时编译刷新node服务\r\n\r\n\r\n##项目目录结构\r\n```\r\n	assets    \r\n	build \r\n		server.js     	项目启动文件 babel 编译\r\n	dist   				打包好的项目文件	\r\n	logs                pm2运行时生成的日志文件\r\n	noode_modules      \r\n	src\r\n		controllers     \r\n			index.js    controller入口文件\r\n			email.js    nodemailer 邮件发送controller\r\n			common.js   公共接口，比如：验证接口来源，检测接口参数，公共用户信息等\r\n			......\r\n		models\r\n		routes\r\n			index.js    路由入口\r\n			......\r\n		tool\r\n			index.js    入口文件\r\n			getsql.js   对mysql 的增删改查 语句的封装\r\n			mysql.js    mysql配置文件\r\n			util.js     工具函数\r\n	.babelrc\r\n	.gitignore\r\n	gulpfile.js         gulp配置\r\n	package.json\r\n	pm2.config.json     pm2配置\r\n	README.md		\r\n\r\n```\r\n\r\n### 说明\r\n\r\n```\r\n	项目使用babel编译\r\n	项目通过gulp-nodemon 实时编译刷新node服务\r\n	提供了mysql的封装函数 和案例 （我自己开发使用时做的）\r\n	提供了邮件发送 nodemailer 配置\r\n\r\n```\r\n\r\n\r\n\r\n##运行方式\r\n```\r\n	开发环境：npm run dev\r\n\r\n	打包：npm run build\r\n\r\n	启动项目：npm run server\r\n\r\n	pm2启动方式：npm run pm2\r\n\r\n```\r\n\r\n\r\n\r\n\r\n', null, '2017-07-28 18:41:05', null, '4.2.0', '7.8.0', '1'), ('12', 'time', 'erg', '2.0.0', 'ghf', null, null, null, '##运行方式\r\n```\r\n	开发环境：npm run dev\r\n\r\n	打包：npm run build\r\n\r\n	启动项目：npm run server\r\n\r\n	pm2启动方式：npm run pm2\r\n\r\n```\r\n\r\n\r\n\r\n\r\n', null, '2017-07-31 09:26:04', null, '4.2.0', '7.8.0', '1'), ('13', 'page', 'erg', '2.1.2', 'ghf', null, null, null, '#zane-koa2-restful-api\r\n\r\n\r\n### 项目采用 koa2+gulp+mysal 搭建的一套后台集成模板\r\n\r\n##项目通过gulp-nodemon 实时编译刷新node服务\r\n\r\n\r\n##项目目录结构\r\n```\r\n	assets    \r\n	build \r\n		server.js     	项目启动文件 babel 编译\r\n	dist   				打包好的项目文件	\r\n	logs                pm2运行时生成的日志文件\r\n	noode_modules      \r\n	src\r\n		controllers     \r\n			index.js    controller入口文件\r\n			email.js    nodemailer 邮件发送controller\r\n			common.js   公共接口，比如：验证接口来源，检测接口参数，公共用户信息等\r\n			......\r\n		models\r\n		routes\r\n			index.js    路由入口\r\n			......\r\n		tool\r\n			index.js    入口文件\r\n			getsql.js   对mysql 的增删改查 语句的封装\r\n			mysql.js    mysql配置文件\r\n			util.js     工具函数\r\n	.babelrc\r\n	.gitignore\r\n	gulpfile.js         gulp配置\r\n	package.json\r\n	pm2.config.json     pm2配置\r\n	README.md		\r\n\r\n```\r\n\r\n### 说明\r\n\r\n```\r\n	项目使用babel编译\r\n	项目通过gulp-nodemon 实时编译刷新node服务\r\n	提供了mysql的封装函数 和案例 （我自己开发使用时做的）\r\n	提供了邮件发送 nodemailer 配置\r\n\r\n```\r\n\r\n\r\n\r\n##运行方式\r\n```\r\n	开发环境：npm run dev\r\n\r\n	打包：npm run build\r\n\r\n	启动项目：npm run server\r\n\r\n	pm2启动方式：npm run pm2\r\n\r\n```\r\n\r\n\r\n\r\n\r\n', null, '2017-07-31 09:24:32', null, '4.2.0', '7.8.0', '1'), ('14', 'time', 'erg', '2.0.1', 'ghf', null, null, null, '##运行方式\r\n```\r\n	开发环境：npm run dev\r\n\r\n	打包：npm run build\r\n\r\n	启动项目：npm run server\r\n\r\n	pm2启动方式：npm run pm2\r\n\r\n```\r\n\r\n\r\n\r\n\r\n', null, '2017-07-31 09:26:34', null, '4.2.0', '7.8.0', '1'), ('15', 'time', 'sdf', '2.0.2', 'sdf', null, null, null, '##运行方式\r\n```\r\n	开发环境：npm run dev\r\n\r\n	打包：npm run build\r\n\r\n	启动项目：npm run server\r\n\r\n	pm2启动方式：npm run pm2\r\n\r\n```\r\n\r\n\r\n\r\n\r\n', null, '2017-07-31 10:26:50', '1KB', '4.2.0', '7.8.0', '1'), ('16', 'time', '时间组件', '2.0.3', 'wangwei', null, null, null, '##运行方式\r\n```\r\n	开发环境：npm run dev\r\n\r\n	打包：npm run build\r\n\r\n	启动项目：npm run server\r\n\r\n	pm2启动方式：npm run pm2\r\n\r\n```\r\n\r\n\r\n\r\n\r\n', null, '2017-07-31 10:27:23', '1KB', '4.2.0', '7.8.0', '1'), ('17', 'page', 'sdc', '2.1.3', 'sdc', null, null, null, '#zane-koa2-restful-api\r\n\r\n\r\n### 项目采用 koa2+gulp+mysal 搭建的一套后台集成模板\r\n\r\n##项目通过gulp-nodemon 实时编译刷新node服务\r\n\r\n\r\n##项目目录结构\r\n```\r\n	assets    \r\n	build \r\n		server.js     	项目启动文件 babel 编译\r\n	dist   				打包好的项目文件	\r\n	logs                pm2运行时生成的日志文件\r\n	noode_modules      \r\n	src\r\n		controllers     \r\n			index.js    controller入口文件\r\n			email.js    nodemailer 邮件发送controller\r\n			common.js   公共接口，比如：验证接口来源，检测接口参数，公共用户信息等\r\n			......\r\n		models\r\n		routes\r\n			index.js    路由入口\r\n			......\r\n		tool\r\n			index.js    入口文件\r\n			getsql.js   对mysql 的增删改查 语句的封装\r\n			mysql.js    mysql配置文件\r\n			util.js     工具函数\r\n	.babelrc\r\n	.gitignore\r\n	gulpfile.js         gulp配置\r\n	package.json\r\n	pm2.config.json     pm2配置\r\n	README.md		\r\n\r\n```\r\n\r\n### 说明\r\n\r\n```\r\n	项目使用babel编译\r\n	项目通过gulp-nodemon 实时编译刷新node服务\r\n	提供了mysql的封装函数 和案例 （我自己开发使用时做的）\r\n	提供了邮件发送 nodemailer 配置\r\n\r\n```\r\n\r\n\r\n\r\n##运行方式\r\n```\r\n	开发环境：npm run dev\r\n\r\n	打包：npm run build\r\n\r\n	启动项目：npm run server\r\n\r\n	pm2启动方式：npm run pm2\r\n\r\n```\r\n\r\n\r\n\r\n\r\n', null, '2017-07-31 09:54:21', '2KB', '4.2.0', '7.8.0', '1'), ('18', 'time', '时间组件', '2.0.4', 'wangwei', null, '14', '', '##运行方式\n```\n	开发环境：npm run dev\n\n	打包：npm run build\n\n	启动项目：npm run server\n\n	pm2启动方式：npm run pm2\n\n```\n\n\nsdf\n\n', null, '2017-07-31 10:27:33', '1KB', '4.2.0', '7.8.0', '2'), ('19', 'page', '时间组件', '2.1.4', 'wangwei', null, null, null, '#zane-koa2-restful-api\r\n\r\n\r\n### 项目采用 koa2+gulp+mysal 搭建的一套后台集成模板\r\n\r\n##项目通过gulp-nodemon 实时编译刷新node服务\r\n\r\n\r\n##项目目录结构\r\n```\r\n	assets    \r\n	build \r\n		server.js     	项目启动文件 babel 编译\r\n	dist   				打包好的项目文件	\r\n	logs                pm2运行时生成的日志文件\r\n	noode_modules      \r\n	src\r\n		controllers     \r\n			index.js    controller入口文件\r\n			email.js    nodemailer 邮件发送controller\r\n			common.js   公共接口，比如：验证接口来源，检测接口参数，公共用户信息等\r\n			......\r\n		models\r\n		routes\r\n			index.js    路由入口\r\n			......\r\n		tool\r\n			index.js    入口文件\r\n			getsql.js   对mysql 的增删改查 语句的封装\r\n			mysql.js    mysql配置文件\r\n			util.js     工具函数\r\n	.babelrc\r\n	.gitignore\r\n	gulpfile.js         gulp配置\r\n	package.json\r\n	pm2.config.json     pm2配置\r\n	README.md		\r\n\r\n```\r\n\r\n### 说明\r\n\r\n```\r\n	项目使用babel编译\r\n	项目通过gulp-nodemon 实时编译刷新node服务\r\n	提供了mysql的封装函数 和案例 （我自己开发使用时做的）\r\n	提供了邮件发送 nodemailer 配置\r\n\r\n```\r\n\r\n\r\n\r\n##运行方式\r\n```\r\n	开发环境：npm run dev\r\n\r\n	打包：npm run build\r\n\r\n	启动项目：npm run server\r\n\r\n	pm2启动方式：npm run pm2\r\n\r\n```\r\n\r\n\r\n\r\n\r\n', null, '2017-07-31 10:27:39', '2KB', '4.2.0', '7.8.0', '1'), ('20', 'time', '时间组件', '2.0.5', 'wangwei', null, '14', '', '##运行方式\n```\n	开发环境：npm run dev\n\n	打包：npm run build\n\n	启动项目：npm run server\n\n	pm2启动方式：npm run pm2\n\n```\n\nsdfsdfsdfsdf\n\n\nsdfsfd', null, '2017-07-31 10:28:13', '1KB', '4.2.0', '7.8.0', '1'), ('21', 'page', '时间组件', '2.1.5', 'wangweianger', null, '21', '', '#zane-koa2-restful-api\n\n\n### 项目采用 koa2+gulp+mysal 搭建的一套后台集成模板\n\n##项目通过gulp-nodemon 实时编译刷新node服务\n\n\n##项目目录结构\n```\n	assets    \n	build \n		server.js     	项目启动文件 babel 编译\n	dist   				打包好的项目文件	\n	logs                pm2运行时生成的日志文件\n	noode_modules      \n	src\n		controllers     \n			index.js    controller入口文件\n			email.js    nodemailer 邮件发送controller\n			common.js   公共接口，比如：验证接口来源，检测接口参数，公共用户信息等\n			......\n		models\n		routes\n			index.js    路由入口\n			......\n		tool\n			index.js    入口文件\n			getsql.js   对mysql 的增删改查 语句的封装\n			mysql.js    mysql配置文件\n			util.js     工具函数\n	.babelrc\n	.gitignore\n	gulpfile.js         gulp配置\n	package.json\n	pm2.config.json     pm2配置\n	README.md		\n\n```\n\n### 说明\n\n```\n	项目使用babel编译\n	项目通过gulp-nodemon 实时编译刷新node服务\n	提供了mysql的封装函数 和案例 （我自己开发使用时做的）\n	提供了邮件发送 nodemailer 配置\n\n```\n\n\n\n##运行方式\n```\n	开发环境：npm run dev\n\n	打包：npm run build\n\n	启动项目：npm run server\n\n	pm2启动方式：npm run pm2\n\n```\n\n\n\n\n', null, '2017-07-31 10:28:21', '2KB', '4.2.0', '7.8.0', '1');
COMMIT;

-- ----------------------------
--  Table structure for `npm_user`
-- ----------------------------
DROP TABLE IF EXISTS `npm_user`;
CREATE TABLE `npm_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `password` varchar(20) NOT NULL COMMENT '用户密码',
  `secretKey` varchar(50) NOT NULL COMMENT '用户的秘钥',
  `isUser` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否冻结  1：否      0：是',
  `userImg` varchar(50) DEFAULT NULL COMMENT '用户头像',
  `createTime` datetime NOT NULL COMMENT '注册时间',
  `nickname` varchar(20) DEFAULT NULL COMMENT '用户昵称',
  `level` varchar(10) DEFAULT '' COMMENT '用户级别  admin 和 user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `npm_user`
-- ----------------------------
BEGIN;
INSERT INTO `npm_user` VALUES ('3', 'zane', '123456', '0A067C5563A13F87FAF0059FC98B8DB8', '1', null, '2017-08-01 18:49:40', null, 'user');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
