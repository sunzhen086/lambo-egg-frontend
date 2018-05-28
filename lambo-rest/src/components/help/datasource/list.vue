<template>
  <div>
    <Card>
      <LamboTable ref="table" dataUrl="/manage/rest/datasource/list" :columns="tableColumn" :searchParams="tableSearchParams">
        <div slot="search">
          <Input v-model="searchText" placeholder="搜索数据源" style="width: 200px" />
          <Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
          <Button type="ghost" icon="plus-round" @click="goCreatePage">新增数据源</Button>
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
          vm.goUpdatePage(currentRow.dsId);
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
          vm.doDelete(currentRow.dsId);
        }
      }
    }, '删除');
  };
  export default {
    data:function(){
      return {
        searchText:"",
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
          title: '数据源ID',
          key: 'dsId'
        });
        columns.push({
          title: '数据源名称',
          key: 'dsName',
          sortable: "custom"
        });
        columns.push({
          title: '数据源类型',
          key: 'dsType',
          sortable: "custom"
        });
        columns.push({
          title: '数据源IP',
          key: 'dsIp',
          sortable: "custom"
        });
        columns.push({
          title: '数据源端口',
          key: 'dsPort'
        });
        columns.push({
          title: '数据库',
          key: 'dsDatabase'
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
          search:this.searchText
        }
      },
      goCreatePage: function() {
        this.$router.push({
          name: '新增数据源'
        });
      },
      goUpdatePage: function(dsId) {
        this.$router.push({
          name: '修改数据源',
          query: {
            dsId
          }
        });
      },
      doDelete: function(dsId) {
        var self = this;
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗?</p>',
          onOk: () => {
            util.ajax.get("/manage/rest/datasource/delete/"+ dsId).then(function(resp) {
              self.$Message.success('删除成功');
              self.doSearch();
            })
          }
        });
      }
    }
  };
</script>
