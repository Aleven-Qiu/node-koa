import {
    SYSTEM
} from '../config'
import {
    util,
    mysql,
    getsql,
    qiniu
} from '../tool'
import path from 'path'

class edit {

    //初始化对象
    constructor() {

    };

    // 获得组件编辑详细信息
    async getComentDetail(ctx, next) {
        try {
            let id=ctx.request.body.id
            let type = ctx.request.body.type
            let tables = ''

            if(!id){
                ctx.body = util.result({
                    code: 1001,
                    desc: "id值为空"
                });   
                return false;
            }

            if(type=='old'){
                tables = 'components_old'
            }else{
                tables = 'components_new'
            }

            let sql=getsql.SELECT({ 
                table:tables,
                wheres:[{id}],
                fields:['id','title','describes','author','submitReason','text']
            })
            
            let result = await mysql(sql);

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

    // 修改组件
    async submitComentEdit(ctx, next) {
        try {
            let id          =  ctx.request.body.id
            let title       =  ctx.request.body.title
            let author      =  ctx.request.body.author
            let describes   =  ctx.request.body.describes
            let submitReason=  ctx.request.body.submitReason
            let text        =  ctx.request.body.text
            let type        =  ctx.request.body.type
            let tables = ''

            if(!id || !title || !author || !describes || !text){
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全!"
                });   
                return false;
            }

            if(type=='old'){
                tables = 'components_old'
            }else{
                tables = 'components_new'
            }

            let sql=getsql.UPDATE({
                table:tables,
                wheres:[{id}],
                fields:[{title},{author},{describes},{submitReason},{text}]
            })

            let result = await mysql(sql);
           
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

    //上传图片
    /*
    @param int myfiles 接收文件key
    */
    async uploadImg(ctx, next){
        let myfiles = ctx.request.body.files.myfiles;
        let result = await qiniu.upload(myfiles.path);
        util.cleanFiles(path.resolve(__dirname,'../upload/'))
        ctx.body = util.result({
            data: result
        });
    }
   

}

module.exports = new edit();


