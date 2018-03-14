<template>
  <LamboTable dataUrl="/manage/dataSubject/getTableData" :columns="tableColumns" :searchParams="tableSearchParams">
    <div slot="search">
      <div class="searchArea" v-for="item in searchData" >
        {{item.dimension_name}}：
        <searchHelpBox v-if="item.ref_table && item.ref_table!=''" :item="item" @changeParams="operParam"></searchHelpBox>
        <searchDatePicket v-else :item="item" @changeParams="operParam"></searchDatePicket>
      </div>
      <Button type="primary" icon="ios-search" @click="doSearch" class="ml10" v-if="searchData.length>0">查询</Button>
      <div v-else>&nbsp;</div>
    </div>
  </LamboTable>
</template>

<script>
  import searchHelpBox from './searchHelpBox';
  import searchDatePicket from './searchDatePicket';
  export default {
    name: "left-table",
    data(){
      return{
        searchData:[],
        tableColumns:[],
        tableSearchParams:{

        },
        subjectId: this.$route.query.subjectId,
        params:'',
      }
    },
    props:{
      tableData:Array
    },
    components:{
      searchHelpBox,
      searchDatePicket
    },
    methods:{
      operData:function (data) {
        for(var i=0;i<data.length;i++){
          var obj = data[i];
          var column = {};
          column.ellipsis = true;
          column.sortable = true;
          column.title = obj.column_name;
          column.key = obj.cell_code;
          if(obj.search_condition && obj.search_condition !=''){
            this.searchData.push(obj);
            if(obj.ref_table && obj.ref_table !=''){
              column.key = obj.name_field;
            }
          }
          this.tableColumns.push(column);
        }
      },
      operParam:function(data){
        this.delParam(data.cellCode);
        if(data.operType && data.operType=="add"){
          this.addParam(data);
        }
      },
      delParam:function(cellCode){
        var params = this.params;
        if(params != "") {
          var param = params.split(",");
          var finalParam = "";
          for (var i = 0; i < param.length; i++) {
            if (param[i] != "" && param[i].indexOf(cellCode) < 0) {
              finalParam += param[i] + ",";
            }
          }
          this.params = finalParam;
        }
      },
      addParam:function (data) {
        var finalParam = this.params;
        if(data.searchType && data.searchType == "="){
          finalParam += data.cellCode+ "='" + data.value +"',";
        }else if(data.searchType){
          if(data.dimensionType && data.dimensionType == "year"){
            finalParam += data.cellCode+ ">='" + data.value +"-01-01 00:00:00',";
            finalParam += data.cellCode+ "<='" + data.value +"-12-31 23:59:59',";
          }else if(data.dimensionType && data.dimensionType == "month"){
            finalParam += data.cellCode+ ">='" + data.value +"-01 00:00:00',";
            finalParam += data.cellCode+ "<='" + data.value +"-31 23:59:59',";
          }else if(data.dimensionType && data.dimensionType == "date"){
            finalParam += data.cellCode+ ">='" + data.value +" 00:00:00',";
            finalParam += data.cellCode+ "<='" + data.value +" 23:59:59',";
          }else{
            finalParam += data.cellCode+ data.searchType +"'" + data.value +"',";
          }
        }
        this.params = finalParam;
      },
      doSearch:function () {
        this.tableSearchParams = {
          params: this.params,
          subjectId:this.subjectId
        }
      }
    },
    watch:{
      tableData:function (newVal,oldVal) {
        this.operData(newVal);
        this.doSearch();
      }
    },
    mounted(){
      this.operData(this.tableData);
      this.doSearch();
    }
  }
</script>

<style scoped lang="less">
  .searchArea{
    float: left;
    margin-left: 10px;
  }
  .ml10{
    margin-left: 10px;
  }
</style>
