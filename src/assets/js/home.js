// push-model.js
var app = new Vue({
    el: '#home',
    data: {
       pageNo:1,
       pageSize:12,
       totalNum:0,
       datalists:[],
       isUse:1,
       keyword:'',
       times:null,
       keylist:[],
       ulshow:false,
    },
    mounted() {
        this.$nextTick(() => {
            this.getList(1);
        })
    },
    methods: {
        // 提交组件到npm 服务器
        submitPushComent() {
            util.ajax({
                url:config.baseApi+'api/push/pushComentToNpmServer',
                data:this.create,
                success:data=>{
                    Layer.alert({
                        type: 'msg',
                        title: '提交成功!'
                    });
                }
            })
        },
        getList(type) {
            this.ulshow = false;
            this.isUse = type;
            util.ajax({
                url:config.baseApi+'api/home/getList',
                data:{
                    isUse:this.isUse,
                    pageNo:this.pageNo,
                    pageSize:this.pageSize,
                    title:this.keyword
                },
                success:(data => {
                    this.datalists = data.data.datalist;
                    new Page({
                         parent: $("#copot-page"),
                         nowPage: this.pageNo,
                         pageSize: this.pageSize,
                         totalCount: data.data.totalNum,
                         callback:(nowPage, totalPage) =>{
                             this.pageNo = nowPage;
                             this.getList(this.isUse);
                         }
                     });
                }),
            })
        },
        searchkey(){
             let _this = this;
            $('body').on('click','.search-main',function(e){
                $(document).one("click", function(){
                    _this.ulshow = false;
                });
                e.stopPropagation();
            }); 
            clearTimeout(this.times);
            this.times = setTimeout(() => {
                this.searchkeylist();
            },500);
        },
        searchkeylist(){
            if (!this.keyword) return false;

            util.ajax({
                url:config.baseApi+'api/home/searchKeyword',
                data:{
                    title:this.keyword
                },
                success:data => {
                    this.keylist = data.data;
                    if (data.data && data.data.length) {
                        this.ulshow = true;
                    }
                }
            })
        },
        updataisUse(type,item){
            util.ajax({
                url:config.baseApi+'api/home/updataisUse',
                data:{
                    id:item.id,
                    isUse:type,
                },
                success:data => {
                    Layer.alert({
                        type:'msg',
                        title: '操作成功!'
                    });
                    this.getList(this.isUse);
                },
            })
        },
        seltitle(item){
            this.keyword = item.title;
            window.location.href = '/detail?id='+item.id;
        }
    }
});
