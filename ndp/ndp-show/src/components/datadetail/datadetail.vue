<template>
  <div>
    <div class="title">
      <div class="content">
        <Icon type="pricetags" size="30" color="#fff" class="icon"></Icon>
        <h2 class="text">商品月度销售</h2>
      </div>
    </div>
    <div class="page">
      <rightPart :subjectId="subjectId"></rightPart>
    </div>
    </div>
</template>

<script>
  import leftPart from './components/leftPart';
  import rightPart from './components/rightPart';
  export default {
    name: "searchTable",
    data(){
      return{
        subjectId:1
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
</script>+

<style lang="less" scoped>
  .page{
    width:1080px;
    margin:20px auto;
  }
  .title{
    height:50px;
    background:#25A9E5;
    .content{
      width:1080px;
      margin:0 auto;
      line-height:50px;
      .icon{
        float:left;
        margin-top:10px;
      }
      .text{
        float:left;
        color:#fff;
        margin-left:10px;
      }
    }
  }
</style>
