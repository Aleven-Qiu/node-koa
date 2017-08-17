import {
    SYSTEM
} from '../config'
import {
    util,
    mysql,
    getsql,
} from '../tool'
const exec  = require('child_process').exec;
import fs from 'fs'
import moment from 'moment'

class push {

    //初始化对象
    constructor() {

    };

    // 获得gutHub组件列表
    async getGitList(ctx, next) {
        try {
            let sql= getsql.SELECT({
                table:'components_github_list'
            })
            let result = await mysql(sql)

            return result

        } catch (err) {
            console.log(err)
            return;
        }
    }

    // 根据选择的组件获得其最新版本信息
    async getComponentLastVerson(ctx, next) {
        try {
            let data={
                isHave:false,
                version:'1.0.0'
            }
            let title = ctx.request.body.title

            // 查看组件是否存在
            let comsql=getsql.SELECT({
                table:'components_new',
                wheres:[{
                    title
                }]
            })
            let comresult = await mysql(comsql)

            if(comresult&&comresult.length){
                data.isHave=true;
                if(comresult[0].version){
                    let num=parseInt(comresult[0].version.trim().replace(/\./g,''))+1
                    let arr=num.toString().split('')
                    data.version=arr.join('.')
                }
            }

            ctx.body = util.result({
                data: data
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

    async pushComentToNpmServer(ctx){
        try {
            let title = ctx.request.body.title
            let describes = ctx.request.body.describes
            let version = ctx.request.body.version
            let author = ctx.request.body.author
            let submitReason = ctx.request.body.submitReason
            let shellsrc=SYSTEM.SHELLSRC+'npm-publish.sh'
            let comentjsonSrc=`${SYSTEM.COMPONENTSRC}/${title}/`
            let createTime=moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
  
            // 检查参数
            if(!title || !version || !describes){
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全"
                });   
                return false;
            }

            // 检查组件 readme.md 是否存在
            let readmeIsHave = fs.existsSync(comentjsonSrc+'README.md')
            if(!readmeIsHave){
                ctx.body = util.result({
                    code: 1001,
                    desc: "组件的README.md必须存在!"
                });
                return false
            }

            // 检查组件package.json是否存在
            let packageIsHave = fs.existsSync(comentjsonSrc+'package.json')
            if(!packageIsHave){
                ctx.body = util.result({
                    code: 1001,
                    desc: "组件的package.json必须存在!"
                });
                return false
            }

            // 检查组件是否存在并查看版本号是否正确
            let ishavesql = getsql.SELECT({
                table:'components_new',
                wheres:[{
                    title
                }] 
            })
            let isComponentHave = await mysql(ishavesql)
            if(isComponentHave&&isComponentHave.length){
                let versionhave     =   isComponentHave[0].version
                    versionhave     =   versionhave.replace(/\./g,'')
                    versionhave     =   parseInt(versionhave)
                let versionsubmit   =   version.replace(/\./g,'')
                    versionsubmit   =   parseInt(versionsubmit)  

                if(versionhave >= versionsubmit){
                    ctx.body = util.result({
                        code: 1001,
                        desc: "组件的版本号不正确!"
                    });
                    return false   
                }    
            }

            // 替换 组件 package.json 版本号
            let selectPackageJson=SYSTEM.COMPONENTSRC+title+'/package.json'
            let packages = fs.readFileSync(selectPackageJson).toString()
                packages = packages.replace(/"version.*,?/,`"version":"${version}",`)
            fs.writeFileSync(selectPackageJson, packages) 

            // 执行npm pushlish
            let npmPublish=function(){
                return new Promise(function(resolve, reject) {
                    // 执行npm publish 并得到回调信息里查询package.json信息记录到mysql中
                    exec(`bash -x ${shellsrc} ${title}`,async (err,out) => {
                        if(err){
                            console.log(err)
                            resolve(0)
                        }
                        console.log('-------------------ok--------------------')
                        resolve(1)
                        
                    }) 
                })
            }
            
            let npmresult = await npmPublish()

            if(npmresult!=1){
                ctx.body = util.result({
                    code: 1001,
                    desc: "提交npm仓库失败"
                });
                return false;
            }

            // 读取 npm 服务器的 package.json信息
            let npmpackages = JSON.parse(fs.readFileSync(`${SYSTEM.FILESRC}/${title}/package.json`));
            let text = npmpackages.readme
            let npmVersion=npmpackages.versions[version]._npmVersion
            let nodeVersion=npmpackages.versions[version]._nodeVersion

            // 读取文件包的大小
            let src     =   `${SYSTEM.FILESRC}${title}/${title}-${version}.tgz`
            let results =   fs.statSync(src)
            let size    =   results.size
                size    =   util.returnFileSize(size)


            // 存在时 先复制到old 表  之后删除当前存在的数据   --- 存在 更新迭代
            if(isComponentHave&&isComponentHave.length){
                let addOldsql = `INSERT INTO npm_components_old 
                    (title,describes,version,author,collaborators,viewTimes,submitReason,text,createTime,size,npmVersion,nodeVersion,isUse)
                    SELECT 
                    title,describes,version,author,collaborators,viewTimes,submitReason,text,createTime,size,npmVersion,nodeVersion,isUse 
                    FROM npm_components_new WHERE title='${title}'`
                await mysql(addOldsql)
                // 删除
                let deletesql = getsql.DELETE({table:'components_new',wheres:[{title}]})
                await mysql(deletesql)
            }

            // 新建组件
            let sql = getsql.INSERT({
                table: 'components_new',
                fields: [{title},{describes},{version},{author},{text},{createTime},{npmVersion},{nodeVersion},{size}]
            })
            let result = await mysql(sql)
            ctx.body = util.result({
                data: result
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

    

}

module.exports = new push();

