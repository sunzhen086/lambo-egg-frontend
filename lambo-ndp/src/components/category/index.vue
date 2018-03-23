<template>
  <div>
    <Card>
      <p slot="title">
        {{title}}
      </p>
      <div slot="extra"></div>
      <LamboTable ref="table" dataUrl="/manage/cateGoryData/list" :columns="tableColumn" :searchParams="tableSearchParams">
        <div slot="search">
          <Input v-model="searchDescription" placeholder="按分类搜索" style="width: 200px" />
          <Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
          <Button type="ghost" icon="plus-round" @click="goCreatePage">新增分类</Button>
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
        'click': () => {
          vm.goUpdatePage(currentRow.categoryId);
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
          vm.doDelete(currentRow.categoryId);
        }
      }
    }, '删除');
  };
  export default {
    data:function(){
      return {
        searchDescription:"",
        tableSearchParams:{}
      }
    },
    computed: {
      tableColumn() {
        let columns = [];
        let self = this;
        columns.push({
          key: 'categoryId',
          type:"selection",
          align:"center"
        });
        columns.push({
          title: '名称',
          key: 'categoryName',
          sortable: "custom"
        });
        columns.push({
          title: '描述',
          key: 'categoryDesc',
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
          search:this.searchDescription
        }
      },
      goCreatePage: function() {
        this.$router.push({
          name: '新增分类'
        });
      },
      goUpdatePage: function(categoryId) {
        this.$router.push({
          name: '修改分类',
          query: {
            categoryId
          }
        });
      },
      doDelete: function(categoryId) {
        var self = this;
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗?</p>',
          onOk: () => {
            util.ajax.get("/manage/cateGoryData/delete/" + categoryId).then(function(resp) {
              self.$Message.success('删除成功');
              self.doSearch();
            }).catch(function(err) {
              self.$Message.error('删除失败,请联系系统管理员');
            });
          }
        });
      }
    }
  };
</script>
