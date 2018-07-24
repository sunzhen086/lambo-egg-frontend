<template>
  <div>
    <Card>
      <div slot="extra">
      </div>
      <LamboTable ref="table" dataUrl="/manage/lamboRule/list" :columns="tableColumn" :searchParams="ruleSearchParams">
        <div slot="search">
          <Input v-model="searchRuleId" placeholder="按名称搜索" style="width: 200px" />
          <Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
          <Button type="ghost" icon="plus-round" @click="goCreatePage">新增规则</Button>
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
          vm.goUpdatePage(currentRow.ruleId);
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
          vm.doDelete(currentRow.ruleId);
        }
      }
    }, '删除');
  };
  export default {
    data:function(){
      return {
        searchRuleId:"",
        searchRuleName:"",
        ruleSearchParams:{}
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
          title: '规则Id',
          key: 'ruleId',
          sortable: "custom"
        });
        columns.push({
          title: '描述',
          key: 'ruleDesc',
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
        this.ruleSearchParams = {
          search:this.searchRuleId
        }
      },
      goCreatePage: function() {
        this.$router.push({
          name: '新增业务规则'
        });
      },
      goUpdatePage: function(ruleId) {
        this.$router.push({
          name: '修改业务规则',
          query: {
            ruleId
          }
        });
      },
      doDelete: function(ruleId) {
        var self = this;
        var parm={
          ruleId:ruleId
        }
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗?</p>',
          onOk: () => {
            util.ajax.get("/manage/lamboRule/delete/"+ruleId).then(function(resp) {
              self.$Message.success('删除成功');
              self.doSearch();
            })
          }
        });
      },
      fromDelete:function(){

      }
    }
  };
</script>
