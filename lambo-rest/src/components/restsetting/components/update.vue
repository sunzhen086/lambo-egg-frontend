<template>
  <div class="insert-box">
    <div class="msg">
      <Alert type="success" show-icon v-if="doSaved==1">保存成功！</Alert>
      <Alert type="error" show-icon v-if="doSaved==-1">保存失败！</Alert>
    </div>
    <Form :label-width="100">

      <div class="part">
        <div class="sub-title">节点信息</div>
        <FormItem label="节点名称：">
          <Input v-model="stru.struName" type="text" required="true" style="width:200px"/>
        </FormItem>
        <FormItem label="节点URL：">
          {{stru.struUrl}}
        </FormItem>
        <FormItem label="节点类型：">
          <span v-if="stru.isLeaf==0">文件目录</span>
          <span v-else>数据服务</span>
        </FormItem>
        <FormItem label="显示顺序：">
          <Input v-model="stru.orderSeq" type="text" required="true" style="width:200px"/>
        </FormItem>
      </div>

      <div class="part" v-if="stru.isLeaf==='1'">
        <div class="sub-title">服务配置</div>
        <FormItem label="服务URL：">
          {{setting.url}}
        </FormItem>
        <FormItem label="数据源：">
          <RadioGroup v-model="setting.datasource" required="true">
            <Radio v-for="item in dsObj" :label="item.dsId">{{item.dsName}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="操作类型：">
          <RadioGroup v-model="setting.operationType" required="true">
            <Radio label="selectList">selectList</Radio>
            <Radio label="selectOne">selectOne</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="服务描述：">
          <Input v-model="setting.note" type="text"  />
        </FormItem>
        <FormItem label="参数：">
          <div class="line-table">
            <div class="table-btn">
              <Button type="default" style="margin-top: -5px;" @click="addNewRow">增加一行</Button>
            </div>
            <lambo-edit-table ref="paramsTable"  v-model="paramsData" :columns="columns" ></lambo-edit-table>
          </div>
        </FormItem>
        <Tabs class="tabs" size="small">
          <TabPane label="关键SQL" >
            <Input v-model="setting.restSql" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="数据服务取数sql..." />
          </TabPane>
          <TabPane label="MOCK数据" >
            <Input v-model="setting.mockData" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="返回数据示例..." />
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

      <div class="part" v-if="stru.struId!=0">
        <FormItem>
          <Button type="primary" @click="restUpdate()" :loading='isloading'>保存</Button>
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
        isloading:false,
        doSaved:0,
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
            width: 200,
            editor:{
              type:"text",
              //校验函数,参数分别为：新值、旧值、行数据、行号
              validate:function(newVal,oldVal,row,index){
                if(newVal.trim() == ""){
                  return{
                    valid:false,
                    msg:"输入不能为空！"
                  }
                }
                return{valid:true}
              }
            }
          },
          {
            title: '参数名称',
            align: 'center',
            key: 'paramName',
            width: 200,
            editor:{
              type:"text",
              //校验函数,参数分别为：新值、旧值、行数据、行号
              validate:function(newVal,oldVal,row,index){
                if(newVal.trim() == ""){
                  return{
                    valid:false,
                    msg:"输入不能为空！"
                  }
                }
                return{valid:true}
              }
            }
          },
          {
            title: '是否必须',
            align: 'center',
            width: 200,
            key: 'necessary',
            editor:{
              type:"select",
              enums:[{"value":"1","label":"是"},{"value":"0","label":"否"}]
            }
          },
          {
            title: '默认值',
            align: 'center',
            key: 'defaultValue',
            width: 200,
            editor:{
              type:"text"
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.deleteRow(params.index)
                    }
                  }
                }, '删除')
              ]);
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
                    defaultValue: params.defaultValue
                  };

                  self.paramsData.push(row);

                });
              }
            }

          });
        }
      },
      restUpdate() {
        var self = this;

        self.isloading = true;
        self.doSaved = 0;

        var struParams = {
          struName:self.stru.struName,
          struUrl:self.stru.struUrl,
          isLeaf:self.stru.isLeaf,
          restId:self.stru.restId,
          parentId:self.stru.parentId,
          isUse:self.stru.isUse,
          orderSeq:self.stru.orderSeq
        };

        //修改目录
        util.ajax.post("/manage/rest/stru/update/"+self.stru.struId, struParams).then(function(resp){
          var result = resp.data;
          if(result.code == '1') {

            //更新树
            // self.$emit("update-tree-node", params);

            //修改服务
            if(self.stru.isLeaf == '1'){
              var restParams = {
                restName:self.stru.struName,
                datasource:self.setting.datasource,
                operationType:self.setting.operationType,
                url:self.setting.url,
                note:self.setting.note,
                restSql:self.setting.restSql,
                mockData:self.setting.mockData,
                createTime:self.setting.createTime,
                settingParams:JSON.stringify(self.$refs.paramsTable.getTableData())
              }

              util.ajax.post("/manage/rest/setting/update/"+self.setting.restId, restParams).then(function(resp){
                var result = resp.data;
                if(result.code == '1') {
                  self.isloading = false;
                  self.doSaved = 1;
                }else{
                  self.isloading = false;
                  self.doSaved = -1;
                }
              });
            }else{
              self.isloading = false;
              self.doSaved = 1;
            }
          }else{
            self.isloading = false;
            self.doSaved = -1;
          }
        });
      },
      addNewRow:function(){
        let row = {
          paramKey: '',
          paramName: '',
          necessary: '1',
          defaultValue: ''
        }
        this.paramsData.push(row);
      },
      deleteRow(index) {
        this.paramsData.splice(index, 1);
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
