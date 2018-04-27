<template>
  <div>
    <div class="container">
        <Form :label-width="80" ref="form" :model="form" :rules="ruleValidate">
          <FormItem label="主题" prop="title">
            <Input  v-model="form.title" placeholder="30个字以内"></Input>
          </FormItem>
          <FormItem label="评价" prop="valueHalf">
            <Rate v-model="form.rateCount"></Rate>
          </FormItem>
          <FormItem label="内容" prop="commentContent">
            <Input  v-model="form.commentContent" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="提出你的需求或者问题"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="formSubmit" :disabled="submitFlag">提交</Button>
            <Button type="default" @click="formReset">重置</Button>
          </FormItem>
        </Form>
    </div>
  </div>
</template>

<script>
  var submitFlag = false;
    var name= "feedback";
      var categoryId="12345";
      var categoryType="0";
    import util from '@/libs/util';
    export default {

      data() {
        return {
          form:{
            title:"",
            valueHalf:0,
            commentContent:""
          },
          ruleValidate: {
            title: [
              {required: true,message: '反馈主题不能为空',trigger: 'blur'},
              {type: 'string', max: 30, message: '不能超过30个字', trigger: 'blur'}
            ],
            commentContent:[
              {required: true,message: '反馈内容不能为空！',trigger: 'blur',pattern:/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+/},
              {type: 'string', max: 300,message: '不能超过300个字',trigger: 'blur'},
              {type: 'string', min: 10,message: '不能小于10个字',trigger: 'blur'}
            ]
          },
          submitFlag:false
        }
      },
      methods:{
        formSubmit: function() {
          var self = this;

          self.$refs.form.validate(function (valid){
            if(valid) {
              var params = {
                categoryType:categoryType,
                title: self.form.title,
                rateCount: self.form.rateCount,
                commentContent: self.form.commentContent,
                categoryId: categoryId
              }
              util.ajax.post("/manage/feedBack/save", params).then(function(resp) {
                if(resp.data.code === 1){
                  self.$Message.success('新增成功');
                  self.submitFlag = true;
                }else{
                  self.$Message.success('新增失败，请稍后重试');
                }
              })
            }
          })
        },
        formReset: function() {
          this.$refs.form.resetFields();
        }
      }
    }
</script>

<style lang="less" scoped>
  .container{
    width:1080px;
    margin:20px auto;
  }
</style>

