<template>
  <div>
    <div class="title-back">
      <div class="title">
        <h2 class="cat-head">{{categoryName}}</h2>
        <div class="nav">
          <Tabs value="分类总览" @on-click="tabOnClick">
            <TabPane label="概览" name="分类总览"></TabPane>
            <TabPane label="数据" name="分类数据"></TabPane>
            <TabPane label="反馈" name="分类反馈"></TabPane>
          </Tabs>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "category-nav",
    data () {
      return {
        categoryId: this.$route.query.categoryId,
        categoryName: this.$route.query.categoryName
      }
    },
    methods:{
      tabOnClick:function(name){
        var self = this;
        this.$router.push({
          name: name,
          params:{
            categoryId:self.categoryId
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .title-back{
    margin-top: 5px;
    height:34px;
    background:#f5f5f5;
    .title{
      width: 1080px;
      margin: 0px auto;
      .cat-head{
        width:98px;
        height: 44px;
        margin-top: -5px;
        margin-right: 58px;
        line-height:44px;
        float:left;
        background-color: #4199e5;
        text-align: center;
        color: white;
        font-size: 18px;
        font-weight: bold;
      }
      .nav{
        height:34px;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>
<style lang="less">
  .title-back{
    .ivu-tabs-bar{
      border-bottom:none;
    }
  }
</style>
