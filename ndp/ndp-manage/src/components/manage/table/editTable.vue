
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
        <Form ref="form" :model="form" :label-width="80" :rules="ruleValidate">
          <FormItem label="表名称" prop="tablecode">
            <Input v-model="form.tablecode" placeholder="请输入表名称" readonly @on-focus="showHelpBox" icon="ios-search" ></Input>
            <lambo-help-box v-model="helpBoxShow" :url="helpBoxUrl" :columns="helpBoxColumns" :title="helpBoxTitle" :muliSelect="muliSelect" @onOk="onOk" @onClear="onClear">
            </lambo-help-box>

          </FormItem>
          <FormItem label="中文名" prop="tablename">
            <Input  v-model="form.tablename" placeholder="请输入中文名"></Input>
          </FormItem>
          <FormItem label="库表描述" prop="tabledesc">
            <Input  v-model="form.tabledesc" placeholder="请输入库表描述"></Input>
          </FormItem>

        </Form>
        </Col>
      </Row>



    <Row>
      <Col span="24">
        <Card :bordered="false" :dis-hover="true">
          <p slot="title">
            <Icon type="help-buoy"></Icon> 库表数据元
          </p>
          <div slot="extra">
            <i-button type="default" style="margin-top: -5px;" @click="newTableData">新增数据元</i-button>
            <!--i-button type="default" style="margin-top: -5px;" @click="getTableData">获取数据</i-button>-->
          </div>
          <lambo-edit-table ref="table1"  v-model="datas"  :columns="columns" @on-organ-changed="onOrganChanged" @on-table-changed="onTableChanged"></lambo-edit-table>
        </Card>
      </Col>
    </Row>
    </Row>
    </Card>
  </div>
</template>

