<template>
	<div style="margin-top:20px">
		<Select v-model="userOrganArr" multiple>
	        <Option v-for="item in allOrganArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    </Select>
	</div>
</template>

<script>
	import util from '@/libs/util.js';
	export default {
		props:{
			userId:Number,
			userOrganModalOk:Boolean
		},
		data:function(){
			return {
				allOrganArr:[],
				userOrganArr:[]
			}
		},
		watch:{
			userOrganModalOk:function(val){
				if(val){
					this.saveUserOrgan();
				}
			}
		},
		created:function(){
			this.getAllOrganArr();
			this.getUserOrganArr();
		},
		methods:{
			getAllOrganArr:function(){
				var self = this;
				util.ajax.get("/manage/organization/list?limit=100").then(function(result){
					var organList = result.data.rows;
					for(var organ of organList){
						self.allOrganArr.push({
							key:organ.organizationId,
							value:organ.organizationId,
							label:organ.name
						});
					}
				})
			},
			getUserOrganArr:function(){
				var self = this;
				util.ajax.get("/manage/user/organization/"+self.userId).then(function(result){
					var userOrganArr = result.data.data;
					for(var userOrgan of userOrganArr){
						self.userOrganArr.push(userOrgan.organizationId);
					}
				})
			},
			saveUserOrgan:function(){
				var self = this;
				var params = {
					orgIds:self.userOrganArr.join(",")
				};
				util.ajax.post("/manage/user/organization/"+self.userId,util.params(params)).then(function(result){
					self.$Message.success('修改用户组织成功');
				}).catch(function(err) {
					self.$Message.error('修改用户组织失败,请联系角色管理员');
				});
			}
		}
	}
</script>

<style>
</style>