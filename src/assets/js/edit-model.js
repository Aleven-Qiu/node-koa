
// push-model.js
var app = new Vue({
    el: '#edit',
    data: {
        edit:{
            id:util.getQueryString('id'),
            title:'',
            author:'',
            describes:'',
            submitReason:'',
            text:'',
            testEditor:null,
            type:'',
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.edit.type = util.getQueryString('type');
            this.getComDetail();
        })
    },
    methods: {
        getComDetail(){
            util.ajax({
                url:config.baseApi+'api/edit/detail',
                data:{
                    id:this.edit.id,
                    type:this.edit.type,
                },
                success:data=>{
                    if(data.data&&data.data.length){
                        this.edit=data.data[0];
                        
                        this.testEditor = editormd("test-editormd", {
                            markdown:this.edit.text,
                            width   : "100%",
                            height  : 640,
                            imageUpload : true,
                            imageFormats : ["jpg", "jpeg", "gif", "png"],
                            imageUploadURL : "/api/edit/uploadImg",
                            syncScrolling : "single",
                            path    : "/markdown/js/",
                            watch:false,
                            uploadfn:(inputobj)=>{
                                util.cerateFileFormData({
                                    url:'/api/edit/uploadImg',
                                    success:data=>{
                                        inputobj.val(config.imgBaseUrl+data.data)
                                    }
                                })
                            }
                        });
                    }
                }
            })
        },
        submitEdit(){
            if(!util.regCombination('*').test(this.edit.title)){
                Layer.alert({type:'error',title:"组件名不能为空!"});
                return false;
            }
            if(!util.regCombination('*').test(this.edit.author)){
                Layer.alert({type:'error',title:"作者不能为空!"});
                return false;
            }
            if(!util.regCombination('*').test(this.edit.describes)){
                Layer.alert({type:'error',title:"组件描述不能为空!"});
                return false;
            }
            if(!util.regCombination('*').test(this.edit.text)){
                Layer.alert({type:'error',title:"组件详情不能为空!"});
                return false;
            }
            
            this.edit.text = this.testEditor.getMarkdown();
            this.edit.type = util.getQueryString('type');
            util.ajax({
                url:config.baseApi+'api/edit/submitEdit',
                data:this.edit,
                success:data=>{
                    Layer.miss({width:250,height:90,title:"操作成功",time:2000})
                    setTimeout(()=>{
                        window.history.back()
                    },1000)
                }
            })
        },
    }
});
