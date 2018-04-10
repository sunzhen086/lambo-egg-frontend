<template>
  <div class="container">
    <div class="overinfo">
      品牌是产品的灵魂。在市场营销中，一个好的品牌策略会要求企业解答好怎么引进品牌、培育什么品牌、怎么培育品牌等问题。开放数据能帮助企业解答以上问题，并提供科学的市场依据。
    </div>
    <div class="highlight">
      <div class="content">
        <h1>开放数据助力科学的品类布局</h1>
        <div class="image-container">
          <img :src="src"/>
          <div class="description">
            某品牌经理正借助开放数据调整品类布局
          </div>
        </div>
        <div class="text-container">
          2016年4月《国家烟草专卖局办公室关于印发2016年卷烟营销市场化取向改革试点工作要点的通知》（国烟办综〔2016〕191号）要求，“广泛应用大数据营销技术，以省级卷烟营销平台为基础，进一步整合数据资源，加强分析应用，探索精准满足消费、精准营销品牌、精准调控市场、精准服务客户的方法，加快推动卷烟营销方式从‘经验营销’向‘数据营销’转变。……探索一体化营销模式，研究‘互联网+市场营销’的有效路径，创新品牌培育的新途径、新手段、新方法，着力提升品牌培育水平，加强品牌布局管理，严格执行进退规则，面向所有工业企业开放卷烟市场”。国家局徐局长在全国卷烟销售工作会议暨省级卷烟营销平台建设推广会上的讲话：商业企业要继续加大品牌培育力度，做到“有规划、有规则、有方法、有考核”，注重品牌培育的科学性、渐进性、梯次性，在主要价位段形成“主导规格-护卫规格-潜力规格”的梯型结构，构建科学的品类布局，打牢品牌健康成长的市场基础。
        </div>
      </div>
    </div>
    <div class="update">
      <div class="title">近期更新</div>
      <div class="list">
        <div class="item">
          <div class="name">全国品牌布局情况</div>
          <div class="time">2017年3月28日</div>
          <div class="tags">
            <Tag type="border">品牌</Tag>
            <Tag type="border">数量</Tag>
            <Tag type="border">占比</Tag>
            <Tag type="border">销量</Tag>
            <Tag type="border">上柜率</Tag>
          </div>
          <div class="description">
            本数据涵盖了全行业所有品牌的市场布局情况，数据来源为行业卷烟营销系统，有部分没有上线汗液卷烟营销系统的地区，采用的是手工上报形式
          </div>
        </div>
        <div class="item">
          <div class="name">全国品牌布局情况</div>
          <div class="time">2017年3月28日</div>
          <div class="tags">
            <Tag type="border">品牌</Tag>
            <Tag type="border">数量</Tag>
            <Tag type="border">占比</Tag>
            <Tag type="border">销量</Tag>
            <Tag type="border">上柜率</Tag>
          </div>
          <div class="description">
            本数据涵盖了全行业所有品牌的市场布局情况，数据来源为行业卷烟营销系统，有部分没有上线汗液卷烟营销系统的地区，采用的是手工上报形式.
          </div>
        </div>
        <div class="item">
          <div class="name">全国品牌布局情况</div>
          <div class="time">2017年3月28日</div>
          <div class="tags">
            <Tag type="border">品牌</Tag>
            <Tag type="border">数量</Tag>
            <Tag type="border">占比</Tag>
            <Tag type="border">销量</Tag>
            <Tag type="border">上柜率</Tag>
          </div>
          <div class="description">
            本数据涵盖了全行业所有品牌的市场布局情况，数据来源为行业卷烟营销系统，有部分没有上线汗液卷烟营销系统的地区，采用的是手工上报形式.
          </div>
        </div>
        <div class="item">
          <div class="name">全国品牌布局情况</div>
          <div class="time">2017年3月28日</div>
          <div class="tags">
            <Tag type="border">品牌</Tag>
            <Tag type="border">数量</Tag>
            <Tag type="border">占比</Tag>
            <Tag type="border">销量</Tag>
            <Tag type="border">上柜率</Tag>
          </div>
          <div class="description">
            本数据涵盖了全行业所有品牌的市场布局情况，数据来源为行业卷烟营销系统，有部分没有上线汗液卷烟营销系统的地区，采用的是手工上报形式.
          </div>
        </div>
        <div class="item">
          <div class="name">全国品牌布局情况</div>
          <div class="time">2017年3月28日</div>
          <div class="tags">
            <Tag type="border">品牌</Tag>
            <Tag type="border">数量</Tag>
            <Tag type="border">占比</Tag>
            <Tag type="border">销量</Tag>
            <Tag type="border">上柜率</Tag>
          </div>
          <div class="description">
            本数据涵盖了全行业所有品牌的市场布局情况，数据来源为行业卷烟营销系统，有部分没有上线汗液卷烟营销系统的地区，采用的是手工上报形式.
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "overview",
        data(){
          return {
            src:require('../../images/demo.jpg')
          }
        }
    }
</script>

<style lang="less" scoped>
  .container{
    .overinfo{
      width:1080px;
      margin:0 auto;
      padding:20px 0;
      font-size:16px;
    }
    .highlight{
      background:#25A9E5;
      .content{
        width:1080px;
        margin:0 auto;
        padding:20px 0;
        h1{
          color:#fff;
        }
        .image-container{
          margin-top:10px;
          background:#fff;
          display: inline-block;
          padding:5px;
          .description{
            width:500px;
            font-size:16px;
          }
        }
        .text-container{
          margin-top:10px;
          color:#fff;
          line-height:1.5;
          font-size:16px;
        }
      }
    }
    .update{
      padding:20px 0;
      width:1080px;
      margin:0 auto;
      .title{
        border-bottom:1px solid #ccc;
        height:30px;
        line-height:30px;
        font-size:18px;
        color: #383838;
      }
      .list{
        margin-top:10px;
        .item{
          margin-bottom:30px;
          .name{
            font-size:16px;
            font-weight: bold;
          }
          .time{
            color:#9ea7b4;
          }
          .tags{
            margin-top:5px;
          }
          .description{
            margin-top:5px;
            font-size:16px;
          }
        }
      }
    }

  }
</style>
