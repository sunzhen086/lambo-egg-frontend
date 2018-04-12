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
          <FormItem label="名称" prop="categoryName">
            <Input v-model="form.categoryName" placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem label="图片" prop="categoryImg">
            <input type="hidden" :value="form.categoryImg"></input>
            <div class="image-container">
              <img v-if="form.categoryImg != ''" :src="imgUrl" />
            </div>
            <div class="image-select">
              <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="512"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                :action="uploadUrl">

                <Button type="ghost" icon="image">选择图片</Button>

              </Upload>
            </div>
          </FormItem>
          <FormItem label="顺序" prop="categoryOrder">
            <Input  v-model="form.categoryOrder" placeholder="请输入描述" number></Input>
          </FormItem>

          <FormItem label="描述" prop="categoryDesc">
            <Input  v-model="form.categoryDesc" placeholder="请输入描述"></Input>
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
	import config from '@/config/config';

	export default {
		data() {
			return {
				form: {
					categoryName:"",
					categoryImg:"",
          categoryOrder:1,
          categoryDesc:""
				},
				ruleValidate: {
          categoryName: [
						{required: true,message: '名称不能为空',trigger: 'blur'},
						{type: 'string', max: 20, message: '名称不能超过20个字', trigger: 'blur'}
					],
          categoryImg:[
            {required: true,message: '图片不能为空',trigger: 'blur'},
          ],
          categoryOrder:[
            {required: true,message: '顺序必须为整数',trigger: 'blur',pattern:/^\+?[0-9][0-9]*$/}
          ]
				},
				created:false,
        uploadUrl:"/"+config.serverContext+"/manage/file/put"
			}
		},
		computed: {
      categoryId: function() {
				return this.$route.query.categoryId;
			},
			title: function() {
				return this.$route.meta.title;
			},
      imgUrl: function(){
        return "/"+config.serverContext+"/manage/file/get/"+ this.form.categoryImg;
      }
		},
		methods: {
			formSubmit: function() {
				var self = this;
				self.$refs.form.validate((valid) => {
					if(valid) {
						var params = {
							categoryName: self.form.categoryName,
							categoryDesc: self.form.categoryDesc,
              categoryOrder: self.form.categoryOrder,
              categoryImg: self.form.categoryImg
						}
						if(self.categoryId) {  //修改
							util.ajax.post("/manage/category/update/" + self.categoryId, params).then(function(resp) {

                if(resp.data.code === 1) {
                  self.$Message.success('更新成功');
                }else{
                  self.$Message.success('更新失败，请稍后重试');
                }
							});
						} else { //新增
							util.ajax.post("/manage/category/create", params).then(function(resp) {
							  if(resp.data.code === 1){
                  self.$Message.success('新增成功');
                  self.created = true;
                }else{
                  self.$Message.success('新增失败，请稍后重试');
                }

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
					util.ajax.get("/manage/category/get/" + self.categoryId).then(function(resp) {
						var result = resp.data.data;
						self.form.categoryName = result.categoryName;
						self.form.categoryDesc = result.categoryDesc;
            self.form.categoryImg = result.categoryImg;
            self.form.categoryOrder = result.categoryOrder;
					})
				}
			},
      handleFormatError:function(){
        this.$Message.error("图片的格式只能为:'jpg','jpeg','png'");
      },
      handleMaxSize:function(){
        this.$Message.error("图片的大小不能超过512K");
      },
      handleBeforeUpload:function(){

      },
      handleSuccess:function(response, file, fileList){
        if(response.code === 1 && response.data.length > 0){
          this.form.categoryImg = response.data[0].name;
        }else{
          this.$message.error("图片上传失败，请联系系统管理员")
        }
      }
		},
		mounted() {
			this.initData();
		}
	}
</script>

<style lang="less" scoped>
  .image-container{
    width:100px;
    height:100px;
    background:#eee;
    vertical-align: top;
    display:inline-block;
    img{
      width:100%;
      height:100%;
    }
  }
  .image-select{
    width:100px;
    height:100px;
    vertical-align: top;
    display:inline-block;
    position:relative;
    .ivu-btn{
      position:absolute;
      bottom:0;
      left:0;
    }
  }
</style>
