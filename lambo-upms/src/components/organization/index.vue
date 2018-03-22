<template>
	<div>
		<Card>
			<LamboTable dataUrl="/manage/organization/list" :columns="tableColumn" :searchParams="tableSearchParams">
				<div slot="search">
					<Input v-model="searchOrganName" placeholder="按组织名称搜索" style="width: 200px" />
					<Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
          <Button type="ghost" icon="plus-round" @click="goCreatePage">新增组织</Button>
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
					vm.goUpdatePage(currentRow.organizationId);
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
					vm.doDelete(currentRow.organizationId);
				}
			}
		}, '删除');
	};
	export default {
		data() {
			return {
				searchOrganName: "",
				tableSearchParams: {}
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
					key: 'organizationId',
					sortable: "custom"
				});
				columns.push({
					title: '组织名称',
					key: 'name'
				});
				columns.push({
					title: '组织描述',
					key: 'description'
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
		methods: {
			doSearch: function() {
				this.tableSearchParams = {
					search: this.searchOrganName
				}
			},
			goCreatePage: function() {
				this.$router.push({
					name: '新增组织'
				});
			},
			goUpdatePage: function(organizationId) {
				this.$router.push({
					name: '修改组织',
					query: {
						organizationId
					}
				});
			},
			doDelete: function(organizationId) {
				var self = this;
				this.$Modal.confirm({
					title: '提示',
					content: '<p>确定要删除吗?</p>',
					onOk: () => {
						util.ajax.get("/manage/organization/delete/" + organizationId).then(function(resp) {
							self.$Message.success('删除组织成功');
							self.doSearch();
						}).catch(function(err) {
							self.$Message.error('删除组织失败,请联系系统管理员');
						});
					}
				});
			}
		}
	};
</script>
