<template>
  <div class="insert-box">

    <div class="header" >
      <div class="title">服务新增</div>
      <div class="btn-box">
        <Button type="ghost" icon="ios-undo" @click="showPage('datail')" >返回</Button>
        <Button type="primary" icon="archive" @click="mockSubmit()" :loading='isloading'>保存</Button>
        <div style="clear:both;"></div>
      </div>
    </div>

    <Form :label-width="120">
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
          <RadioGroup v-model="stru.struType" >
            <Radio label="folder">文件目录</Radio>
            <Radio label="service">数据服务</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="显示顺序：">
          <Input v-model="stru.orderSeq" type="text" style="width:300px"/>
        </FormItem>
      </Card>

      <div class="part" v-if="stru.struType==='service'">
        <Card>
          <p slot="title">
            <Icon type="gear-a"></Icon>
            服务配置
          </p>
          <FormItem label="服务URL：" required>
            {{struPath}}{{stru.struUrl}}
          </FormItem>
          <FormItem label="服务类型：" required>
            <RadioGroup v-model="setting.mockType" >
              <Radio label="get">get</Radio>
              <Radio label="post">post</Radio>
            </RadioGroup>
          </FormItem>
          <!--
          <FormItem label="服务提供者：" >
            <Input v-model="setting.provider" type="text" style="width:300px"/>
          </FormItem>
          <FormItem label="服务使用者：" >
            <Input v-model="setting.user" type="text" style="width:300px"/>
          </FormItem>
          <FormItem label="认证方式：" >
            <Input v-model="setting.authMethod" type="text" style="width:300px"/>
          </FormItem>
          -->
          <FormItem label="服务描述：">
            <Input v-model="setting.note" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="描述一下服务的用途..." />
          </FormItem>
          <FormItem label="输入参数：" :required="setting.isArray">
            <div class="line-table">
              <div class="table-top">
                <div class="table-type">
                  <Checkbox v-model="setting.isArray">数组参数</Checkbox>
                  <Input v-if="setting.isArray" v-model="setting.groupKey" type="text" style="width:300px" placeholder="请输入数组参数名称"/>
                </div>
                <div class="table-btn">
                  <Button type="default" style="margin-top: -5px;" @click="addNewRow">增加一行</Button>
                </div>
                <div style="clear:both;"></div>
              </div>

              <lambo-edit-table ref="paramsTable"  v-model="paramsData" :columns="columns" ></lambo-edit-table>
              <span class="errmsg" v-html="checked.paramsMsg"></span>
            </div>
          </FormItem>
          <FormItem label="输出参数：" required>
            <Tabs class="tabs" size="small">
              <TabPane label="MOCK数据" >
                <div class="mock-top">
                  <div class="checkbox-btn">
                    <Checkbox v-model="setting.isPaging">分页数据</Checkbox>
                  </div>
                  <div class="upload-btn">
                    <Upload ref="upload"
                            :action="uploadUrl"
                            :data="{isPaging:setting.isPaging}"
                            :format="['xls','xlsx']"
                            :on-format-error="formatError"
                            :before-upload="beforeUpload"
                            :on-success="uploadSuccess"
                            :on-error="uploadError">
                      <Button type="ghost" icon="ios-cloud-upload-outline">选择EXCEL文件上传</Button> <span class="errmsg" v-html="checked.uploadMock"></span>
                    </Upload>
                  </div>
                </div>
                <Input v-model="setting.mockData" type="textarea" :autosize="{minRows: 8,maxRows: 20}" placeholder="返回json数据样例。可手动填写，也可上传excel文件自动生成。" />
                <Card class="msg-box">
                  <p slot="title">EXCEL文件说明</p>
                  <p>
                    1、支持xls、xlsx格式文件，重复上传覆盖已上传文件。<br/>
                    2、第一行为字段行，其他行为数据行；若数据行仅有1行，则结果集返回MAP，否则返回LIST<br/>
                    3、字段格式：字段名|字段类型。字段类型有：STRING、NUMBER。若数据行不能正确反映字段类型，则必须添加字段类型<br/>
                    4、示例：1）年份为文本，但是数值为2018，纯数字，则字段设置为：YEAR_CODE|STRING；2）销量为数字型，则字段设置为QTY<br/>
                  </p>
                </Card>
              </TabPane>
              <TabPane label="输出参数说明" >
                <Input v-model="setting.paramsDes" type="textarea" :autosize="{minRows: 20,maxRows:40}" placeholder="输出参数说明..." />
              </TabPane>
            </Tabs>
            <span class="errmsg" v-html="checked.mockDes"></span>
          </FormItem>
        </Card>
      </div>

      <div class="part" v-if="stru.struType==='service'">
        <Card>
          <p slot="title">
            <Icon type="ios-paper-outline"></Icon>
            开发管理
          </p>
          <FormItem label="设计负责人：">
            <Input v-model="develop.designer" type="text"  style="width:300px" placeholder="设计负责人" />
          </FormItem>
          <FormItem label="开发负责人：" >
            <Input v-model="develop.developer" type="text"  style="width:300px" placeholder="开发负责人" />
          </FormItem>
          <FormItem label="开发状态：" >
            <RadioGroup v-model="develop.status" >
              <Radio label="New">New</Radio>
              <Radio label="Coding">Coding</Radio>
              <Radio label="Fixed">Fixed</Radio>
              <Radio label="Closed">Closed</Radio>
              <Radio label="Confirm">Confirm</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="接口交流：" >
            <Input v-model="develop.note" type="textarea" :autosize="{minRows: 8,maxRows: 20}" placeholder="交流信息。" />
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
      },
      copyStruId:{
        type:String,
        default:""
      }
    },
    data () {
      return {
        isloading:false,
        uploadUrl:"/"+config.serverContext+"/manage/mock/file/put",
        stru: {
          struId:'',
          struName: '',
          struUrl:'',
          struType: 'folder',
          parentId: this.parentId,
          mockId:'',
          isUse: '1',
          orderSeq:0,
        },
        setting:{
          mockId:'',
          mockName:'',
          mockUrl:'',
          mockType:'get',
          provider:'',
          user:'',
          authMethod:'',
          isPaging:false,
          mockData:'',
          isArray:false,
          groupKey:'',
          paramsDes:'',
          note:''
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
            title: '参数名称',
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
            title: '参数类型',
            align: 'center',
            key: 'paramType',
            minWidth: 100,
            editor:{
              type:"select",
              enums:[{"value":"String","label":"String"},{"value":"int","label":"int"},{"value":"double","label":"double"},{"value":"boolean","label":"boolean"}]
            }
          },
          {
            title: '是否必须',
            align: 'center',
            minWidth: 100,
            key: 'necessary',
            editor:{
              type:"select",
              enums:[{"value":"1","label":"是"},{"value":"0","label":"否"}]
            }
          },
          {
            title: '参数说明',
            align: 'center',
            key: 'note',
            minWidth: 400,
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
        develop:{
          mockId:'',
          status:'New',
          designer:'',
          developer:'',
          note:''
        },
        checked:{
          struName:'',
          struUrl:'',
          paramsMsg:'',
          mockDes:'',
          uploadMock:''
        }
      }
    },
    methods:{
      showPage(pageType){
        this.$emit("show-page",pageType);
      },
      mockSubmit() {
        let self = this;

        self.isloading = true;

        if(self.isValidate()){
          let struParams = {
            struName:self.stru.struName,
            struUrl:self.stru.struUrl,
            struType:self.stru.struType,
            parentId:self.stru.parentId,
            isUse:self.stru.isUse,
            orderSeq:self.stru.orderSeq
          };

          //新增目录
          util.ajax.post("/manage/mock/stru/insert", struParams).then(function(resp){
            let result = resp.data;
            if(result.code == '1') {

              //更新树
              self.stru.struId = result.data.struId;
              struParams.struId = result.data.struId;
              self.setting.mockId = result.data.mockId;
              self.setting.mockName = result.data.struName;

              //新增服务
              if(self.stru.struType == 'service'){

                Promise.all([self.insertMockSetting(),self.insertMockDevelop()]).then(function(values) {
                  if(values[0]=='1' && values[1]=='1'){
                    self.isloading = false;
                    self.$Message.success('新增成功');
                    struParams.devStatus = self.develop.status;
                    self.$emit("add-tree-node", struParams);
                  }else{
                    self.isloading = false;
                    self.$Message.error('新增失败');
                  }
                });
              }else{
                self.isloading = false;
                self.$Message.success('新增成功');
                self.$emit("add-tree-node", struParams);
              }

            }else{
              self.isloading = false;
              self.$Message.error('新增失败');
            }
          });
        }else{

          self.isloading = false;

          let msg = "新增失败，请正确维护必填信息<br/><br/>";
          if(self.checked.struName != ""){
            msg += self.checked.struName+"<br/>";
          }
          if(self.checked.struUrl != "") {
            msg += self.checked.struUrl + "<br/>";
          }
          if(self.checked.paramsMsg != "") {
            msg += self.checked.paramsMsg + "<br/>";
          }
          if(self.checked.mockDes != "") {
            msg += self.checked.mockDes + "<br/>";
          }
          if(self.checked.uploadMock != "") {
            msg += self.checked.uploadMock + "<br/>";
          }

          self.$Message.error(msg);

        }
      },
      insertMockSetting:function(){
        let self = this;
        return new Promise(
          function(resolve,reject) {
            let mockParams = {
              mockId:self.setting.mockId,
              mockName:self.setting.mockName,
              mockUrl:self.struPath+self.stru.struUrl,
              mockType:self.setting.mockType,
              provider:self.setting.provider,
              user:self.setting.user,
              authMethod:self.setting.authMethod,
              isPaging:self.setting.isPaging,
              mockData:self.setting.mockData,
              paramsDes:self.setting.paramsDes,
              note:self.setting.note,
              groupKey:self.setting.isArray?self.setting.groupKey:"",
              settingParams:JSON.stringify(self.$refs.paramsTable.getTableData())
            }

            util.ajax.post("/manage/mock/setting/insert", mockParams).then(function(resp){
              let result = resp.data;
              if (result.code === 1) {
                resolve(result.code);
              }else{
                console.log("插入mock服务失败");
                reject();
              }
            });
          }
        )
      },
      insertMockDevelop:function(){
        let self = this;
        return new Promise(
          function(resolve,reject) {
            let mockDevelop = {
              mockId:self.setting.mockId,
              status:self.develop.status,
              designer:self.develop.designer,
              developer:self.develop.developer,
              note:self.develop.note
            }
            util.ajax.post("/manage/mock/develop/insert", mockDevelop).then(function(resp){
              let result = resp.data;
              if (result.code === 1) {
                resolve(result.code);
              }else{
                console.log("插入mock开发信息失败");
                reject();
              }
            });
          }
        )
      },
      isValidate:function(){
        let self = this;
        let flag = true;

        self.checked.struName = "";
        if(self.stru.struName == ''){
          self.checked.struName = "节点名称不能为空";
          flag = false;
        }else{
          if(self.siblings && self.siblings.length>0){
            for(let i=0;i<self.siblings.length;i++){
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
        }

        self.checked.paramsMsg ="";
        if(self.setting.isArray){
          if(self.setting.groupKey == ""){
            self.checked.paramsMsg = " 数组参数名称不能为空;";
            flag = false;
          }
          if(self.paramsData.length < 1){
            self.checked.paramsMsg += " 数组参数必须维护参数项;";
            flag = false;
          }else{
            for(let i=0;i<self.paramsData.length;i++){
              if(self.paramsData[i].paramKey == ""){
                self.checked.paramsMsg += " 参数名称不能为空;";
                flag = false;
                break;
              }
            }
          }
        }

        self.checked.mockDes = "";
        if(self.stru.struType == 'service'){
          if(self.setting.mockData == ''){
            self.checked.mockDes += " MOCK数据不能为空;";
            flag = false;
          }
          if(self.setting.paramsDes == ''){
            self.checked.mockDes += " 参数说明不能为空;";
            flag = false;
          }
        }

        return flag;
      },
      addNewRow:function(){
        let row = {
          paramKey: '',
          paramType: 'String',
          necessary: '1',
          note: ''
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
        let self = this;

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
      },
      getMock(){
        let self = this;
        util.ajax.get('/manage/mock/stru/query?struId='+self.copyStruId).then(function(resp) {
          let result = resp.data;
          if (result.code == '1') {
            self.stru.struName = result.data.struName;
            self.stru.struUrl = result.data.struUrl;
            self.stru.struType = result.data.struType;
            self.stru.isUse = result.data.isUse;
            self.stru.orderSeq = result.data.orderSeq;
            if(self.stru.struType == 'service'){
              self.getMockSetting();
              self.getMockDevelop();
            }
          }
        });
      },
      getMockSetting(){
        let self = this;
        util.ajax.get('/manage/mock/setting/query?mockId='+self.copyStruId).then(function(resp){
          let result = resp.data;
          if(result.code == '1'){

            let mockSetting = result.data.mockSetting;
            if(mockSetting){
              self.setting.mockName = mockSetting.mockName;
              self.setting.mockType = mockSetting.mockType;
              self.setting.provider = mockSetting.provider;
              self.setting.user = mockSetting.user;
              self.setting.authMethod = mockSetting.authMethod;
              self.setting.isPaging = mockSetting.isPaging==null?false:mockSetting.isPaging;
              self.setting.mockData = mockSetting.mockData;
              self.setting.paramsDes = mockSetting.paramsDes;
              self.setting.note = mockSetting.note;
              self.setting.createTime = mockSetting.createTime;
              self.setting.updateTime = mockSetting.updateTime;
              self.setting.createUser = mockSetting.createUser;
            }

            self.paramsData.splice(0,self.paramsData.length);
            let paramsList = result.data.mockSettingParamsList;
            if(paramsList && paramsList.length>0){
              paramsList.forEach(params => {
                let row = {
                  paramKey: params.paramKey,
                  paramType: params.paramType,
                  necessary: params.necessary,
                  necessaryName:params.necessary==0?'否':'是',
                  note:params.note
                };

                self.paramsData.push(row);

                if(null!=params.groupKey && params.groupKey!=''){
                  self.setting.isArray = true;
                  self.setting.groupKey = params.groupKey;
                }else{
                  self.setting.isArray = false;
                  self.setting.groupKey = "";
                }

              });
            }
          }

        });
      },
      getMockDevelop(){
        let self = this;
        util.ajax.get('/manage/mock/develop/query?mockId='+self.copyStruId).then(function(resp){
          let result = resp.data;
          if(result.code == '1'){

            let mockDevelop = result.data;
            if(mockDevelop){
              self.develop.mockId = mockDevelop.mockId;
              self.develop.status = mockDevelop.status;
              self.develop.designer = mockDevelop.designer;
              self.develop.developer = mockDevelop.developer;
              self.develop.note = mockDevelop.note;
            }

          }

        });
      }
    },
    mounted:function(){
      if(this.copyStruId !=""){
        this.getMock();
      }
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
          .table-top {
            .table-type{
              float:left;
            }
            .table-btn {
              float:right;
            }
            margin-bottom: 10px;
          }
        }
        .tabs {
          margin-bottom: 10px !important;
          .mock-top{
            .checkbox-btn{
              float:left;
            }
            .upload-btn{
              margin-left:100px;
            }
          }
        }
      }
      .errmsg{
        color:#ff0000;
      }
      .msg-box{
        margin-top:10px;
      }
    }
  }
</style>
