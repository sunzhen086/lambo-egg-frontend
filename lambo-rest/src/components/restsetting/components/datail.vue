<template>
  <div class="insert-box">

    <Form :label-width="100">

      <Card>
        <p slot="title">
          <Icon type="network"></Icon>
          节点信息
        </p>
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
      </Card>


      <div class="part" v-if="stru.isLeaf==='1'">
        <Card>
          <p slot="title">
            <Icon type="gear-a"></Icon>
            服务配置
          </p>
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
          <FormItem label="取数逻辑：">
            <Tabs class="tabs" size="small">
              <TabPane label="关键SQL" >
                <Input v-model="setting.restSql" type="textarea" :autosize="{minRows: 5,maxRows: 10}" readonly />
              </TabPane>
              <TabPane label="MOCK数据" >
                <Input v-model="setting.mockData" type="textarea" :autosize="{minRows: 5,maxRows: 10}" readonly />
              </TabPane>
            </Tabs>
          </FormItem>

          <FormItem label="创建时间：">
            {{setting.createTime}}
          </FormItem>
          <FormItem label="修改时间：" v-if="setting.createTime != setting.updateTime">
            {{setting.updateTime}}
          </FormItem>
          <FormItem label="操作人：">
            {{setting.createUser}}
          </FormItem>

        </Card>

      </div>

    </Form>
  </div>
</template>

<script>
  import util from '@/libs/util';
  export default {
    props: {
      struId:{
        type:String,
        default:''
      },
      struName:{
        type:String,
        default:''
      }
    },
    data () {
      return {
        dsObj:[],
        stru:{
          struId:this.struId,
          struName:this.struName,
          struUrl:'',
          isLeaf:'',
          parentId:'',
          restId:'',
          isUse:'',
          orderSeq:''
        },
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
        if(self.struId == '0'){
          self.stru.struId = self.struId;
          self.stru.struName = self.struName;
          self.stru.struUrl = '';
          self.stru.isLeaf = '0';
          self.stru.parentId = '';
          self.stru.restId = '';
          self.stru.isUse = '1';
          self.stru.orderSeq = '';
        }else{
          util.ajax.get('/manage/rest/stru/query?struId='+self.struId).then(function(resp) {
            var result = resp.data;
            if (result.code == '1') {
              self.stru.struId = result.data.struId;
              self.stru.struName = result.data.struName;
              self.stru.struUrl = result.data.struUrl;
              self.stru.isLeaf = result.data.isLeaf;
              self.stru.parentId = result.data.parentId;
              self.stru.restId = result.data.restId;
              self.stru.isUse = result.data.isUse;
              self.stru.orderSeq = result.data.orderSeq;

              if(self.stru.isLeaf == '1'){
                util.ajax.get('/manage/rest/setting/query?restId='+self.stru.restId).then(function(resp){
                  var result2 = resp.data;
                  if(result2.code == '1'){

                    var restSetting = result2.data.restSetting;
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
                    var paramsList = result2.data.restSettingParamsList;
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
          });
        }
      }
    },
    watch: {
      struId(){
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
      margin-top:20px;
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
