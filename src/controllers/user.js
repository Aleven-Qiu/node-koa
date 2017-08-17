import fs from 'fs'
import captcha from 'trek-captcha'
import path from 'path'
import moment from 'moment'
import {
    SYSTEM
} from '../config'
import {
    util,
    mysql,
    getsql,
    qiniu
} from '../tool'

let IMG_TOKEN = ''

class msg {

    //初始化对象
    constructor() {

    };

    // 验证图片接口
    async checkimg(ctx, next) {
        try {
            const {
                token,
                buffer
            } = await captcha()

            let img = path.resolve(__dirname, '../../assets/images/common/check.gif')
            fs.createWriteStream(img).on('finish', () => {
                IMG_TOKEN = token
            }).end(buffer)

            ctx.body = util.result({
                data: 'ok'
            });
        } catch (err) {
            console.log(err)
            ctx.body = util.result({
                code: 1001,
                desc: "参数错误"
            });
            return;
        }
    }


    //用户注册
    /*
    @param int username 用户名 
    @param int password 密码 
    */
    async userRegister(ctx, next){
        try{
            const USERNAME = ctx.request.body.username?ctx.request.body.username.trim():'';
            const PASSWORD = ctx.request.body.password?ctx.request.body.password.trim():'';
            //先判断传进来的值非空，再去查数据表里面是否已存在该用户
            if(!USERNAME){
                ctx.body = util.result({
                    code: 1001,
                    desc: '请输入用户名!'
                });
                return
            }
            if(!PASSWORD){
                ctx.body = util.result({
                    code: 1001,
                    desc: '请输入密码!'
                });
                return
            }
            let userList = await mysql(`SELECT * FROM npm_user WHERE username = '${USERNAME}'`);
            if(userList.length > 0){
                ctx.body = util.result({
                    code: 1002,
                    desc: '用户已存在!'
                });
                return
            }else{
                let timestamp = new Date().getTime();
                let createTime = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
                let secretKey = util.signwx({
                    username:USERNAME,
                    password:PASSWORD,
                    timestamp:timestamp,
                    random:util.randomString()
                }).paySign;
                await mysql(`INSERT INTO 
                    npm_user(username,password,secretKey,isUser,createTime,level) 
                    VALUES('${USERNAME}','${PASSWORD}','${secretKey}',1,'${createTime}','user')
                `);
                ctx.body = util.result({
                    desc: '注册成功!'
                });
                return
            }
        }catch(err){
            util.errResult(ctx, err, 1002);
        }
    }

    //用户登录
    /*
    @param int username 用户名 
    @param int password 密码 
    */
    async userLogin(ctx, next){
        try{
            const USERNAME = ctx.request.body.username?ctx.request.body.username.trim():'';
            const PASSWORD = ctx.request.body.password?ctx.request.body.password.trim():'';
            //先判断传进来的值非空，再去查数据表里面是否已存在该用户
            if(!USERNAME){
                ctx.body = util.result({
                    code: 1001,
                    desc: '请输入用户名!'
                });
                return
            }
            if(!PASSWORD){
                ctx.body = util.result({
                    code: 1001,
                    desc: '请输入密码!'
                });
                return
            }
            let userList = await mysql(`SELECT createTime,id,isUser,level,nickname,userImg,username,password,secretKey FROM npm_user WHERE username = '${USERNAME}'`);
            if(userList.length == 0){
                ctx.body = util.result({
                    code: 1001,
                    desc: '请输入该用户不存在!'
                });
                return
            }
            if(userList[0].password != PASSWORD){
                ctx.body = util.result({
                    code: 1001,
                    desc: '密码有误，请重新输入!'
                });
                return
            }
            if(userList[0].isUser==0){
                ctx.body = util.result({
                    code: 1001,
                    desc: "用户已冻结！"
                });
                return;
            }
            //登录成功打cookie
            ctx.cookies.set('npm-username',userList[0].username)
            ctx.cookies.set('npm-secretKey',userList[0].secretKey)
            ctx.body = util.result({
                data:userList[0]
            });
        }catch(err){
            util.errResult(ctx, err, 1002);
        }
    }

