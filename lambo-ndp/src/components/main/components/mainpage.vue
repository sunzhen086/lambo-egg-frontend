<template>
  <div class="main-body">
    <div class="main-pic">
      <Carousel autoplay v-model="value2" loop>
        <CarouselItem>
          <div class="demo-carousel"><img alt="all" src="../../../assets/main1.png"/></div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel"><img alt="all" src="../../../assets/tobaccologo.png"/></div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel"><img alt="all" src="../../../assets/main1.png"/></div>
        </CarouselItem>
      </Carousel>
    </div>
    <div class="main-topic">
      <div class="main-title2">主题分类</div>
      <div class="main-topicpic">
        <Row>
          <Col span="4"><img alt="all" src="../../../assets/topic-cust.png"/>客户</Col>
          <Col span="4"><img alt="all" src="../../../assets/topic-cust1.png"/></Col>
          <Col span="4"><img alt="all" src="../../../assets/topic-brand.png"/>品牌</Col>
          <Col span="4"><img alt="all" src="../../../assets/topic-brand1.png"/></Col>
          <Col span="4"><img alt="all" src="../../../assets/topic-market.png"/>市场</Col>
          <Col span="4"><img alt="all" src="../../../assets/topic-market1.png"/></Col>
        </Row>
        <Row>
          <Col span="4"><img alt="all" src="../../../assets/topic-sale1.png"/></Col>
          <Col span="4"><img alt="all" src="../../../assets/topic-sale.png"/>销售</Col>
          <Col span="4"><img alt="all" src="../../../assets/topic-net1.png"/></Col>
          <Col span="4"><img alt="all" src="../../../assets/topic-net.png"/>网建</Col>
          <Col span="4"><img alt="all" src="../../../assets/topic-scial1.png"/></Col>
          <Col span="4"><img alt="all" src="../../../assets/topic-scial.png"/>社会经济</Col>
        </Row>
      </div>
    </div>
    <div class="main-top">
      <Row>
        <Col span="12">
          <div class="main-hot">
            <div class="main-title2">热门数据</div>
            <div class="hot-pic"><img alt="all" src="../../../assets/top-hot.png"/></div>
            <div class="hot-list">
              <p>20180401 2018年第一季度销售情况</p>
              <p>20180401 2018年第一季度销售情况</p>
              <p>20180401 2018年第一季度销售情况</p>
              <p>20180401 2018年第一季度销售情况</p>
              <p>20180401 2018年第一季度销售情况</p>
            </div>
          </div>
        </Col>
        <Col span="12">
        <div class="main-hot">
          <div class="main-title2">开放动态</div>
          <div class="hot-pic"><img alt="all" src="../../../assets/top-new.png"/></div>
          <div class="hot-list">
            <p>20180401 2018年第一季度销售情况</p>
            <p>20180401 2018年第一季度销售情况</p>
            <p>20180401 2018年第一季度销售情况</p>
            <p>20180401 2018年第一季度销售情况</p>
            <p>20180401 2018年第一季度销售情况</p>
          </div>
        </div>
        </Col>
      </Row>
    </div>
  </div>
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
  .main-topic{
    .main-title2{
      text-align: left;
    }
    .main-topicpic{
      background: #57A3F3;
    }
  }
</style>
