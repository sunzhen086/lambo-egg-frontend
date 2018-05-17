<template>
  <div class="insert-box">

    <Form :label-width="100">

      <div class="part" >
        <div class="sub-title">节点信息</div>
        <FormItem label="节点名称：">
          {{stru.struName}}
        </FormItem>
        <FormItem label="节点URL：" v-if="stru.struId!=0">
          {{stru.struUrl}}
        </FormItem>
        <FormItem label="节点类型：" v-if="stru.struId!=0">
          <span v-if="stru.isLeaf==0">文件目录</span>
          <span v-else>数据服务</span>
        </FormItem>
        <FormItem label="显示顺序：" v-if="stru.struId!=0">
          {{stru.orderSeq}}
        </FormItem>
      </div>

      <div class="part" v-if="stru.isLeaf==='1'">
        <div class="sub-title">服务配置</div>
        <FormItem label="服务URL：">
          {{setting.url}}
        </FormItem>
        <FormItem label="数据源：">
          <RadioGroup v-model="setting.datasource" >
            <Radio v-for="item in dsObj" :label="item.dsId" disabled>{{item.dsName}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="操作类型：">
          <RadioGroup v-model="setting.operationType">
            <Radio label="selectList" disabled>selectList</Radio>
            <Radio label="selectOne" disabled>selectOne</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="服务描述：">
          {{setting.note}}
        </FormItem>
        <FormItem label="参数：">
          <div class="line-table">
            <Table :data="paramsData" :columns="columns" ></Table>
          </div>
        </FormItem>
        <Tabs class="tabs" size="small">
          <TabPane label="关键SQL" >
            <Input v-model="setting.restSql" type="textarea" :autosize="{minRows: 5,maxRows: 10}" readonly />
          </TabPane>
          <TabPane label="MOCK数据" >
            <Input v-model="setting.mockData" type="textarea" :autosize="{minRows: 5,maxRows: 10}" readonly />
          </TabPane>
        </Tabs>
        <FormItem label="创建时间：">
          {{setting.createTime}}
        </FormItem>
        <FormItem label="修改时间：" v-if="setting.createTime != setting.updateTime">
          {{setting.updateTime}}
        </FormItem>
        <FormItem label="操作人：">
          {{setting.createUser}}
        </FormItem>
      </div>

    </Form>
  </div>
</template>

<script>
  import util from '@/libs/util';
  export default {
    props: {
      curStru:Object
    },
    computed:{
      stru:function(){
        var obj = {
          struId:this.curStru.struId,
          struName: this.curStru.struName,
          struUrl:this.curStru.struUrl,
          isLeaf: this.curStru.isLeaf,
          parentId: this.curStru.parentId,
          restId:this.curStru.restId,
          isUse: this.curStru.isUse,
          orderSeq:this.curStru.orderSeq,
        };
        return obj;
      }
    },
    data () {
      return {
        dsObj:[],
        setting:{
          restId:'',
          restName:'',
          url:'',
          operationType:'',
          datasource:'',
          restSql:'',
          mockData:'',
          note:'',
          createTime:'',
          updateTime:'',
          createUser:''
        },
        paramsData: [],
        columns: [
          {
            title: '序号',
            type: 'index',
            width: 100,
            align: 'center'
          },
          {
            title: '参数编码',
            align: 'center',
            key: 'paramKey',
            width: 200
          },
          {
            title: '参数名称',
            align: 'center',
            key: 'paramName',
            width: 200
          },
          {
            title: '是否必须',
            align: 'center',
            width: 200,
            key: 'necessaryName'
          },
          {
            title: '默认值',
            align: 'center',
            key: 'defaultValue',
            width: 200,
            editor:{
              type:"text"
            }
          }
        ]
      }
    },
    methods:{
      setDsObj(){
        var self = this;
        util.ajax.get("/manage/rest/datasource/queryAll").then(function(resp) {
          var result = resp.data;
          if (result.code == '1') {
            var objs = result.data;
            if(objs && objs.length>0){
              objs.forEach(item => {
                let ds = {
                  dsId: item.dsId,
                  dsName: item.dsName,
                  dsType: item.dsType
                };
                self.dsObj.push(ds);
              });
            }
          }
        });
      },
      getRest(){
        var self = this;
        if(self.stru.isLeaf == '1'){
          util.ajax.get('/manage/rest/setting/query?restId='+self.stru.restId).then(function(resp){
            var result = resp.data;
            if(result.code == '1'){

              var restSetting = result.data.restSetting;
              if(restSetting){
                self.setting.restId = restSetting.restId;
                self.setting.restName = restSetting.restName;
                self.setting.url = restSetting.url;
                self.setting.operationType = restSetting.operationType;
                self.setting.datasource = restSetting.datasource;
                self.setting.restSql = restSetting.restSql;
                self.setting.mockData = restSetting.mockData;
                self.setting.note = restSetting.note;
                self.setting.createTime = restSetting.createTime;
                self.setting.updateTime = restSetting.updateTime;
                self.setting.createUser = restSetting.createUser;
              }

              self.paramsData.splice(0,self.paramsData.length);
              var paramsList = result.data.restSettingParamsList;
              if(paramsList && paramsList.length>0){
                paramsList.forEach(params => {
                  let row = {
                    restId: params.restId,
                    paramKey: params.paramKey,
                    paramName: params.paramName,
                    necessary: params.necessary,
                    necessaryName:params.necessary==0?'否':'是',
                    defaultValue: params.defaultValue
                  };

                  self.paramsData.push(row);

                });
              }
            }

          });
        }
      }
    },
    watch: {
      curStru(){
        this.getRest();
      }
    },
    mounted:function(){
      this.setDsObj();
      this.getRest();
    }
  }
</script>

<style lang="less" scoped>
  .insert-box{
    .part {
      .sub-title {
        padding: 10px 0;
        border-bottom: 1px solid #e9eaec;
      }
      .line-table{
        .table-btn{
          margin-bottom:10px;
        }
      }
      .tabs{
        margin-bottom:10px !important;
      }
    }
  }
</style>
