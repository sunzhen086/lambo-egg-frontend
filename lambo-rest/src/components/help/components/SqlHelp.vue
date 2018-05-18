<template>
  <div>
    <Card dis-hover :bordered="false">
      <p slot="title">概述</p>
      <p>SQL模板的配置为了减少学习成本，兼容Mybatis大部分用法。目前能支持以下标签：</p>
      <ul style="margin-left:20px">
        <li>if</li>
        <li>choose (when, otherwise)</li>
        <li>trim, where, set</li>
        <li>foreach</li>
      </ul>
      <p>详细用法，请参考<a href="http://www.mybatis.org/mybatis-3/zh/dynamic-sql.html">MyBatis</a></p>
    </Card>

    <Card dis-hover :bordered="false">
      <p slot="title">简单示例</p>
      <code>参数==> com_id = 123</code>
      <code>模板==> select a from b where a=#{com_id}</code>
      <code>生成<== select a from b where a='123'</code>
      <br/>
      <code>参数==> com_id = 123</code>
      <code>模板==> select a from b where a='${com_id}'</code>
      <code>生成<== select a from b where a='123'</code>
      <br/>
      <p>#{}会为参数自动拼接上两端的单引号，而${}不会</p>
    </Card>

    <Card dis-hover :bordered="false">
      <p slot="title">参数判空</p>
      <code>参数==> com_id = 123</code>
      <code>模板==> select a from b &lt;where&gt; &lt;if test = 'com_id != null'&gt; a=#{com_id} &lt;/if&gt; &lt;/where&gt;</code>
      <code>生成<== select a from b  WHERE a= '123'</code>
      <br/>
      <p>参数判空在使用非必须参数时非常有效</p>
      <p>&lt;where&gt;的作用是让com_id为空时SQL不至于报错</p>
    </Card>

    <Card dis-hover :bordered="false">
      <p slot="title">like的写法</p>
      <code>参数==> com_id = 123</code>
      <code>模板==> select a from b where name like '${'%'+name+'%'}'</code>
      <code>生成<== select a from b where name like  '%123%'</code>
      <br/>
      <p>还有另外一种写法：select a from b where name like #{@com.lambo.rest.client.factory.Utils@convertLike(name)},详细见后边的参数预处理</p>
    </Card>

    <Card dis-hover :bordered="false">
      <p slot="title">循环的写法</p>
      <code>参数==> list = 1,2,3,4,5,6,7</code>
      <code>模板==> select  * from user &lt;where&gt &lt;if test='list != null'&gt; id in &lt;foreach item='item' index='index' collection='list'    open='(' separator=',' close=')'&gt;   '${item}' &lt;/foreach&gt; &lt;/if&gt; &lt;/where&gt;</code>
      <code>生成<== select  * from user  WHERE id in  ('1','2','3','4','5','6','7')</code>
      <br/>
      <p>循环在处理sql的in语句时非常有效。如果传入参数的格式是用逗号分隔的一组数据，即可使用循环对每一项进行处理。当然你可以直接在前端拼写好('xx','xx'),然后再sql的in语句里直接使用，但是从程序的可维护行和可读性上看，使用循环较好一些</p>
    </Card>

    <Card dis-hover :bordered="false">
      <p slot="title">参数预处理</p>
      <code>参数==> month = 201805</code>
      <code>模板==> select a from b where month = #{@com.lambo.rest.client.factory.Utils@getSamePeriod(month)}</code>
      <code>生成<== select a from b where month =  '201705'</code>
      <br/>
      <p>可以使用@Class@Method对参数进行预处理，包括取同期、前N期等，系统内置了一系列的预处理函数，都放在com.lambo.rest.client.factory.Utils类中，详细见后续说明。当然如果你有后台程序的读写权限，你也可以自己定义预处理函数，记得要用static来标记方法，使用时按照@Class@Method格式填写你的全路径类名及方法即可</p>
    </Card>

    <Card dis-hover :bordered="false">
      <p slot="title">内置变量</p>
      <code>模板==> select a from b where month = #{BUILTIN_NOW_DATE_YYYYMM}</code>
      <code>生成<== select a from b where month =  '201805'</code>
      <br/>
      <p>系统内置了一系列的内置变量，你可以在SQL中直接使用，例如上边的例子就是取的当前的月份，他们都是以BUILTIN_开头，详细见后续说明</p>
    </Card>
  </div>


</template>

<script>

    export default {
      name: "sql-help"
    }
</script>

<style lang="less" scoped>
  code{
    display: block;
    background:#f7f7f7;
    padding:10px;
  }
</style>
