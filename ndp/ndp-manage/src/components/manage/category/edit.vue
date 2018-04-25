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
          <FormItem label="图片" prop="categoryImg" required>
            <div class="demo-upload-list" v-for="item in uploadList">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="512"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              type="drag"
              :action="uploadUrl"
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
            <Modal title="查看图片" v-model="visible">
              <img :src="imgUrl" v-if="visible" style="width: 100%">
            </Modal>
            <div>图片限制为:48*48px，两张图片，第一张为默认图标，第二张为获取焦点时图标</div>
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
					categoryImg:[],
          categoryOrder:1,
          categoryDesc:""
				},
				ruleValidate: {
          categoryName: [
						{required: true,message: '名称不能为空',trigger: 'blur'},
						{type: 'string', max: 20, message: '名称不能超过20个字', trigger: 'blur'}
					],
          categoryImg:[
            { validator:function(rule, value, callback, source, options) {
                if(value.length == 2){
                  callback();
                }else{
                  callback("图片必须为两张");
                }
              }
            }
          ],
          categoryOrder:[
            {required: true,message: '顺序必须为整数',trigger: 'blur',pattern:/^\+?[0-9][0-9]*$/}
          ]
				},
				created:false,
        defaultList: [],
        uploadList: [],
        imgUrl: '',
        visible: false,
        uploadUrl:"/"+config.fileServerContext+"/manage/file/put",
        downloadUrl:"/"+config.fileServerContext+"/file/get"
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
      handleView (url) {
        this.imgUrl = url;
        this.visible = true;
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        this.uploadList.splice(this.uploadList.indexOf(file.newName), 1);
        this.form.categoryImg.splice(this.form.categoryImg.indexOf(file.newName), 1);
      },
      handleSuccess (response, file) {
        file.url = this.downloadUrl + "/"+response.data[0].name;
        file.newName = response.data[0].name;
        this.uploadList.push(file);
        this.form.categoryImg.push(file.newName);
      },
      handleFormatError (file) {
        this.$Message.error("图片的格式只能为:'jpg','jpeg','png'");
      },
      handleMaxSize (file) {
        this.$Message.error("图片的大小不能超过512K");
      },
      handleBeforeUpload () {
        const check = this.uploadList.length != 2;
        if (!check) {
          this.$Message.error("请上传2张图片");
        }
        return check;
      },
			formSubmit: function() {
				var self = this;
				self.$refs.form.validate((valid) => {
					if(valid) {
						var params = {
							categoryName: self.form.categoryName,
							categoryDesc: self.form.categoryDesc,
              categoryOrder: self.form.categoryOrder,
              categoryImg: self.form.categoryImg.toString()
						};
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
            self.form.categoryOrder = result.categoryOrder;

            self.form.categoryImg = result.categoryImg.split(',');
            var length = self.form.categoryImg.length;
            for (var i=0; i < length; i++) {
              self.defaultList.push({
                'name': self.form.categoryImg[i],
                'url': self.downloadUrl + "/" + self.form.categoryImg[i],
                'status': 'finished'
              });
            }
            self.uploadList = self.defaultList;
					})
				}
			}
		},
		created() {
      this.initData();
		},
		mounted(){
    }
	}
</script>

<style lang="less" scoped>
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
