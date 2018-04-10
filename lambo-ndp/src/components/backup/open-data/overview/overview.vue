<template>
  <div class="page1">
    <div class="title">
      <div class="content">
        <Icon type="ios-world-outline" size="30" color="#fff" class="icon"></Icon>
        <h2 class="text">数据概览</h2>
      </div>
    </div>
    <div class="body">
      <Measures></Measures>
      <Card class="card">
        <Btns @on-btn-click="btnClick"></Btns>
        <div class="container">
          <div class="mtable">
            <Mtable :measureCode="measureCode"></Mtable>
          </div>
          <div class="china-map">
            <ChinaMap></ChinaMap>
          </div>
        </div>
      </Card>
      <DataList></DataList>
    </div>

  </div>
</template>
<script>
  import Measures from "./components/measures";
  import Btns from "./components/btns";
  import Mtable from "./components/mtable";
  import ChinaMap from "./components/china-map";
  import DataList from "./components/datalist";
  export default {
    components:{
      Measures,
      Btns,
      Mtable,
      ChinaMap,
      DataList
    },
    data() {
      return {
        measureCode:""
      }
    },
    methods:{
      btnClick:function(code){
        this.measureCode = code;
      }
    },
    mounted(){

    }
  }
</script>
<style lang="less" scoped>
  .page1{
    .body{
      width:1080px;
      margin:15px auto;
      padding-bottom:30px;
      .card{
        margin-top:10px;
        /*box-shadow: 1px 1px 1px 1px rgba(0,0,0,.1);*/
      }
      .container{
        display:flex;
        .mtable{
          flex:1
        }
        .china-map{
          flex:1
        }
      }
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
  }
</style>