<script>
  let helpBoxEditor = {
    type:"helpbox",
    url:"/manage/dictData/list",
    columns:[
      {
        title: '字典Id',
        key: 'dictId',
        sortable: "custom"
      },
      {
        title: '字典名称',
        key: 'dictName'
      },
      {
        title: '字典描述',
        key: 'dictDesc'
      }
    ],
    title:"数据字典选择帮助框",
    callbackEvent:"on-organ-changed"
  }
  import util from '@/libs/util.js';

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
          vm.doDelete(currentRow,index);
        }
      }
    }, '删除');
  };
  let helpBoxColumns = [
    {
      title: '编号',
      key: 'table_name',
      sortable: "custom"
    }
  ];
  export default {
    name: 'edittable-table',
    // components: {
    //   canEditTable
    // },
    data () {
      return {
        helpBoxShow:false,
       helpBoxUrl:"/manage/tableData/listDbTable",
        helpBoxColumnsStr: JSON.stringify(helpBoxColumns),
        muliSelect:false,
        helpBoxTitle:"表帮助框",
        result:"",
        datas: [],
       // datacolumn:[],
        form: {

          tablecode:"",
          tablename:"",
          tabledesc:""
        },
        ruleValidate: {
          //dataschema: [
            // {required: true,message: '模式名不能为空',trigger: 'blur'},
          //   {type: 'string', max: 20, message: '名称不能超过20个字', trigger: 'blur'}
           //]
        }
      };
    },
    computed: {
      tableId: function() {
        return this.$route.query.tableId;
      },
      title: function() {
        return this.$route.meta.title;
      },
      helpBoxColumns:function(){
        return JSON.parse(this.helpBoxColumnsStr);
      },
      columns() {
        let columns = [];
        let self = this;
        columns.push({
          title: '序号',
          type: 'index',
          align: 'center'
        });
        columns.push(
          {
            title: '标识',
            align: 'center',
            key: 'cellcode',
            editor:{
              type:"helpbox",
              url:"/manage/tableData/listDbTableColumns?"+"tableName="+ this.form.tablecode,//+"&selectColumns="+JSON.stringify(this.datacolumn),
              columns:[
                {
                  title: '表名',
                  key: 'column_name',
                  sortable: "custom"
                }

              ],
              title:"组织库表",
              callbackEvent:"on-table-changed"
            }
          }
        );

        columns.push(   {
          title: '名称',
          align: 'center',
          key: 'cellName',
          editor: {
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
        });
        columns.push({
          title: '字典',
          align: 'center',
          key: 'dictName',
          editor:helpBoxEditor
        });
        columns.push( {
          title: '计量单位',
          align: 'center',
          key: 'dataUnit',
          editor: {
            type: "text",
          }
        });
        columns.push(  {
          title: '描述',
          align: 'center',
          key: 'dataDesc',
          editor: {
            type: "text",
          }
        });
        columns.push({
          title: '操作',
          align: "center",

          render: function(h, param) {
            return h('div', [
              //  editButton(self, h, param.row, param.index),
              deleteButton(self, h, param.row, param.index)
            ]);
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
        self.$refs.form.validate((valid) => {
          if (valid) {
            if (self.form.tablecode) {
              var params = {
                tableCode: self.form.tablecode,
                tableName: self.form.tablename,
                tableDesc: self.form.tabledesc,
                TableCellss: JSON.stringify(this.$refs.table1.getTableData())
              }
              if (self.tableId) {  //修改
                util.ajax.post("/manage/tableData/update/" + self.tableId, params).then(function (resp) {
                  self.$Message.success('保存成功');
                })
              } else { //新增
                util.ajax.post("/manage/tableData/create", params).then(function (resp) {
                  self.$Message.success('新增成功');
                  //self.created = true;
                })
              }

            } else {
              self.$Message.error("表名称不能为空");
            }
          }
        })

      },
      getTableData:function(){
        alert(JSON.stringify(this.$refs.table1.getTableData()));
      },
      newTableData:function(){
        this.datas.push({
          cellId: '',
          cellcode: '',
          cellName: '',
          dictId: '',
          dataUnit:'',
          dataDesc:''
        });
      },
      onOrganChanged:function(selectData,rowIndex,columnKey){
        if(selectData){
          let dictId = selectData.dictId;
          let dictName = selectData.dictName;
          this.$set(this.datas[rowIndex],'dictId',dictId);
          this.$set(this.datas[rowIndex],'dictName',dictName);
        }else{
          this.$set(this.datas[rowIndex],'dictId',"");
          this.$set(this.datas[rowIndex],'dictName',"");
        }
      },
      onTableChanged:function(selectData,rowIndex,columnKey){
        if(selectData){
          let column_name = selectData.column_name;
          // for(var i=0;i<this.datacolumn.length;i++){
          //   if(column_name==this.datacolumn[i]){
          //     this.datacolumn.splice(i, 1);
          //     break;
          //   }
          // }
          this.$set(this.datas[rowIndex],'cellcode',column_name);
        }else{
          this.$set(this.datas[rowIndex],'cellcode',"");
        }
      },
      showHelpBox:function(){
        this.helpBoxShow = true;
      },
      onOk:function(result){
        this.result=result.table_name;
        this.form.tablecode=result.table_name;
        var self = this;
        util.ajax.get("/manage/tableData/getColumn?" +"tableName="+ self.form.tablecode).then(function(resp) {
          self.datas.splice(0,self.datas.length);//清除之前的数据
          var result = resp.data.data;
          for(var i=0;i<result.length;i++){

              self.datas.push(result[i]);

          }
        });
      },
      onClear:function(){
        this.result="";
        this.form.tablecode="";
        this.form.tablename="";
        this.datas.splice(0,this.datas.length);//清除之前的数据
      },
      initData:function(){
        var self = this;
        if(self.tableId) {
          util.ajax.get("/manage/tableData/get/" + self.tableId).then(function(resp) {
            var result = resp.data.data;
            for(var i=0;i<result.length;i++){
              if(i==0){   //第一个是封装的库表
                self.form.tablecode = result[i].tableCode;
                self.form.tablename = result[i].tableName;
                self.form.tabledesc = result[i].tableDesc;
              }else{ //数据元列
                self.datas.push(result[i]);
              }
            }
          });
        }
      },
      doDelete: function(currentRow,index) {
        // if(currentRow.cellcode!=null && currentRow.cellcode.length>0){
        //   this.datacolumn.push(currentRow.cellcode);
        // }

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
