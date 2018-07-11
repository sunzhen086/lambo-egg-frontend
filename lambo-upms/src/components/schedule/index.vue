<template>
  <div>
    <Card>
      <LamboTable dataUrl="/manage/schedule/list" :columns="tableColumn" :searchParams="tableSearchParams" @on-selection-change="onSelectionChange">
        <div slot="search">
          <Input v-model="searchScheduleName" placeholder="按定时任务名称搜索" style="width: 200px" />
          <Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
          <Button type="ghost" icon="plus-round" @click="goCreatePage">新增定时任务</Button>
          <Button type="ghost" icon="ios-infinite" @click="doStopSchedule">关闭定时任务</Button>
          <Button type="ghost" icon="ios-infinite" @click="doOpenSchedule">开启定时任务</Button>
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
					vm.goUpdatePage(currentRow.taskId);
				}
			}
		}, '编辑');
	};
  //编辑按钮
  const lookScheduleResultButton = (vm, h, currentRow, index) => {
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
          vm.goLookScheduleResultPage(currentRow.taskId);
        }
      }
    }, '执行记录');
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
					vm.doDelete(currentRow.taskId);
				}
			}
		}, '删除');
	};
	export default {
		data() {
			return {
				searchScheduleName: "",
				tableSearchParams: {},
        idSelectedArr:[],
        value:1
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
          title: '#',
          key: 'taskId',
          type:"selection",
          align:"center"
				});
				columns.push({
					title: '任务名称',
					key: 'taskName',
					sortable: "custom"
				});
        columns.push({
          title: 'cron表达式',
          key: 'minute'

        });
        columns.push({
          title: '任务操作',
          key: 'operation',
          sortable: "custom",
          width:300
        });
				columns.push({
					title: '状态',
					key: 'currentState',
					sortable: "custom",
					align: "center",
					render: function(h, param) {
					  var state=param.row.currentState
            if(state=='00'){
              state="关闭";
            }else if(state=='10'){
              state="启动";
            }else{
              state="运行中";
            }
            return h('span',state);
					}
				});
				columns.push({
					title: '操作',
					key: 'permissionId',
					align: "center",
					fixed: "right",
					render: function(h, param) {
						return h('div', [
              lookScheduleResultButton(self, h, param.row, param.index),
							editButton(self, h, param.row, param.index),
							deleteButton(self, h, param.row, param.index)
						]);
					}
				});
				return columns;
			}
		},
		methods: {
			doSearch: function() {
				this.tableSearchParams = {
          taskName: this.searchScheduleName
				}
			},
    onSelectionChange:function(selection){
      var self = this;
      self.idSelectedArr = [];
      for(var item of selection){
        self.idSelectedArr.push(item.taskId);
      }
    },
			goCreatePage: function() {
				this.$router.push({
					name: '新增定时任务'
				});
			},
			goUpdatePage: function(taskId) {
				this.$router.push({
					name: '修改定时任务',
					query: {
						taskId
					}
				});
			},
      goLookScheduleResultPage: function(taskId) {
        this.$router.push({
          name: '查看定时任务记录',
          query: {
            taskId
          }
        });
      },
			doDelete: function(taskId) {
				var self = this;
				this.$Modal.confirm({
					title: '提示',
					content: '<p>确定要删除吗?</p>',
					onOk: () => {
						util.ajax.get("/manage/schedule/delete/" + taskId).then(function(resp) {
							self.$Message.success('删除定时任务成功');
							self.doSearch();
						}).catch(function(err) {
							self.$Message.error('删除定时任务失败,请联系系统管理员');
						});
					}
				});
			},
      doOpenSchedule:function(){
        var self = this;
        var idSelectedArr = self.idSelectedArr;
        if(idSelectedArr.length !== 1){
          self.$Modal.warning({
            title: '提示',
            content: '请选择一条记录！',
          });
        }else{
          this.$Modal.confirm({
            title: '提示',
            content: '<p>确定要开启定时任务？</p>',
            onOk: () => {
              util.ajax.get("/manage/schedule/open/" + self.idSelectedArr[0]).then(function(resp) {
                self.$Message.success('开启定时任务成功');
                self.doSearch();
              }).catch(function(err) {
                self.$Message.error('开启定时任务失败,请联系系统管理员');
              });
            }
          });
        }
      },
      doStopSchedule:function(){
        var self = this;
        var idSelectedArr = self.idSelectedArr;
        if(idSelectedArr.length !== 1){
          self.$Modal.warning({
            title: '提示',
            content: '请选择一条记录！',
          });
        }else{
          this.$Modal.confirm({
            title: '提示',
            content: '<p>确定要关闭定时任务？</p>',
            onOk: () => {
              util.ajax.get("/manage/schedule/stop/" + self.idSelectedArr[0]).then(function(resp) {
                self.$Message.success('关闭定时任务成功');
                self.doSearch();
              }).catch(function(err) {
                self.$Message.error('关闭定时任务失败,请联系系统管理员');
              });
            }
          });
        }
      }
		}

	};
</script>
