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
				<FormItem label="系统名称" prop="name">
					<Input v-model="form.name" placeholder="请输入系统名称"></Input>
				</FormItem>
				<FormItem label="系统图标" prop="icon">
					<Input v-model="form.icon" placeholder="请输入系统图标"></Input>
				</FormItem>
				<FormItem label="系统路径" prop="basepath">
					<Input v-model="form.basepath" placeholder="请输入系统路径"></Input>
				</FormItem>
				<FormItem label="系统状态">
					<RadioGroup v-model="form.status">
						<Radio label="1">正常</Radio>
						<Radio label="0">锁定</Radio>
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
					name: "",
					status: 1,
					icon: "",
					basepath: ""
				},
				ruleValidate: {
					name: [{
						required: true,
						message: '系统名称不能为空',
						trigger: 'blur'
					}],
					basepath: [{
						required: true,
						message: '系统路径不能为空',
						trigger: 'blur'
					}],
					icon: [{
						required: true,
						message: '请填写图标',
						trigger: 'blur'
					}]
				},
				created:false
			}
		},
		computed: {
			systemId: function() {
				return this.$route.query.systemId;
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
							title: self.form.name,
							basepath: self.form.basepath,
							icon: self.form.icon,
							status: self.form.status
						}
						if(self.systemId) {
							util.ajax.post("/manage/system/update/" + self.systemId, util.params(params)).then(function(resp) {
								self.$Message.success('保存成功');
							}).catch(function(err) {
								self.$Message.error('保存失败,请联系系统管理员');
							});
						} else {
							util.ajax.post("/manage/system/create", util.params(params)).then(function(resp) {
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
				if(self.systemId) {
					util.ajax.get("/manage/system/get/" + self.systemId).then(function(resp) {
						var result = resp.data.data;
						self.form.name = result.name;
						self.form.status = result.status;
						self.form.icon = result.icon;
						self.form.basepath = result.basepath;
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