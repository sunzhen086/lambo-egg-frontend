<template>
  <div>
    <div class="page-header">
        <div class="container">
          <div class="logo">
            <div class="logo-img"></div>
            <div class="logo-text">数据开放平台</div>
          </div>
          <div class="search">
            <Input v-model="searchValue">
                <Button slot="append" type="primary" icon="ios-search">搜索</Button>
            </Input>
          </div>
        </div>
    </div>
    <div class="page-nav">
        <div class="container">
          <Menu mode="horizontal" theme="primary" active-name="1">
            <MenuItem name="1">
              <Icon type="ios-paper"></Icon>
              内容管理
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-people"></Icon>
              用户管理
            </MenuItem>
            <MenuItem name="4">
              <Icon type="settings"></Icon>
              综合设置
            </MenuItem>
          </Menu>
        </div>
    </div>
    <div class="page-body">
      <router-view></router-view>
    </div>
  </div>


</template>
<script>

  export default {
    name: "main",
    data() {
      return {
        searchValue:""
      }
    },
    methods:{
    },
    mounted(){
    }
  }
</script>

<style scoped lang="less">
  .page-header{
    height:100px;
    .container{
      width:950px;
      margin:0 auto;
      overflow:hidden;
      .logo{
        width:530px;
        float:left;
        display:flex;
        .logo-img{
          width:219px;
          height:67px;
          background:url("../../assets/tobaccologo.png") no-repeat;
          flex:1;
          margin-top:15px;
        }
        .logo-text{
          font-weight: bolder;
          font-size: 28px;
          flex:1;
          margin-top:15px;
          line-height:67px;
        }
      }
      .search{
        width:400px;
        float:right;
        margin-top:33px;
      }
    }
  }
  .page-nav{
    height:60px;
    background:#2d8cf0;
    .container{
      width:950px;
      margin:0 auto;
    }
  }
</style>
