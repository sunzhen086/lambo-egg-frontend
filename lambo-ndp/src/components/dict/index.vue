<template>
  <div>
    <Card>
      <div slot="extra">
      </div>
      <LamboTable ref="table" dataUrl="/manage/dictData/list" :columns="tableColumn" :searchParams="dictSearchParams">
        <div slot="search">
          <Input v-model="searchDictId" placeholder="按标识搜索" style="width: 200px" />
          <Input v-model="searchDictName" placeholder="按名称搜索" style="width: 200px" />
          <Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
          <Button type="ghost" icon="plus-round" @click="goCreatePage">新增字典</Button>
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
          vm.goUpdatePage(currentRow.dictId);
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
          vm.doDelete(currentRow.dictId);
        }
      }
    }, '删除');
  };
  export default {
    data:function(){
      return {
        searchDictId:"",
        searchDictName:"",
        dictSearchParams:{}
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
          title: '序号',
          type: 'index',
          align: 'center'
        });
        columns.push({
          title: '标识',
          key: 'dictId',
          sortable: "custom"
        });
        columns.push({
          title: '名称',
          key: 'dictName',
          sortable: "custom"
        });
        columns.push({
          title: '描述',
          key: 'dictDesc',
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
        this.dictSearchParams = {
          dictId:this.searchDictId,
          dictName:this.searchDictName
        }
      },
      goCreatePage: function() {
        this.$router.push({
          name: '新增数据字典'
        });
      },
      goUpdatePage: function(dictId) {
        this.$router.push({
          name: '修改数据字典',
          query: {
            dictId
          }
        });
      },
      doDelete: function(dictId) {
        var self = this;
        var parm={
          dictId:dictId
        }
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗?</p>',
          onOk: () => {
            util.ajax.post("/manage/dictData/delete",parm).then(function(resp) {
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
