import moment from 'moment'
import {
    SYSTEM
} from '../config'
import {
    util,
    mysql,
    getsql,
} from '../tool'

class detail {

    //初始化对象
    constructor() {

    };

    // 获取组件详情
    async getdetail(ctx) {
        try {
            let id = ctx.request.body.id  
            let type = ctx.request.body.type
            let tables = ''

            let arr = []
            if (id) {
                arr.push({id})
            }  

            if(type=='old'){
                tables = 'components_old'
            }else{
                tables = 'components_new'
            }

            // ---------------   查询列表数据 sql ---------------------------       
            let sql = getsql.SELECT({
                table: tables,
                wheres: arr,
                fields:['id','title','isUse','describes','version','createTime','size','author','text','viewTimes'],
                sort: 'id',
                isdesc: true,
            });
            let result = await mysql(sql);

            if (result && result.length) {
                result.forEach((i,k) => {
                   i.createTime = moment(i.createTime).format('YYYY-MM-DD HH:mm:ss')
                })
            }
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

    //查询历史记录
    async gethistory(ctx) {
        try {
            let title = ctx.request.body.title   
            let arr = []
            if (title) {
                arr.push({title})
            }  
            // ---------------   查询列表数据 sql ---------------------------       
            let sql = getsql.SELECT({
                table: 'components_old',
                wheres: arr,
                fields:['id','title','isUse','describes','version','createTime','size','author'],
                sort: 'id',
                isdesc: true,
            });
            let result = await mysql(sql);
            ctx.body = util.result({
                data: result
            });
        }catch (err) {
            ctx.body = util.result({
                code: 1001,
                desc: "参数错误"
            });
            return;
        }
    }

    //每次打开组件，浏览次数+1
    async setviewTime(ctx) {
        try {
            let id = ctx.request.body.id 
            let viewTimes = ctx.request.body.viewTimes?ctx.request.body.viewTimes:0
            let type = ctx.request.body.type
            let tables = ''
            let arr = []
            if (!id || !(viewTimes+'')) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数不全"
                });
                return;
            }
            if (id) {
                arr.push({id})
            }
            viewTimes = parseInt(viewTimes)+1
            if (type==='old') {
                tables = 'components_old'
            }else {
                tables = 'components_new'
            }
            // ---------------   查询列表数据 sql ---------------------------       
            let sql = getsql.UPDATE({
                table: tables,
                wheres: arr,
                fields:[{viewTimes}],
            });

            let result = await mysql(sql);
            
            ctx.body = util.result({
                data: result
            });
        }catch (err) {
            ctx.body = util.result({
                code: 1001,
                desc: "参数错误"
            });
            return;
        }
    }

    //获得最新组件版本信息
    async getTheLastVersion(ctx){
        try {
            let title   =   ctx.request.body.title
            if(!title){
                ctx.body = util.result({
                    code: 1001,
                    desc: "组件名称不能为空"
                });
                return;
            }

            let sql = getsql.SELECT({
                table: 'components_new',
                wheres: [{title}],
                fields:['id','title','version','author'],
            });

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

}

module.exports = new detail();