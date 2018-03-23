<template>
  <div>
    <Card>
      <div slot="extra"></div>
      <LamboTable ref="table" dataUrl="/manage/subjectData/list" :columns="tableColumn" :searchParams="tableSearchParams">
        <div slot="search">
          <Input v-model="searchSubjectName" placeholder="按专题搜索" style="width: 200px" />
          <Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
          <Button type="ghost" icon="plus-round" @click="goCreatePage">新增专题</Button>
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
          vm.goUpdatePage(currentRow.subjectId);
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
          vm.doDelete(currentRow.subjectId);
        }
      }
    }, '删除');
  };
  export default {
    data:function(){
      return {
        searchSubjectName:"",
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
          key: 'subjectId',
          type:"selection",
          align:"center"
        });
        columns.push({
          title: '名称',
          key: 'subjectName',
          sortable: "custom"
        });
        columns.push({
          title: '分类',
          key: 'categoryName',
          sortable: "custom"
        });
        columns.push({
          title: '库表',
          key: 'tableCode',
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
          subjectName:this.searchSubjectName
        }
      },
      goCreatePage: function() {
        this.$router.push({
          name: '新增专题'
        });
      },
      goUpdatePage: function(subjectId) {
        this.$router.push({
          name: '修改专题',
          query: {
            subjectId
          }
        });
      },
      doDelete: function(subjectId) {
        var self = this;
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗?</p>',
          onOk: () => {
            util.ajax.get("/manage/subjectData/delete/"+ subjectId).then(function(resp) {
              self.$Message.success('删除成功');
              self.doSearch();
            })
          }
        });
      }
    }
  };
</script>
