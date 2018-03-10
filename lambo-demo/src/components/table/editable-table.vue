<template>
  <div>
    <Row>
      <Col span="12">
      <Card>
        <p slot="title">
          <Icon type="help-buoy"></Icon> 可编辑表格
        </p>
        <div slot="extra">
          <i-button type="default" style="margin-top: -5px;" @click="getTableData">获取数据</i-button>
        </div>
        <lambo-edit-table ref="table1"  :datas="datas" :columns="columns" @on-organ-changed="onOrganChanged"></lambo-edit-table>
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
      getTableData:function(){
        alert(JSON.stringify(this.$refs.table1.getTableData()));
      },
      addNewRow:function(){
        let data = {
          name: 'stomz',
          sex: '1',
          organId: '7',
          organName: '湖南分部'
        };
        this.$refs.table1.addNewRow(data);
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
      }
    },
    created () {

    }
  };
</script>


<style>

</style>
