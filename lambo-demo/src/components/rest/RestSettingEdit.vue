<template>
  <div>
    <Card>
      <p slot="title">
        rest_setting修改
      </p>
      <div slot="extra">
        <Button type="primary" @click="formSubmit">保存</Button>
        <a href="#" @click="pageGoBack">
          <Icon type="android-arrow-back"></Icon>
          返回</a>
      </div>
      <Form ref="formData" :model="formData" :label-width="80" :rules="ruleValidate">
        <FormItem label="rest_id" prop="restId">
          <div v-if="restId">{{formData.restId}}</div>

          <Input v-model="formData.restId" placeholder="请输入rest_id" v-else></Input>
        </FormItem>
        <FormItem label="rest_name" prop="restName">
          <Input v-model="formData.restName" placeholder="请输入rest_name"></Input>
        </FormItem>
        <FormItem label="url" prop="url">
          <Input v-model="formData.url" placeholder="请输入url"></Input>
        </FormItem>
        <FormItem label="operation_type" prop="operationType">
          <Input v-model="formData.operationType" placeholder="请输入operation_type"></Input>
        </FormItem>
        <FormItem label="datasource" prop="datasource">
          <Input v-model="formData.datasource" placeholder="请输入datasource"></Input>
        </FormItem>
        <FormItem label="rest_sql" prop="restSql">
          <Input v-model="formData.restSql" placeholder="请输入rest_sql"></Input>
        </FormItem>
        <FormItem label="mock_data" prop="mockData">
          <Input v-model="formData.mockData" placeholder="请输入mock_data"></Input>
        </FormItem>
        <FormItem label="note" prop="note">
          <Input v-model="formData.note" placeholder="请输入note"></Input>
        </FormItem>
        <FormItem label="create_time" prop="createTime">
          <Input v-model="formData.createTime" placeholder="请输入create_time"></Input>
        </FormItem>
        <FormItem label="update_time" prop="updateTime">
          <Input v-model="formData.updateTime" placeholder="请输入update_time"></Input>
        </FormItem>
        <FormItem label="create_user" prop="createUser">
          <Input v-model="formData.createUser" placeholder="请输入create_user"></Input>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
  import util from '@/libs/util.js';

  export default {
    data() {
      return {
        formData: {
          restId: "",
          restName: "",
          url: "",
          operationType: "",
          datasource: "",
          restSql: "",
          mockData: "",
          note: "",
          createTime: "",
          updateTime: "",
          createUser: "",
        },
        ruleValidate: {}
      };
    },
    computed: {
      restId: function () {
        return this.$route.query.restId;
      }
    },
    watch: {},
    methods: {
      pageGoBack() {
        this.$router.go(-1);
      },
      formSubmit() {
        var self = this;
        var params = {
          restId: self.formData.restId,
          restName: self.formData.restName,
          url: self.formData.url,
          operationType: self.formData.operationType,
          datasource: self.formData.datasource,
          restSql: self.formData.restSql,
          mockData: self.formData.mockData,
          note: self.formData.note,
          createTime: self.formData.createTime,
          updateTime: self.formData.updateTime,
          createUser: self.formData.createUser,
        };
        if (self.restId) {  //修改
          util.ajax.post("/manage/restSetting/update/" + self.restId, params).then(function (resp) {
            self.$Message.success('保存成功');
            self.pageGoBack();
          })
        } else { //新增
          util.ajax.post("/manage/restSetting/create", params).then(function (resp) {
            self.$Message.success('新增成功');
            self.pageGoBack();
          })
        }
      },
      initData: function () {
        var self = this;
        //初始化数据
        if (self.restId) { //修改
          util.ajax.get("/manage/restSetting/get/" + self.restId).then(function (resp) {
            var result = resp.data;
            self.formData.restId = result.restId;
            self.formData.restName = result.restName;
            self.formData.url = result.url;
            self.formData.operationType = result.operationType;
            self.formData.datasource = result.datasource;
            self.formData.restSql = result.restSql;
            self.formData.mockData = result.mockData;
            self.formData.note = result.note;
            self.formData.createTime = result.createTime;
            self.formData.updateTime = result.updateTime;
            self.formData.createUser = result.createUser;
          });
        }
      }
    },
    mounted() {
      this.initData();
    }

  };
</script>
