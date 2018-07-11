<template>
  <div>
    <Card>
      <LamboTable dataUrl="/manage/schedule/result" :columns="tableColumn" :searchParams="tableSearchParams" :showTableOption="showTableOption">

      </LamboTable>
    </Card>
  </div>
</template>
<script>
  import util from '@/libs/util.js';
  export default {
    data() {
      return {
        searchScheduleName: "",
        //	tableSearchParams: {},
        dataUrl1:"",
        showTableOption:false
      }
    },
    computed: {
      taskId: function() {
        return this.$route.query.taskId;
      },
      title: function() {
        return this.$route.meta.title;
      },
      tableSearchParams:function(){
        return  {
          search: this.$route.query.taskId
        }
      },
      tableColumn() {
        let columns = [];
        let self = this;
        columns.push({
          title: '任务名称',
          key: 'taskName',
          sortable: "custom"
        });
        columns.push({
          title: '开始时间',
          key: 'startTime',
          sortable: "custom"
        });
        columns.push({
          title: '结束时间',
          key: 'endTime',
          sortable: "custom",
          width:300
        });
        columns.push({
          title: '状态',
          key: 'result',
          sortable: "custom",
          align: "center",
          render: function(h, param) {
            var resul=param.row.result;
            if(param.row.result=="00"){
              resul = "成功";
            }else if(param.row.result=='02'){
              resul =  "运行中";
            }else{
              resul = "失败";
            }
             return h('span',resul);
          }
        });
        columns.push({
          title: '错误日志',
          key: 'errorMessage',
          sortable: "custom"
        })
        return columns;
      }
    },
    methods: {
      doSearch: function() {
        this.tableSearchParams = {
          search: this.taskId
        }
      }
    }

  };
</script>
