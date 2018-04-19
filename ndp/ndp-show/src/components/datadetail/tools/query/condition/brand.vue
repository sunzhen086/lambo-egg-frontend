<template>
  <span>
    &nbsp;&nbsp;&nbsp;{{searchName}}：
    <search :searchType="searchType" :helpBoxUrl="helpBoxUrl" :helpBoxColumns="helpBoxColumns" :title="helpBoxTitle"
          :muliSelect="muliSelect" :inputKey="inputKey" @onOk="onOk" @onClear="onClear"></search>
  </span>
</template>

<script>
  import search from "../../search/search";
  export default {
    name: "item",
    data(){
      return{
        searchName:"品牌",
        searchType:"helpbox",
        helpBoxUrl:'/manage/dataSubject/getConditionData?dimensionType=brand',
        helpBoxColumns: [{
          title:'品牌名称',
          key:"test_name",
          sortable:true
        }],
        muliSelect:false,
        helpBoxTitle:'品牌选择',
        inputKey:'test_name',
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
          value:result.test_id,
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
