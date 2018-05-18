<template>
  <div>
    <Card dis-hover :bordered="false">
      <p slot="title">概述</p>
      <p>系统内置了一系列的内置变量，可以在SQL中直接使用，而不需要在参数中定义</p>
    </Card>
    <Card dis-hover :bordered="false">
      <p slot="title">内置变量列表</p>
      <ul style="margin-left:20px">
        <li>BUILTIN_USER_ID:当前登录用户的USER_ID</li>
        <li>BUILTIN_COM_ID:当前登录用户的所属公司</li>
        <li>BUILTIN_NOW_DATE_YYYYMMDD:以YYYYMMDD格式获取当前时间，下同</li>
        <li>BUILTIN_NOW_DATE_YYYYMM</li>
        <li>BUILTIN_NOW_DATE_YYYY</li>
        <li>BUILTIN_SAME_DATE_YYYYMMDD:以YYYYMMDD格式获取同期时间，下同</li>
        <li>BUILTIN_SAME_DATE_YYYYMM</li>
        <li>BUILTIN_SAME_DATE_YYYY</li>
      </ul>
    </Card>
  </div>
</template>

<script>
    export default {
        name: "built-in-variable"
    }
</script>

<style scoped>

</style>
