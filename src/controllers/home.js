import moment from 'moment'
import {
    SYSTEM
} from '../config'
import {
    util,
    mysql,
    getsql,
} from '../tool'

class home {

    //初始化对象
    constructor() {

    };

    // 获取首页数据
    async getList(ctx) {
        try {
            let title = ctx.request.body.title
            let isUse = ctx.request.body.isUse
            let pageNo = ctx.request.body.pageNo || 1
            let pageSize = ctx.request.body.pageSize || SYSTEM.PAGESIZE
            let datas = {
                totalNum:0,
                datalist:[],
                pageNo:pageNo,
                pageSize:pageSize
            };

            let arr = []
            if (isUse) {
                arr.push({isUse})
            }
            if (title) {
                arr.push({title,'like':true})
            };
            
            // ----------------   查询总条数 sql   -------------------------
            let totalSql = getsql.SELECT({
                table: 'components_new',
                wheres: arr,
                iscount: true,
            })
            let totalNum = (await mysql(totalSql))[0]['COUNT(*)']

            // ---------------   查询列表数据 sql ---------------------------       
            let sql = getsql.SELECT({
                table: 'components_new',
                wheres: arr,
                fields:['id','title','isUse','describes','version','createTime','size'],
                limit: {
                    pageNo,
                    pageSize
                },
                sort: 'id',
                isdesc: true,
            });
            
            let result = await mysql(sql);

            if (result && result.length) {
                result.forEach((i,k) => {
                   i.createTime = moment(i.createTime).format('YYYY-MM-DD HH:mm:ss')
                })
            }
            
            datas.totalNum = totalNum;
            datas.datalist = result;
            ctx.body = util.result({
                data: datas
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
    
    //上下线
    async updataisUse(ctx){
        try {
            let isUse   =   ctx.request.body.isUse
            let id      =   ctx.request.body.id
            let type    =   ctx.request.body.type
            let tables  =   ''

            if (!id || !isUse) {
                ctx.body = util.result({
                    code: 1001,
                    desc: "参数错误"
                });
                return;
            }

            if(type==='old'){
                tables = 'components_old'
            }else{
                tables = 'components_new'
            }

            let sql = getsql.UPDATE({
                table:tables,
                wheres:[{id}],
                fields:[{isUse}]
            });
            let result = await mysql(sql);
            ctx.body = util.result({
                data: result
            });
        }catch (err) {
            console.log(err)
            ctx.body = util.result({
                code: 1001,
                desc: "参数错误"
            });
            return;
        }
    }

    //关键字搜索
    async searchKeyword(ctx){
        try {
            let title = ctx.request.body.title;
            let isUse = 1;
            let arr = [{isUse}]
            if (title) {
                arr.push({title,'like':true})
            };
            let datas = {
                keywordlist:[],
            };
            let sql = getsql.SELECT({
                table: 'components_new',
                wheres: arr,
                fields:['id','title','version','size','author'],
                sort: 'id',
                isdesc: true,
            });
            let result = await mysql(sql);
            ctx.body = util.result({
                data: result
            });
        }catch (err) {
            console.log(err)
            ctx.body = util.result({
                code: 1001,
                desc: "参数错误"
            });
            return;
        }
    }
}

module.exports = new home();