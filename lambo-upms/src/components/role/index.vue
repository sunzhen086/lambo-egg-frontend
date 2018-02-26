<template>
	<div>
		<Card>
			<p slot="title">
				<Icon type="help-buoy"></Icon> {{title}}
			</p>
			<div slot="extra">
				<a href="#" @click.prevent="doRolePermissionUpdate" style="margin-right:20px;">
					<Icon type="key"></Icon>
					角色权限
				</a>
				<a href="#" @click.prevent="goCreatePage">
					<Icon type="plus-round"></Icon>
					新增角色
				</a>
			</div>

			<LamboTable dataUrl="/manage/role/list" :columns="tableColumn" :searchParams="tableSearchParams" @on-selection-change="onSelectionChange">
				<div slot="search">
					<Input v-model="searchRoleName" placeholder="按角色标题搜索" style="width: 200px" />
					<Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
				</div>
			</LamboTable>
		</Card>
	</div>
</template>
<script>
	import util from '@/libs/util.js';
	import rolePermission from './permission';
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
					vm.goUpdatePage(currentRow.roleId);
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
					vm.doDelete(currentRow.roleId);
				}
			}
		}, '删除');
	};
	export default {
		data() {
			return {
				searchRoleName: "",
				tableSearchParams: {},
				rolePermissionModalOk:false,
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
					key: 'roleId',
					type:"selection",
					align:"center"
				});
				columns.push({
					title: '角色名称',
					key: 'name'
				});
				columns.push({
					title: '角色标题',
					key: 'title'
				});
				columns.push({
					title: '角色描述',
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
					search: this.searchRoleName
				}
			},
			goCreatePage: function() {
				this.$router.push({
					name: '新增角色'
				});
			},
			goUpdatePage: function(roleId) {
				this.$router.push({
					name: '修改角色',
					query: {
						roleId
					}
				});
			},
			doDelete: function(roleId) {
				var self = this;
				this.$Modal.confirm({
					title: '提示',
					content: '<p>确定要删除吗?</p>',
					onOk: () => {
						util.ajax.get("/manage/role/delete/" + roleId).then(function(resp) {
							self.$Message.success('删除角色成功');
							self.doSearch();
						}).catch(function(err) {
							self.$Message.error('删除角色失败,请联系系统管理员');
						});
					}
				});
			},
			onSelectionChange:function(selection){
				var self = this;
				self.idSelectedArr = [];
				for(var item of selection){
					self.idSelectedArr.push(item.roleId);
				}
			},
			doRolePermissionUpdate: function(){
				var self = this;
				self.rolePermissionModalOk = false;
				self.$Modal.confirm({
					title:"角色权限",
                    render: (h) => {
                        return h(rolePermission, {
                            props: {
                                roleId: self.idSelectedArr[0],
                                rolePermissionModalOk:self.rolePermissionModalOk
                            }
                        })
                    },
                    onOk:function(){
                    	self.rolePermissionModalOk = true;
                    }
                })
			}
		}
	};
</script>