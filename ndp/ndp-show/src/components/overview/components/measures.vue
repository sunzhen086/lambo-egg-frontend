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
            <div class="value color1">5785<span class="unit">万箱</span></div>
            <div class="desc color1">销售进度72.68%</div>
          </div>
        </div>
        </Col>
        <Col span="6">
        <div class="box">
          <div class="left color2">
            <div class="icon icon2"></div>
          </div>
          <div class="right">
            <div class="label">销售量</div>
            <div class="value color2">5785<span class="unit">万箱</span></div>
            <div class="desc color2">销售进度72.68%</div>
          </div>
        </div>
        </Col>
        <Col span="6">
        <div class="box">
          <div class="left color3">
            <div class="icon icon3"></div>
          </div>
          <div class="right">
            <div class="label">销售量</div>
            <div class="value color3">5785<span class="unit">万箱</span></div>
            <div class="desc color3">销售进度72.68%</div>
          </div>
        </div>
        </Col>
        <Col span="6">
        <div class="box last">
          <div class="left color4">
            <div class="icon icon4"></div>
          </div>
          <div class="right">
            <div class="label">销售量</div>
            <div class="value color4">5785<span class="unit">万箱</span></div>
            <div class="desc color4">销售进度72.68%</div>
          </div>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>

  export default {
    name: "overview",
    data() {
      return {
        testData:{},
      }
    },
    methods:{
    },
    mounted(){

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
