<template>
  <div>
    <Card>
      <div slot="extra"></div>
      <LamboTable ref="table" dataUrl="/manage/restSetting/list" :columns="tableColumn"
                  :searchParams="tableSearchParams">
        <div slot="search">
          <Input v-model="search" placeholder="搜索" style="width: 200px"/>
          <Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
          <Button type="ghost" icon="plus-round" @click="forInsert">新增</Button>
        </div>
      </LamboTable>
    </Card>
  </div>
</template>
<script>
  ;
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
        'click': function () {
          vm.goUpdatePage(currentRow.restId);
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
          vm.doDelete(currentRow.restId);
        }
      }
    }, '删除');
  };
  export default {
    data: function () {
      return {
        search: "",
        tableSearchParams: {}
      }
    },
    computed: {
      tableColumn() {
        let columns = [];
        let self = this;
        columns.push({
          title: 'rest_id',
          key: 'restId',
          align: "center"
        });
        columns.push({
          title: 'rest_name',
          key: 'restName',
          align: "center"
        });
        columns.push({
          title: 'url',
          key: 'url',
          align: "center"
        });
        columns.push({
          title: 'operation_type',
          key: 'operationType',
          align: "center"
        });
        columns.push({
          title: 'datasource',
          key: 'datasource',
          align: "center"
        });
        columns.push({
          title: 'rest_sql',
          key: 'restSql',
          align: "center"
        });
        columns.push({
          title: 'mock_data',
          key: 'mockData',
          align: "center"
        });
        columns.push({
          title: 'note',
          key: 'note',
          align: "center"
        });
        columns.push({
          title: 'create_time',
          key: 'createTime',
          align: "center"
        });
        columns.push({
          title: 'update_time',
          key: 'updateTime',
          align: "center"
        });
        columns.push({
          title: 'create_user',
          key: 'createUser',
          align: "center"
        });
        columns.push({
          title: '操作',
          align: "center",
          render: function (h, param) {
            return h('div', [
              editButton(self, h, param.row, param.index),
              deleteButton(self, h, param.row, param.index)
            ]);
          }
        });
        return columns;
      }
    },
    methods: {
      doSearch: function () {
        this.tableSearchParams = {
          search: this.search
        }
      },
      forInsert: function () {
        this.$router.push({
          name: 'restSettingEdit'
        });
      },
      goUpdatePage: function (restId) {
        this.$router.push({
          name: 'restSettingEdit',
          query: {
            restId: restId
          }
        });
      },
      doDelete: function (restId) {
        var self = this;
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗?</p>',
          onOk: () => {
            util.ajax.get("/manage/restSetting/delete/" + restId).then(function (resp) {
              self.$Message.success('删除成功');
              self.doSearch();
            })
          }
        });
      }
    }
  };
</script>
