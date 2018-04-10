<template>
  <div>
    <LamboFrame
      :menuList = menuList
      :avatarPath = avatarPath
      :userId = username
      :userName = realname
      :dropItem = dropItem
      :logoImg = logoImg
      @dropAction = dropAction
    >
      <router-view></router-view>
    </LamboFrame>
  </div>
</template>

<script>
  import defaultImg from '../../../assets/avatar.jpg';
  import logoImg from '../../../assets/logo.png';
  import util from '@/libs/util.js';
  import config from '@/config/config';
  export default {
    data() {
      return {
        menuList:[],
        avatarPath:defaultImg,
        username:'',
        realname:'',
        logoImg:logoImg,
        minLogoPath:'',
        dropItem:[
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
        //菜单树
        util.ajax.get('/manage/menu/list').then(function(resp){
          var result = resp.data;
          if(result.code == 1){
            self.menuList = result.data[0].children;
          }
        })
        //用户
        util.ajax.get('/manage/user/get').then(function(resp){
          var result = resp.data;
          if(result.code == 1){
            self.username = result.data.username;
            self.realname = result.data.realname;
          }
        })
      },
      dropAction(id){
        if (id === 'logout') {
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
