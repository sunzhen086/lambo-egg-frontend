<template>
    <div>
      <Card dis-hover :bordered="false">
        <p slot="title">概述</p>
        <p>预处理函数是一套java方法，对前端传过来的参数，在生成SQL时进行一些处理，目的是满足一些个性化的场景</p>
      </Card>
      <Card dis-hover :bordered="false">
        <p slot="title">使用方法</p>
        <code>参数==> month = 201805</code>
        <code>模板==> select a from b where month = #{@com.lambo.rest.client.factory.Utils@getSamePeriod(month)}</code>
        <code>生成<== select a from b where month =  '201705'</code>
      </Card>
      <Card dis-hover :bordered="false">
        <p slot="title">内置的预处理函数列表</p>
        <code>
          //将value转化为%value%
        </code>
        <code>
          @com.lambo.rest.client.factory.Utils@convertLike(value)
        </code>
        <code>
          //取day的后n天，n支持负数
        </code>
        <code>
          @com.lambo.rest.client.factory.Utils@nextDay(day,n)
        </code>
        <code>
          //取month的后n个月，n支持负数
        </code>
        <code>
          @com.lambo.rest.client.factory.Utils@nextMonth(day,n)
        </code>
        <code>
          //取date的同期日期，date的格式支持YYYY、YYYYMM、YYYYMMDD
        </code>
        <code>
          @com.lambo.rest.client.factory.Utils@getSamePeriod(date)
        </code>
        <code>
          //取date的同n期日期，date的格式支持YYYY、YYYYMM、YYYYMMDD
        </code>
        <code>
          @com.lambo.rest.client.factory.Utils@getSamePeriod(date,n)
        </code>
        <code>
          //取date所在月份的第一天,date的格式支持YYYYMM、YYYYMMDD
        </code>
        <code>
          @com.lambo.rest.client.factory.Utils@getFirstDayOfMonth(date)
        </code>
      </Card>
      <Card dis-hover :bordered="false">
        <p slot="title">使用jdk自带的函数进行预处理</p>
        <code> @@min(5,3)</code>
        <p> 如上边例子，如果不指定类，则默认使用的是java.util.Math</p>
      </Card>
      <Card dis-hover :bordered="false">
        <p slot="title">自定义预处理函数</p>
        <code> @Class@Method</code>
        <p>按照上边这个格式你可以调用任何类(全路径)的<strong>静态</strong>方法作为预处理函数</p>
      </Card>
    </div>
</template>

<script>
    export default {
        name: "pre-function"
    }
</script>

<style lang="less" scoped>
  code{
    display: block;
    background:#f7f7f7;
    padding:10px;
    white-space: normal;
    word-break: break-all;
  }
</style>
