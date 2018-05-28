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
        <FormItem label="数据源ID" prop="dsId">
          <Input v-model="form.dsId" placeholder="数据源ID要与本应用的数据源配置的beanId相同"></Input>
        </FormItem>
        <FormItem label="数据源名称" prop="dsName">
          <Input v-model="form.dsName" placeholder="请输入数据源名称"></Input>
        </FormItem>
        <FormItem label="数据源类型" prop="dsType">
          <Select v-model="form.dsType">
            <Option v-for="item in dataSourceType" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="数据源IP" prop="dsIp">
          <Input v-model="form.dsIp" placeholder="请输入数据源IP"></Input>
        </FormItem>
        <FormItem label="数据源端口" prop="dsPort">
          <Input v-model="form.dsPort" placeholder="请输入数据源端口"></Input>
        </FormItem>
        <FormItem label="数据库名称" prop="dsDatabase">
          <Input v-model="form.dsDatabase" placeholder="请输入数据库名称"></Input>
        </FormItem>
        <FormItem label="用户名" prop="dsUser">
          <Input v-model="form.dsUser" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="密码" prop="dsPassword">
          <Input v-model="form.dsPassword" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="备注" prop="note">
          <Input v-model="form.note" placeholder="备注信息"></Input>
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
  import util from '@/libs/util.js';
  import config from '@/config/config';

  export default {
    data() {
      return {
        form: {
          dsId:"",
          dsName:"",
          dsType:"mysql",
          dsIp:"",
          dsPort:"",
          dsDatabase:"",
          dsUser:"",
          dsPassword:"",
          note:""
        },
        ruleValidate: {
          dsId: [
            {required: true,message: '数据源ID不能为空',trigger: 'blur'}
          ],
          dsName: [
            {required: true,message: '数据源名称不能为空',trigger: 'blur'}
          ],
          dsIp: [
            {required: true,message: '数据源IP不能为空',trigger: 'blur'}
          ],
          dsPort: [
            {required: true,message: '数据源端口不能为空',trigger: 'blur'}
          ],
          dsDatabase: [
            {required: true,message: '数据库名不能为空',trigger: 'blur'}
          ],
          dsUser: [
            {required: true,message: '用户名不能为空',trigger: 'blur'}
          ],
          dsPassword: [
            {required: true,message: '密码不能为空',trigger: 'blur'}
          ]
        },
        dataSourceType:[
          {value:"mysql",label:"MySql"},
          {value:"greenplum",label:"Greenplum"},
          {value:"db2",label:"DB2"}
        ]
      }
    },
    computed: {
      dsId: function() {
        return this.$route.query.dsId;
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
              dsId: self.form.dsId,
              dsName: self.form.dsName,
              dsType: self.form.dsType,
              dsIp: self.form.dsIp,
              dsPort: self.form.dsPort,
              dsDatabase: self.form.dsDatabase,
              dsUser: self.form.dsUser,
              dsPassword: self.form.dsPassword,
              note: self.form.note

            };
            util.ajax.post("/manage/rest/datasource/update/" + self.dsId, params).then(function(resp) {
              if(resp.data.code === 1) {
                self.$Message.success('保存成功');
              }else{
                self.$Message.success('保存失败，请稍后重试');
              }
            });
          }
        })
      },
      pageGoBack: function() {
        this.$router.go(-1);
      },
      initData: function() {
        var self = this;
        if(self.dsId) {
          util.ajax.get("/manage/rest/datasource/query/" + self.dsId).then(function(resp) {
            let result = resp.data;
            if(result.code === 1){
              self.form.dsId = result.data.dsId;
              self.form.dsName = result.data.dsName;
              self.form.dsType = result.data.dsType;
              self.form.dsIp = result.data.dsIp;
              self.form.dsPort = result.data.dsPort;
              self.form.dsDatabase = result.data.dsDatabase;
              self.form.dsPassword = result.data.dsPassword;
              self.form.note = result.data.note;
            }else{
              self.$Message.error("数据获取异常，请稍候再试");
            }
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

</style>
