<template>
  <span>
    {{searchName}}：
    <search :searchType="searchType" :helpBoxUrl="helpBoxUrl" :helpBoxColumns="helpBoxColumns" :title="helpBoxTitle"
          :muliSelect="muliSelect" :inputKey="inputKey" @onOk="onOk" @onClear="onClear"></search>
  </span>
</template>

<script>
  import search from "../../search/search";
  export default {
    name: "province",
    data(){
      return{
        searchName:'省公司',
        searchType:"helpbox",
        helpBoxUrl:'/manage/dataSubject/getConditionData?dimensionType=province',
        helpBoxColumns: [{
          title:'公司名称',
          key:"com_name",
          sortable:true
        },{
          title:'测试字段',
          key:"com_test",
          sortable:true
        },{
          title:'测试字段1',
          key:"com_test1",
          sortable:true
        }],
        muliSelect:false,
        helpBoxTitle:'省公司选择',
        inputKey:'com_name',
      }
    },
    props:{
      item:Object
    },
    computed: {
      cellCode:function () {
        return this.item.cell_code;
      }
    },
    components:{
      search
    },
    methods:{
      showHelpBox:function(){
        this.helpBoxShow = true;
      },
      onOk:function(result){
        var self = this;
        var data = {
          operType:"add",
          searchType:'=',
          value:result.com_id,
          cellCode:self.cellCode
        }
        this.$emit("changeParams",data);
      },
      onClear:function(result){
        var self = this;
        var data = {
          operType:"del",
          cellCode:self.cellCode
        }
        this.$emit("changeParams",data);
      }
    },
  }
</script>

<style scoped>

</style>
