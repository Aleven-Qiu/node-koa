// push-model.js
var app = new Vue({
    el: '#detail',
    data: {
        datas:{},
        id:'',
        historylist:[],
        viewTime:0,
        datashow:false,
        type:'',
        lastVersionData:{},
    },
    mounted() {
        this.$nextTick(() => {
            this.id = util.getQueryString('id');
            this.type = util.getQueryString('type');
            this.getdetaildata()
        })
    },
    methods: {
        getdetaildata(){
            util.ajax({
                url:config.baseApi+'api/detail/getdetail',
                data:{
                    id:this.id,
                    type:this.type,
                },
                success:data => {
                    if (data.data.length) {
                        this.datas = data.data[0];
                        this.viewTime = data.data[0].viewTimes;
                        this.gethistorylist();
                        this.getviewTime();
                        this.datashow = true;

                        if(this.type=='old'){
                            this.getTheLastVersion();
                        }

                        // 编译markdown语法
                        var testEditormdView2;
                        testEditormdView2 = editormd.markdownToHTML("test-editormd-view2", {
                            markdown: this.datas.text,
                            htmlDecode      : "style,script,iframe",  // you can filter tags decode
                            emoji           : true,
                            taskList        : true,
                            tex             : true,  // 默认不解析
                            flowChart       : true,  // 默认不解析
                            sequenceDiagram : true,  // 默认不解析
                        });



                    }else {
                        this.datashow = false;
                    }
                    
                }
            });
        },
        gethistorylist(){
            util.ajax({
                url:config.baseApi+'api/detail/gethistory',
                data:{title:this.datas.title},
                success:data => {
                    this.historylist = data.data;
                }
            });
        },
        getviewTime(){
            util.ajax({
                url:config.baseApi+'api/detail/setviewTime',
                data:{
                    id:this.id,
                    viewTimes:this.viewTime,
                    type:this.type
                },
                success:data => {
                    console.log(data)
                }
            })
        },
        updataisUse(type,item) {
            util.ajax({
                url:config.baseApi+'api/home/updataisUse',
                data:{
                    id:item.id,
                    isUse:type,
                    type:this.type,
                },
                success:data => {
                    Layer.alert({
                        type:'msg',
                        title: '操作成功!'
                    });
                    this.getdetaildata();
                },
            })
        },
        getTheLastVersion(){
            util.ajax({
                url:config.baseApi+'api/detail/getTheLastVersion',
                data:{
                    title:this.datas.title
                },
                success:data => {
                    if(data.data&&data.data.length){
                        this.lastVersionData=data.data[0]
                    }
                },
            })
        },
    }
});
