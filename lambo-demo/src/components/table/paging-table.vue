<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="help-buoy"></Icon> {{title}}
      </p>
      <LamboTable ref="table" dataUrl="/data/list" :columns="tableColumn" :searchParams="tableSearchParams">
        <div slot="search">
          <Input v-model="searchDescription" placeholder="按操作搜索" style="width: 200px" />
          <Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
        </div>
      </LamboTable>
    </Card>
  </div>
</template>
<script>
  export default {
    data:function(){
        return {
          searchDescription:"",
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
          title: '编号',
          key: 'logId',
          sortable: "custom",
          width:100
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
          key: 'startTime',
          render:function(h, param){
            return new Date(param.row.startTime).toLocaleString();
          },
          sortable:"custom",
          sortType:"desc",
          width:200
        });
        columns.push({
          title: '耗时',
          key: 'spendTime'
        });
        columns.push({
          title: '访问者IP',
          key: 'ip'
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
          title: '用户标识',
          key: 'userAgent',
          ellipsis:true
        });
        columns.push({
          title: '权限值',
          key: 'permissions'
        });
        return columns;
      }
    },
    methods:{
      doSearch:function(){
        this.tableSearchParams = {
          search:this.searchDescription
        }
      }
    }
  };
</script>
