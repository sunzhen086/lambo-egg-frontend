
<template>
  <div>
    <Card>
      <p slot="title">
      </p>
      <div slot="extra">
        <Button type="primary" @click="formSubmit">保存</Button>
        <a href="#" @click="pageGoBack">
          <Icon type="android-arrow-back"></Icon> 返回</a>

      </div>
      <Row>
        <Col span="12" offset="6">
        <Form ref="form" :model="form" :label-width="80" :rules="ruleValidate">
          <FormItem label="所属分类" prop="categoryName">
            <Input v-model="form.categoryName" placeholder="请选择分类" readonly @on-focus="showCateGoryHelpBox" icon="ios-search"></Input>
            <lambo-help-box v-model="helpBoxCateGory" :url="helpCateGoryBoxUrl" :columns="helpCateGoryBoxColumns" :title="helpCateGoryBoxTitle" :muliSelect="muliSelect" @onOk="onOk" @onClear="onClear">
            </lambo-help-box>
          </FormItem>
          <FormItem label="专题名称" prop="subjectName">
            <Input  v-model="form.subjectName" placeholder="请输入专题名称"></Input>
          </FormItem>
          <FormItem label="专题描述" prop="tableDesc">
            <Input  v-model="form.subjectDesc" placeholder="请输入专题描述"></Input>
          </FormItem>
          <FormItem label="库表" prop="tableCode">
            <Input v-model="form.tableCode" placeholder="请选择库表" readonly @on-focus="showTableHelpBox" icon="ios-search"></Input>
            <lambo-help-box v-model="helpBoxTable" :url="helpTableBoxUrl" :columns="helpTableBoxColumns" :title="helpTableBoxTitle" :muliSelect="muliSelect" @onOk="onOkTable" @onClear="onClearTable">
            </lambo-help-box>

          </FormItem>
        </Form>
        </Col>
      </Row>

    </Card>
    <Row>
      <Col span="24">
      <Card>
        <p slot="title">
          <Icon type="help-buoy"></Icon> 数据项信息
        </p>
        <div slot="extra">
          <i-button type="default" style="margin-top: -5px;" @click="getTableData">获取数据</i-button>
        </div>
        <lambo-edit-table ref="table1"  v-model="datas"  :columns="columns" ></lambo-edit-table>
      </Card>
      </Col>
    </Row>

  </div>
</template>

<script>
  import util from '@/libs/util.js';
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
        helpCateGoryBoxUrl:"/manage/cateGoryData/list",
        helpCateGoryBoxColumnsStr: JSON.stringify(helpCateGoryBoxColumns),
        muliSelect:false,
        helpCateGoryBoxTitle:"分类帮助框",
        helpBoxTable:false,
        helpTableBoxUrl:"/manage/tableData/list",
        helpCateTableColumnsStr: JSON.stringify(helpTableBoxColumns),
        helpTableBoxTitle:"库表帮助框",
        result:"",
        datas: [],
        datacolumn:[],
        form: {
          categoryName:"",
          categoryId:"",
          subjectName:"",
          subjectDesc:"",
          tableCode:"",
          tableId:""
        },
        ruleValidate: {
          // tableCode: [
          //   {required: true,message: '库表不能为空',trigger: 'blur'},
          //   {type: 'string', max: 20, message: '名称不能超过20个字', trigger: 'blur'}
          // ],
          // categoryName: [
          //   {required: true,message: '分类不能为空',trigger: 'blur'},
          //   {type: 'string', max: 20, message: '名称不能超过20个字', trigger: 'blur'}
          // ]
        }
      };
    },
    computed: {
      subjectId: function() {
        return this.$route.query.subjectId;
      },
      helpCateGoryBoxColumns:function(){
        return JSON.parse(this.helpCateGoryBoxColumnsStr);
      },
      helpTableBoxColumns:function(){
        return JSON.parse(this.helpCateTableColumnsStr);
      },
      columns() {
        let columns = [];
        let self = this;
        columns.push({
          title: '序号',
          type: 'index',
          width: '15%',
          align: 'center'
        });
        columns.push({
          title: '中文名称',
          key: 'cellName',
          align: 'center',
          width: '15%',
          editor: {
            type: "text",
          }
        });
        columns.push( {
          title: '字段名称',
          align: 'center',
          key: 'cellCode',
          width: '15%',
          editor: {
            type: "text",
          }
        });
        columns.push(
          {
            title: '维度',
            align: 'center',
            width: '15%',
            key: 'searchCondition',
            editor:{
              type:"select",
              enums:[{"value":"province","label":"省公司纬度"},{"value":"city","label":"市公司纬度"},{"value":"brand","label":"品牌纬度"},{"value":"item","label":"商品纬度"},{"value":"year","label":"日期纬度(年)"},{"value":"month","label":"日期纬度(月)"},{"value":"date","label":"日期纬度(日)"}]
            }
          });
        columns.push( {
          title: '设置',
          align: 'center',
          key: 'searchSetting',
          width: '15%',
          editor: {
            type: "text",
          }
        });
        columns.push( {
          title: '排序',
          align: 'center',
          key: 'columnOrder',
          width: '15%',
          editor: {
            type: "text",
          }
        });
        columns.push(
        {
          title: '操作',
          align: 'center',

          key: 'isShow',
          editor:{
          type:"select",
            enums:[{"value":"1","label":"显示"},{"value":"0","label":"隐藏"}]
        }
        });
        return columns;
      }
    },
    methods: {
      pageGoBack(){
        this.$router.go(-1);
      },
      formSubmit(){
            var self = this;
            var params = {
              tableCode: self.form.tableCode,
              tableId: self.form.tableId,
              subjectDesc: self.form.subjectDesc,
              subjectName: self.form.subjectName,
              categoryId: self.form.categoryId,
              subjectColumns:JSON.stringify(this.$refs.table1.getTableData())
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
        this.form.categoryId=result.categoryId;
        this.form.categoryName=result.categoryName;
      },
      onClear:function(){
        //this.result="";
        this.form.categoryId="";
        this.form.categoryName="";
      },
      onOkTable:function(result){
        var self = this;
        this.form.tableCode=result.tableCode;
        this.form.tableId=result.tableId;
        if(self.form.tableId){
          var params = {
            tableId: self.form.tableId
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
        this.form.tableCode="";
        this.form.tableId="";
      },
      initData:function(){
        var self = this;
        if(self.subjectId) {   //修改
          util.ajax.get("/manage/subjectData/get/" + self.subjectId).then(function(resp) {
            var result = resp.data.data;
            //console.log(result);
            for(var i=0;i<result.length;i++){
              if(i==0){   //第一个是封装的专题
                self.form.tableCode = result[i].tableCode;
                self.form.tableId = result[i].tableId;
                self.form.categoryName = result[i].categoryName;
                self.form.categoryId= result[i].categoryId;
                self.form.subjectName= result[i].subjectName;
                self.form.subjectDesc= result[i].subjectDesc;
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
        }
      }
    },
    mounted(){
      this.initData();
    }

  };
</script>
