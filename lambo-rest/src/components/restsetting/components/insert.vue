<template>
  <div class="insert-box">

    <div class="header" >
      <div class="title">服务新增</div>
      <div class="btn-box">
        <Button type="ghost" icon="ios-undo" @click="showPage('datail')" >返回</Button>
        <Button type="primary" icon="archive" @click="restSubmit()" :loading='isloading'>保存</Button>
        <div style="clear:both;"></div>
      </div>
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
        <FormItem label="节点名称：" required>
          <Input v-model="stru.struName" type="text"  style="width:300px" placeholder="同目录下节点名称唯一" /> <span class="errmsg" v-html="checked.struName"></span>
        </FormItem>
        <FormItem label="节点URL：" required>
          <Input v-model="stru.struUrl" type="text"  style="width:300px" placeholder="格式：/***，以‘/’开头字母数字任意组合 " /> <span class="errmsg" v-html="checked.struUrl"></span>
        </FormItem>
        <FormItem label="节点类型：" required>
          <RadioGroup v-model="stru.isLeaf" >
            <Radio label="0">文件目录</Radio>
            <Radio label="1">数据服务</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="显示顺序：">
          <Input v-model="stru.orderSeq" type="text" style="width:300px"/>
        </FormItem>
      </Card>

      <div class="part" v-if="stru.isLeaf==='1'">
        <Card>
          <p slot="title">
            <Icon type="gear-a"></Icon>
            服务
          </p>
          <FormItem label="服务URL：" required>
            {{struPath}}{{stru.struUrl}}
          </FormItem>
          <FormItem label="数据源：" required>
            <RadioGroup v-model="setting.datasource" >
              <Radio v-for="item in dsObj" :label="item.dsId">{{item.dsName}}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="操作类型：" required>
            <RadioGroup v-model="setting.operationType" >
              <Radio label="selectList">selectList</Radio>
              <Radio label="selectOne">selectOne</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="服务描述：">
            <Input v-model="setting.note" type="text"  placeholder="描述一下服务的用途..." />
          </FormItem>
          <FormItem label="参数：">
            <div class="line-table">
              <div class="table-btn">
                <Button type="default" style="margin-top: -5px;" @click="addNewRow">增加一行</Button>
              </div>
              <lambo-edit-table ref="paramsTable"  v-model="paramsData" :columns="columns" ></lambo-edit-table>
            </div>
          </FormItem>
          <FormItem label="取数逻辑：" required>
            <Tabs class="tabs" size="small">
              <TabPane label="SQL模板" >
                <Input v-model="setting.restSql" type="textarea" :autosize="{minRows: 20,maxRows:40}" placeholder="数据服务取数sql..." />
              </TabPane>
              <TabPane label="MOCK数据" >
                <Upload ref="upload"
                        :action="uploadUrl"
                        :format="['xls','xlsx']"
                        :on-format-error="formatError"
                        :before-upload="beforeUpload"
                        :on-success="uploadSuccess"
                        :on-error="uploadError">
                  <Button type="ghost" icon="ios-cloud-upload-outline">选择EXCEL文件上传</Button> <span class="errmsg" v-html="checked.uploadMock"></span>
                </Upload>
                <Card class="msg-box">
                  <p slot="title">EXCEL文件说明</p>
                  <p>
                    1、支持xls、xlsx格式文件，重复上传覆盖已上传文件。<br/>
                    2、第一行为字段行，其他行为数据行；若数据行仅有1行，则结果集返回MAP，否则返回LIST<br/>
                    3、字段格式：字段名|字段类型。字段类型有：STRING、NUMBER。若数据行不能正确反映字段类型，则必须添加字段类型<br/>
                    4、示例：1）年份为文本，但是数值为2018，纯数字，则字段设置为：YEAR_CODE|STRING；2）销量为数字型，则字段设置为QTY<br/>
                  </p>
                </Card>
                <Input v-model="setting.mockData" type="textarea" :autosize="{minRows: 10,maxRows: 20}" placeholder="返回json数据样例。可手动填写，也可上传excel文件自动生成。" />
              </TabPane>
            </Tabs>
            <span class="errmsg" v-html="checked.restSql"></span>
          </FormItem>
        </Card>
      </div>
    </Form>
  </div>
</template>

