<template>
	<div>
		<Card>
			<p slot="title">
				<Icon type="help-buoy"></Icon> {{title}}
			</p>
			<div slot="extra">
				<a href="#" @click.prevent="forceoutAction">
					<Icon type="plus-round"></Icon>
					强制退出
				</a>
			</div>
			<LamboTable ref="table" dataUrl="/manage/session/list" :columns="tableColumn" @on-selection-change="onSelectionChange">
			</LamboTable>
		</Card>
	</div>
</template>
<script>
	import util from '@/libs/util.js';
	export default {
		data (){
			return {
				idSelectedArr:[]
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
					key: 'id',
					type:"selection",
					align:"center"
				});
				columns.push({
					title: '编号',
					key: 'id',
					sortable: "custom"
				});
				columns.push({
					title: '创建时间',
					key: 'startTimestamp',
					sortable: "custom"
				});
				columns.push({
					title: '最后访问时间',
					key: 'lastAccessTime'
				});
				columns.push({
					title: '是否过期',
					key: 'expired'
				});
				columns.push({
					title: '访问者IP',
					key: 'host'
				});
				columns.push({
					title: '用户标识',
					key: 'userAgent'
				});
				columns.push({
					title: '状态',
					key: 'status'
				});
				return columns;
			}
		},
		methods: {
			onSelectionChange:function(selection){
				var self = this;
				self.idSelectedArr = [];
				for(var item of selection){
					self.idSelectedArr.push(item.id);
				}
			},
			forceoutAction:function(){
				var self = this;
				var idsArr = self.idSelectedArr;
				if(idsArr.length == 0){
					self.$Modal.warning({
                        title: "提示",
                        content: "请至少选择一条记录"
                    });
				}else{
					util.ajax.get("/manage/session/forceout/" + idsArr.join(",")).then(function(resp) {
						self.$Message.success('强制退出会话成功');
						self.$refs.table.tableRefresh();
					}).catch(function(err) {
						self.$Message.error('会话退出失败,请联系角色管理员');
					});
				}
			}
		}

	};
</script>