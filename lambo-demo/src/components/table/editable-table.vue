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
        <lambo-edit-table ref="table1"  :datas="datas" :columns="columns" ></lambo-edit-table>
      </Card>
      </Col>
    </Row>

  </div>
</template>
<script>
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
            title: '岗位',
            align: 'center',
            key: 'work'
          }
        ],
        datas: [
          {
            name: 'Aresn',
            sex: '1',
            work: '前端开发'
          },
          {
            name: 'Lison',
            sex: '1',
            work: '前端开发'
          },
          {
            name: 'lisa',
            sex: '0',
            work: '程序员鼓励师'
          }
        ],
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
          work: '颜值担当'
        };
        this.$refs.table1.addNewRow(data);
      }
    },
    created () {

    }
  };
</script>


<style>

</style>
