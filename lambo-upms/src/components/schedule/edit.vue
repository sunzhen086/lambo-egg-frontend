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
			<Form ref="form" :model="form" :label-width="100" :rules="ruleValidate">
				<FormItem label="定时任务名称" prop="taskName">
					<Input v-model="form.taskName" placeholder="请输入系统名称"></Input>
				</FormItem>
        <FormItem label="定时任务服务" prop="service">
          <Input v-model="form.service" placeholder="如 com.lambo.test.testController"></Input>
        </FormItem>
				<FormItem label="方法名称" prop="method">
					<Input v-model="form.method" placeholder="请输入方法名称"></Input>
				</FormItem>
				<FormItem label="分钟" prop="minute">
					<Input v-model="form.minute" placeholder="如 *表示每分钟"></Input>
				</FormItem>
        <FormItem label="小时" prop="hour">
          <Input v-model="form.hour" placeholder="如 *表示每小时"></Input>
        </FormItem>
        <FormItem label="日" prop="dayOfMonth">
          <Input v-model="form.dayOfMonth" placeholder="如 *表示每天"></Input>
        </FormItem>
        <FormItem label="月" prop="month">
          <Input v-model="form.month" placeholder="如 *表示每月"></Input>
        </FormItem>
        <FormItem label="周" prop="dayOfWeek">
          <Input v-model="form.dayOfWeek" placeholder="如 *表示每周"></Input>
        </FormItem>
        <FormItem label="参数" prop="extrainfo" >
          <Input v-model="form.extrainfo" placeholder="如 101 201"></Input>
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
          taskName: "",
          service:"",
          method:"",
          minute: "",
          hour:"",
          dayOfMonth:"",
          month:"",
          dayOfWeek:"",
          extrainfo: ""
				},
				ruleValidate: {
          taskName: [{
						required: true,
						message: '定时任务名称不能为空',
						trigger: 'blur'
					}],
          service: [{
						required: true,
						message: '定时任务服务不能为空',
						trigger: 'blur'
					}],
          method: [{
						required: true,
						message: '请填写方法名称',
						trigger: 'blur'
					}],
          minute: [{
            required: true,
            message: '请填写分钟',
            trigger: 'blur'
          }],
          hour: [{
            required: true,
            message: '请填写小时',
            trigger: 'blur'
          }],
          dayOfMonth: [{
            required: true,
            message: '请填写日期',
            trigger: 'blur'
          }],
          month: [{
            required: true,
            message: '请填写月份',
            trigger: 'blur'
          }],
          dayOfWeek: [{
            required: true,
            message: '请填写周',
            trigger: 'blur'
          }]
				},
				created:false
			}
		},
		computed: {
      taskId: function() {
				return this.$route.query.taskId;
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
              taskName: self.form.taskName,
              service: self.form.service,
              method: self.form.method,
              extrainfo: self.form.extrainfo,
              minute: self.form.minute,
              hour: self.form.hour,
              dayOfMonth: self.form.dayOfMonth,
              month: self.form.month,
              dayOfWeek: self.form.dayOfWeek
						}
						if(self.taskId) {
							util.ajax.post("/manage/schedule/update/" + self.taskId, params).then(function(resp) {
								self.$Message.success('保存成功');
							}).catch(function(err) {
								self.$Message.error('保存失败,请联系系统管理员');
							});
						} else {
							util.ajax.post("/manage/schedule/create", params).then(function(resp) {
								self.$Message.success('新增定时任务成功');
								self.created = true;
							}).catch(function(err) {
								self.$Message.error('新增定时任务成功,请联系系统管理员');
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
				if(self.taskId) {
					util.ajax.get("/manage/schedule/get/" + self.taskId).then(function(resp) {
						var result = resp.data.data;
						self.form.taskName = result.taskName;
						self.form.service = result.service;
						self.form.method = result.method;
						self.form.extrainfo = result.extrainfo;
            self.form.minute = result.minute;
            self.form.hour = result.hour;
            self.form.dayOfMonth = result.dayofmonth;
            self.form.month = result.month;
            self.form.dayOfWeek = result.dayofweek;
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
