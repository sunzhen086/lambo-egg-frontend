<template>
    <div>
      <Layout :style="{padding: '20px 50px'}">
        <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}" :width="300">
              <Menu active-name="服务配置帮助" theme="light" width="auto" :open-names="['1']" @on-select="onSelect">
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="ios-keypad"></Icon>
                    帮助
                  </template>
                  <MenuItem name="服务配置帮助">服务配置</MenuItem>
                  <MenuItem name="SQL模板帮助">SQL模板</MenuItem>
                </Submenu>
                <Submenu name="2">
                  <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    设置
                  </template>
                  <MenuItem name="1-1">数据源设置</MenuItem>
                  <MenuItem name="1-2">缓存设置</MenuItem>
                  <MenuItem name="1-3">日志设置</MenuItem>
                  <MenuItem name="1-4">预警设置</MenuItem>
                </Submenu>
              </Menu>
            </Sider>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
              <router-view></router-view>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
</template>

<script>
    export default {
      name: "help",
      methods:{
        onSelect:function(name){
          this.$router.push({name});
        }
      }
    }
</script>

<style scoped>

</style>
