<template>
    <div>
      <div>
        <div class="title-back">
          <div class="title">
            <h2 class="cat-head">数据目录</h2>
          </div>
        </div>
        <router-view></router-view>
      </div>
      <div class="body">
          <dataview></dataview>
      </div>
    </div>
</template>

<script>
    import dataview from "../dataview/dataview";
    export default {
        name: "datatable",
        components:{
          dataview
        }
    }
</script>

<style lang="less" scoped>
  .title{
    height:50px;
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
