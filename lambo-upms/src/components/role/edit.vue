<template>
	<Card>
		<p slot="title">
			{{title}}
		</p>
		<div slot="extra">
			<a href="#" @click="pageGoBack">
				<Icon type="android-arrow-back"></Icon> 返回</a>
		</div>
		<Row>
			<Col span="12" offset="6">
			<Form ref="form" :model="form" :label-width="80" :rules="ruleValidate">
				<FormItem label="角色名称" prop="name">
					<Input v-model="form.name" placeholder="请输入角色名称"></Input>
				</FormItem>
				<FormItem label="角色标题" prop="title">
					<Input v-model="form.title" placeholder="请输入角色描述"></Input>
				</FormItem>
				<FormItem label="角色描述" prop="description">
					<Input v-model="form.description" placeholder="请输入角色描述"></Input>
				</FormItem>
				<FormItem v-if="!created">
					<Button type="primary" @click="formSubmit">保存</Button>
					<Button type="default" @click="formReset">重置</Button>
				</FormItem>
			</Form>
			</Col>
		</Row>
	</Card>
</template>

<script>
	import util from '@/libs/util.js';
	export default {
		data() {
			return {
				form: {
					name: "",
					title:"",
					description: "",
				},
				ruleValidate: {
					name: [
						{required: true, message: '角色名称不能为空', trigger: 'blur'},
						{type: 'string',max: 20,message: '角色名称不能超过20个字',trigger: 'blur'}
					],
					title: [
						{required: true, message: '角色标题不能为空', trigger: 'blur'},
						{type: 'string',max: 20,message: '角色标题不能超过20个字',trigger: 'blur'}
					]
				},
				created: false
			}
		},
		computed: {
			roleId: function() {
				return this.$route.query.roleId;
			},
			title: function() {
				return this.$route.meta.title;
			}
		},
		methods: {
			formSubmit: function() {
				var self = this;
				self.$refs.form.validate((valid) => {
					if(valid) {
						var params = {
							name: self.form.name,
							title: self.form.title,
							description: self.form.description
						}
						if(self.roleId) {
							util.ajax.post("/manage/role/update/" + self.roleId, params).then(function(resp) {
								self.$Message.success('保存成功');
							}).catch(function(err) {
								self.$Message.error('保存失败,请联系角色管理员');
							});
						} else {
							util.ajax.post("/manage/role/create", params).then(function(resp) {
								self.$Message.success('新增角色成功');
								self.created = true;
							}).catch(function(err) {
								self.$Message.error('新增角色失败,请联系角色管理员');
							});
						}
					}
				})
			},
			pageGoBack: function() {
				this.$router.go(-1);
			},
			formReset: function() {
				this.$refs.form.resetFields();
			},
			initData: function() {
				var self = this;
				if(self.roleId) {
					util.ajax.get("/manage/role/get/" + self.roleId).then(function(resp) {
						var result = resp.data.data;
						self.form.name = result.name;
						self.form.title = result.title;
						self.form.description = result.description;
					}).catch(function(err) {
						self.$Message.error('获取数据失败,请联系角色管理员');
					});
				}
			}
		},
		mounted: function() {
			this.initData();
		}
	}
</script>

<style>

</style>
