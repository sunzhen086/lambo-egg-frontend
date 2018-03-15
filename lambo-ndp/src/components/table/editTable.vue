
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
            <Input v-model="form.tablecode" placeholder="请输入表名称"></Input>
            <lambo-help-box v-model="helpBoxShow" :url="helpBoxUrl" :columns="helpBoxColumns" :title="helpBoxTitle" :muliSelect="muliSelect" @onOk="onOk" @onClear="onClear">
            </lambo-help-box>
            <Button @click="showHelpBox">打开帮助框</Button>
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


    </Card>
    <Row>
      <Col span="24">
      <Card>
        <p slot="title">
          <Icon type="help-buoy"></Icon> 库表数据元
        </p>
        <div slot="extra">
          <i-button type="default" style="margin-top: -5px;" @click="newTableData">新增数据元</i-button>
          <i-button type="default" style="margin-top: -5px;" @click="getTableData">获取数据</i-button>
        </div>
        <lambo-edit-table ref="table1"  v-model="datas"  :columns="columns" @on-organ-changed="onOrganChanged" @on-table-changed="onTableChanged"></lambo-edit-table>
      </Card>
      </Col>
    </Row>
    </Row>
  </div>
</template>

<script>
  let helpBoxEditor = {
    type:"helpbox",
    url:"/manage/dictdata/list",
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
        helpBoxUrl:"/manage/tabledata/listDbTable",
        helpBoxColumnsStr: JSON.stringify(helpBoxColumns),
        muliSelect:false,
        helpBoxTitle:"表帮助框",
        result:"",
        datas: [],
        datacolumn:[],
        form: {
          tablecode:"",
          tablename:"",
          tabledesc:""
        },
        ruleValidate: {
          tablecode: [
            {required: true,message: '名称不能为空',trigger: 'blur'},
            {type: 'string', max: 20, message: '名称不能超过20个字', trigger: 'blur'}
          ]
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
          width: 180,
          align: 'center'
        });
        columns.push(
          {
            title: '标识',
            align: 'center',
            key: 'cellCode',
            editor:{
              type:"helpbox",
              url:"/manage/tabledata/listDbTableColumns?"+"tableName="+ this.form.tablecode+"&selectColumns="+JSON.stringify(this.datacolumn),
              columns:[
                {
                  title: '表名',
                  key: 'COLUMN_NAME',
                  sortable: "custom"
                }

              ],
              title:"组织库表",
              callbackEvent:"on-table-changed"
            }
          }
          // {
          //   title: '标识',
          //   align: 'center',
          //   key: 'cellCode',
          //   width: 300,
          //   editor: {
          //     type: "text",
          //     //校验函数,参数分别为：新值、旧值、行数据、行号
          //     validate: function (newVal, oldVal, row, index) {
          //       if (newVal.trim() == "") {
          //         return {
          //           valid: false,
          //           msg: "输入不能为空！"
          //         }
          //       }
          //       return {valid: true}
          //     }
          //   }
          // }
        );

        columns.push(   {
          title: '名称',
          align: 'center',
          key: 'cellName',
          width: 300,
          editor: {
            type: "text",
            //校验函数,参数分别为：新值、旧值、行数据、行号
            validate: function (newVal, oldVal, row, index) {
              if (newVal.trim() == "") {
                return {
                  valid: false,
                  msg: "输入不能为空！"
                }
              }
              return {valid: true}
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
          width: 300,
          editor: {
            type: "text",
            //校验函数,参数分别为：新值、旧值、行数据、行号
            validate: function (newVal, oldVal, row, index) {
              if (newVal.trim() == "") {
                return {
                  valid: false,
                  msg: "输入不能为空！"
                }
              }
              return {valid: true}
            }
          }
        });
        columns.push(  {
          title: '描述',
          align: 'center',
          key: 'dataDesc',
          width: 300,
          editor: {
            type: "text",
            //校验函数,参数分别为：新值、旧值、行数据、行号
            validate: function (newVal, oldVal, row, index) {
              if (newVal.trim() == "") {
                return {
                  valid: false,
                  msg: "输入不能为空！"
                }
              }
              return {valid: true}
            }
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
          if(valid) {
            var params = {
              tableCode: self.form.tablecode,
              tableName: self.form.tablename,
              tableDesc: self.form.tabledesc,
              TableCellss:JSON.stringify(this.$refs.table1.getTableData())
            }
            if(self.tableId) {  //修改
              util.ajax.post("/manage/tabledata/update/" + self.tableId, params).then(function(resp) {
                self.$Message.success('保存成功');
              }).catch(function(err) {
                self.$Message.error('保存失败,请联系系统管理员');
              });
            } else { //新增
              util.ajax.post("/manage/tabledata/create", params).then(function(resp) {
                self.$Message.success('新增成功');
                //self.created = true;
              }).catch(function(err) {
                self.$Message.error('新增失败,请联系系统管理员');
              });
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
          cellCode: '',
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
          let COLUMN_NAME = selectData.COLUMN_NAME;
          //let dictName = selectData.dictName;
          //console.log("COLUMN_NAME:"+COLUMN_NAME);
          this.datacolumn.push(COLUMN_NAME);
          this.$set(this.datas[rowIndex],'cellCode',COLUMN_NAME);
          //this.$set(this.datas[rowIndex],'dictName',dictName);
        }else{
          this.$set(this.datas[rowIndex],'cellCode',"");
          //this.$set(this.datas[rowIndex],'dictName',"");
        }
      },
      showHelpBox:function(){
        this.helpBoxShow = true;
      },
      onOk:function(result){
        //this.form.tablecode = JSON.stringify(result);
        //console.log(result.table_name);
        this.result=result.table_name;
        this.form.tablecode=result.table_name;
        //console.log(this.datacolumns);
      },
      onClear:function(){
        this.result="";
      },
      initData:function(){
        var self = this;
        if(self.tableId) {
          util.ajax.get("/manage/tabledata/get/" + self.tableId).then(function(resp) {
            var result = resp.data.data;
            self.form.tablecode = result.tableCode;
            self.form.tablename = result.tableName;
            self.form.tabledesc = result.tableDesc;

          });
          var params = {
            tableId: self.tableId
          }
          util.ajax.post("/manage/tabledata/listtablecell/",params).then(function(resp) {

            var data = resp.data.data;
            for(var i=0;i<data.length;i++){
              self.datas.push(data[i]);
            }
          }).catch(function(err) {
            self.$Message.error('获取数据元信息错误,请联系系统管理员');
          });
        }
      },
      doDelete: function(currentRow,index) {
        //console.log('1'+currentRow.cellCode);
        var self = this;
        //console.log('2'+self.datacolumn);
        for(var i=0;i<self.datacolumn.length;i++){
          if(currentRow.cellCode==self.datacolumn[i]){
            self.datacolumn.splice(index, 1);
            break;
          }
        }
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
