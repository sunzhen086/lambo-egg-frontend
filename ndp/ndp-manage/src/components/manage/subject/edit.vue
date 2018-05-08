
<template>
  <div>
    <Card>
      <p slot="title">
        {{title}}
      </p>
      <div slot="extra">
        <Button type="primary" @click="formSubmit">保存</Button>
        <a href="#" @click="pageGoBack">
          <Icon type="android-arrow-back"></Icon> 返回</a>

      </div>
      <Row>
        <Col span="12" offset="6">
        <Form ref="form" :model="form" :label-width="80" >
          <FormItem label="专题分类" prop="subjectType">
            <Select v-model="subjectType" style="width:200px">
              <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>

        </Form>

        <Form  ref="formData" :model="formData" :label-width="80" :rules="ruleValidate">

          <FormItem label="所属分类" prop="categoryName">
            <Input v-model="formData.categoryName" placeholder="请选择分类" readonly @on-focus="showCateGoryHelpBox" icon="ios-search"></Input>
            <lambo-help-box v-model="helpBoxCateGory" :url="helpCateGoryBoxUrl" :columns="helpCateGoryBoxColumns" :title="helpCateGoryBoxTitle" :muliSelect="false" @onOk="onOk" @onClear="onClear">
            </lambo-help-box>
          </FormItem>
          <FormItem label="专题名称" prop="subjectName">
            <Input  v-model="formData.subjectName" placeholder="请输入专题名称"></Input>
          </FormItem>
          <FormItem label="专题描述" prop="tableDesc">
            <Input  v-model="formData.subjectDesc" placeholder="请输入专题描述"></Input>
          </FormItem>
          <FormItem v-if="subjectType==1" label="库表" prop="tableCode">
            <Input v-model="formData.tableCode" placeholder="请选择库表" readonly @on-focus="showTableHelpBox" icon="ios-search"></Input>
            <lambo-help-box v-model="helpBoxTable" :url="helpTableBoxUrl" :columns="helpTableBoxColumns" :title="helpTableBoxTitle" :muliSelect="false" @onOk="onOkTable" @onClear="onClearTable">
            </lambo-help-box>

          </FormItem>
          <FormItem label="时间" prop="subjectTime">
            <Select v-model="formData.subjectTime" style="width:200px">
              <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="组织" prop="subjectOrgan">
            <Select v-model="formData.subjectOrgan" style="width:200px">
              <Option v-for="item in organList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="指标" prop="subjectTarget">
            <Tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose2">{{ item }}</Tag>
            <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加指标</Button>
            <Modal
              title="指标"
              v-model="modal7"
              :closable="false"
              @on-ok="asyncOK">
              <Input v-model="target" placeholder="请输入指标"></Input>
            </Modal>
          </FormItem>
        </Form>
        </Col>
      </Row>


      <Row v-if="subjectType==1">
        <Col   span="24">
        <Card :bordered="false" :dis-hover="true">
          <p slot="title">
            <Icon type="help-buoy"></Icon> 数据项信息
          </p>
          <div slot="extra">
            <!--i-button type="default" style="margin-top: -5px;" @click="getTableData">获取数据</i-button-->
          </div>
          <lambo-edit-table ref="table1"  v-model="datas"  :columns="columns" ></lambo-edit-table>
        </Card>
        </Col>
      </Row>
      <Row v-if="subjectType==2">
        <Col  span="12" offset="6">


        </Col>
      </Row>
      <Row v-if="subjectType==2">
        <Col span="24">
        <Card :bordered="false" :dis-hover="true">
          <p slot="title">
            <Icon type="help-buoy"></Icon> 文件信息
          </p>
          <div slot="extra">

            <Upload
              ref="upload"
              :show-upload-list="false"
              :on-success="handleSuccess"
              :format="['docx','doc']"
              :max-size="5120"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              :action="uploadUrl">

              <Button type="ghost" icon="upload">上传文件</Button>

            </Upload>
            <!--i-button type="default" style="margin-top: -5px;" @click="getTableData">获取数据</i-button-->
          </div>
          <lambo-edit-table ref="table1"  v-model="datas" :columns="columns" ></lambo-edit-table>
        </Card>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
  import util from '@/libs/util.js';
  import config from '@/config/config';
  //删除按钮
  const deleteButton = (vm, h, currentRow, index) => {
    return h('Button', {
      props: {
        type: "error",
        size: "small"
      },
      style: {
        margin: '0 5px'
      },
      on: {
        'click': () => {
          vm.doDelete(currentRow.dictId,index);
        }
      }
    }, '删除');
  };
  let helpCateGoryBoxColumns = [
    {
      title: '编号',
      key: 'categoryId',
      sortable: "custom"
    },
    {
      title: '分类名称',
      key: 'categoryName',
      sortable: "custom"
    }
  ];
  let helpTableBoxColumns = [
    {
      title: '表名Id',
      key: 'tableId',
      sortable: "custom"
    },
    {
      title: '表名',
      key: 'tableCode',
      sortable: "custom"
    },
    {
      title: '描述',
      key: 'tableDesc',
      sortable: "custom"
    }
  ];
  export default {
    name: 'editsubject',
    data () {
      return {
        helpBoxCateGory:false,
        helpCateGoryBoxUrl:"/manage/category/list",
        helpCateGoryBoxColumns: helpCateGoryBoxColumns,
        helpCateGoryBoxTitle:"分类帮助框",

        helpBoxTable:false,
        helpTableBoxUrl:"/manage/tableData/list",
        helpTableBoxColumns: helpTableBoxColumns,
        helpTableBoxTitle:"库表帮助框",
        typeList: [
          {
            value: '1',
            label: '表格'
          },
          {
            value: '2',
            label: '文件',
          }],
        timeList:[],
        count: [],
        organList:[],
        result:"",
        datas: [],
        modal7:false,
        target:"", //临时值
        subjectType:"",
        form: {


        },
        formDoc: {
          sub:""
        },
        uploadUrl:"/"+config.fileServerContext+"/manage/file/put",
        formData: {
          categoryName:"",
          categoryId:"",
          subjectName:"",
          subjectDesc:"",
          tableCode:"",
          tableId:"",
          subjectTime:"",
          subjectOrgan:"",
          subjectTarget:""
        },
        ruleValidate: {

        }
      };
    },
    computed: {
      title:function(){
        return this.$route.meta.title;
      },
      subjectId: function() {
        return this.$route.query.subjectId;
      },
      columns() {
        let columns = [];
        let self = this;
        if(this.subjectType==2){
          columns.push({
            title: '序号',
            type: 'index',
            align: 'center'
          });
          columns.push({
            title: '文件名',
            key: 'docName',
            align: 'center'
          });
          columns.push({
            title: '文件ID',
            key: 'docSaveId',
            align: 'center'
          });
          columns.push({
            title: '操作',
            align: "center",
            render: function(h, param) {
              return h('div', [
                deleteButton(self, h, param.row, param.index)
              ]);
            }
          });
        }else{
          columns.push({
            title: '序号',
            type: 'index',
            align: 'center'
          });
          columns.push({
            title: '中文名称',
            key: 'cellName',
            align: 'center',
            editor: {
              type: "text",
            }
          });
          columns.push( {
            title: '字段名称',
            align: 'center',
            key: 'cellCode',
          });
          columns.push(
            {
              title: '维度',
              align: 'center',
              key: 'searchCondition',
              editor:{
                type:"select",
                enums:[{"value":"province","label":"省公司纬度"},{"value":"city","label":"市公司纬度"},{"value":"brand","label":"品牌纬度"},{"value":"item","label":"商品纬度"},{"value":"year","label":"日期纬度(年)"},{"value":"month","label":"日期纬度(月)"},{"value":"date","label":"日期纬度(日)"}]
              }
            });
          columns.push(
            {
              title: '显示',
              align: 'center',

              key: 'isShow',
              editor:{
                type:"select",
                enums:[{"value":"1","label":"显示"},{"value":"0","label":"隐藏"}]
              }
            });
          columns.push( {
            title: '排序',
            align: 'center',
            key: 'columnOrder',
            editor: {
              type: "text",
            }
          });
          columns.push( {
            title: '设置',
            align: 'center',
            key: 'searchSetting',
            editor: {
              type: "text",
            }
          });
        }
        return columns;
      }
    },watch:{
      subjectType(curVal,oldVal){
        if(!this.subjectId){
          if(this.datas.length>0){
            this.datas.splice(0,this.datas.length);//清除之前的数据
          }
        }
      }
    },
    methods: {
      pageGoBack(){
        this.$router.go(-1);
      },
      handleFormatError:function(){
        this.$Message.error("文件的格式只能为:'docx'");
      },
      handleMaxSize:function(){
        this.$Message.error("文件的大小不能超过512K");
      },
      handleBeforeUpload:function(){

      },
      newTableData:function(){
        let row = {
          dictKey: '',
          dictValue:''
        }
        this.datas.push(row);
      },
      asyncOK () {
        this.count.push(this.target);
        this.target="";
      },
      handleSuccess:function(response, file, fileList){
        console.log(response.data);
        if(response.code === 1 && response.data.length > 0){
          //this.formDoc.sub = response.data[0].originalName;
          let row = {
            docName:response.data[0].originalName,
            docSaveId:response.data[0].name
          }
          this.datas.push(row);
        }else{
          this.$message.error("文件上传失败，请联系系统管理员")
        }
      },handleAdd () {
        this.modal7 = true;
      },
      handleClose2 (event, name) {
        const index = this.count.indexOf(name);
        this.count.splice(index, 1);
      },
      formSubmit(){
        var self = this;
        if(self.subjectType==1){
          var params = {
            tableCode: self.formData.tableCode,
            tableId: self.formData.tableId,
            subjectDesc: self.formData.subjectDesc,
            subjectName: self.formData.subjectName,
            categoryId: self.formData.categoryId,
            subjectColumns:JSON.stringify(this.$refs.table1.getTableData()),
            subjectType:self.subjectType,
            subjectTime:self.formData.subjectTime,
            subjectOrgan:self.formData.subjectOrgan,
            subjectTag:JSON.stringify(self.count)
          }
        }else{
          var params = {
            tableCode: self.formData.tableCode,
            tableId: 0,
            subjectDesc: self.formData.subjectDesc,
            subjectName: self.formData.subjectName,
            categoryId: self.formData.categoryId,
            subjectColumns:JSON.stringify(this.$refs.table1.getTableData()),
            subjectType:self.subjectType,
            subjectTime:self.formData.subjectTime,
            subjectOrgan:self.formData.subjectOrgan,
            subjectTag:JSON.stringify(self.count)
          }

        }
        if(self.subjectId) {  //修改
          util.ajax.post("/manage/subjectData/update/" + self.subjectId, params).then(function(resp) {
            self.$Message.success('保存成功');
          })
        } else { //新增
          util.ajax.post("/manage/subjectData/create", params).then(function(resp) {
            self.$Message.success('新增成功');
          })
        }


      },
      getTableData:function(){
        alert(JSON.stringify(this.$refs.table1.getTableData()));
      },
      showCateGoryHelpBox:function(){
        this.helpBoxCateGory = true;
      },
      showTableHelpBox:function(){
        this.helpBoxTable = true;
      },
      onOk:function(result){
        this.formData.categoryId=result.categoryId;
        this.formData.categoryName=result.categoryName;
      },
      onClear:function(){
        //this.result="";
        this.formData.categoryId="";
        this.formData.categoryName="";
      },
      onOkTable:function(result){
        var self = this;
        this.formData.tableCode=result.tableCode;
        this.formData.tableId=result.tableId;
        if(self.formData.tableId){
          var params = {
            tableId: self.formData.tableId
          }
          util.ajax.post("/manage/tableData/listTableCellForSubject/",params).then(function(resp) {
            var data = resp.data.data;
            self.datas.splice(0,self.datas.length);//清除之前的数据
            for(var i=0;i<data.length;i++){
              self.datas.push(data[i]);
            }
          })
        }
      },
      onClearTable:function(){
        //this.result="";
        this.formData.tableCode="";
        this.formData.tableId="";
      },
      initData:function(){
        var self = this;
        //初始化数据
        util.ajax.get("/manage/subjectData/getInitData" ).then(function(resp) {
          var results = resp.data.data;
          self.timeList=results[0];
          self.organList=results[1];

        });
        if(self.subjectId) {   //修改
          util.ajax.get("/manage/subjectData/get/" + self.subjectId).then(function(resp) {
            var result = resp.data.data;
            //console.log(result);
            for(var i=0;i<result.length;i++){
              if(i==0){   //第一个是封装的专题
                self.formData.tableCode = result[i].tableCode;
                self.formData.tableId = result[i].tableId;
                self.formData.categoryName = result[i].categoryName;
                self.formData.categoryId= result[i].categoryId;
                self.formData.subjectName= result[i].subjectName;
                self.formData.subjectDesc= result[i].subjectDesc;
                self.formData.subjectTime= result[i].periodType;
                self.formData.subjectOrgan= result[i].organType;
                self.subjectType= result[i].subjectType;
                self.count=result[i].subjectTag;
              }else{ //专题列
                self.datas.push(result[i]);
              }
            }
          });
          // util.ajax.get("/manage/subjectData/get/" + self.subjectId).then(function(resp) {
          //   var result = resp.data.data;
          //   self.form.tableCode = result.tableCode;
          //   self.form.tableId = result.tableId;
          //   self.form.categoryName = result.categoryName;
          //   self.form.categoryId= result.categoryId;
          //   self.form.subjectName= result.subjectName;
          //   self.form.subjectDesc= result.subjectDesc;
          // });
          // util.ajax.get("/manage/subjectData/listColumn/"+self.subjectId).then(function(resp) {
          //   var data = resp.data.data;
          //   for(var i=0;i<data.rows.length;i++){
          //     self.datas.push(data.rows[i]);
          //   }
          // })
        }else{
          self.subjectType="1"; //默认是表格
        }
      },
      doDelete: function(cellId,index) {
        var self = this;
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗?</p>',
          onOk: () => {
            self.datas.splice(index,1);
          }
        });
      }
    },
    mounted(){
      this.initData();
    }

  };
</script>
