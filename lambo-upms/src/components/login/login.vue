<template>
	<LamboLogin :defaultUserName="defaultUserName" :defaultPassword="defaultPassword" @do-login="doLogin"></LamboLogin>
</template>
<script>
  import Router from 'vue-router'
	import Cookies from 'js-cookie';
  import util from '@/libs/util';

	export default {
		data() {
			return {
				defaultUserName:"610222100306",
				defaultPassword:"1",
				successForwardUrl: process.env.NODE_ENV == "production" ? "/upms/#/frame/manage/user/index" : "/#/frame/manage/user/index"
			}
		},
		methods:{
			doLogin:function(params){
				var self = this;
        util.ajax.post('/sso/local/login', {
          username:params.username,
          password:params.password
        }).then(function (resp) {
          var result = resp.data;
          if (result.code == 1) {
            //self.initRoutes();
            window.location.href = self.successForwardUrl;
          } else {
            self.$Message.error(result.data);
          }
        }).catch(function (err) {
          console.log(err);
          self.$Message.error("服务器内部异常,请稍候再试.");
        })
			},
      initRoutes:function() {
        var self = this;
        util.ajax.get('/manage/menu/list').then(function(resp){
          var result = resp.data;
          if(result.code == 1){
            console.log("result.data="+JSON.stringify(result.data));
            self.addRoutes(result.data[0].children);
          }
        }).catch(function(){
          self.$Message.error("获取菜单异常,请稍候再试.");
        })
      }
		},
		mounted() {

		}
	}
</script>
