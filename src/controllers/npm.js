import {
    SYSTEM
} from '../config'
let exec  = require('child_process').exec;
import {
    util,
    mysql,
    getsql,
} from '../tool'

class common {
    
    constructor(){

    }

    async npmDoSomeThing(ctx){

        let gitpull=function(){
            return new Promise(function(resolve, reject) {

                exec(`bash -x /data/qmx-npm-ssr-node/git-pull.sh`,async (err,out) => {
                    if(err){
                        console.log(err)
                        resolve(0)
                    }
                    console.log('git pull ok')

                    let comentjsonSrc=`${SYSTEM.COMPONENTSRC}/`
                    let dirList = util.getSomeFileChildDirList(comentjsonSrc)
                    let id = 1
                    let list = JSON.stringify(dirList)

                    let sql = getsql.UPDATE({
                        table:'components_github_list',
                        fields:[{list}],
                        wheres:[{id}]
                    })
                    let result = await mysql(sql)

                    resolve(1)
                }) 
            })
        } 

        let resq = await gitpull()
        if(resq == 1){
            ctx.body = util.result({
                data: 'git pull and update sql ok'
            });
        }else{
            ctx.body = util.result({
                code: 1001,
                desc: "git pull and update sql error"
            });
        }

    };

}

module.exports = new common();


