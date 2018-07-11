<template>
	<div>
		<Card>
			<LamboTable dataUrl="/manage/permission/list" :columns="tableColumn" :searchParams="tableSearchParams">
				<div slot="search">
          <Select v-model="searchPermissionType" placeholder="按权限类型搜索" style="width:200px">
            <Option value="">全部</Option>
            <Option v-for="item in permissionTypeEnum" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
					<Input v-model="searchPermissionName" placeholder="按权限名称搜索" style="width: 200px" />
					<Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
          <Button type="ghost" icon="plus-round" @click="goCreatePage">新增资源</Button>
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
					vm.goUpdatePage(currentRow.permissionId);
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
					vm.doDelete(currentRow.permissionId);
				}
			}
		}, '删除');
	};
	export default {
		data() {
			return {
				permissionTypeEnum: [{
					value: 1,
					label: "目录"
				}, {
					value: 2,
					label: "菜单"
				}, {
					value: 3,
					label: "按钮"
				}],
				searchPermissionName: "",
				searchPermissionType: "",
				tableSearchParams: {}
			}
		},
		computed: {
			title: function() {
				return this.$route.meta.title;
			},
			tableColumn() {
				let columns = [];
				let permissionTypeEnum = this.permissionTypeEnum;
				let self = this;

				columns.push({
					title: '权限名称',
					key: 'name',
					width: 170,
					fixed: "left",
					sortable: "custom"
				});
				columns.push({
					title: '所属系统',
					key: 'systemId',
					width: 120,
					sortable: "custom",
					sortField: "system_id"
				});
				columns.push({
					title: '所属上级',
					key: 'pid',
					sortable: "custom",
					width: 120
				});
				columns.push({
					title: '类型',
					key: 'type',
					sortable: "custom",
					render: function(h, param) {
						var value = param.row.type;
						for(var item of permissionTypeEnum) {
							if(item.value == value) {
                value=item.label;
							}
						}
						return  h("span",value);
					},
					width: 100
				});
				columns.push({
					title: '权限值',
					key: 'permissionValue',
					sortable: "custom",
					width: 200
				});
				columns.push({
					title: '路径',
					key: 'uri',
					sortable: "custom",
					ellipsis: true
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
					},
					width: 100
				});
				columns.push({
					title: '状态',
					key: 'status',
					sortable: "custom",
					align: "center",
					render: function(h, param) {
						return h("span",param.row.status ? "正常" : "锁定");
					},
					width: 100
				});
				columns.push({
					title: '操作',
					key: 'permissionId',
					align: "center",
					width: 140,
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
					search: this.searchPermissionName,
					type: this.searchPermissionType
				}
			},
			goCreatePage: function() {
				this.$router.push({
					name: '新增资源'
				});
			},
			goUpdatePage: function(permissionId) {
				this.$router.push({
					name: '修改资源',
					query: {
						permissionId
					}
				});
			},
			doDelete: function(permissionId) {
				var self = this;
				this.$Modal.confirm({
					title: '提示',
					content: '<p>确定要删除吗?</p>',
					onOk: () => {
						util.ajax.get("/manage/permission/delete/" + permissionId).then(function(resp) {
							self.$Message.success('删除资源成功');
							self.doSearch();
						}).catch(function(err) {
							self.$Message.error('删除资源失败,请联系系统管理员');
						});
					}
				});
			}
		}

	};
</script>
