<template>
  <div class="main-body">
    <div class="main-title">
      {{pageTitle}}
    </div>
    <div class="main-tab">
      <Tabs type="card">
        <TabPane label="数据查询">
          <leftTable :tableData="tableData"></leftTable>
        </TabPane>
        <TabPane label="数据描述">
          <rightTable :tableData="tableData"></rightTable>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
    import util from '@/libs/util';
    import leftTable from './components/leftTable';
    import rightTable from './components/rightTable';
    export default {
        name: "data-search",
        data() {
          return {
            pageTitle:'',
            tableData:[],
            subjectId: this.$route.query.subjectId,
          }
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
                self.tableData = result;
              }
            });
          }
        },
        mounted(){
          this.initPage();
        }
    }
</script>

<style scoped lang="less">
  .main-body{
    padding: 10px;
    .main-title{
      padding: 5px;
      font-weight: bolder;
      font-size: 20px;
    }
    .main-tab{
      padding: 10px;
    }
  }
</style>
