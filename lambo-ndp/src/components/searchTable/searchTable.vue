<template>
  <Card class="card layout">
    <Layout>
      <Sider hide-trigger style="background: #fff;border-right: 1px solid #dddee1">
        <leftPart @changeSubject = "changeSubject"></leftPart>
      </Sider>
      <Layout>
        <Content :style="{minHeight: '280px', background: '#fff'}">
          <rightPart :subjectId="subjectId"></rightPart>
        </Content>
      </Layout>
    </Layout>
  </Card>
</template>

<script>
  import leftPart from './components/leftPart';
  import rightPart from './components/rightPart';
  export default {
    name: "searchTable",
    data(){
      return{
        subjectId:0
      }
    },
    components: {
      leftPart,
      rightPart
    },
    methods:{
      changeSubject:function (data) {
        this.subjectId = data;
      }
    }
  }
</script>

<style scoped lang="less">
  .layout{
    background: #fff;
    height: 100%;
    width: 1080px;
    margin: 20px auto;
    min-height: 500px;
  }
</style>
