<template>
  <LamboLogin :defaultUserName="defaultUserName" :defaultPassword="defaultPassword" @do-login="doLogin"></LamboLogin>
</template>
<script>
  import util from '@/libs/util';
  import config from '@/config/config';

  export default {
    data() {
      return {
        defaultUserName:"610222100306",
        defaultPassword:"1",
        successForwardUrl: config.homePage
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
            window.location.href = self.successForwardUrl;
          } else {
            self.$Message.error(result.data);
          }
        })
      }
    },
    mounted() {

    }
  }
</script>
