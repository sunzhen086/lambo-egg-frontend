<template>
  <div>
    <div class="container">
        <Form :label-width="80">
          <FormItem label="主题">
            <Input placeholder="20个字以内"></Input>
          </FormItem>
          <FormItem label="评价">
            <Rate ></Rate>
          </FormItem>
          <FormItem label="内容">
            <Input  type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="提出你的需求或者问题"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary">提交</Button>
          </FormItem>
        </Form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "feedback"
    }
</script>

<style lang="less" scoped>
  .container{
    width:1080px;
    margin:20px auto;
  }
</style>

