
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
        <lambo-edit-table ref="table1"  v-model="datas"  :columns="columns" @on-organ-changed="onOrganChanged"></lambo-edit-table>
      </Card>
      </Col>
    </Row>
    </Row>
  </div>
</template>

<script>

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
          vm.doDelete(currentRow.cellId,index);
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
      datacolumns:function(){
        return this.getC();
      },
      helpBoxColumns:function(){
        return JSON.parse(this.helpBoxColumnsStr);
      },
      columns() {
        let columns = [];
        let self = this;
        console.log('11='+this.form.tablecode);
        columns.push({
          title: '序号',
          type: 'index',
          width: 180,
          align: 'center'
        });
        columns.push(
          {
            title: '组织',
            align: 'center',
            key: 'organName',
            editor:{
              type:"helpbox",
              url:"/manage/tabledata/listDbTableColumns?"+"tableName="+ this.form.tablecode,
              columns:[
                {
                  title: '表名',
                  key: 'table_name',
                  sortable: "custom"
                }

              ],
              title:"组织库表",
              callbackEvent:"on-organ-changed"
            }
          }
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
        columns.push(
       {
              title: '字典',
              align: 'center',
              key: 'dictId',
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
      getC(){
        return [{"value":"dictId","label":"dictId"},{"value":"dictName","label":"dictName"}];
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
        console.log('selectData:'+JSON.stringify(selectData));
        if(selectData){
          let table_name = selectData.table_name;
          //let organName = selectData.name;
          this.$set(this.datas[rowIndex],'table_name',table_name);
          //this.$set(this.datas[rowIndex],'organName',organName);
        }else{
          this.$set(this.datas[rowIndex],'table_name',"");
          //this.$set(this.datas[rowIndex],'organName',"");
        }
      },
      showHelpBox:function(){
        this.helpBoxShow = true;
      },
      onOk:function(result){
        //this.form.tablecode = JSON.stringify(result);
        //console.log(result.table_name);
        this.result=result.table_name;
        console.log(this.result);
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

          }).catch(function(err) {
            self.$Message.error('获取库表信息错误,请联系系统管理员');
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
