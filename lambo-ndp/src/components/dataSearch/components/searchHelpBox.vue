<template>
  <span>
    <Input v-model="value" placeholder="点击选择" icon="ios-search" style="width: 200px" readonly @on-focus="showHelpBox"></Input>
    <lambo-help-box v-model="helpBoxShow" :url="helpBoxUrl" :columns="helpBoxColumns" :title="helpBoxTitle"
                    :muliSelect="muliSelect" @onOk="onOk" @onClear="onClear">
    </lambo-help-box>
  </span>
</template>

<script>
    import util from '@/libs/util';
    export default {
      name: "search-help-box",
      data(){
        return{
          value:'',
          helpBoxShow:false,
          helpBoxColumns: [],
          muliSelect:false
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
        helpBoxColumnUrl:function () {
          return "/manage/dataSubject/getDimensionInfo?dimensionId="+this.item.dimension_id;
        },
        helpBoxUrl:function () {
          return "/manage/dataSubject/getDimensionData?dimensionId="+this.item.dimension_id;
        }
      },
      methods:{
        initColumn:function () {
          var self = this;
          util.ajax.get(self.helpBoxColumnUrl)
            .then(function (resp) {
            var result = resp.data;
            self.helpBoxColumns.push({
              title:result.name_field_zh_cn,
              key:"name_field",
              sortable:true
            });
            if(result.show_field && result.show_field != ""){
              var fieldId = result.show_field.split(",");
              var fieldName = result.show_field_zh_cn.split(",");
              for(var i=0;i<fieldId.length;i++){
                self.helpBoxColumns.push({
                  title:fieldName[i],
                  key:fieldId[i],
                  sortable:true
                });
              }
            }
          });
        },
        showHelpBox:function(){
          this.helpBoxShow = true;
        },
        onOk:function(result){
          var self = this;
          self.value=result.name_field;
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
          self.value="";
          var data = {
            operType:"del",
            cellCode:self.cellCode
          }
          this.$emit("changeParams",data);
        }
      },
      watch:{
        item:function (newVal,oldVal) {
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
