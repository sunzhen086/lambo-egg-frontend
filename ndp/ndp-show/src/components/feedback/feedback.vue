<template>
  <div class="page sjb-feekback">
    <Card :bordered="false" dis-hover class="container">
        <div class="head-title">反馈信息</div>
          <Form :label-width="60" ref="form" :model="form" :rules="ruleValidate" >
            <FormItem label="主题"  prop="title" >
              <Input v-model="form.title" placeholder="30个字以内" />
            </FormItem>
            <div class="requir-rate">*</div><FormItem label="评价" prop="rateCount" >
              <Rate v-model="form.rateCount"></Rate>
            </FormItem>
            <FormItem label="内容" prop="commentContent">
              <Input v-model="form.commentContent" type="textarea" :autosize="{minRows: 5,maxRows: 5}"
                     placeholder="提出你的需求或者问题" />
            </FormItem>
            <FormItem>
              <Button type="primary" @click="formSubmit" :disabled="submitFlag">提交</Button>
              <Button type="ghost" @click="formReset">重置</Button>
            </FormItem>
          </Form>
    </Card>
  </div>
</template>

<script>
  var name = "feedback";
  import util from '@/libs/util';

  export default {

    data() {
      return {
        form: {
          title: "",
          valueHalf: 0,
          commentContent: ""
        },
        ruleValidate: {
          title: [
            {required: true, message: '反馈主题不能为空', trigger: 'blur'},
            {type: 'string', max: 30, message: '不能超过30个字', trigger: 'blur'}
          ],
          rateCount:
            {
              validator:function(rule, value, callback, source, options) {
                if(value>0){
                  callback();
                  return true;
                }else {
                  callback("请选择评分！");
                }
              }
            }

          ,
          commentContent: [
            {required: true, message: '请填写中文评价！', trigger: 'blur', pattern: /([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+/},
            {type: 'string', max: 300, message: '不能超过300个字', trigger: 'blur'},
            {type: 'string', min: 10, message: '不能小于10个字', trigger: 'blur'}
          ]
        },
        submitFlag: false
      }
    },
    computed:{
      categoryId:function(){
        return this.$route.query.categoryId;
      },
      categoryType:function(){
        return this.$route.query.categoryType;
      }
    },
    methods: {
      formSubmit: function () {
        var self = this;

        self.$refs.form.validate(function (valid) {

          if (valid) {
            var params = {
              categoryType: self.categoryType,
              title: self.form.title,
              rateCount: self.form.rateCount,
              commentContent: self.form.commentContent,
              categoryId: self.categoryId
            }
            util.ajax.post("/manage/feedBack/save", params).then(function (resp) {
              if (resp.data.code === 1) {
                self.$Message.success('您的反馈已经提交！');
                self.submitFlag = true;
              } else {
                self.$Message.success('提交反馈失败，请稍后重试');
              }
            })
          }
        })
      },
      formReset: function () {
        this.$refs.form.resetFields();
      }
    }
  }
</script>
<style>
  .sjb-feekback .ivu-form-item-label{
    font-size: 14px;
  }
  .sjb-feekback .requir-rate{
    float: left;
    margin-top: 9px;
    margin-right: -15px;
    margin-left: 8px;
    color: #ed3f14;
    font-family: SimSun;
  }
</style>
<style lang="less" scoped>

  .page{
    background: #fafafa;
    padding-top: 20px;
    padding-bottom:50px;
    .container {
      width: 1080px;
      margin: 0px auto;
      .head-title {
        font-size: 16px;
        font-weight: bolder;
        margin-left: 24px;
        margin-bottom: 20px;
      }
    }

  }

</style>

