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
				<FormItem label="资源类型">
					<RadioGroup v-model="form.type" @on-change="typeChange">
						<Radio label="1">目录</Radio>
						<Radio label="2">菜单</Radio>
						<Radio label="3">按钮</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="上级系统" placeholder="选择上级系统" prop="parentSystem">
					<Select v-model="form.parentSystem" @on-change="systemSelectChange">
						<Option v-for="system in systemList" :value="system.systemId" :key="system.systemId">{{system.title}}</Option>
					</Select>
				</FormItem>
				<FormItem label="上级目录" v-if="form.type == 2" placeholder="选择上级目录" prop="parentCatalog">
					<Select v-model="form.parentCatalog">
						<Option v-for="catalog in catalogList" :value="catalog.permissionId" :key="catalog.permissionId">{{catalog.name}}</Option>
					</Select>
				</FormItem>
				<FormItem label="上级菜单" v-if="form.type == 3" placeholder="选择上级菜单" prop="parentMenu">
					<Select v-model="form.parentMenu">
						<Option v-for="menu in menuList" :value="menu.permissionId" :key="menu.permissionId">{{menu.name}}</Option>
					</Select>
				</FormItem>
				<FormItem label="资源名称" prop="name">
					<Input v-model="form.name" placeholder="请输入资源名称"></Input>
				</FormItem>
				<FormItem label="资源图标" v-if="form.type == 1" prop="icon">
					<Input v-model="form.icon" placeholder="请输入图标"></Input>
				</FormItem>
				<FormItem label="资源值" v-if="form.type == 2 || form.type == 3" prop="value">
					<Input v-model="form.value" placeholder="请输入资源值"></Input>
				</FormItem>
				<FormItem label="资源路径" v-if="form.type == 2" prop="path">
					<Input v-model="form.path" placeholder="请输入资源url"></Input>
				</FormItem>
				<FormItem label="资源状态">
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
					type: 1,
					parentSystem: "",
					parentCatalog: "",
					parentMenu: "",
					name: "",
					status: 1,
					icon: "",
					value: "",
					path: ""
				},
				systemList: [],
				catalogList: [],
				menuList: [],
				ruleValidate: {
					name: [{
						required: true,
						message: '资源名称不能为空',
						trigger: 'blur'
					}],
					parentSystem: [{
						required: true,
						message: '请选择上级系统'
					}],
					icon: [{
						required: true,
						message: '请填写图标',
						trigger: 'blur'
					}],
					value: [{
						required: true,
						message: '请填写资源值',
						trigger: 'blur'
					}]
				},
				created:false
			}
		},
		computed: {
			permissionId: function() {
				return this.$route.query.permissionId;
			},
			title: function() {
				return this.$route.meta.title;
			}
		},
		methods: {
			getSystemList: function() {
				var self = this;
				util.ajax.get("/manage/system/list?limit=100").then(function(resp) {
					self.systemList = resp.data.rows;
				})
			},
			systemSelectChange: function() {
				var self = this;
				var systemId = self.form.parentSystem;
				if(self.form.type == 2) {
					util.ajax.get("/manage/permission/list?limit=100&systemId=" + systemId + "&type=1").then(function(resp) {
						self.catalogList = resp.data.rows;
					})
				} else if(self.form.type == 3) {
					util.ajax.get("/manage/permission/list?limit=100&systemId=" + systemId + "&type=2").then(function(resp) {
						self.menuList = resp.data.rows;
					})
				}
			},
			typeChange: function() {
				this.$refs.form.resetFields();
			},
			formSubmit: function() {
				var self = this;
				self.$refs.form.validate((valid) => {
					if(valid) {
						var pid = "";
						if(self.form.type == 1) {
							pid = self.form.parentSystem;
						} else if(self.form.type == 2) {
							pid = self.form.parentCatalog
						} else if(self.form.type == 3) {
							pid = self.form.parentMenu
						}
						var params = {
							systemId: self.form.parentSystem,
							pid: pid,
							name: self.form.name,
							type: self.form.type,
							permissionValue: self.form.value,
							uri: self.form.path,
							icon: self.form.icon,
							status: self.form.status
						}
						if(self.permissionId) {
							util.ajax.post("/manage/permission/update/" + self.permissionId, util.params(params)).then(function(resp) {
								self.$Message.success('保存成功');
							}).catch(function(err) {
								self.$Message.error('保存失败,请联系系统管理员');
							});
						} else {
							util.ajax.post("/manage/permission/create", util.params(params)).then(function(resp) {
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
				if(self.permissionId) {
					util.ajax.get("/manage/permission/get/" + self.permissionId).then(function(resp) {
						var result = resp.data.data;
						self.form.type = result.type;
						self.form.parentSystem = result.systemId;
						if(result.type == 2) {
							self.form.parentCatalog = result.pid;
						} else if(result.type == 3) {
							self.form.parentMenu = result.pid;
						}
						self.form.name = result.name;
						self.form.status = result.status;
						self.form.icon = result.icon;
						self.form.value = result.permissionValue;
						self.form.path = result.uri;
					}).catch(function(err) {
						self.$Message.error('获取数据失败,请联系系统管理员');
					});
				}
			}
		},
		mounted: function() {
			this.getSystemList();
			this.initData();
		}
	}
</script>

<style>

</style>