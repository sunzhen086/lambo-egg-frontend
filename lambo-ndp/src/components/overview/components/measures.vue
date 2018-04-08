<template>
  <div class="page">
    <div class="measures">
      <Row>
        <Col span="6">
        <div class="box first">
          <div class="left color1">
            <div class="icon icon1"></div>
          </div>
          <div class="right">
            <div class="label">销售量</div>
            <div class="value color1">{{measures.SALE_QTY}}<span class="unit">万箱</span></div>
            <div class="desc color1">销售进度{{measures.SALE_PROGRESS}}%</div>
          </div>
        </div>
        </Col>
        <Col span="6">
        <div class="box">
          <div class="left color2">
            <div class="icon icon2"></div>
          </div>
          <div class="right">
            <div class="label">单箱销售收入</div>
            <div class="value color2">{{measures.BOX_PRICE}}<span class="unit">元</span></div>
            <div class="desc color2">同比增长{{measures.BOX_PRICE_GROWTH}}%</div>
          </div>
        </div>
        </Col>
        <Col span="6">
        <div class="box">
          <div class="left color3">
            <div class="icon icon3"></div>
          </div>
          <div class="right">
            <div class="label">零售户数</div>
            <div class="value color3">{{measures.CUST_NUM}}<span class="unit">户</span></div>
            <div class="desc color3">同比增长{{measures.CUST_NUM_GROWTH}}%</div>
          </div>
        </div>
        </Col>
        <Col span="6">
        <div class="box last">
          <div class="left color4">
            <div class="icon icon4"></div>
          </div>
          <div class="right">
            <div class="label">在销规格</div>
            <div class="value color4">{{measures.ITEM_NUM}}<span class="unit">个</span></div>
            <div class="desc color4">品牌数{{measures.BRAND_NUM}}个</div>
          </div>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import util from '@/libs/util';

  export default {
    name: "overview",
    data() {
      return {
        measures:{},
      }
    },
    methods:{
      initPage:function () {
        var self = this;
        util.ajax.get('/main/overview/getMeasures',{}).then(function (resp) {
          self.measures = resp.data.data;
        });
      }
    },
    mounted() {
      this.initPage();
    }
  }
</script>
<style lang="less" scoped>
  .page{
       width:1080px;
       margin:0 auto;
     }
  .measures{
    margin-top:20px;
    .box{
      margin:0 5px;
      height:110px;
      display:flex;
      /*box-shadow: 1px 1px 1px 1px rgba(0,0,0,.1);*/
      border:1px solid #eeeeee;
      &.first{
        margin-left:0;
      }
      &.last{
        margin-right:0;
      }
      .left{
        flex:1;
        &.color1{
          background-color:rgb(48,182,253);
        }
        &.color2{
          background-color:rgb(34,179,142);
        }
        &.color3{
          background-color:rgb(136,209,75);
        }
        &.color4{
          background-color:rgb(126,149,253);
        }
        .icon{
          width:50px;
          height:41px;
          margin:40px auto;
          &.icon1{
            background:url("../../../assets/overview/1.png");
          }
          &.icon2{
            background:url("../../../assets/overview/2.png");
          }
          &.icon3{
            background:url("../../../assets/overview/3.png");
          }
          &.icon4{
            background:url("../../../assets/overview/4.png");
          }
        }
      }
      .right{
        flex:2;
        padding:5px 10px;
        .label{
          color:#999;
          font-size:18px;
          font-weight:600;
        }
        .value{
          font-size:24px;
          font-weight:600;
          border-bottom:1px solid #e8e8e8;
          &.color1{
            color:rgb(48,182,253);
          }
          &.color2{
            color:rgb(34,179,142);
          }
          &.color3{
            color:rgb(136,209,75);
          }
          &.color4{
            color:rgb(126,149,253);
          }
          .unit{
            color:#999;
            font-size:16px;
            margin-left:10px;
          }
        }
        .desc{
          color:#999;
          font-size:18px;
          font-weight:600;
          margin-top:8px;
          &.color1{
            color:rgb(48,182,253);
          }
          &.color2{
            color:rgb(34,179,142);
          }
          &.color3{
            color:rgb(136,209,75);
          }
          &.color4{
            color:rgb(126,149,253);
          }
        }
      }
    }
  }
</style>
