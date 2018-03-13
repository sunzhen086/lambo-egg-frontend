<template>
  <div class="page">
      <div class="banner"></div>
      <div class="container">
        <div class="title">
          主题分类
        </div>
        <Row>
          <Col span="4">
            <div class="box">
              <div class="icon topic-cust"></div>
              <div class="text">客户</div>
            </div>
          </Col>
          <Col span="4">
            <div class="image1 cust1"></div>
          </Col>
          <Col span="4">
            <div class="box">
              <div class="icon topic-brand"></div>
              <div class="text">品牌</div>
            </div>
          </Col>
          <Col span="4">
            <div class="image1 brand1"></div>
          </Col>
          <Col span="4">
            <div class="box">
              <div class="icon topic-market"></div>
              <div class="text">市场</div>
            </div>
          </Col>
          <Col span="4">
            <div class="image1 market1"></div>
          </Col>
        </Row>
        <Row>
          <Col span="4">
            <div class="image1 sale1"></div>
          </Col>
          <Col span="4">
            <div class="box">
              <div class="icon topic-sale"></div>
              <div class="text">销售</div>
            </div>
          </Col>
          <Col span="4">
            <div class="image1 net1"></div>
          </Col>

          <Col span="4">
            <div class="box">
              <div class="icon topic-net"></div>
              <div class="text">网建</div>
            </div>
          </Col>
          <Col span="4">
            <div class="image1 scial1"></div>
          </Col>
          <Col span="4">
            <div class="box">
              <div class="icon topic-scial"></div>
              <div class="text">社会经济</div>
            </div>
          </Col>
        </Row>
      </div>

  </div>
  <!--<div class="main-body">-->
    <!--<div class="main-pic">-->
      <!--<Carousel autoplay v-model="value2" loop>-->
        <!--<CarouselItem>-->
          <!--<div class="demo-carousel"><img alt="all" src="../../../assets/main1.png"/></div>-->
        <!--</CarouselItem>-->
        <!--<CarouselItem>-->
          <!--<div class="demo-carousel"><img alt="all" src="../../../assets/tobaccologo.png"/></div>-->
        <!--</CarouselItem>-->
        <!--<CarouselItem>-->
          <!--<div class="demo-carousel"><img alt="all" src="../../../assets/main1.png"/></div>-->
        <!--</CarouselItem>-->
      <!--</Carousel>-->
    <!--</div>-->
    <!--<div class="main-topic">-->
      <!--<div class="main-title2">主题分类</div>-->
      <!--<div class="main-topicpic">-->
        <!--<Row>-->
          <!--<Col span="4"><img alt="all" src="../../../assets/topic-cust.png"/>客户</Col>-->
          <!--<Col span="4"><img alt="all" src="../../../assets/topic-cust1.png"/></Col>-->
          <!--<Col span="4"><img alt="all" src="../../../assets/topic-brand.png"/>品牌</Col>-->
          <!--<Col span="4"><img alt="all" src="../../../assets/topic-brand1.png"/></Col>-->
          <!--<Col span="4"><img alt="all" src="../../../assets/topic-market.png"/>市场</Col>-->
          <!--<Col span="4"><img alt="all" src="../../../assets/topic-market1.png"/></Col>-->
        <!--</Row>-->
        <!--<Row>-->
          <!--<Col span="4"><img alt="all" src="../../../assets/topic-sale1.png"/></Col>-->
          <!--<Col span="4"><img alt="all" src="../../../assets/topic-sale.png"/>销售</Col>-->
          <!--<Col span="4"><img alt="all" src="../../../assets/topic-net1.png"/></Col>-->
          <!--<Col span="4"><img alt="all" src="../../../assets/topic-net.png"/>网建</Col>-->
          <!--<Col span="4"><img alt="all" src="../../../assets/topic-scial1.png"/></Col>-->
          <!--<Col span="4"><img alt="all" src="../../../assets/topic-scial.png"/>社会经济</Col>-->
        <!--</Row>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="main-top">-->
      <!--<Row>-->
        <!--<Col span="12">-->
          <!--<div class="main-hot">-->
            <!--<div class="main-title2">热门数据</div>-->
            <!--<div class="hot-pic"><img alt="all" src="../../../assets/top-hot.png"/></div>-->
            <!--<div class="hot-list">-->
              <!--<p>20180401 2018年第一季度销售情况</p>-->
              <!--<p>20180401 2018年第一季度销售情况</p>-->
              <!--<p>20180401 2018年第一季度销售情况</p>-->
              <!--<p>20180401 2018年第一季度销售情况</p>-->
              <!--<p>20180401 2018年第一季度销售情况</p>-->
            <!--</div>-->
          <!--</div>-->
        <!--</Col>-->
        <!--<Col span="12">-->
        <!--<div class="main-hot">-->
          <!--<div class="main-title2">开放动态</div>-->
          <!--<div class="hot-pic"><img alt="all" src="../../../assets/top-new.png"/></div>-->
          <!--<div class="hot-list">-->
            <!--<p>20180401 2018年第一季度销售情况</p>-->
            <!--<p>20180401 2018年第一季度销售情况</p>-->
            <!--<p>20180401 2018年第一季度销售情况</p>-->
            <!--<p>20180401 2018年第一季度销售情况</p>-->
            <!--<p>20180401 2018年第一季度销售情况</p>-->
          <!--</div>-->
        <!--</div>-->
        <!--</Col>-->
      <!--</Row>-->
    <!--</div>-->
  <!--</div>-->
</template>
<script>
  import util from '@/libs/util';
  import Icon from "iview/src/components/icon/icon";

  export default {
    name: "mainpage",
    data () {
      return {
        value2: 0
      }
    }
  }
</script>

<style scoped lang="less">
  .page{
    .banner{
      height:230px;
      background:url("../../../assets/main1.png") center;
    }
    .container{
      width:950px;
      margin:0 auto;
      .title{
        height:55px;
        line-height:55px;
        color:#2d8cf0;
        font-size:18px;
        font-weight:600;
      }
      .image1{
        height:156px;
        &.cust1{
          background:url("../../../assets/topic-cust1.png") center;
        }
        &.market1{
          background:url("../../../assets/topic-market1.png") center;
        }
        &.brand1{
          background:url("../../../assets/topic-brand1.png") center;
        }
        &.net1{
          background:url("../../../assets/topic-net1.png") center;
        }
        &.scial1{
          background:url("../../../assets/topic-scial1.png") center;
        }
        &.sale1{
          background:url("../../../assets/topic-sale1.png") center;
        }
      }
      .box{
        background:rgb(37,169,229);
        height:156px;
        overflow: hidden;
        cursor:pointer;
        .icon{
          height:42px;
          background:url("../../../assets/topic-sale.png") no-repeat center;
          margin-top:30px;
        }
        .text{
          color:#fff;
          font-size:20px;
          line-height:40px;
          text-align:center;
          margin-top:10px;
          font-weight:600;
        }
        &:hover{
          background:rgb(37,150,229);
        }
      }

    }

  }
</style>
