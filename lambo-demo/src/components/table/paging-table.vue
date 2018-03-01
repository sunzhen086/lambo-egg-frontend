<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="help-buoy"></Icon> {{title}}
      </p>
      <LamboTable ref="table" dataUrl="/data/list" :columns="tableColumn">
      </LamboTable>
    </Card>
  </div>
</template>
<script>
  export default {
    computed: {
      title: function() {
        return this.$route.meta.title;
      },
      tableColumn() {
        let columns = [];
        let self = this;
        columns.push({
          title: '编号',
          key: 'logId',
          sortable: "custom"
        });
        columns.push({
          title: '操作',
          key: 'description',
          sortable: "custom"
        });
        columns.push({
          title: '操作用户',
          key: 'username'
        });
        columns.push({
          title: '操作时间',
          key: 'startTime'
        });
        columns.push({
          title: '耗时',
          key: 'spendTime'
        });
        columns.push({
          title: '访问者IP',
          key: 'host'
        });
        columns.push({
          title: '请求路径',
          key: 'url',
          ellipsis:true
        });
        columns.push({
          title: '请求类型',
          key: 'method'
        });
        columns.push({
          title: '请求参数',
          key: 'parameter'
        });
        columns.push({
          title: '用户标识',
          key: 'userAgent',
          ellipsis:true
        });
        columns.push({
          title: 'IP地址',
          key: 'ip'
        });
        columns.push({
          title: '权限值',
          key: 'permissions'
        });
        return columns;
      }
    }
  };
</script>
