<template>
  <div class="container">
    <Table :data="tableDatas" :columns="tableColumns"></Table>
  </div>

</template>

<script>
    import tableDatas from "./tableDatas";
    import Bar from "./bar";
    export default {
      props:{
        measureCode:{
          type:String,
          default:"measure1"
        }
      },
      data(){
        return {
          tableDatas:tableDatas,
          tableColumns:[
            {
              title:"排名",
              key:"rank",
              width:60
            },
            {
              title:"省份",
              key:"provinceName",
              width:90
            },
            {
              title:"任务",
              key:"measure1",
              width:90
            },
            {
              title:"完成",
              key:"measure2",
              width:90
            },
            {
              title:"进度",
              key:"rate",
              width:120,
              render:(h,params) => {
                return h(Bar,{
                  props:{
                    rate:params.row[params.column.key]
                  }
                })
              }
            }
          ]
        }
      },
      created(){

      },
      mounted:function(){
        //alert(this.tableDatas);
      }
    }
</script>

<style lang="less" scoped>
  .container{
    margin-top:20px;
  }
</style>
