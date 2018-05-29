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
          <Button v-if="dsId" type="success" @click="testDatasource">测试连接</Button>
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
        dsId:this.$route.query.dsId,
        form: {
          dsId:"",
          dsName:"",
          dsType:"",
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
          {value:"db2",label:"DB2"},
          {value:"oracle",label:"Oracle"},
          {value:"greenplum",label:"Greenplum"}
        ]
      }
    },
    computed: {
      title: function() {
        return this.$route.meta.title;
      }
    },
    watch:{
      $route:function(){
        this.dsId = this.$route.query.dsId;
      }
    },
    methods: {
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
            if(self.dsId){
              util.ajax.post("/manage/rest/datasource/update/" + self.dsId, params).then(function(resp) {
                if(resp.data.code === 1) {
                  self.$Message.success('保存成功');
                }else{
                  self.$Message.error('保存失败，请稍后重试');
                }
              });
            }else{
              util.ajax.post("/manage/rest/datasource/insert", params).then(function(resp) {
                if(resp.data.code === 1) {
                  self.$Message.success('保存成功');
                  let dsId = resp.data.data.dsId;
                  self.$router.push({
                    name: '修改数据源',
                    query: {
                      dsId
                    }
                  });
                }else if(resp.data.code === 9){
                  self.$Message.error(resp.data.message);
                }else if(resp.data.code === 0){
                  self.$Message.error('保存失败，请稍后重试');
                }
              });
            }
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
              self.dsId = result.data.dsId;
              self.form.dsId = result.data.dsId;
              self.form.dsName = result.data.dsName;
              self.form.dsType = result.data.dsType;
              self.form.dsIp = result.data.dsIp;
              self.form.dsPort = result.data.dsPort+"";
              self.form.dsDatabase = result.data.dsDatabase;
              self.form.dsUser = result.data.dsUser;
              self.form.note = result.data.note;
            }else{
              self.$Message.error("数据获取异常，请稍候再试");
            }
          })
        }
      },
      testDatasource:function(){
        let self = this;
        util.ajax.get("/manage/rest/datasource/test/" + self.dsId).then(function(resp) {
          if(resp.data.code === 1 && resp.data.data === true) {
            self.$Message.success('数据源连接成功');
          }else{
            self.$Message.error('数据源连接测试失败，具体原因请查看日志');
          }
        });
      }
    },
    created() {

    },
    mounted(){
      this.initData();
    }
  }
</script>

<style lang="less" scoped>

</style>
