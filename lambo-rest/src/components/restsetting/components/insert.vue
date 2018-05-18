<template>
  <div class="insert-box">
    <div class="msg">
      <Alert type="success" show-icon v-if="doSaved==1">保存成功！</Alert>
      <Alert type="error" show-icon v-if="doSaved==-1">保存失败！</Alert>
    </div>

    <Form :label-width="100">
      <Card>
        <p slot="title">
          <Icon type="network"></Icon>
          节点信息
        </p>
        <FormItem label="上级节点：">
          {{parentName}}
        </FormItem>
        <FormItem label="节点名称：">
          <Input v-model="stru.struName" type="text" required="true" style="width:200px"/>
        </FormItem>
        <FormItem label="节点URL：">
          <Input v-model="stru.struUrl" type="text" required="true" style="width:200px"/>
        </FormItem>
        <FormItem label="节点类型：">
          <RadioGroup v-model="stru.isLeaf" required="true">
            <Radio label="0">文件目录</Radio>
            <Radio label="1">数据服务</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="显示顺序：">
          <Input v-model="stru.orderSeq" type="text" required="true" style="width:200px"/>
        </FormItem>
      </Card>

      <div class="part" v-if="stru.isLeaf==='1'">
        <Card>
          <p slot="title">
            <Icon type="gear-a"></Icon>
            服务
          </p>
          <FormItem label="服务URL：">
            {{struPath}}{{stru.struUrl}}
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
          <FormItem label="取数逻辑：">
            <Tabs class="tabs" size="small">
              <TabPane label="关键SQL" >
                <Input v-model="setting.restSql" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="数据服务取数sql..." />
              </TabPane>
              <TabPane label="MOCK数据" >
                <Input v-model="setting.mockData" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="返回数据示例..." />
              </TabPane>
            </Tabs>
          </FormItem>
        </Card>
      </div>

      <div class="part">
        <FormItem>
          <Button type="primary" @click="restSubmit()" :loading='isloading'>保存</Button>
        </FormItem>
      </div>
    </Form>
  </div>
</template>

<script>
  import util from '@/libs/util';
  export default {
    props: {
      parentId: {
        type:String,
        default:''
      },
      parentName: {
        type:String,
        default:''
      },
      struPath:{
        type:String,
        default:''
      }
    },
    data () {
      return {
        isloading:false,
        doSaved:0,
        dsObj:[],
        stru: {
          struName: '',
          struUrl:'',
          isLeaf: '0',
          parentId: this.parentId,
          restId:'',
          isUse: '1',
          orderSeq:0,
        },
        setting:{
          url:'',
          datasource:'',
          operationType:'selectList',
          url:'',
          note:'',
          restSql:'',
          mockData:''
        },
        paramsData: [],
        columns: [
          {
            title: '序号',
            type: 'index',
            minWidth: 100,
            align: 'center'
          },
          {
            title: '参数编码',
            align: 'center',
            key: 'paramKey',
            minWidth: 200,
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
            minWidth: 200,
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
            minWidth: 200,
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
            minWidth: 200,
            editor:{
              type:"text"
            }
          },
          {
            title: '操作',
            key: 'action',
            minWidth: 200,
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
            self.setting.datasource = self.dsObj[0].dsId;
          }
        });
      },
      restSubmit() {
        var self = this;

        self.isloading = true;
        self.doSaved = 0;

        var struParams = {
          struName:self.stru.struName,
          struUrl:self.stru.struUrl,
          isLeaf:self.stru.isLeaf,
          parentId:self.stru.parentId,
          isUse:self.stru.isUse,
          orderSeq:self.stru.orderSeq
        };

        //新增目录
        util.ajax.post("/manage/rest/stru/insert", struParams).then(function(resp){
          var result = resp.data;
          if(result.code == '1') {

            //更新树
            self.stru.struId = result.data.struId;
            struParams.struId = result.data.struId;
            self.$emit("add-tree-node", struParams);

            //新增服务
            if(self.stru.isLeaf == '1'){
              var restParams = {
                restId:result.data.restId,
                restName:self.stru.struName,
                datasource:self.setting.datasource,
                operationType:self.setting.operationType,
                url:self.struPath+self.stru.struUrl,
                note:self.setting.note,
                restSql:self.setting.restSql,
                mockData:self.setting.mockData,
                settingParams:JSON.stringify(self.$refs.paramsTable.getTableData())
              }

              util.ajax.post("/manage/rest/setting/insert", restParams).then(function(resp){
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
    mounted:function(){
      this.setDsObj();
    }
  }
</script>

<style lang="less" scoped>
  .insert-box{
    .part {
      margin-top:20px;
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
