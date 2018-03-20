<template>
  <LamboTable dataUrl="/manage/dataSubject/getTableData" :columns="tableColumns" :searchParams="tableSearchParams">
    <div slot="search">
      <div class="searchArea" v-for="item in searchData" >
       <queryCondition :item="item" @changeParams="operParam"></queryCondition>
    </div>
      <Button type="primary" icon="ios-search" @click="doSearch" class="ml10" v-if="searchData.length>0">查询</Button>
      <div v-else>&nbsp;</div>
    </div>
  </LamboTable>
</template>

<script>
  import queryCondition from './../../tools/query/query';
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
      queryCondition
    },
    methods:{
      operData:function (data) {
        for(var i=0;i<data.length;i++){
          var obj = data[i];
          if(obj.is_show == '1'){
            var column = {};
            column.ellipsis = true;
            column.sortable = true;
            column.title = obj.column_name;
            column.key = obj.cell_code;
            this.tableColumns.push(column);
          }
          if(obj.search_condition && obj.search_condition !=''){
            this.searchData.push(obj);
          }
        }
      },
      operParam:function(data){
        this.delParam(data.cellCode);
        if(data.operType && data.operType=="add"){
          this.addParam(data);
        }
        console.log("this.params="+this.params);
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
          if(data.searchCondition && data.searchCondition == "year"){
            finalParam += data.cellCode+ ">='" + data.value +"-01-01 00:00:00',";
            finalParam += data.cellCode+ "<='" + data.value +"-12-31 23:59:59',";
          }else if(data.searchCondition && data.searchCondition == "month"){
            finalParam += data.cellCode+ ">='" + data.value +"-01 00:00:00',";
            finalParam += data.cellCode+ "<='" + data.value +"-31 23:59:59',";
          }else if(data.searchCondition && data.searchCondition == "date"){
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
