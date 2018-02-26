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
				<FormItem label="帐号" prop="username">
					<Input v-model="form.username" placeholder="请输入用户账号"></Input>
				</FormItem>
				<FormItem label="密码" prop="password">
					<Input type="password" v-model="form.password" placeholder="请输入用户密码"></Input>
				</FormItem>
				<FormItem label="姓名" prop="realname">
					<Input v-model="form.realname" placeholder="请输入用户姓名"></Input>
				</FormItem>
				<FormItem label="电话" prop="phone">
					<Input v-model="form.phone" placeholder="请输入用户电话"></Input>
				</FormItem>
				<FormItem label="邮箱" prop="email">
					<Input v-model="form.email" placeholder="请输入用户邮箱"></Input>
				</FormItem>
				<FormItem label="性别" prop="sex">
					<RadioGroup v-model="form.sex">
						<Radio label="1">男</Radio>
						<Radio label="0">女</Radio>
					</RadioGroup>
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
					username:"",
					password:"",
					realname:"",
					phone:"",
					email:"",
					sex:1
				},
				ruleValidate: {
					username: [
						{required: true,message: '系统名称不能为空',trigger: 'blur'},
						{type: 'string', max: 20, message: '系统名称不能超过20个字', trigger: 'blur'}
					],
					password: [
						{required: true,message: '请输入密码',trigger: 'blur'},
						{type: 'string',min:5, max: 20, message: '密码长度必须介于5-20之间', trigger: 'blur'}
					],
					realname: [
						{required: true, message: '用户姓名不能为空', trigger: 'blur'},
						{type: 'string', max: 20, message: '用户姓名不能超过20个字', trigger: 'blur'}
					]
				},
				created:false
			}
		},
		computed: {
			userId: function() {
				return this.$route.query.userId;
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
							userName: self.form.username,
							password: self.form.password,
							realName: self.form.realname,
							phone: self.form.phone,
							email: self.form.email,
							sex: self.form.sex
						}
						if(self.userId) {
							util.ajax.post("/manage/user/update/" + self.userId, util.params(params)).then(function(resp) {
								self.$Message.success('保存成功');
							}).catch(function(err) {
								self.$Message.error('保存失败,请联系系统管理员');
							});
						} else {
							util.ajax.post("/manage/user/create", util.params(params)).then(function(resp) {
								self.$Message.success('新增资源成功');
								self.created = true;
							}).catch(function(err) {
								self.$Message.error('新增资源失败,请联系系统管理员');
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
				if(self.userId) {
					util.ajax.get("/manage/user/get/" + self.userId).then(function(resp) {
						var result = resp.data.data;
						self.form.username = result.username;
						self.form.password = result.password;
						self.form.realname = result.realname;
						self.form.email = result.email;
						self.form.phone = result.phone;
						self.form.sex = result.sex;
						self.form.locked = result.locked;
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