<template>
  <LamboTable dataUrl="/manage/dataSubject/getTableData" :columns="tableColumns" :searchParams="tableSearchParams">
    <div slot="search">
      <div class="searchArea" v-for="(item,index) in searchData" >
        {{item.dimension_name}}：
        <Input v-model="item.value" placeholder="点击选择"
               style="width: 200px" readonly v-if="item.ref_table && item.ref_table!=''"
               @on-focus="showHelpBox(item.dimension_id,item.cell_code,index,item.dimension_name)"></Input>
        <Select v-model="item.value" style="width:200px" v-else @on-change="setParam(item.cell_code,index)">
          <Option v-for="tmp in item.options" :value="tmp.key" :key="tmp.key">{{ tmp.value }}</Option>
        </Select>
      </div>
      <lambo-help-box v-model="helpBoxShow" :url="helpBoxUrl" :columns="helpBoxColumns" :title="helpBoxTitle" :muliSelect="muliSelect"
                      @onOk="onOk" @onClear="onClear">
      </lambo-help-box>
      <Button type="primary" icon="ios-search" @click="doSearch" class="ml10">查询</Button>
    </div>
  </LamboTable>
</template>

<script>
  import util from '@/libs/util';
  export default {
    name: "left-table",
    data(){
      return{
        searchData:[],
        tableColumns:[],
        tableSearchParams:{

        },
        subjectId: this.$route.query.subjectId,
        helpBoxShow:false,
        helpBoxColumns: [{
          title:"名称",
          key:"name_field"
        }],
        muliSelect:false,
        helpBoxTitle:"选择",
        dimensionId:0,
        cellCode :'',
        index:0,
        params:'',
      }
    },
    props:{
      tableData:Array,
      tableCode:String
    },
    computed: {
      helpBoxUrl:function () {
        return "/manage/dataSubject/getDimensionData?dimensionId="+this.dimensionId;
      }
    },
    methods:{
      operData:function (data) {
        var searchData = [];
        for(var i=0;i<data.length;i++){
          var obj = data[i];
          var tmp = {};
          tmp.title = obj.column_name;
          if(obj.search_condition && obj.search_condition !='' && obj.ref_table && obj.ref_table !='' ){
            tmp.key = obj.name_field;
            var tmp2 = {};
            tmp2.cell_code = obj.cell_code;
            tmp2.dimension_id = obj.dimension_id;
            tmp2.dimension_name = obj.dimension_name;
            tmp2.ref_table = obj.ref_table;
            tmp2.key_field = obj.key_field;
            tmp2.name_field = obj.name_field;
            tmp2.value = '';
            searchData.push(tmp2);
          }else if(obj.search_condition && obj.search_condition !='' && obj.search_setting && obj.search_setting !='' ){
            tmp.key = obj.cell_code;
            var tmp2 = {};
            tmp2.cell_code = obj.cell_code;
            tmp2.dimension_id = obj.dimension_id;
            tmp2.dimension_name = obj.dimension_name;
            var setting = this.getOptionBySetting(obj.search_setting);
            tmp2.options = setting.options;
            tmp2.value = setting.select;
            if(setting.select != ''){
              this.setParam(obj.cell_code,"",setting.select);
            }
            searchData.push(tmp2);
          }else{
            tmp.key = obj.cell_code;
          }
          this.tableColumns.push(tmp);
        }
        this.searchData = searchData;
      },
      getOptionBySetting:function (setting) {
        var search_setting = eval("("+setting+")");
        var options = [{
          key:"",
          value:"请选择"
        }];
        var select = '';
        if(search_setting.type == "year"){
          var date = new Date;
          var year = date.getFullYear();
          for(var i=0;i<search_setting.range*1;i++){
            var tmpYear = year*1 - i;
            var key = tmpYear+'-01-01 00:00:00,'+tmpYear+"-12-31 23:59:59";
            options.push({
              key:key,
              value:tmpYear+"年"
            });
            if(search_setting.default == i){
              select = key;
            }
          }
        }
        if(search_setting.type == "month"){
          for(var i=0;i<search_setting.range*1;i++){
            var date1 = new Date();
            date1.setMonth(date1.getMonth()-i+1);
            var year1=date1.getFullYear();
            var month1=date1.getMonth()+1;
            month1 =(month1<10 ? "0"+month1:month1);
            var key = year1+'-'+month1+'-01 00:00:00,'+year1+'-'+month1+'-31 23:59:59';
            options.push({
              key:key,
              value:year1+"年"+month1+"月"
            });
            if(search_setting.default*1 == i){
              select = key;
            }
          }
        }
        if(search_setting.type == "day"){
          for(var i=0;i<search_setting.range*1;i++){
            var nowDate = new Date();
            var befminuts = nowDate.getTime() - 1000 * 60 * 60 * 24 * i;//计算前几天用减，计算后几天用加，最后一个就是多少天的数量
            var beforeDat = new Date;
            beforeDat.setTime(befminuts);
            var befMonth = beforeDat.getMonth()+1;
            var mon = befMonth >= 10 ? befMonth : '0' + befMonth;
            var befDate = beforeDat.getDate();
            var da = befDate >= 10 ? befDate : '0' + befDate;
            var key = beforeDat.getFullYear() + '-' + mon + '-' + da + " 00:00:00,";
            key+= beforeDat.getFullYear() + '-'+ mon + "-" + da + " 23:59:59";
            options.push({
              key:key,
              value:beforeDat.getFullYear()+"年"+mon+"月"+ da+ "日"
            });
            if(search_setting.default*1 == i){
              select = key;
            }
          }
        }
        return {
          options:options,
          select:select
        };
      },
      setParam:function (cell_code,index,key) {
        if(!key || key == ''){
          key = this.searchData[index].value;
        }
        if(key == ""){
          var params = this.params;
          if(params != ""){
            var param = params.split(",");
            var finalParam = "";
            for(var i=0;i<param.length;i++){
              if(param[i]!="" && param[i].indexOf(cell_code)<0){
                finalParam +=param[i]+",";
              }
            }
            this.params = finalParam;
          }
        }else{
          var keyArray = key.split(",");
          var params = this.params;
          if(params != ""){
            var param = params.split(",");
            var finalParam = "";
            for(var i=0;i<param.length;i++){
              if(param[i]!="" && param[i].indexOf(cell_code)<0){
                finalParam +=param[i]+",";
              }
            }
            finalParam += cell_code+ ">='" + keyArray[0] +"',";
            finalParam += cell_code+ "<='" + keyArray[1] +"',";
            this.params = finalParam;
          }else{
            this.params = cell_code+">='"+ keyArray[0]+"',"+cell_code+ "<='" + keyArray[1] +"',";
          }
        }
      },
      showHelpBox:function(dimensionId,cell_code,index,dimension_name){
        var self = this;
        self.cellCode = cell_code;
        self.index = index;
        self.helpBoxTitle=dimension_name+"选择";
        self.dimensionId = dimensionId;
        self.helpBoxShow = true;
      },
      onOk:function(result){
        this.searchData[this.index].value = result.name_field;
        var params = this.params;
        if(params != ""){
          var param = params.split(",");
          var tmp = this.cellCode+"='";
          var finalParam = "";
          for(var i=0;i<param.length;i++){
            if(param[i]!="" && param[i].indexOf(tmp)<0){
              finalParam +=param[i]+",";
            }
          }
          finalParam += tmp + result.key_field+"',";
          this.params = finalParam;
        }else{
          this.params = this.cellCode+"='"+result.key_field+"',";
        }
      },
      onClear:function(result){
        var params = this.params;
        if(params != ""){
          var tmp = this.cellCode+"=";
          var param = params.split(",");
          var finalParam = "";
          for(var i=0;i<param.length;i++){
            if(param[i]!="" && param[i].indexOf(tmp)<0){
              finalParam +=param[i]+",";
            }
          }
          this.params = finalParam;
        }
        this.searchData[this.index].value = '';
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
