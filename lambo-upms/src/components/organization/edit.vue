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
				<FormItem label="组织名称" prop="name">
					<Input v-model="form.name" placeholder="请输入组织名称"></Input>
				</FormItem>
				<FormItem label="组织描述" prop="description">
					<Input v-model="form.description" placeholder="请输入组织描述"></Input>
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
					description: "",
				},
				ruleValidate: {
					name: [
						{required: true, message: '组织名称不能为空', trigger: 'blur'},
						{type: 'string',max: 20,message: '组织名称不能超过20个字',trigger: 'blur'}
					]
				},
				created: false
			}
		},
		computed: {
			organizationId: function() {
				return this.$route.query.organizationId;
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
							description: self.form.description
						}
						if(self.organizationId) {
							util.ajax.post("/manage/organization/update/" + self.organizationId, params).then(function(resp) {
								self.$Message.success('保存成功');
							}).catch(function(err) {
								self.$Message.error('保存失败,请联系系统管理员');
							});
						} else {
							util.ajax.post("/manage/organization/create", params).then(function(resp) {
								self.$Message.success('新增组织成功');
								self.created = true;
							}).catch(function(err) {
								self.$Message.error('新增组织失败,请联系系统管理员');
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
				if(self.organizationId) {
					util.ajax.get("/manage/organization/get/" + self.organizationId).then(function(resp) {
						var result = resp.data.data;
						self.form.name = result.name;
						self.form.description = result.description;
					}).catch(function(err) {
						self.$Message.error('获取数据失败,请联系系统管理员');
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
