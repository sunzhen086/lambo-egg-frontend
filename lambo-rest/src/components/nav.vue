<template>
  <Layout>
    <Header>
      <div class="logo">
        <Icon type="social-reddit-outline" size="40"></Icon>
        <span class="text">服务管理平台</span>
      </div>
      <Menu mode="horizontal" theme="dark" active-name="1" class="menu">
        <MenuItem name="服务管理">
          <Icon type="social-dribbble-outline"></Icon>
          服务管理
        </MenuItem>
        <MenuItem name="2">
          <Icon type="search"></Icon>
          服务搜索
        </MenuItem>
        <Submenu name="3">
          <template slot="title">
            <Icon type="stats-bars"></Icon>
            统计分析
          </template>
          <MenuItem name="3-1">调用次数</MenuItem>
          <MenuItem name="3-2">执行耗时</MenuItem>
          <MenuItem name="3-3">错误日志</MenuItem>
        </Submenu>
        <MenuItem name="4">
          <Icon type="settings"></Icon>
          综合设置
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
        name: "nav"
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
