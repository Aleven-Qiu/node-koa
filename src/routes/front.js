//前端路由
import KoaRouter from 'koa-router'
import controllers from '../controllers'
import moment from 'moment'
import {
	SYSTEM
} from '../config'
const router = new KoaRouter()

// 请求接口校验中间件
const checkfn = controllers.common.checkRequestUrl;
const checkIsLogin = controllers.common.checkIsLogin;

/*----------------------------------------ajax接口---------------------------------------------------*/
/*------------------------------ 首页相关 ----------------------------------------------*/
// 首页
router.get(['/','/index.html'], async(ctx, next) => {
	let datas = {
		title:'首页',
	}

	await ctx.render('index',{
		datas:datas
	}); 
});
//获取首页列表接口
router.post('/api/home/getList', checkIsLogin, controllers.home.getList);

//修改上下线
router.post('/api/home/updataisUse', checkIsLogin, controllers.home.updataisUse);

//搜索关键字
router.post('/api/home/searchKeyword', checkIsLogin, controllers.home.searchKeyword);


/*------------------------------ 用户相关 ----------------------------------------------*/
// 登录界面
router.get(['/login','/login.html'], async(ctx, next) => {
	await ctx.render('login',{
		datas:{
			title:'用户登录'
		}
	}); 
});

router.get('/register', async(ctx, next)=>{
	await ctx.render('login',{
		datas:{
			title:'用户注册'
		}
	}); 
});

router.get('/userList', async(ctx, next)=>{
	await ctx.render('userList',{
		datas:{
			title:'用户列表'
		}
	}); 
});

router.get('/userDetail', async(ctx, next)=>{
	await ctx.render('userDetail',{
		datas:{
			title:'用户详情'
		}
	}); 
});

//注册api
router.post('/api/user/userRegister', checkfn, controllers.user.userRegister);

//登录api
router.post('/api/user/userLogin', checkfn, controllers.user.userLogin);

//获取用户列表api
router.post('/api/user/getUserList', checkIsLogin, controllers.user.getUserList)

//获取用户信息api
router.post('/api/user/getUserInfo', checkIsLogin, controllers.user.getUserInfo)

//上传用户头像api
router.post('/api/user/uploadHeadPic', checkIsLogin, controllers.user.uploadHeadPic);

//更新用户信息api
router.post('/api/user/updateInfo', checkIsLogin, controllers.user.updateInfo);

//退出登录
router.post('/api/user/userLoginOut', checkIsLogin, controllers.user.userLoginOut);

/*------------------------------ push 代码相关 -----------------------------------------*/
//push界面
router.get(['/push','/push.html'], async(ctx, next) => {

	let datas = {
		title:'push新增组件',
		gitList:[],
	}

	let gitList = await controllers.push.getGitList()

	if(gitList&&gitList.length){
		datas.gitList=JSON.parse(gitList[0].list)
	}

	await ctx.render('push',{
		datas:datas
	}); 
});

// 根据选择的组件获得其最新版本信息
router.post('/api/push/getComponentLastVerson', checkIsLogin, controllers.push.getComponentLastVerson);

//提交代码到npm仓库 
router.post('/api/push/pushComentToNpmServer', checkIsLogin, controllers.push.pushComentToNpmServer);


/*------------------------------- 编辑组件 -----------------------------------------------*/
router.get('/edit', async(ctx, next) => {

	let datas = {
		title:'组件编辑',
	}
	await ctx.render('edit',{
		datas:datas
	}); 
});

//获得组件编辑详细信息
router.post('/api/edit/detail', checkIsLogin, controllers.edit.getComentDetail);

// 编辑组件
router.post('/api/edit/submitEdit', checkIsLogin, controllers.edit.submitComentEdit);

// 编辑组件
router.post('/api/edit/uploadImg', checkIsLogin, controllers.edit.uploadImg);

/*------------------------------- 组件详情 -----------------------------------------------*/
/*详情页面*/
router.get(['/detail'], async(ctx, next) => {
	let datas = {
		title:'组件详情',
		datalist:[],
	}
	await ctx.render('detail',{
		datas:datas
	}); 
});
//获取详情
router.post('/api/detail/getdetail', checkIsLogin, controllers.detail.getdetail);

//获取组件版本历史
router.post('/api/detail/gethistory', checkIsLogin, controllers.detail.gethistory);

//修改浏览次数
router.post('/api/detail/setviewTime', checkIsLogin, controllers.detail.setviewTime);

//获得组件最新版本信息
router.post('/api/detail/getTheLastVersion', checkIsLogin, controllers.detail.getTheLastVersion);

/*------------------------------- 组件详情 -----------------------------------------------*/
// wiki
/*详情页面*/
router.get(['/wiki'], async(ctx, next) => {
	let datas = {
		title:'wiki文档',
	}
	await ctx.render('wiki',{
		datas:datas
	}); 
});

/*------------------------------ 同步github代码信息 --------------------------------------*/
const checkfngitmsg = controllers.common.checkGitHubInfo;
router.post('/api/npm/pushgithub',checkfngitmsg, controllers.npm.npmDoSomeThing)



module.exports = router






