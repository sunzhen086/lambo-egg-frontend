<template>
	<ztree :setting="setting" @onCheck="onCheck">
	</ztree>
</template>
<script>
	import ztree from "ztreev";
	import util from '@/libs/util.js';
	export default {
		props:{
			roleId:Number,
			rolePermissionModalOk:Boolean
		},
		data() {
			var self = this;
			return {
				setting: {
					check: {
						enable: true,
						// 勾选关联父，取消关联子
						chkboxType: {
							"Y": "p",
							"N": "s"
						}
					},
					once: {
						url: '/upms/manage/permission/role/'+self.roleId,
						type: 'GET',
						dataFilter: function(data) {
							return data
						}
					},
					data: {
						simpleData: {
							enable: true
						}
					}
				},
				changeDatas:[]
			}
		},
		watch:{
			rolePermissionModalOk:function(val){
				if(val){
					this.updateRolePermission();
				}
			}
		},
		methods: {
			onCheck: function(vm,treeId) {
				var self = this;
				var zTree = $.fn.zTree.getZTreeObj(treeId);
				var changeNodes = zTree.getChangeCheckedNodes();
				for(var i = 0; i < changeNodes.length; i++) {
					self.changeDatas.push({
						"id":changeNodes[i].id,
						"checked":changeNodes[i].checked
					});
				}
			},
			updateRolePermission: function(){
				var self = this;
				var params = {
					dataJson: JSON.stringify(self.changeDatas)
				}
				util.ajax.post("/manage/role/permission/"+self.roleId, util.params(params)).then(function(resp) {
					self.$Message.success('修改角色权限成功');
				}).catch(function(err) {
					self.$Message.error('修改角色权限失败,请联系角色管理员');
				});
			}
		},
		components: {
			ztree
		}
	};
</script>
<style>
	@import "~ztree/css/metroStyle/metroStyle.css";
</style>