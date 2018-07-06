<template>
  <div>
    <Row>
      <Col span="12">
      <Card>
        <p slot="title">
          <Icon type="help-buoy"></Icon> 可编辑表格(默认场景)
        </p>
        <div slot="extra">
          <Button type="default" style="margin-top: -5px;" @click="getDataOfTable1">获取数据</Button>
          <Button type="default" style="margin-top: -5px;" @click="addNewRow">新增一行</Button>
          <Button type="default" style="margin-top: -5px;" @click="deleteRow">删除一行</Button>
        </div>
        <lambo-edit-table ref="table1" mode="normal"  v-model="datas" :columns="columns" @on-organ-changed="onOrganChanged" highlight-row on-row-click="rowClick"></lambo-edit-table>
      </Card>
      </Col>
    </Row>
    <Row style="margin-top:20px;">
      <Col span="12">
      <Card>
        <p slot="title">
          <Icon type="help-buoy"></Icon> 可编辑表格(大数据量场景)
        </p>
        <div slot="extra">
          <Button type="default" style="margin-top: -5px;" @click="getDataOfTable2">获取数据</Button>
          <Button type="default" style="margin-top: -5px;" @click="addNewRow">新增一行</Button>
          <Button type="default" style="margin-top: -5px;" @click="deleteRow">删除一行</Button>
        </div>
        <lambo-edit-table ref="table2" mode="large"  v-model="datas" :columns="columns" @on-organ-changed="onOrganChanged" highlight-row on-row-click="rowClick"></lambo-edit-table>
      </Card>
      </Col>
    </Row>


  </div>
</template>
<script>
  let helpBoxEditor = {
      type:"helpbox",
      url:"/helpbox/organ/list",
      columns:[
        {
          title: '编号',
          key: 'organizationId',
          sortable: "custom"
        },
        {
          title: '组织名称',
          key: 'name'
        },
        {
          title: '组织描述',
          key: 'description'
        }
      ],
      title:"组织选择帮助框",
      callbackEvent:"on-organ-changed"
  }

  export default {
    name: 'editable-table',
    data () {

      return {
        columns: [
          {
            title: '序号',
            type: 'index',
            width: 180,
            align: 'center'
          },
          {
            title: '姓名',
            align: 'center',
            key: 'name',
            width: 190,
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
            title: '性别',
            align: 'center',
            width: 150,
            key: 'sex',
            editor:{
              type:"select",
              enums:[{"value":"1","label":"男"},{"value":"0","label":"女"}]
            }
          },
          {
            title: '组织',
            align: 'center',
            key: 'organName',
            editor:helpBoxEditor
          }
        ],
        datas: [
          {
            name: 'Aresn',
            sex: '1',
            organId: '4',
            organName: '河北分部'
          },
          {
            name: 'Lison',
            sex: '1',
            organId: '5',
            organName: '河南分部'
          },
          {
            name: 'lisa',
            sex: '0',
            organId: '5',
            organName: '河南分部'
          }
        ]
      };
    },
    methods: {
      getDataOfTable1:function(){
        alert(JSON.stringify(this.$refs.table1.getTableData()));
      },
      getDataOfTable2:function(){
        alert(JSON.stringify(this.$refs.table2.getTableData()));
      },
      onOrganChanged:function(selectData,rowIndex,columnKey){
        if(selectData){
          let organId = selectData.organizationId;
          let organName = selectData.name;
          this.$set(this.datas[rowIndex],'organId',organId);
          this.$set(this.datas[rowIndex],'organName',organName);
        }else{
          this.$set(this.datas[rowIndex],'organId',"");
          this.$set(this.datas[rowIndex],'organName',"");
        }
      },
      addNewRow:function(){
        let row = {
          name: 'stomz',
          sex: '1',
          organId: '',
          organName: ''
        }
        this.datas.push(row);
      },
      rowClick:function(rowData,index){
        this.currentRowIndex = index;
      },
      deleteRow:function(){
        this.datas.splice(this.currentRowIndex,1);
      }
    },
    created () {

    }
  };
</script>


<style>

</style>
