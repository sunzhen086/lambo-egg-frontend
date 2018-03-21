<template>
  <div class="page">
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
  .page{
    width:1080px;
    margin:0 auto;
    .card{
      margin-top:15px;
      box-shadow: 1px 1px 1px 1px rgba(0,0,0,.1);
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
</style>
