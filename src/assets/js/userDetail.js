var app = new Vue({
    el: '#user-detail',
    components: {
        modal: window.Component.modal
    },
    filters:{
        imgBaseUrl:window.Filter.imgBaseUrl
    },
    data: {
        userInfo:{
            id:'',
            username:'',
            nickname:'',
            password:'',
            shrepassword:''
        },
        editPicObj:{
            show:false,
            userImg:'',
        },
        isEditShow:false,
        userMsg:{},
    },
    mounted() {
        this.$nextTick(()=>{
            this.userMsg=util.getStorage('local','userMsg')?JSON.parse(util.getStorage('local','userMsg')):{}
            this.getInfo();
        })
    },
    methods: {
        getInfo:function(){
            var This = this;
            util.ajax({
                url:config.baseApi + 'api/user/getUserInfo',
                data:{
                    id:util.getQueryString('id')
                },
                success:function(data){
                    This.userInfo = data.data;
                }
            })
        },
        //修改头像
        editPicShow:function(){
            let This = this;
            This.editPicObj.userImg = This.userInfo.userImg;
            This.editPicObj.show = true;
        },
        uploadPic:function(){
            var This = this;
            util.cerateFileFormData({
                url:config.baseApi + 'api/user/uploadHeadPic',
                onlyOne:true,
                success:function(data){
                    This.editPicObj.userImg = data.data;
                }
            })
        },
        editPic:function(){
            var This = this;
            util.ajax({
                url:config.baseApi + 'api/user/updateInfo',
                data:{
                    id:This.userInfo.id,
                    userImg:This.editPicObj.userImg
                },
                success:(data=>{
                    Layer.miss({title:'修改成功！'});
                    This.editPicObj.show = false;
                    This.getInfo();
                })
            })
        },
        editUserMsg(){
            if(this.userInfo.password !== this.userInfo.shrepassword){
                 Layer.alert({type:'msg',height:160,title:'两次输入密码不一致!'});
                 return false;
            }
            util.ajax({
                url:config.baseApi+'api/user/updateInfo',
                data:{
                    id:this.userInfo.id,
                    nickname:this.userInfo.nickname,
                    password:this.userInfo.password,
                },
                success:data=>{
                    Layer.miss({title:'修改成功！'});
                    this.getInfo();
                    this.isEditShow=false;
                }
            })
            
        },
    }
});
