import path from 'path'

// 系统配置
export let SYSTEM = {
	//允许调用接口的域名，用来检测防盗链
	ORIGIN: 'http://127.0.0.1:8085',

	// HTTP服务器端口号
	PROT: 8085,
	
	// 分页条数
	PAGESIZE: 10,

	DEBUG: false,

	BASEIMG: 'http://img.central.morning-star.cn/',

	// shell.sh文件路径
	SHELLSRC:'/Users/MacBook/Desktop/work/qmx-npm-ssr-node/',

	// npm服务仓库文件路径
	FILESRC:'/Users/MacBook/Desktop/zane/storage/',

	// 待push 的组件路径
	COMPONENTSRC:'/Users/MacBook/Desktop/zane/components/'

}

export let DB = {
	// 服务器地址
	HOST: 'localhost',

	// 数据库端口号     
	PROT: 3306,

	// 数据库用户名              
	USER: 'root',

	// 数据库密码    
	PASSWORD: '123456',

	// 数据库名称    
	DATABASE: 'qmx_zane_npm',

	// 默认"api_"
	PREFIX: 'npm_'
}

export let NODEMAILER = {
	// SMTP服务提供商域名
	HOST: '163',
	// 用户名/用户邮箱
	USER: 'xxx@163.com',
	// 邮箱密码
	PASSWORD: '132456',
}