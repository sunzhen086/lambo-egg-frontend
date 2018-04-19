<template>
  <div class="container">
    <Table :data="tableDatas" :columns="tableColumns" :width="500"></Table>
  </div>

</template>

<script>
    import Bar from "./bar";
    export default {
      props:{
        tableDatas:{
          type:Array,
          default:function(){
            return []
          }
        },
        tableColumns:{
          type:Array,
          default:function(){
            return []
          }
        }
      },
      data(){
        return {
          /*tableDatas:tableDatas,
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
              key:"progress",
              width:120,
              render:(h,params) => {
                return h(Bar,{
                  props:{
                    rate:params.row[params.column.key]
                  }
                })
              }
            }
          ]*/
        }
      },
      watch: {
      },
      created(){

      },
      mounted:function(){
      }
    }
</script>

<style lang="less" scoped>
  .container{
    margin-top:20px;
  }
</style>
