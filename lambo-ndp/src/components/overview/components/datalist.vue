<template>
  <div class="list-container">
    <Card class="list-card">
      <div @click="goDataSubject('cust')">
        <div class="icon icon1">
        </div>
        <div class="text">
          销售
        </div>
      </div>
    </Card>
    <Card class="list-card">
      <div @click="goDataSubject('cust')">
        <div class="icon icon2">
        </div>
        <div class="text">
          客户
        </div>
      </div>
    </Card>
    <Card class="list-card">
      <div @click="goDataSubject('cust')">
        <div class="icon icon3">
        </div>
        <div class="text">
          品牌
        </div>
      </div>
    </Card>
    <Card class="list-card">
      <div @click="goDataSubject('cust')">
        <div class="icon icon4">
        </div>
        <div class="text">
          市场
        </div>
      </div>
    </Card>
    <Card class="list-card last">
      <div @click="goDataSubject('cust')">
        <div class="icon icon5">
        </div>
        <div class="text">
          网建
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  export default {
    props:{
      rate:{
        type:Number,
        default:0
      },
      color:{
        type:String,
        default:""
      }
    },
    data(){
      return {}
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

<style lang="less" scoped>
.list-container{
  margin-top: 15px;
  width: 1080px;
  .list-card{
    height:150px;
    width: 200px;
    margin-right: 20px;
    float: left;
    &.last{
      margin-right:0;
    }
    .text{
      text-align: center;
      font-size: 15px;
      font-weight: 600;
      line-height: 30px;
      height: 30px;
    }
    .icon{
      width:63px;
      height:63px;
      margin:10px auto;
      &.icon1{
        background:url("../../../assets/overview/11.png");
      }
      &.icon2{
        background:url("../../../assets/overview/12.png");
      }
      &.icon3{
        background:url("../../../assets/overview/13.png");
      }
      &.icon4{
        background:url("../../../assets/overview/14.png");
      }
      &.icon5{
        background:url("../../../assets/overview/15.png");
      }
    }
  }
}
</style>
