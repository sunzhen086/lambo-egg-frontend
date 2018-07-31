<template>
  <Layout>
    <Header>
      <div class="logo">
        <Icon type="social-reddit-outline" size="40"></Icon>
        <span class="text">服务管理平台</span>
      </div>
      <Menu mode="horizontal" theme="dark" active-name="1" class="menu" @on-select="onSelect">
        <MenuItem name="服务定义">
          <Icon type="social-dribbble-outline"></Icon>
          服务管理
        </MenuItem>
      </Menu>
    </Header>
    <Content class="content">
      <router-view></router-view>
    </Content>
  </Layout>
</template>

<script>
    export default {
      name: "main-nav",
      methods:{
        onSelect:function(name){
          this.$router.push({name});
        }
      }
    }
</script>

<style lang="less" scoped>
  .logo{
    float:left;
    color:rgba(255,255,255,.7);
    font-size:18px;
    .ivu-icon{
      float:left;
      margin-top:10px;
    }
    .text{
      float:left;
      margin-left:5px;
    }
  }
  .menu{
    float:left;
    margin-left:20px;
  }
  .content{
    padding-bottom:20px;
  }
  .ivu-menu-horizontal{
    line-height:67px;
  }
</style>
