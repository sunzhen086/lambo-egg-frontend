<template>
    <div class="container">
      <div v-for="(btn, index) in btns" :key="btn.code" class="box" :class="{active:btn.active}" @click="btnClick(index)">
        <div :class="'icon icon'+(index+1)"></div>
        <div class="text">{{btn.label}}</div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        btns:[
          {
            code:"SaleProcess",
            label:"销售进度",
            active:true
          },
          {
            code:"SaleSameRate",
            label:"销量同比",
            active:false
          },
          {
            code:"BoxPrice",
            label:"单箱值",
            active:false
          },
          {
            code:"CustNum",
            label:"正常经营户数",
            active:false
          },
          {
            code:"BigCust",
            label:"大户占比",
            active:false
          },
          {
            code:"SelfregGroup",
            label:"自律互助小组",
            active:false
          },
          {
            code:"TerminalBulid",
            label:"现代终端建设",
            active:false
          }
        ],
      }
    },
    methods:{
      btnClick:function(index){
        for(let i=0;i<this.btns.length;i++){
          if(i === index){
            this.btns[i].active = true;
            this.$emit("on-btn-click",this.btns[i].code);
          }else{
            this.btns[i].active = false;
          }
        }
      }
    },
    mounted(){
      for(let btn of this.btns){
        if(btn.active){
          this.$emit("on-btn-click",btn.code);
          break;
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .card{
    margin-top:20px;
  }
  .container{
    width:100%;
    display:flex;
    .box{
      width:120px;
      height:55px;
      border:1px solid #ccc;
      cursor:pointer;
      color:#999;
      flex:1;
      margin-right:5px;
      border-radius: 5px;

      &:hover,&.active{
        background-color:rgb(48,182,253);
        color:#fff;
        .icon{
          width:25px;
          height:25px;
          margin:5px auto 0;
          background-size:100%;
          background-repeat: no-repeat;
          &.icon1{
            background-image:url("../../../../assets/overview/31.png")
          }
          &.icon2{
            background-image:url("../../../../assets/overview/32.png")
          }
          &.icon3{
            background-image:url("../../../../assets/overview/33.png")
          }
          &.icon4{
            background-image:url("../../../../assets/overview/34.png")
          }
          &.icon5{
            background-image:url("../../../../assets/overview/35.png")
          }
          &.icon6{
            background-image:url("../../../../assets/overview/36.png")
          }
          &.icon7{
            background-image:url("../../../../assets/overview/37.png")
          }
        }
      }
      .icon{
        width:25px;
        height:25px;
        margin:5px auto 0;
        background-size:100%;
        background-repeat: no-repeat;
        &.icon1{
          background-image:url("../../../../assets/overview/21.png")
        }
        &.icon2{
          background-image:url("../../../../assets/overview/22.png")
        }
        &.icon3{
          background-image:url("../../../../assets/overview/23.png")
        }
        &.icon4{
          background-image:url("../../../../assets/overview/24.png")
        }
        &.icon5{
          background-image:url("../../../../assets/overview/25.png")
        }
        &.icon6{
          background-image:url("../../../../assets/overview/26.png")
        }
        &.icon7{
          background-image:url("../../../../assets/overview/27.png")
        }
      }
      .text{
        height:20px;
        line-height:20px;
        text-align:center
      }
    }
  }
</style>

