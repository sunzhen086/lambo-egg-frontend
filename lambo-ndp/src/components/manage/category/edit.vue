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
				<FormItem label="名称" prop="categoryname">
					<Input v-model="form.categoryname" placeholder="请输入名称"></Input>
				</FormItem>
				<FormItem label="描述" prop="categorydesc">
					<Input  v-model="form.categorydesc" placeholder="请输入描述"></Input>
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
					categoryname:"",
					categorydesc:""
				},
				ruleValidate: {
          categoryname: [
						{required: true,message: '名称不能为空',trigger: 'blur'},
						{type: 'string', max: 20, message: '名称不能超过20个字', trigger: 'blur'}
					]
				},
				created:false
			}
		},
		computed: {
      categoryId: function() {
				return this.$route.query.categoryId;
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
							categoryName: self.form.categoryname,
							categoryDesc: self.form.categorydesc
						}
						if(self.categoryId) {  //修改
							util.ajax.post("/manage/cateGoryData/update/" + self.categoryId, params).then(function(resp) {
								self.$Message.success('保存成功');
							});
						} else { //新增
							util.ajax.post("/manage/cateGoryData/create", params).then(function(resp) {
								self.$Message.success('新增成功');
								self.created = true;
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
				if(self.categoryId) {
					util.ajax.get("/manage/cateGoryData/get/" + self.categoryId).then(function(resp) {
						var result = resp.data.data;
						self.form.categoryname = result.categoryName;
						self.form.categorydesc = result.categoryDesc;

					})
				}
			}
		},
		mounted() {
			this.initData();
		}
	}
</script>

<style>

</style>
