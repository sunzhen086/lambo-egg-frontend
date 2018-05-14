<template>
  <div class="insert-box">
    <Form :label-width="100">

      <div class="part">
        <div class="sub-title">节点信息</div>
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
      </div>

      <div class="part" v-if="stru.isLeaf==='1'">
        <div class="sub-title">服务配置</div>
        <FormItem label="服务URL：">
          {{struPath}}{{stru.struUrl}}
        </FormItem>
        <FormItem label="数据源：">
          <RadioGroup v-model="setting.datasource" required="true">
            <Radio label="0">分析库</Radio>
            <Radio label="1">业务库</Radio>
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
        <FormItem label="关键SQL：">
          <Input v-model="setting.restSql" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="数据服务取数sql..." />
        </FormItem>
        <FormItem label="MOCK数据：">
          <Input v-model="setting.mockData" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="返回数据示例..." />
        </FormItem>
      </div>

      <div class="part">
        <FormItem>
          <Button type="primary" @click="restSubmit()">保存</Button>
          <Button type="ghost" @click="restReset()" style="margin-left: 8px">重置</Button>
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
          datasource:'0',
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
      restSubmit() {
        var self = this;
        var params = {
          struName:self.stru.struName,
          struUrl:self.stru.struUrl,
          isLeaf:self.stru.isLeaf,
          parentId:self.stru.parentId,
          isUse:self.stru.isUse,
          orderSeq:self.stru.orderSeq
        };
        if(self.stru.isLeaf == '1'){
          params.datasource = self.setting.datasource;
          params.operationType = self.setting.operationType;
          params.url = self.struPath+self.stru.struUrl;
          params.note = self.setting.note;
          params.restSql = self.setting.restSql;
          params.mockData = self.setting.mockData;

          //sql参数
          params.settingParams = JSON.stringify(self.$refs.paramsTable.getTableData());
        }

        util.ajax.post("/manage/rest/manage/insert", params);
      },
      //重置节点信息
      restReset(){
        var self = this;
        self.struName='';
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
    }
  }
</style>
