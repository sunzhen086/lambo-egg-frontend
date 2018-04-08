<template>
  <div class="container">
    <div class="chinaMap" ref="chinaMap"></div>
  </div>
</template>

<script>
  import echarts from "echarts";
  import chinaMap from "./china";
  echarts.registerMap('china', chinaMap);
  export default {
    name: "china-map",
    props:{
      tableDatas:{
        type:Array,
        default:function(){
          return []
        }
      }
    },
    data() {
      return {
      }
    },
    methods:{
      drawMap:function(){
        let option = {
          title : {
            text: '',
            subtext: '',
            left: 'center'
          },
          tooltip : {
            trigger: 'item',
            formatter:'{b}<br/>{c}%'
            /*formatter: function(params) {
              var res = params.name+'<br/>指标值：'+params.value;
              return res;
            }*/
          },
          visualMap: {
            min: 0,
            max: 100,
            left: 'left',
            top: 'bottom',
            text:['高','低'],           // 文本，默认为数值文本
            calculable : true,
            inRange: {
              color: ['#d9e2e9', '#88d14b']
            }
          },
          toolbox: {
            show: true,
            orient : 'vertical',
            left: 'right',
            top: 'center',
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          series : [
            {
              name: '销售',
              type: 'map',
              mapType: 'china',
              roam: false,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              data:this.tableDatas
            }
          ]
        };

        var chinaMap = echarts.init(this.$refs.chinaMap);
        chinaMap.setOption(option);
      }
    },
    watch: {
      tableDatas: function (val, oldVal) {
        this.drawMap();
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less" scoped>
  .chinaMap{
    width:100%;
    height:330px;
    margin-top:20px;
  }
</style>
