<template>
  <Layout>
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
        <MenuItem name="服务管理">
          <Icon type="ios-paper"></Icon>
          服务管理
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-people"></Icon>
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
  .content{
    padding-bottom:20px;
  }
</style>
