<template>
	<LamboLogin :defaultUserName="defaultUserName" :defaultPassword="defaultPassword" @do-login="doLogin"></LamboLogin>
</template>
<script>
	import Cookies from 'js-cookie';
    import util from '@/libs/util';

	export default {
		data() {
			return {
				defaultUserName:"admin",
				defaultPassword:"123456",
				successForwardUrl: process.env.NODE_ENV == "production" ? "/upms/#/frame/manage/user/index" : "/#/frame/manage/user/index"
			}
		},
		methods:{
			doLogin:function(params){
				var self = this;
                util.ajax.post('/login', {
                  username:params.username,
                  password:params.password
                }).then(function (resp) {
                    var result = resp.data;
                    if (result.code == 1) {
                        window.location.href = self.successForwardUrl;
                    } else {
                        self.$Message.error(result.data);
                    }
                }).catch(function (err) {
                	console.log(err);
                    self.$Message.error("服务器内部异常,请稍候再试.");
                })
			}
		},
		mounted() {

		}
	}
</script>