<script>
  import util from '@/libs/util';
  import config from '@/config/config';
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
      },
      siblings:{
        type:Array,
        default:[]
      }
    },
    data () {
      return {
        isloading:false,
        uploadUrl:"/"+config.serverContext+"/manage/mock/file/put",
        dsObj:[],
        stru: {
          struId:'',
          struName: '',
          struUrl:'',
          isLeaf: '0',
          parentId: this.parentId,
          restId:'',
          isUse: '1',
          orderSeq:0,
        },
        setting:{
          restId:'',
          restName:'',
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
        ],
        checked:{
          struName:'',
          struUrl:'',
          restSql:'',
          uploadMock:''
        }
      }
    },
    methods:{
      showPage(pageType){
        this.$emit("show-page",pageType);
      },
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

        if(self.isValidate()){
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
              self.setting.restId = result.data.restId;
              self.setting.restName = result.data.struName;

              self.$emit("add-tree-node", struParams);

              //新增服务
              if(self.stru.isLeaf == '1'){
                var restParams = {
                  restId:self.setting.restId,
                  restName:self.setting.restName,
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
                    self.$Message.success('新增成功');
                  }else{
                    self.isloading = false;
                    self.$Message.success('修改成功');
                  }
                });
              }else{
                self.isloading = false;
                self.$Message.success('新增成功');
              }
            }else{
              self.isloading = false;
              self.$Message.success('修改成功');
            }
          });
        }else{
          self.isloading = false;
        }
      },
      isValidate:function(){
        var self = this;
        var flag = true;

        self.checked.struName = "";
        if(self.stru.struName == ''){
          self.checked.struName = "节点名称不能为空";
          flag = false;
        }else{
          if(self.siblings && self.siblings.length>0){
            for(var i=0;i<self.siblings.length;i++){
              if(self.stru.struName == self.siblings[i].title){
                self.checked.struName = "节点名称已存在";
                flag = false;
              }
            }
          }
        }

        self.checked.struUrl = "";
        if(self.stru.struUrl == ''){
          self.checked.struUrl = "节点URL不能为空";
          flag = false;
        }else if(!self.stru.struUrl.startsWith('/')){
          self.checked.struUrl = "节点URL必须以‘/’开头";
          flag = false;
        }else{
          var reg = new RegExp(/^\w+$/);
          if(!reg.test((self.stru.struUrl).substr(1))){
            self.checked.struUrl = "节点URL格式不正确";
            flag = false;
          }
        }

        self.checked.restSql = "";
        if(self.stru.isLeaf == '1'){
          if(self.setting.restSql == ''){
            self.checked.restSql = "SQL模板不能为空";
            flag = false;
          }
          if(self.setting.mockData == ''){
            self.checked.restSql += " MOCK数据不能为空";
            flag = false;
          }
        }

        return flag;
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
      },
      beforeUpload:function(file){
        this.checked.uploadMock = "";
        this.$refs.upload.clearFiles();
      },
      uploadSuccess:function(response, file){
        var self = this;

        if(response.code==1){
          self.setting.mockData = response.data;
          file.name += " 上传成功";
        }else{
          self.checked.uploadMock = "文件 " + file.name + " 解析失败，请联系管理员。";
        }
      },
      uploadError:function(error, file){
        this.checked.uploadMock = "文件 " + file.name + " 上传失败，请联系管理员。";
      },
      formatError (file) {
        this.checked.uploadMock = "文件 " + file.name + " 格式不正确，请选择excel文件。";
      }
    },
    mounted:function(){
      this.setDsObj();
    }
  }
</script>

<style lang="less" scoped>
  .insert-box{
    .header{
      height:70px;
      padding:0 20px;
      margin-bottom:20px;
      border-bottom:1px solid #e9eaec;
      position:relative;
      .title{
        font-size:16px;
        line-height:1;
        font-weight:bold;
        border-left:4px solid #495060;
        text-indent:10px;
        position:absolute;
        top:28px;
      }
      .btn-box{
        position:absolute;
        right:20px;
        top:20px;
        Button{
          float:left;
          margin-left:5px;
        }
      }
    }
    Form {
      padding: 0 20px;
      .part {
        margin-top: 20px;
        .line-table {
          .table-btn {
            margin-bottom: 10px;
          }
        }
        .tabs {
          margin-bottom: 10px !important;
        }
      }
      .errmsg{
        color:#ff0000;
      }
      .msg-box{
        margin-bottom:10px;
      }
    }
  }
</style>
