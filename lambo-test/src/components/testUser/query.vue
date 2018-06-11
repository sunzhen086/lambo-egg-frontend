<template>
  <div>
    <Card>
      <div slot="extra"></div>
      <LamboTable ref="table" dataUrl="/manage/testUser/list" :columns="tableColumn" :searchParams="tableSearchParams">
        <div slot="search">
          <Input v-model="search" placeholder="搜索" style="width: 200px" />
          <Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
          <Button type="ghost" icon="plus-round" @click="forInsert">新增</Button>
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
          vm.goUpdatePage(currentRow.userId);
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
          vm.doDelete(currentRow.userId);
        }
      }
    }, '删除');
  };
  export default {
    data:function(){
      return {
        search:"",
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
          title: '用户ID',
          key: 'userId',
          align:"center"
        });
        columns.push({
          title: '用户名称',
          key: 'userName',
          sortable: "custom"
        });
        columns.push({
          title: '性别',
          key: 'sex',
          sortable: "custom"
        });
        columns.push({
          title: '年龄',
          key: 'age',
          sortable: "custom"
        });
        columns.push({
          title: '创建时间',
          key: 'ctime',
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
          search:this.search
        }
      },
      forInsert: function() {
        this.$router.push({
          name: '测试用户编辑页'
        });
      },
      goUpdatePage: function(userId) {
        this.$router.push({
          name: '测试用户编辑页',
          query: {
            userId:userId
          }
        });
      },
      doDelete: function(userId) {
        var self = this;
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗?</p>',
          onOk: () => {
            util.ajax.get("/manage/testUser/delete/"+ userId).then(function(resp) {
              self.$Message.success('删除成功');
              self.doSearch();
            })
          }
        });
      }
    }
  };
</script>
