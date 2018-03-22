<template>
  <div class="main-body">
    <div class="main-title">
      {{pageTitle}}
    </div>
    <div class="main-tab">
      <Tabs type="card">
        <TabPane label="数据查询">
          <leftTable :tableData="tableData" :subjectId="subjectId" :pageTitle="pageTitle"></leftTable>
        </TabPane>
        <TabPane label="数据描述">
          <rightTable :tableData="tableData" :subjectId="subjectId"></rightTable>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
    import util from '@/libs/util';
    import leftTable from './leftTable';
    import rightTable from './rightTable';
    export default {
        name: "data-search",
        data() {
          return {
            pageTitle:'',
            tableData:[],
          }
        },
        props:{
          subjectId:Number
        },
        components:{
          leftTable,
          rightTable
        },
        methods:{
          initPage:function () {
            var self = this;
            util.ajax.post('/manage/dataSubject/getSubjectInfo', {
              subjectId:self.subjectId
            }).then(function (resp) {
              var result = resp.data;
              if(result.length>0){
                self.pageTitle = result[0].subject_name;
              }else{
                self.pageTitle = "";
              }
              self.tableData = result;
            });
          }
        },
        watch:{
          subjectId:function () {
            this.initPage();
          }
        },
        mounted(){
          this.initPage();
        }
    }
</script>

<style scoped lang="less">
  .main-body{
    padding: 0px 10px;
    .main-title{
      padding: 5px 5px 5px 10px;
      font-weight: bolder;
      font-size: 20px;
    }
    .main-tab{
      padding: 10px;
    }
  }
</style>
