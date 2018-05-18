<template>
    <div>
      <Card dis-hover :bordered="false">
        <p slot="title">概述</p>
        <p>服务管理平台是lambo-egg开发框架的一个子模块，目的是为了高效的以可视化的方式来定义rest服务，供前端项目使用</p>
      </Card>
      <Card dis-hover :bordered="false">
        <p slot="title">服务的URL配置</p>
        <p>服务的URL只在新增服务的时候定义一次，后续不允许再修改，一定要修改就只能做删除后新增，这样做的目的有两个：</p>
        <ul style="margin-left:30px;">
          <li>让前端调用的URL可读性更高</li>
          <li>尽可能的避免因为后端修改URL造成前端程序报错的情况</li>
        </ul>
        <p>若服务的url为/aaa/bbb,前端调用此服务的url则为：/rest/service/aaa/bbb?参数1=xxx&&参数2=xxx(也可以用POST的方式传参)</p>
      </Card>
      <Card dis-hover :bordered="false">
        <p slot="title">服务的数据源配置</p>
        <p>服务的数据源首先应该在应用的applicationContext-jdbc.xml文件中配置好，然后再到rest_datasource表中进行数据维护，其中ds_id需要与applicationContext-jdbc.xml配置的数据源ID相同</p>
      </Card>
      <Card dis-hover :bordered="false">
        <p slot="title">服务的操作类型配置</p>
        <p>目前服务的操作类型有五种：selectList、selectOne、insert、update、delete.其中selectList取出一组数据，对应的是Array;其中selectOne取出一条数据，对应的是Object;insert、update、delete就按照SQL的真实类型填写就行</p>
      </Card>
      <Card dis-hover :bordered="false">
        <p slot="title">服务的参数配置</p>
        <p>参数定义了服务可以对外接受的变量，也与SQL模板中的变量对应，变量+SQL模板生成最终执行的SQL</p>
      </Card>
      <Card dis-hover :bordered="false">
        <p slot="title">SQL模板和MOCK数据</p>
        <p>SQL模板是服务取数的逻辑，MOCK数据是一套备用的结果数据，当开发机数据不足或者某分支比较难造数时，可以在前端切换到取MOCK数据，使前端的程序能够正常开发或测试。前端通过调用服务时的mock=true参数(例:/rest/service/aaa/bbb?mock=true)来切换是否使用MOCK数据。</p>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "setting-help",

    }
</script>

<style scoped>

</style>
