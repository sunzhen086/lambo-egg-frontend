<template>
  <LamboTable dataUrl="/manage/dataSubject/getTableData" :columns="tableColumns" :searchParams="tableSearchParams"
              :showTableOption="showTableOption" ref="searchTable" :exportName="pageTitle" :transformResponse="transformResponse">
    <div slot="search">
      <div class="searchArea" v-for="item in searchData">
        <queryCondition :item="item" @changeParams="operParam"></queryCondition>
      </div>
      <Dropdown class="exportBtn" @on-click="doExport" placement="bottom-end">
        <Button type="primary">
          导出
          <Icon type="arrow-down-b"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="current">导出当前页</DropdownItem>
          <DropdownItem name="all">导出全部</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button type="primary" icon="ios-search" @click="doSearch" class="searchBtn" v-if="searchData.length>0">查询</Button>
      <div v-else>&nbsp;</div>
      <codeModal :openCodeModal="openCodeModal" @closeModal="closeModal"></codeModal>
    </div>
  </LamboTable>
</template>

<script>
  import queryCondition from './../../tools/query/query';
  import codeModal from '../../tools/codeModal/codeModal';
  export default {
    name: "left-table",
    data(){
      return{
        searchData:[],
        tableColumns:[],
        tableSearchParams:{

        },
        showTableOption:false,
        params:'',
        openCodeModal:false
      }
    },
    props:{
      tableData:Array,
      subjectId:Number,
      pageTitle:String,
    },
    components:{
      queryCondition,
      codeModal
    },
    methods:{
      transformResponse:function (data) {
        if("code" in data && data.code == "20001"){
          this.openCodeModal = true;
        }
        return data;
      },
      closeModal:function () {
        this.openCodeModal = false;
      },
      operData:function () {
        this.tableColumns.splice(0,this.tableColumns.length);
        this.searchData.splice(0,this.searchData.length);
        var data = this.tableData;
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
      },
      doExport:function (name) {
        this.$refs.searchTable.exportOper(name);
      }
    },
    watch:{
      tableData:function () {
        this.operData();
        this.doSearch();
      }
    },
    mounted(){
      this.operData();
      this.doSearch();
    }
  }
</script>

<style scoped lang="less">
  .searchArea{
    float: left;
    margin-left: 10px;
    margin-top: 10px;
  }
  .searchBtn{
    margin-top: 10px;
    float: right;
  }
  .exportBtn{
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 2px;
    float: right;
  }
</style>
