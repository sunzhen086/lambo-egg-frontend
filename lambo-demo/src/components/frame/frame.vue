<template>
  <div>
    <LamboFrame
      :menuList = menuList
      :avatarPath = avatarPath
      :userId = userId
      :userName = userName
      :dropItem = dropItem
      :logoImg = logoImg
      @dropAction = dropAction
    >
      <router-view></router-view>
    </LamboFrame>
  </div>
</template>

<script>
  import defaultImg from '../../assets/avatar.jpg';
  import logoImg from '../../assets/logo.png';
  import util from '@/libs/util.js';
  import config from '@/config/config';
  export default {
    data() {
      return {
        menuList:[],
        avatarPath:defaultImg,
        userId:'admin',
        userName:'管理员',
        logoImg:logoImg,
        minLogoPath:'',
        dropItem:[
          {
            id:'userCenter',
            name:'个人中心'
          },
          {
            id:'logout',
            name:'退出登录'
          }
        ]
      };
    },
    methods: {
      init() {
        var self = this;
        util.ajax.get('/manage/menu/list').then(function(resp){
          var result = resp.data;
          if(result.code == 1){
            self.menuList = result.data[0].children;
          }
        }).catch(function(){
          self.$Message.error("获取菜单异常,请稍候再试.");
        })
      },
      dropAction(id){
        if (id === 'userCenter') {
          console.log("userCenter");
        } else if (id === 'logout') {
          this.$router.push({
            name:'登录页'
          })
        }
      }
    },
    mounted () {
      this.init();
    }
  }

</script>
