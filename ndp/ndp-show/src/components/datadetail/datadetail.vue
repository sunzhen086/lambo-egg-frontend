<template>
  <div >
    <div class="title">
      <div class="content">
        <Icon type="pricetags" size="30" color="#fff" class="icon"></Icon>
        <h2 class="text">商品月度销售</h2>
      </div>
    </div>

    <div class="backcolor">
      <div class="page">
        <rightPart :subjectId="subjectId"></rightPart>
      </div>
    </div>
    </div>
</template>

<script>
  import leftPart from './components/leftPart';
  import rightPart from './components/rightPart';
  import util from '@/libs/util';
  export default {
    name: "searchTable",
    data(){
      return{
        subjectId:parseInt(this.$route.query.subjectId),
      }
    },
    components: {
      /*leftPart,*/
      rightPart
    },
    methods:{
      changeSubject:function (data) {
        this.subjectId = data;
      },
      recordAction:function () {
          var self = this;
          util.ajax.post('/manage/subjectRecord/create',{
            subjectId:self.subjectId
          }).then(function (resp) {

          });
      }
    },
    created(){
      this.recordAction();
    },
  }
</script>+

<style lang="less" scoped>
  .backcolor{
    background:#fafafa;
  }
  .page{
    width:1080px;
    margin:0px auto;
    padding-top:20px;
  }
  .title{
    height:50px;
    background:#25A9E5;
    .content{
      width:1080px;
      margin:0 auto;
      line-height:50px;
      .icon{
        float:left;
        margin-top:10px;
      }
      .text{
        float:left;
        color:#fff;
        margin-left:10px;
      }
    }
  }
</style>
