<template>
	<div style="margin-top:20px">
		<Select v-model="userRoleArr" multiple>
	        <Option v-for="item in allRoleArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    </Select>
	</div>
</template>

<script>
	import util from '@/libs/util.js';
	export default {
		props:{
			userId:Number,
			userRoleModalOk:Boolean
		},
		data:function(){
			return {
				allRoleArr:[],
				userRoleArr:[]
			}
		},
		watch:{
			userRoleModalOk:function(val){
				if(val){
					this.saveUserRole();
				}
			}
		},
		created:function(){
			this.getAllRoleArr();
			this.getUserRoleArr();
		},
		methods:{
			getAllRoleArr:function(){
				var self = this;
				util.ajax.get("/manage/role/list?limit=100").then(function(result){
					var roleList = result.data.rows;
					for(var role of roleList){
						self.allRoleArr.push({
							key:role.roleId,
							value:role.roleId,
							label:role.name
						});
					}
				})
			},
			getUserRoleArr:function(){
				var self = this;
				util.ajax.get("/manage/user/role/"+self.userId).then(function(result){
					var userRoleArr = result.data.data;
					for(var userRole of userRoleArr){
						self.userRoleArr.push(userRole.roleId);
					}
				})
			},
			saveUserRole:function(){
				var self = this;
				var params = {
					roleIds:self.userRoleArr.join(",")
				};
				util.ajax.post("/manage/user/role/"+self.userId,params).then(function(result){
					self.$Message.success('修改用户角色成功');
				}).catch(function(err) {
					self.$Message.error('修改用户角色失败,请联系角色管理员');
				});
			}
		}
	}
</script>

<style>
</style>
