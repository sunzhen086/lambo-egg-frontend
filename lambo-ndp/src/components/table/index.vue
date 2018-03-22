<template>
  <div>
    <Card>

      <div slot="extra"></div>
      <LamboTable ref="table" dataUrl="/manage/tableData/list" :columns="tableColumn" :searchParams="tableSearchParams">
        <div slot="search">
          <Input v-model="searchTableCode" placeholder="按表名搜索" style="width: 200px" />
          <Input v-model="searchTableName" placeholder="按中文名搜索" style="width: 200px" />
          <Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
          <Button type="ghost" icon="plus-round" @click="goCreatePage">新增库表</Button>
        </div>
      </LamboTable>
    </Card>
  </div>
</template>
<script>
  import util from '@/libs/util.js';
  //编辑按钮
  const editButton = (vm, h, currentRow, index) => {
    return h('Button', {
      props: {
        type: "primary",
        size: "small"
      },
      style: {
        margin: '0 5px'
      },
      on: {
        'click': function() {
          vm.goUpdatePage(currentRow.tableId);
        }
      }
    }, '编辑');
  };

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
          vm.doDelete(currentRow.tableId);
        }
      }
    }, '删除');
  };
  export default {
    data:function(){
      return {
        searchTableCode:"",
        searchTableName:"",
        tableSearchParams:{}
      }
    },
    computed: {
      title: function() {
        return this.$route.meta.title;
      },
      tableColumn() {
        let columns = [];
        let self = this;
        columns.push({
          key: 'tableId',
          type:"selection",
          align:"center"
        });
        columns.push({
          title: '表名',
          key: 'tableCode',
          sortable: "custom"
        });
        columns.push({
          title: '中文名',
          key: 'tableName',
          sortable: "custom"
        });
        columns.push({
          title: '创建用户',
          key: 'createUser',
          sortable: "custom"
        });
        columns.push({
          title: '创建时间',
          key: 'createTime',
          sortable: "custom"
        });
        columns.push({
          title: '操作',
          align: "center",
          render: function(h, param) {
            return h('div', [
              editButton(self, h, param.row, param.index),
              deleteButton(self, h, param.row, param.index)
            ]);
          }
        });
        return columns;
      }
    },
    methods:{
      doSearch:function(){
        this.tableSearchParams = {
          tableCode:this.searchTableCode,
          tableName:this.searchTableName
        }
      },
      goCreatePage: function() {
        this.$router.push({
          name: '新增库表'
        });
      },
      goUpdatePage: function(tableId) {
        this.$router.push({
          name: '修改库表',
          query: {
            tableId
          }
        });
      },
      doDelete: function(tableId) {
        var self = this;
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗?</p>',
          onOk: () => {
            util.ajax.get("/manage/tableData/deleteTable/"+ tableId).then(function(resp) {
              //console.log(typeof (tableId));
              self.$Message.success('删除成功');
              self.doSearch();
            }).catch(function(err) {
              self.$Message.error('删除失败,请联系系统管理员');
            });
          }
        });
      },
      fromDelete:function(){

      }
    }
  };
</script>
