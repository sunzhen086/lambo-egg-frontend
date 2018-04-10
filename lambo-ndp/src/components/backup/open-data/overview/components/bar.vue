<template>
  <div class="bar">
      <div class="rate" :style="{width: rate * 100 + '%' }"></div>
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
        }

    }
</script>

<style lang="less" scoped>
  .bar{
    height:12px;
    width:90px;
    background:rgb(217,225,236);
    .rate{
      height:100%;
      background:rgb(126,149,253);
    }
  }
</style>
