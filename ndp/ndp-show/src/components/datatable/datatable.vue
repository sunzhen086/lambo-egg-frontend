<template>
    <div>
      <div class="title">
        <div class="content">
          <Icon type="ios-list-outline" size="30" color="#fff" class="icon"></Icon>
          <h2 class="text">数据目录</h2>
        </div>
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
  .body{
    margin-top:10px;
  }
</style>
