<template>
  <div class="insert-box">
    <div class="header" >
      <div class="title">服务修改</div>
      <div class="btn-box">
        <Button type="ghost" icon="ios-undo" @click="showPage('datail')" >返回</Button>
        <Button type="primary" icon="archive" @click="restUpdate()" :loading='isloading'>保存</Button>
        <Button type="success" icon="checkmark" @click="doCheck" v-if="setting.restId!=''">测试</Button>
        <div style="clear:both;"></div>
      </div>
    </div>

    <Form :label-width="100">
      <Card>
        <p slot="title">
          <Icon type="network"></Icon>
          节点信息
        </p>
        <FormItem label="节点名称：" required>
          <Input v-model="stru.struName" type="text" style="width:200px" placeholder="同目录下节点名称唯一"/> <span class="errmsg" v-html="checked.struName"></span>
        </FormItem>
        <FormItem label="节点URL：" required>
          {{stru.struUrl}}
        </FormItem>
        <FormItem label="节点类型：" required>
          <span v-if="stru.isLeaf==0">文件目录</span>
          <span v-else>数据服务</span>
        </FormItem>
        <FormItem label="显示顺序：">
          <Input v-model="stru.orderSeq" type="text" style="width:200px"/>
        </FormItem>
      </Card>

      <div class="part" v-if="stru.isLeaf==='1'">
        <Card>
          <p slot="title">
            <Icon type="gear-a"></Icon>
            服务
          </p>
          <FormItem label="服务URL：" required>
            {{setting.url}}
          </FormItem>
          <FormItem label="数据源：" required>
            <RadioGroup v-model="setting.datasource">
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
            <Input v-model="setting.note" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="描述一下服务的用途..." />
          </FormItem>
          <FormItem label="参数：" >
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
                <div class="file-btn">
                  <Upload ref="upload"
                          :action="uploadUrl"
                          :format="['xls','xlsx']"
                          :on-format-error="formatError"
                          :before-upload="beforeUpload"
                          :on-success="uploadSuccess"
                          :on-error="uploadError">
                    <Button type="ghost" icon="ios-cloud-upload-outline">选择EXCEL文件上传</Button> <span class="errmsg" v-html="checked.uploadMock"></span>
                  </Upload>
                  <Button type="ghost" class="download"><Icon type="ios-cloud-download-outline"></Icon> <a :href="downloadUrl + '/'+setting.restId " :download=setting.restName>下载MOCK数据</a></Button>
                </div>
                <Card class="msg-box">
                  <p slot="title">EXCEL文件说明</p>
                  <p>
                    1、支持xls、xlsx格式文件，重复上传覆盖已上传文件。<br/>
                    2、第一行为字段行，其他行为数据行；若数据行仅有1行，则结果集返回MAP，否则返回LIST<br/>
                    3、字段格式：字段名|字段类型。字段类型有：STRING、NUMBER。若数据行不能正确反映字段类型，则必须添加字段类型<br/>
                    4、示例：1）年份为文本，但是数值为2018，纯数字，则字段设置为：YEAR_CODE|STRING；2）销量为数字型，则字段设置为QTY<br/>
                  </p>
                </Card>
                <Input v-model="setting.mockData" type="textarea" :autosize="{minRows: 8,maxRows: 20}" placeholder="返回json数据样例。可手动填写，也可上传excel文件自动生成。" />
              </TabPane>
            </Tabs>
            <span class="errmsg" v-html="checked.restSql"></span>
          </FormItem>
          <FormItem label="创建时间：">
            {{setting.createTime}}
          </FormItem>
          <FormItem label="修改时间：" v-if="setting.createTime != setting.updateTime">
            {{setting.updateTime}}
          </FormItem>
          <FormItem label="创建人：" v-if="setting.createTime == setting.updateTime">
            {{setting.createUser}}
          </FormItem>
          <FormItem label="修改人：" v-if="setting.createTime != setting.updateTime">
            {{setting.createUser}}
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
      struId:{
        type:String,
        default:''
      },
      struName:{
        type:String,
        default:''
      },
      siblings:Array
    },
    data () {
      return {
        isloading:false,
        uploadUrl:"/"+config.serverContext+"/manage/mock/file/put",
        downloadUrl:"/"+config.serverContext+"/manage/mock/file/get",
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
            title: '说明',
            align: 'center',
            key: 'note',
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
          restSql:'',
          uploadMock:''
        }
      }
    },
    methods:{
      doCheck(){
        this.$emit("check-rest",this.setting.restId);
      },
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
                          defaultValue: params.defaultValue,
                          note:params.note
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
      },
      restUpdate() {
        var self = this;
        self.isloading = true;

        if(self.isValidate()) {
          var struParams = {
            struId: self.stru.struId,
            struName: self.stru.struName,
            struUrl: self.stru.struUrl,
            isLeaf: self.stru.isLeaf,
            restId: self.stru.restId,
            parentId: self.stru.parentId,
            isUse: self.stru.isUse,
            orderSeq: self.stru.orderSeq
          };

          //修改目录
          util.ajax.post("/manage/rest/stru/update/" + self.stru.struId, struParams).then(function (resp) {
            var result = resp.data;
            if (result.code == '1') {

              //修改服务
              if (self.stru.isLeaf == '1') {
                var restParams = {
                  restName: self.stru.struName,
                  datasource: self.setting.datasource,
                  operationType: self.setting.operationType,
                  url: self.setting.url,
                  note: self.setting.note,
                  restSql: self.setting.restSql,
                  mockData: self.setting.mockData,
                  createTime: self.setting.createTime,
                  settingParams: JSON.stringify(self.$refs.paramsTable.getTableData())
                }

                util.ajax.post("/manage/rest/setting/update/" + self.setting.restId, restParams).then(function (resp) {
                  var result = resp.data;
                  if (result.code == '1') {
                    self.isloading = false;
                    self.$Message.success('修改成功');
                    //更新树
                    self.$emit("update-tree-node", struParams);
                  } else {
                    self.isloading = false;
                    self.$Message.success('修改失败');
                  }
                });
              } else {
                self.isloading = false;
                self.$Message.success('修改成功');
                //更新树
                self.$emit("update-tree-node", struParams);
              }

            } else {
              self.isloading = false;
              self.$Message.success('修改失败');
            }
          });
        }else{
          self.isloading = false;
        }
      },
      isValidate:function(){
        var self = this;
        var flag = true;

        console.log("struName="+self.struName);
        console.log("stru.struName="+self.stru.struName);
        console.log(self.siblings);
        self.checked.struName = "";
        if(self.stru.struName == ''){
          self.checked.struName = "节点名称不能为空";
          flag = false;
        }else{
          if(self.siblings && self.siblings.length>0){
            for(var i=0;i<self.siblings.length;i++){
              if(self.stru.struName!=self.struName && self.stru.struName == self.siblings[i].title){
                self.checked.struName = "节点名称已存在";
                flag = false;
              }
            }
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
      .file-btn{
        position:relative;
        .download {
          position:absolute;
          top:1px;
          left:170px;
          a{
            color:#495060;
          }
        }
      }

    }
  }
</style>
