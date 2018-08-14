<template>
  <div class="insert-box">

    <div class="header" >
      <div class="title">服务明细</div>
      <div class="btn-box">
        <Button type="primary" icon="plus" @click="showPage('insert')" v-if="stru.struType==='folder'">新增</Button>
        <Button type="primary" icon="ios-plus-outline" @click="selectNode" v-if="stru.struType==='folder' && stru.struId !='0'">克隆服务</Button>
        <Button type="primary" icon="edit" @click="showPage('update')" v-if="stru.struId !='0' ">修改</Button>
        <Button type="error" icon="trash-a" @click="doDelete" v-if="stru.struId !='0' ">删除</Button>
        <div style="clear:both;"></div>
      </div>
    </div>

    <Form :label-width="120">

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
          <span v-if="stru.struType=='folder'">文件目录</span>
          <span v-else>数据服务</span>
        </FormItem>
        <FormItem label="显示顺序：" v-if="stru.struId!=0">
          {{stru.orderSeq}}
        </FormItem>
      </Card>


      <div class="part" v-if="stru.struType=='service'">
        <Card>
          <p slot="title">
            <Icon type="gear-a"></Icon>
            服务配置
          </p>
          <FormItem label="服务URL：">
            {{setting.mockUrl}}
          </FormItem>
          <FormItem label="服务类型：">
            {{setting.mockType}}
          </FormItem>
          <!--
          <FormItem label="服务提供者：" >
            {{setting.provider}}
          </FormItem>
          <FormItem label="服务使用者：" >
            {{setting.user}}
          </FormItem>
          <FormItem label="认证方式：" >
            {{setting.authMethod}}
          </FormItem>
          -->
          <FormItem label="服务描述：">
            {{setting.note}}
          </FormItem>
          <FormItem label="输入参数：">
            <div class="line-table">
              <div class="table-top" v-if="setting.isArray">
                <Checkbox v-model="setting.isArray" disabled>数组参数</Checkbox>
                <Input v-model="setting.groupKey" type="text" style="width:300px" readonly/>
              </div>
              <Table :data="paramsData" :columns="columns" ></Table>
            </div>
          </FormItem>
          <FormItem label="输出参数：">
            <Tabs class="tabs" size="small">
              <TabPane label="MOCK数据" >
                <div class="mock-top">
                  <div class="checkbox-btn">
                    <Checkbox v-model="setting.isPaging" disabled>分页数据</Checkbox>
                  </div>
                  <div class="download-btn">
                  <Button type="ghost" class="download"><Icon type="ios-cloud-download-outline"></Icon> <a :href="downloadUrl + '/'+setting.mockId " :download=setting.mockName>下载MOCK数据</a></Button>
                  </div>
                </div>
                <Input v-model="setting.mockData" type="textarea" :autosize="{minRows: 10,maxRows:20}" readonly />
              </TabPane>
              <TabPane label="输出参数说明" >
                <Input v-model="setting.paramsDes" type="textarea" :autosize="{minRows: 10,maxRows:20}" readonly />
              </TabPane>
            </Tabs>
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

      <div class="part" v-if="stru.struType=='service'">
        <Card>
          <p slot="title">
            <Icon type="ios-paper-outline"></Icon>
            开发管理
          </p>
          <FormItem label="设计负责人：">
            {{develop.designer}}
          </FormItem>
          <FormItem label="开发负责人：" >
            {{develop.developer}}
          </FormItem>
          <FormItem label="开发状态：" >
            {{develop.status}}
          </FormItem>
          <FormItem label="接口交流：" >
            <Input v-model="develop.note" type="textarea" :autosize="{minRows: 10,maxRows:20}" readonly />
          </FormItem>
        </Card>
      </div>

    </Form>

    <PopTree v-model="showPopTree" @on-change="onSelectNodeChange"></PopTree>
  </div>
</template>