    //获取用户列表
    /*
    @param int keyWord 关键字（用户名/昵称）
    @param int pageNo  当前页
    @param int pageSize 页数
    */
    async getUserList(ctx, next){
        try{
            const KEY_WORD = ctx.request.body.keyWord;
            const PAGE_NO = ctx.request.body.pageNo;
            const PAGE_SIZE = ctx.request.body.pageSize;
            let sql = `SELECT createTime,id,isUser,level,nickname,userImg,username FROM npm_user WHERE 1=1 AND level NOT IN ('admin')`;
            if(KEY_WORD){
                sql += ` AND (username LIKE '%${KEY_WORD}%' OR nickname LIKE '%${KEY_WORD}%')`
            }
            let userList = await mysql(sql);
            ctx.body = util.result({
                data: util.Pager({
                    data:userList,
                    pageNo:parseInt(PAGE_NO),
                    pageSize:parseInt(PAGE_SIZE)
                }),
            });
        }catch(err){
            util.errResult(ctx, err, 1002);
        }
    }

    //获取用户信息
    /*
    @param int id 用户ID
    */
    async getUserInfo(ctx, next){
        try{
            const ID = ctx.request.body.id;
            if(!ID){
                util.errResult(ctx, 'err', 1003)
                return
            }
            let userList = await mysql(`SELECT createTime,id,isUser,level,nickname,userImg,username FROM npm_user WHERE id = '${ID}'`);
            if(userList.length==0){
                ctx.body = util.result({
                    code: 1004,
                    desc: 'id不存在!'
                });
                return
            }
            let userInfo = userList[0];
            userInfo.createTime = moment(userInfo.createTime).format('YYYY-MM-DD HH:mm:ss')
            ctx.body = util.result({
                data: userInfo
            });
        }catch(err){
            util.errResult(ctx, err, 1002);
        }
    }

    //上传用户头像
    /*
    @param int myfiles 接收文件key
    */
    async uploadHeadPic(ctx, next){
        let myfiles = ctx.request.body.files.myfiles;
        let result = await qiniu.upload(myfiles.path);
        util.cleanFiles(path.resolve(__dirname,'../upload'))
        ctx.body = util.result({
            data: result
        });
    }

    //更新用户信息
    /*
    @param int id 用户ID
    @param int username 用户名
    @param int nickname 昵称
    @param int userImg 用户头图
    @param int isUser 是否启用（0：禁用，1：启用）
    */
    async updateInfo(ctx, next){
        try{
            const ID = ctx.request.body.id;
            const USERNAME = ctx.request.body.username?ctx.request.body.username.trim():'';
            const NICKNAME = ctx.request.body.nickname?ctx.request.body.nickname.trim():'';
            const USER_IMG = ctx.request.body.userImg?ctx.request.body.userImg.trim():'';
            const PASSWORD = ctx.request.body.password?ctx.request.body.password.trim():'';
            const IS_USER = ctx.request.body.isUser?ctx.request.body.isUser.trim():'';
            if(!ID){
                util.errResult(ctx, 'err', 1003)
                return
            }

            let timestamp = new Date().getTime();
            let secretKey = util.signwx({
                    username:USERNAME,
                    password:PASSWORD,
                    timestamp:timestamp,
                    random:util.randomString()
                }).paySign;

            let sql = `UPDATE npm_user SET id='${ID}'`;
            if(USERNAME)sql+=`,username='${USERNAME}'`;
            if(NICKNAME)sql+=`,nickname='${NICKNAME}'`;
            if(USER_IMG)sql+=`,userImg='${USER_IMG}'`;
            if(PASSWORD)sql+=`,password='${PASSWORD}'`;
            if(IS_USER) sql+=`,isUser='${IS_USER}'`;
                        sql+=`,secretKey='${secretKey}'`
                        sql+=` WHERE id='${ID}'`;
            await mysql(sql);
            ctx.body = util.result();
        }catch(err){
            util.errResult(ctx, err, 1002);
        }
    }

    // 退出登录
    async userLoginOut(ctx){
        ctx.cookies.set('npm-username','')
        ctx.cookies.set('npm-secretKey','')
        ctx.body = util.result({
            data: 'OK'
        });
    }

}

module.exports = new msg();



