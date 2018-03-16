<template>
  <search :searchType="searchType" :helpBoxUrl="helpBoxUrl" :helpBoxColumns="helpBoxColumns" :title="helpBoxTitle"
          :muliSelect="muliSelect" :inputKey="inputKey" @onOk="onOk" @onClear="onClear"></search>
</template>

<script>
    import search from "../../tools/search/search";
    export default {
      name: "search-help-box",
      data(){
        return{
          searchType:"helpbox",
          helpBoxColumns: [],
          muliSelect:false,
          inputKey:'',
        }
      },
      props:{
        item:Object
      },
      computed: {
        cellCode:function () {
          return this.item.cell_code;
        },
        dimensionId:function () {
          return this.item.dimension_id;
        },
        helpBoxTitle:function () {
          return this.item.dimension_name + "选择";
        },
        helpBoxUrl:function () {
          return "/manage/dataSubject/getDimensionData?dimensionId="+this.item.dimension_id;
        }
      },
      components:{
        search
      },
      methods:{
        initColumn:function () {
          var item = this.item;
          this.helpBoxColumns.push({
            title:item.name_field_zh_cn,
            key:"name_field",
            sortable:true
          });
          this.inputKey = "name_field";
          if(item.show_field && item.show_field != ""){
            var fieldId = item.show_field.split(",");
            var fieldName = item.show_field_zh_cn.split(",");
            for(var i=0;i<fieldId.length;i++){
              this.helpBoxColumns.push({
                title:fieldName[i],
                key:fieldId[i],
                sortable:true
              });
            }
          }
        },
        showHelpBox:function(){
          this.helpBoxShow = true;
        },
        onOk:function(result){
          var self = this;
          var data = {
            operType:"add",
            searchType:'=',
            value:result.key_field,
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
      watch:{
        item:function () {
          this.initColumn();
        }
      },
      mounted(){
        this.initColumn()
      }
    }
</script>

<style scoped>

</style>
