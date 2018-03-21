<template>
  <div class="page">
    <div class="banner"></div>
    <div class="container">
      <div class="title">
        主题分类
      </div>
      <Row>
        <Col span="4">
          <div class="box" @click="goDataSubject('cust')">
            <div class="icon topic-cust"></div>
            <div class="text">客户</div>
          </div>
        </Col>
        <Col span="4">
          <div class="image1 cust1"></div>
        </Col>
        <Col span="4">
          <div class="box" @click="goDataSubject('cust')">
            <div class="icon topic-brand"></div>
            <div class="text">品牌</div>
          </div>
        </Col>
        <Col span="4">
          <div class="image1 brand1"></div>
        </Col>
        <Col span="4">
          <div class="box" @click="goDataSubject('cust')">
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
          <div class="box" @click="goDataSubject('cust')">
            <div class="icon topic-sale"></div>
            <div class="text">销售</div>
          </div>
        </Col>
        <Col span="4">
          <div class="image1 net1"></div>
        </Col>

        <Col span="4">
          <div class="box" @click="goDataSubject('cust')">
            <div class="icon topic-net"></div>
            <div class="text">网建</div>
          </div>
        </Col>
        <Col span="4">
          <div class="image1 scial1"></div>
        </Col>
        <Col span="4">
          <div class="box" @click="goDataSubject('cust')">
            <div class="icon topic-scial"></div>
            <div class="text">社会经济</div>
          </div>
        </Col>
      </Row>
      <div class="topcontainer">
        <div class="hotlist">
          <div class="title">热门数据</div>
          <div class="top-desc desc1">
            <div class="top-pic"><img alt="all" src="../../../assets/top-hot.png"/></div>
            <div class="top-text">通过多种分类<br/>找到你想要的数据</div>
          </div>
          <ul class="hot-list">
            <li>20180401 2018年第一季度销售情况</li>
            <li>20180401 2018年第一季度销售情况</li>
            <li>20180401 2018年第一季度销售情况</li>
            <li>20180401 2018年第一季度销售情况</li>
            <li>20180401 2018年第一季度销售情况</li>
          </ul>
        </div>
        <div class="newlist">
          <div class="title">开放动态</div>
          <div class="top-desc desc2">
            <div class="top-pic"><img alt="all" src="../../../assets/top-new.png"/></div>
            <div class="top-text">丰富多彩的信息动态<br/>随时把握最新消息</div>
          </div>
          <ul class="hot-list">
            <li>20180401 2018年第一季度销售情况</li>
            <li>20180401 2018年第一季度销售情况</li>
            <li>20180401 2018年第一季度销售情况</li>
            <li>20180401 2018年第一季度销售情况</li>
            <li>20180401 2018年第一季度销售情况</li>
          </ul>
        </div>
      </div>
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
    },
    methods:{
      goDataSubject:function (kindId) {
        this.$router.push({
          path: '/dataSubject',
          query:{
            index:kindId
          }
        })
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
      width:1080px;
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
          background-size: cover;
        }
        &.market1{
          background:url("../../../assets/topic-market1.png") center;
          background-size: cover;
        }
        &.brand1{
          background:url("../../../assets/topic-brand1.png") center;
          background-size: cover;
        }
        &.net1{
          background:url("../../../assets/topic-net1.png") center;
          background-size: cover;
        }
        &.scial1{
          background:url("../../../assets/topic-scial1.png") center;
          background-size: cover;
        }
        &.sale1{
          background:url("../../../assets/topic-sale1.png") center;
          background-size: cover;
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
      .topcontainer{
        .hotlist, .newlist{
          width: 49%;
          float: left;
          .top-desc{
            height: 140px;
            &.desc1{
              background: rgb(181,226,99);
            }
            &.desc2{
              background: rgb(285,186,66);
            }
            .top-pic{
              width:138px;
              height: 103px;
              float: left;
              margin-top: 18px;
              margin-left: 20px;
            }
            .top-text{
              float: left;
              font-size: 20px;
              color:white;
              line-height: 30px;
              margin-left: 50px;
              margin-top: 35px;
            }
          }
          .hot-list{
            list-style:none;
            margin-top: 10px;
            font-size: 14px;
            line-height: 28px;
            color:rgb(132,132,132)
          }
        }
        .hotlist{
          margin-right: 2%;
        }
      }
    }

  }
</style>
