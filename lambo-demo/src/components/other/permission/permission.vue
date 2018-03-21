<template>
  <Card>
    <Input style="width: 300px" v-model="testBtnPermission"/>
    <br/>
    <br/>
    <div>如果你能看到下边的按钮说明当前用户对{{testBtnPermission}}具有权限</div>
    <br/>
    <Button v-permission="testBtnPermission">测试按钮</Button>
  </Card>

</template>

<script>
    export default {
        name: "permission",
        data(){
          return {
            testBtnPermission:'demo:home:read'
          }
        }
    }
</script>

<style lang="less" scoped>

</style>
