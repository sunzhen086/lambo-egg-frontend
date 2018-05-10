<template>
  <Layout>
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
        <MenuItem name="服务定义">
          <Icon type="ios-paper"></Icon>
          服务定义
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-people"></Icon>
          用户管理
        </MenuItem>
        <Submenu name="3">
          <template slot="title">
            <Icon type="stats-bars"></Icon>
            统计分析
          </template>
          <MenuGroup title="使用">
            <MenuItem name="3-1">新增和启动</MenuItem>
            <MenuItem name="3-2">活跃分析</MenuItem>
            <MenuItem name="3-3">时段分析</MenuItem>
          </MenuGroup>
          <MenuGroup title="留存">
            <MenuItem name="3-4">用户留存</MenuItem>
            <MenuItem name="3-5">流失用户</MenuItem>
          </MenuGroup>
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
