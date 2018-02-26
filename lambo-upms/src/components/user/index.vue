<template>
	<div>
		<Card>
			<p slot="title">
				<Icon type="help-buoy"></Icon> {{title}}
			</p>
			<div slot="extra">
				<a href="#" @click.prevent="doUserRoleUpdate" style="margin-right:15px;">
					<Icon type="ios-infinite"></Icon>
					用户角色
				</a>
				<a href="#" @click.prevent="doUserOrganUpdate" style="margin-right:15px;">
					<Icon type="ios-people"></Icon>
					用户组织
				</a>
				<a href="#" @click.prevent="goCreatePage">
					<Icon type="plus-round"></Icon>
					新增用户
				</a>
			</div>
			<LamboTable dataUrl="/manage/user/list" :columns="tableColumn" :searchParams="tableSearchParams" @on-selection-change="onSelectionChange">
				<div slot="search">
					<Input v-model="searchUserName" placeholder="按账号或名称搜索" style="width: 200px" />
					<Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
				</div>
			</LamboTable>
		</Card>
	</div>
</template>
<script>
	import util from '@/libs/util.js';
	import userOrganEdit from './userOrganEdit';
	import userRoleEdit from './userRoleEdit';
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
					vm.goUpdatePage(currentRow.userId);
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
					vm.doDelete(currentRow.userId);
				}
			}
		}, '删除');
	};
	export default {
		data() {
			return {
				searchUserName: "",
				tableSearchParams: {},
				idSelectedArr:[],
				userOrganModalOk:false,
				userRoleModalOk:false
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
					key: 'userId',
					type:"selection",
					align:"center"
				});
				columns.push({
					title: '帐号',
					key: 'username'
				});
				columns.push({
					title: '姓名',
					key: 'realname'
				});
				columns.push({
					title: '头像',
					key: 'avatar',
					sortable: "custom"
				});
				columns.push({
					title: '电话',
					key: 'phone'
				});
				columns.push({
					title: '邮箱',
					key: 'email'
				});
				columns.push({
					title: '性别',
					key: 'sex',
					align: "center",
          enums: {
					  1:'男',
            0:'女'
          },
					render: function(h, param) {
						return param.row.sex == 0 ? "女" : "男";
					}
				});
				columns.push({
					title: '状态',
					key: 'locked',
					align: "center",
          enums: {
            '1':'锁定',
            '0':'正常'
          },
					render: function(h, param) {
						return !param.row.locked ? "正常" : "锁定";
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
					search: this.searchUserName
				}
			},
			goCreatePage: function() {
				this.$router.push({
					name: '新增用户'
				});
			},
			goUpdatePage: function(userId) {
				this.$router.push({
					name: '修改用户',
					query: {
						userId
					}
				});
			},
			doDelete: function(userId) {
				var self = this;
				this.$Modal.confirm({
					title: '提示',
					content: '<p>确定要删除吗?</p>',
					onOk: () => {
						util.ajax.get("/manage/user/delete/" + userId).then(function(resp) {
							self.$Message.success('删除用户成功');
							self.doSearch();
						}).catch(function(err) {
							self.$Message.error('删除用户失败,请联系系统管理员');
						});
					}
				});
			},
			onSelectionChange:function(selection){
				var self = this;
				self.idSelectedArr = [];
				for(var item of selection){
					self.idSelectedArr.push(item.userId);
				}
			},
			doUserOrganUpdate: function(){
				var self = this;
				var idSelectedArr = self.idSelectedArr;
				if(idSelectedArr.length !== 1){
					self.$Modal.warning({
						title: '提示',
						content: '请选择一条记录！',
					});
				}else{
					self.userOrganModalOk = false;
					self.$Modal.confirm({
						title:"用户所属组织",
	                    render: (h) => {
	                        return h(userOrganEdit, {
	                            props: {
	                                userId: self.idSelectedArr[0],
	                                userOrganModalOk:self.userOrganModalOk
	                            }
	                        })
	                    },
                        onOk:function(){
                        	self.userOrganModalOk = true;
                        }
	                })
				}
			},
			doUserRoleUpdate:function(){
				var self = this;
				var idSelectedArr = self.idSelectedArr;
				if(idSelectedArr.length !== 1){
					self.$Modal.warning({
						title: '提示',
						content: '请选择一条记录！',
					});
				}else{
					self.userRoleModalOk = false;
					self.$Modal.confirm({
						title:"用户角色",
	                    render: (h) => {
	                        return h(userRoleEdit, {
	                            props: {
	                                userId: self.idSelectedArr[0],
	                                userRoleModalOk:self.userRoleModalOk
	                            }
	                        })
	                    },
                        onOk:function(){
                        	self.userRoleModalOk = true;
                        }
	                })
				}
			}
		}
	};
</script>
