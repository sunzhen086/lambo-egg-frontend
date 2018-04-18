
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
    <Row >
      <Col span="24">
      <Card>
        <p slot="title">
          <Icon type="ios-keypad"></Icon>
          库表数据元
        </p>
        <p slot="extra">
          <Button style="margin-top:-5px;" @click="addRow" icon="plus">新增一行</Button>
          <Button style="margin-top:-5px;" @click="getCurrentData" icon="ios-search">当前数据</Button>
        </p>
        <Row :gutter="10">
          <Col span="24">
          <div class="edittable-table-height-con">
            <can-edit-table
              refs="table4"
              v-model="editInlineAndCellData"
              @on-cell-change="handleCellChange"
              @on-change="handleChange"
              :editIncell="true"
              :columns-list="editInlineAndCellColumn"
            ></can-edit-table>
          </div>
          </Col>
          <Modal :width="900" v-model="showCurrentTableData">
            <can-edit-table refs="table5" v-model="editInlineAndCellData" :columns-list="showCurrentColumns"></can-edit-table>
          </Modal>
        </Row>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import canEditTable from './components/canEditTable.vue';
  import tableData from './components/table_data.js';
  import util from '@/libs/util.js';
  export default {
    name: 'edit',
    components: {
      canEditTable
    },
    data () {
      return {
        title:"",
        editInlineAndCellColumn: [],
        editInlineAndCellData: [],
        showCurrentColumns: [],
        showCurrentTableData: false,
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
              TableCellss:self.editInlineAndCellData
            }
            if(self.tableId) {  //修改
              util.ajax.post("/manage/categorydata/update/" + self.tableId, params).then(function(resp) {
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
      getData () {

        this.editInlineAndCellColumn = tableData.editInlineAndCellColumn;
        this.editInlineAndCellData = tableData.editInlineAndCellData;
        this.showCurrentColumns = tableData.showCurrentColumns;
      },
      handleNetConnect (state) {
        this.breakConnect = state;
      },
      handleLowSpeed (state) {
        this.lowNetSpeed = state;
      },
      getCurrentData () {
        this.showCurrentTableData = true;
      },
      handleDel (val, index) {
        this.$Message.success('删除了第' + (index + 1) + '行数据');
      },
      handleCellChange (val, index, key) {
        this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
      },
      handleChange (val, index) {
        this.$Message.success('修改了第' + (index + 1) + '行数据');
      },
      addRow:function(){
        this.editInlineAndCellData.push({
          cellcode: '1',
          cellname: '',
          dictid: '',
          datadesc: '',
          dataunit: ''
        });
      }
    },
    mounted () {
      this.getData();
    }
  };
</script>
