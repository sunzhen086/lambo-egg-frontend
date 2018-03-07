<template>
  <div class="layout">
    <Layout>
      <Sider hide-trigger :style="{background: '#fff'}">
        <leftPart @changeCategory = "changeCategory"></leftPart>
      </Sider>
      <Layout :style="{padding: '0px 15px'}">
        <Content :style="{minHeight: '280px', background: '#fff'}">
          <rightPart :category_id="category_id"></rightPart>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
    import leftPart from './components/leftPart';
    import rightPart from './components/rightPart';
    export default {
        name: "dataSubject",
        data(){
          return{
            category_id:0
          }
        },
        components: {
          leftPart,
          rightPart
        },
        methods:{
          changeCategory:function (category_id) {
            this.category_id = category_id;
          }
        }
    }
</script>

<style scoped lang="less">
  .layout{
    margin: 10px;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
  }
</style>
