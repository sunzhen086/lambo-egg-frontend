<template>
  <div class="main-body">
    <div class="main-title">
      <div class="title-content">
        <Row>
          <Col span="7"><img alt="all" src="../../assets/tobaccologo.png"/></Col>
          <Col span="8" align="left">数据开放平台</Col>
          <Col span="9">
            <Input v-model="value11">
              <span slot="append"><Button type="primary" icon="ios-search">搜索</Button></span>
            </Input>
          </Col>
        </Row>
      </div>
    </div>
    <div class="main-tab">
      <div class="tab-content">
        <Tabs>
          <TabPane label="首页">
            <mainpage :tableData="tableData"></mainpage>
          </TabPane>
          <TabPane label="行业概览">
            <overview :tableData="tableData"></overview>
          </TabPane>
          <TabPane label="数据目录">
            <datatable :tableData="tableData"></datatable>
          </TabPane>
        </Tabs>

      </div>
    </div>
  </div>
</template>
<script>
  import util from '@/libs/util';
  import mainpage from './components/mainpage';
  import overview from './components/overview';
  import datatable from './components/datatable';
  import Icon from "iview/src/components/icon/icon";

  export default {
    name: "main",
    components:{
      mainpage,
      overview,
      datatable
    },
    data() {
      return {
        testData:{},
      }
    },
    methods:{
      getData:function(params){
        var self = this;
        util.ajax.post('/manage/queryList').then(function (resp) {
          self.testData = resp.data;
        })
      }
    },
    mounted(){
      this.getData();
    }
  }
</script>

<style scoped lang="less">
  .main-body{
    .main-title{
      font-weight: bolder;
      font-size: 20px;
      text-align: center;
      .title-content{
        width: 950px;
        display:inline-block;
      }
    }
    .main-tab{
      text-align: center;
      .tab-content{
        width: 950px;
        display:inline-block;
        .ivu-tabs > .ivu-tabs-bar {
          margin-bottom: 0px;
        }
      }
    }
  }
</style>
