<template>
	<div>
		<Card>
			<p slot="title">
				<Icon type="help-buoy"></Icon> {{title}}
			</p>
			<div slot="extra">
				<a href="#" @click.prevent="goCreatePage">
					<Icon type="plus-round"></Icon>
					新增系统
				</a>
			</div>

			<LamboTable dataUrl="/manage/system/list" :columns="tableColumn" :searchParams="tableSearchParams">
				<div slot="search">
					<Input v-model="searchSystemName" placeholder="按系统名称搜索" style="width: 200px" />
					<Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
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
					vm.goUpdatePage(currentRow.systemId);
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
					vm.doDelete(currentRow.systemId);
				}
			}
		}, '删除');
	};
	export default {
		data() {
			return {
				searchSystemName: "",
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
					title: '系统编码',
					key: 'systemId',
					sortable: "custom"
				});
				columns.push({
					title: '系统名称',
					key: 'title',
					sortable: "custom"
				});
				columns.push({
					title: '应用路径',
					key: 'basepath',
					sortable: "custom"
				});
				columns.push({
					title: '图片',
					key: 'icon',
					sortable: "custom",
					align: "center",
					render: function(h, param) {
						var icon = param.row.icon;
						if(icon) {
							return h("Icon", {
								props: {
									type: icon,
									size: 16
								}
							});
						}
					}
				});
				columns.push({
					title: '状态',
					key: 'status',
					sortable: "custom",
					align: "center",
					render: function(h, param) {
						return param.row.status ? "正常" : "锁定";
					}
				});
				columns.push({
					title: '操作',
					key: 'permissionId',
					align: "center",
					fixed: "right",
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
					search: this.searchSystemName
				}
			},
			goCreatePage: function() {
				this.$router.push({
					name: '新增系统'
				});
			},
			goUpdatePage: function(systemId) {
				this.$router.push({
					name: '修改系统',
					query: {
						systemId
					}
				});
			},
			doDelete: function(systemId) {
				var self = this;
				this.$Modal.confirm({
					title: '提示',
					content: '<p>确定要删除吗?</p>',
					onOk: () => {
						util.ajax.get("/manage/system/delete/" + systemId).then(function(resp) {
							self.$Message.success('删除系统成功');
							self.doSearch();
						}).catch(function(err) {
							self.$Message.error('删除系统失败,请联系系统管理员');
						});
					}
				});
			}
		}

	};
</script>