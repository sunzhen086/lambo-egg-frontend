<template>
  <div class="container">
    <div class="overinfo">
      {{categoryOverview.summary}}
    </div>
    <div class="highlight">
      <div class="content">
        <h1 class="example-head">{{categoryOverview.caption}}</h1>
        <div class="image-container">
          <div v-if="examplePic.length == 1">
            <img :src="examplePic[0]"/>
          </div>
          <div v-else="">
            <Carousel autoplay loop style="width: 328px">
              <CarouselItem v-for="item in examplePic">
                <img :src="item"/>
              </CarouselItem>
            </Carousel>
          </div>
        </div>
        <div class="text-container" v-html="categoryOverview.article">
        </div>
      </div>
    </div>
    <div class="update">
      <div class="title"><div class="text">近期更新</div></div>
      <div class="list" v-for="item in newSubject">
        <div class="item">
          <div class="name">{{item.subject_name}}</div>
          <div class="tags">
            <Tag color="#eff6fc">品牌</Tag>
            <Tag color="#eff6fc">数量</Tag>
            <Tag color="#eff6fc">占比</Tag>
            <Tag color="#eff6fc">销量</Tag>
            <Tag color="#eff6fc">上柜率</Tag>
          </div>
          <Row>
            <Col span="20" class="description">
              {{item.subject_desc}}
            </Col>
            <Col class="time">
              <Icon type="android-time"></Icon> {{item.create_time}}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import util from '@/libs/util';
  import config from '@/config/config';

  export default {
    name: "overview",
    data(){
      return {
        examplePic:[],
        categoryOverview:{},
        newSubject: []
      }
    },
    computed:{
      categoryId: function () {
        return this.$route.params.categoryId
      },
    },
    methods:{
      initPage:function () {
        var self = this;
        util.ajax.get('/main/overview/getCategoryOverview?categoryId=' + self.categoryId,{}).then(function (resp) {
          self.categoryOverview = resp.data.data;
          var length = self.categoryOverview.picture.split(',').length;
          self.examplePic = [];
          for (var i=0; i < length; i++) {
            self.examplePic.push("/"+config.fileServerContext+"/file/get/"+self.categoryOverview.picture.split(',')[i]);
          }
        });
        util.ajax.get('/main/homepage/getNewSubject?categoryId=' + self.categoryId,{}).then(function (resp) {
          self.newSubject = resp.data.data;
        });
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应
        this.categoryOverview = {};
        this.newSubject = [];
        this.initPage()
      }
    },
    created(){
      this.initPage()
    },
    mounted(){
    }
  }
</script>

<style lang="less" scoped>
  .container{
    padding-top: 10px;
    margin-bottom: 50px;
    background:#fafafa;
    .overinfo{
      width:1080px;
      margin:20px auto;
      padding: 20px;
      font-size:14px;
      color: #525252;
      text-indent: 2em;
      background:white;
    }
    .highlight{
      /*background:#25A9E5;*/
      background:white;
      width:1080px; /*如果全屏宽则去掉*/
      margin:0 auto;
      border-width: 0 1px 1px 1px;
      border-style: solid;
      border-color: rgba(201,201,201,0.16);
      /* @Key 投影 投影偏移3px，宽6px，颜色#c9c9c9 */
      -webkit-box-shadow: 0px 3px 1px rgba(201,201,201,0.16);
      -moz-box-shadow: 0px 3px 1px rgba(201,201,201,0.16);
      box-shadow: 0px 3px 1px rgba(201,201,201,0.16);
      .content{
        width:1080px;
        margin:0 auto;
        overflow: hidden;
        padding:0 22px;
        .example-head{
          color:#525252;
          font-size: 18px;
          text-align: center;
          margin: 15px;
        }
        .image-container{
          margin-top:15px;
          margin-right:22px;
          background:#fff;
          display: inline-block;
          float: left;
          img{
            width:auto;
            height:auto;
            max-width:328px;
            max-height:208px;
          }
          /*.description{
            height: 32px;
            line-height: 32px;
            font-size:14px;
            color: white;
            text-align: center;
            background-color: #dedede;
          }*/
        }
        .text-container{
          margin-top:8px;
          line-height:2;
          font-size:14px;
          text-indent: 2em;
          padding: 6px;
        }
      }
    }
    .update{
      background:white;
      padding:0 22px;
      width:1080px;
      margin:22px auto;
      .title{
        border-bottom:1px solid #dcdcdc;
        .text{
          border-bottom:2px solid #ff9000;
          width: 80px;
          height:32px;
          line-height:32px;
          font-size:16px;
          color: #525252;
          font-weight: bold;
        }
      }
      .list{
        .item{
          margin-top:32px;
          .name{
            font-size:18px;
            color: #525252;
          }
          .tags{
            margin-top:5px;
          }
          .time{
            color:#999999;
            font-size:14px;
            margin-top:14px;
            text-align: right;
          }
          .description{
            margin-top:14px;
            font-size:14px;
            color: #999999;
          }
        }
      }
    }
  }
</style>

<style lang="less">
  .container{
    .update{
      .list{
        .tags{
          .ivu-tag-text{
            color:#4199e5!important;
          }
        }
      }
    }
  }
</style>
