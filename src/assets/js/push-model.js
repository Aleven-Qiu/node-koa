

// push-model.js
var app = new Vue({
    el: '#push',
    data: {
        isHave:false,
        create:{
            title:'',
            describes:'',
            version:'',
            author:'',
            submitReason:'',
        },
    },
    watch:{
    	'create.title'(){
    		if(this.create.title){
    			this.getLastVerson()
    		}
    	},
    },
    mounted() {
        
    },
    methods: {
        // 根据选择的组件获得其最新版本信息
        getLastVerson(){
        	util.ajax({
        		url:config.baseApi+'api/push/getComponentLastVerson',
        		data:{
        			title:this.create.title
        		},
        		success:data=>{
        			this.create.version=data.data.version
                    this.isHave=data.data.isHave
        		}
        	})
        },
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
                    setTimeout(()=>{
                        location.href="/"
                    },1000)
                }
            })
        },
    }
});
