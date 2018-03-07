<template>
  <Table border :columns="tableColumns" :data="tableDatas"></Table>
</template>

<script>
    export default {
        name: "right-table",
        data () {
          return {
            tableColumns: [
              {
                title: '列名',
                align: 'center',
                key: 'column_name'
              },
              {
                title: '计量单位',
                align: 'center',
                key: 'data_unit'
              },
              {
                title: '字典',
                align: 'center',
                key: 'dict_name'
              },
              {
                title: '描述',
                key: 'data_desc'
              }
            ],
            tableDatas: []
          }
        },
        props:{
          tableData:Array,
          tableCode:String
        },
        methods:{
          operData:function (data) {
            var result = [];
            for(var i=0;i<data.length;i++){
              var obj = data[i];
              var tmp = {};
              tmp.column_name = obj.column_name;
              tmp.data_unit = obj.data_unit;
              tmp.dict_name = obj.dict_name;
              tmp.data_desc = obj.data_desc;
              result.push(tmp);
            }
            this.tableDatas = result;
          }
        },
        watch:{
          tableData:function (newVal,oldVal) {
            this.operData(newVal);
          }
        }
    }
</script>

<style scoped lang="less">

</style>
