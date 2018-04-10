<template>
  <div>
    <div class="title">
      <div class="content">
        <Icon type="pricetags" size="30" color="#fff" class="icon"></Icon>
        <h2 class="text">品牌</h2>
      </div>
    </div>
    <div class="nav">
      <div class="content sz">
        <Tabs value="分类总览" @on-click="tabOnClick">
          <TabPane label="概览" name="分类总览"></TabPane>
          <TabPane label="数据" name="分类数据"></TabPane>
          <TabPane label="反馈" name="分类反馈"></TabPane>
        </Tabs>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "category-nav",
        methods:{
          tabOnClick:function(name){
            this.$router.push({name: name})
          }
        }
    }
</script>

<style lang="less" scoped>
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
  .nav{
    background:#EEF7FF;
    .content{
      width:1080px;
      height:37px;
      margin:0 auto;
    }
  }
</style>
<style lang="less">
  .sz{
    .ivu-tabs-bar{
      border-bottom:none;
    }
  }

</style>