<script>
  import util from '@/libs/util';
  import config from '@/config/config';
  import PopTree from "./PopTree";
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
        showPopTree:false,
        downloadUrl:"/"+config.serverContext+"/manage/mock/file/get",
        stru:{
          struId:this.struId,
          struName:this.struName,
          struUrl:'',
          struType:'',
          parentId:'',
          mockId:'',
          isUse:'',
          orderSeq:''
        },
        setting:{
          mockId:'',
          mockName:'',
          mockUrl:'',
          mockType:'',
          provider:'',
          user:'',
          authMethod:'',
          isPaging:false,
          mockData:'',
          isArray:false,
          groupKey:'',
          paramsDes:'',
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
            title: '参数名称',
            align: 'center',
            key: 'paramKey',
            minWidth: 200
          },
          {
            title: '参数类型',
            align: 'center',
            key: 'paramType',
            minWidth: 200
          },
          {
            title: '是否必须',
            align: 'center',
            minWidth: 100,
            key: 'necessaryName'
          },
          {
            title: '参数说明',
            align: 'center',
            key: 'note',
            minWidth: 200,
            editor:{
              type:"text"
            }
          }
        ],
        develop:{
          mockId:'',
          status:'',
          designer:'',
          developer:'',
          note:''
        }
      }
    },
    components:{
      PopTree
    },
    methods:{
      showPage(pageType){
        this.$emit("show-page",pageType);
      },
      selectNode(){
        this.showPopTree = true;
      },
      onSelectNodeChange(nodeId){
        this.$emit("show-page","copy",nodeId);
      },
      doDelete(){
        let self = this;
        let struId = self.stru.struId;
        util.ajax.get('/manage/mock/stru/queryChildren?parentId='+struId).then(function(resp){
          let result = resp.data;
          if(result.code == '1'){
            if(result.data && result.data.length>0){
              self.$Modal.confirm({
                title: '',
                content: '<p>含有下级节点，不能删除！</p>'
              });
            }else{
              self.$Modal.confirm({
                title: '',
                content: '<p>确定要删除吗?</p>',
                onOk: () => {
                  util.ajax.post("/manage/mock/stru/delete/" + struId).then(function(resp) {
                    self.$Message.success('删除成功');
                    //删除树的节点
                    self.$emit("delete-tree-node",struId,self.stru.parentId);
                  }).catch(function(err) {
                    self.$Message.error('删除失败,请联系系统管理员');
                  });
                }
              });
            }
          }
        });

      },
      getMock(){
        let self = this;
        if(self.struId == '0'){
          self.stru.struId = self.struId;
          self.stru.struName = self.struName;
          self.stru.struUrl = '';
          self.stru.struType = 'folder';
          self.stru.parentId = '';
          self.stru.mockId = '';
          self.stru.isUse = '1';
          self.stru.orderSeq = '';
        }else{
          util.ajax.get('/manage/mock/stru/query?struId='+self.struId).then(function(resp) {
            let result = resp.data;
            if (result.code == '1') {
              self.stru.struId = result.data.struId;
              self.stru.struName = result.data.struName;
              self.stru.struUrl = result.data.struUrl;
              self.stru.struType = result.data.struType;
              self.stru.parentId = result.data.parentId;
              self.stru.mockId = result.data.mockId;
              self.stru.isUse = result.data.isUse;
              self.stru.orderSeq = result.data.orderSeq;

              if(self.stru.struType == 'service'){
                self.getMockSetting();
                self.getMockDevelop();
              }
            }
          });
        }
      },
      getMockSetting(){
        let self = this;
        util.ajax.get('/manage/mock/setting/query?mockId='+self.stru.mockId).then(function(resp){
          let result = resp.data;
          if(result.code == '1'){

            let mockSetting = result.data.mockSetting;
            if(mockSetting){
              self.setting.mockId = mockSetting.mockId;
              self.setting.mockName = mockSetting.mockName;
              self.setting.mockUrl = mockSetting.mockUrl;
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
                  mockId: params.mockId,
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
        util.ajax.get('/manage/mock/develop/query?mockId='+self.stru.mockId).then(function(resp){
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
    watch: {
      struId(){
        this.getMock();
      }
    },
    mounted:function(){
      this.getMock();
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
    Form{
      padding:0 20px;
      .part {
        margin-top:20px;
        .line-table{
          .table-top{
            margin-bottom:10px;
          }
        }
        .tabs{
          margin-bottom:10px !important;
          .mock-top{
            .checkbox-btn{
              float:left;
            }
            .download-btn{
              margin-left:100px;
            }
          }
        }
      }
      .download {
        margin-bottom:10px;
        a{
          color:#495060;
        }
      }
    }
  }
</style>
