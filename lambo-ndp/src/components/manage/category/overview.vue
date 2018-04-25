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
          <Form :model="form" ref="form" :rules="ruleValidate" :label-width="80">
            <FormItem label="分类概述" prop="summary">
              <Input v-model="form.summary" type="textarea" placeholder="分类概述"></Input>
            </FormItem>
            <FormItem label="文章标题" prop="caption">
              <Input v-model="form.caption"  placeholder="文章标题"></Input>
            </FormItem>
            <FormItem label="文章图片" prop="picture" required>
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
                :max-size="1024"
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
              <div>图片限制为：jpg,jpeg,png、宽度不超过500px、<1M</div>
            </FormItem>
            <FormItem label="文章内容" prop="article">
              <Input v-model="form.article" type="textarea" :rows="10" placeholder="文章内容" ></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="formSubmit">保存</Button>
            </FormItem>
          </Form>
      </Col>
    </Row>
  </Card>


</template>

<script>
    import config from '@/config/config';

    export default {
        name: "overview",
        data(){
          return {
            form:{
              summary:"",
              caption:"",
              picture:[],
              article:""
            },
            defaultList: [],
            uploadUrl:"",
            imgUrl: '',
            visible: false,
            uploadList: [],
            uploadUrl:"/"+config.fileServerContext+"/manage/file/put",
            ruleValidate: {
              summary:[
                { required: true, message: '分类概述不能为空', trigger: 'blur' }
              ],
              caption:[
                { required: true, message: '文章标题不能为空', trigger: 'blur' }
              ],
              article:[
                { required: true, message: '文章内容不能为空', trigger: 'blur' }
              ],
              picture:[
                { validator:function(rule, value, callback, source, options) {
                    if(value.length > 1){
                      callback();
                    }else{
                      callback("文章图片至少要有一张");
                    }
                  }
                }
              ]
            }
          }
        },
        computed: {
          title: function() {
            return this.$route.meta.title;
          }
        },
        methods:{
          handleView (url) {
            this.imgUrl = url;
            this.visible = true;
          },
          handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.form.picture.splice(this.form.picture.indexOf(file.newName), 1);
          },
          handleSuccess (response, file) {
            file.url = "/"+config.fileServerContext+"/file/get/"+response.data[0].name;
            file.newName = response.data[0].name;
            this.form.picture.push(file.newName);
          },
          handleFormatError (file) {
            this.$Message.error("图片格式错误");
          },
          handleMaxSize (file) {
            this.$Message.error("图片大小错误");
          },
          handleBeforeUpload () {
            const check = this.uploadList.length <= 5;
            if (!check) {
              this.$Message.error("最多上传5张图片");
            }
            return check;
          },
          formSubmit(){
            var self = this;
            self.$refs.form.validate((valid) => {
              if(valid) {

              }
            })
          },
          pageGoBack(){
            this.$router.go(-1);
          }
        },
        mounted () {
          this.uploadList = this.$refs.upload.fileList;
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
