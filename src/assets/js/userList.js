var app = new Vue({
    el: '#user-list',
    filters:{
        imgBaseUrl:window.Filter.imgBaseUrl
    },
    data: {
        search:{
            keyWord:'',
            pageNo:1,
            pageSize:12,
            totalNum:0,
        },
        dataList:[],
        userMsg:{},
    },
    mounted() {
        this.$nextTick(()=>{
            this.userMsg=util.getStorage('local','userMsg')?JSON.parse(util.getStorage('local','userMsg')):{}
            this.getList();
        })
    },
    methods: {
        searchBtn:function(){
            var This = this;
            This.search.pageNo = 1;
            this.getList();
        },
        getList:function(){
            var This = this;
            util.ajax({
                url:config.baseApi + 'api/user/getUserList',
                data:JSON.parse(JSON.stringify(This.search)),
                success:function(data){
                    This.dataList = data.data.list;
                    This.search.totalNum = data.data.totalNum;
                    new Page({
                        parent: $("#copot-page"),
                        nowPage: This.search.pageNo,
                        pageSize: This.search.pageSize,
                        totalCount: This.search.totalNum,
                        callback:(nowPage, totalPage) =>{
                            This.search.pageNo = nowPage;
                            This.getList();
                        }
                     });
                }
            })
        },
        //更新用户状态
        updateStatus:function(id,isUser){
            var This = this;
            util.ajax({
                url:config.baseApi + 'api/user/updateInfo',
                data:{
                    id:id,
                    isUser:isUser
                },
                success:function(){
                    Layer.miss({title:'更新成功！'});
                    This.getList();
                }
            })
        }
    }
});
