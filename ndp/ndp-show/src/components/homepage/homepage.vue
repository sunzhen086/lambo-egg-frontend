<template>
  <div class="page home">
    <div class="banner">
      <h1 class="pic-topic">营销开放数据&nbsp;&nbsp;&nbsp;释放智慧能量</h1>
      <div class="search-box">
        <Input v-model="searchValue" size="large" placeholder="单箱销售收入">
          <Button slot="append" type="primary" icon="ios-search" @click="goDataView"></Button>
        </Input>
      </div>
    </div>
    <div class="pic-num">
      <div class="pic-num-box">
        <div class="left">
          <div class="icon icon1"></div>
        </div>
        <div class="right">
          <div class="value">{{dataStatistics.category_num}}</div>
          <div class="label">数据分类(个)</div>
        </div>
      </div>
      <div class="pic-num-box">
        <div class="left">
          <div class="icon icon2"></div>
        </div>
        <div class="right">
          <div class="value">{{dataStatistics.file_num}}</div>
          <div class="label">数据文件(个)</div>
        </div>
      </div>
      <div class="pic-num-box">
        <div class="left">
          <div class="icon icon3"></div>
        </div>
        <div class="right">
          <div class="value">{{dataStatistics.subject_num}}</div>
          <div class="label">数据总数(条)</div>
        </div>
      </div>
      <div class="pic-num-box">
        <div class="left">
          <div class="icon icon4"></div>
        </div>
        <div class="right">
          <div class="value">{{dataStatistics.record_num}}</div>
          <div class="label">访问量(次)</div>
        </div>
      </div>
      <div class="pic-num-box last">
        <div class="left">
          <div class="icon icon5"></div>
        </div>
        <div class="right">
          <div class="value">{{dataStatistics.download_num}}</div>
          <div class="label">下载量(次)</div>
        </div>
      </div>
    </div>
    <div class="hr"/>
    <div class="body">
      <h2 class="category">主题分类</h2>
      <Row v-for="n in parseInt(categories.length/6 + 1)" >
        <Col span="4" class="category-box" v-for="(item,index) in categories.slice(n * 6 - 6,n * 6)">
          <div class="card" @click="goCategoryView(item.category_id,item.category_name)">
            <div class="icon">
              <img :src="item.category_img_path" class="icon-default"/>
              <img :src="item.category_img1_path" class="icon-hover"/>
            </div>
            <p>{{item.category_name}}</p>
          </div>
        </Col>
      </Row>

      <Row class="top-list">
        <Col span="12" class="list">
          <div class="title">热门数据</div>
          <div v-for="item in hotSubject">
            <Row class="data-list">
              <Col span="18">
                【{{ item.category_name }}】{{ item.subject_name }}
              </Col>
              <Col span="6" class="data-desc">
                <span class="num">{{ item.record_num }}</span>次查看
              </Col>
            </Row>
          </div>
        </Col>
        <Col span="12" class="list">
          <div class="title">最新开放</div>
          <div v-for="item in newSubject">
            <Row class="data-list">
              <Col span="18">
                【{{ item.category_name }}】{{ item.subject_name }}
              </Col>
              <Col span="6" class="data-desc">
                {{ item.create_time }}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import util from '@/libs/util';
  import config from '@/config/config';

  export default {
    name: "homepage",
    data () {
      return {
        dataStatistics: {},
        categories: [],
        hotSubject: [],
        newSubject: [],
        searchValue:""
      }
    },
    methods:{
      initPage:function () {
        var self = this;
        util.ajax.get('/main/homepage/getDataStatistics',{}).then(function (resp) {
          self.dataStatistics = resp.data.data;
        });
        util.ajax.get('/main/homepage/getAllCategory',{}).then(function (resp) {
          self.categories = resp.data.data;
          for (var j = 0; j < self.categories.length; j++){
            self.categories[j].category_img_path = "/"+config.fileServerContext+"/file/get/"+self.categories[j].category_img.split(',')[0];
            self.categories[j].category_img1_path = "/"+config.fileServerContext+"/file/get/"+self.categories[j].category_img.split(',')[1];
          }
        });
        util.ajax.get('/main/homepage/getHotSubject',{}).then(function (resp) {
          self.hotSubject = resp.data.data;
        });
        util.ajax.get('/main/homepage/getNewSubject',{}).then(function (resp) {
          self.newSubject = resp.data.data;
        });
      },
      goCategoryView:function(categoryId,categoryName){
        this.$router.push({
          name:'分类总览',
          params:{
            categoryId:categoryId,
            categoryName:categoryName
          }
        });
      },
      goDataView:function(){
        this.$router.push({name:"数据目录"});
      }
    },
    created(){
      this.initPage();
    },
    mounted(){

    }
  }
</script>

<style lang="less">
  .home{
    .banner{
      .search-box{
        .ivu-input{
          height: 68px;
          background-color: rgba(0,2,20,0.46);
          border:0;
          padding-left: 26px;
          font-size: 18px;
          color: white;
        }
        .ivu-input::-webkit-input-placeholder {//webkit内核
          color: #2e476d;
        }
        .ivu-input-group-append{
          width: 144px;
          background-color: rgb(1,41,175);
          border: 0;
          .ivu-icon{
            font-size: 35px;
            color: whitesmoke;
          }
        }
      }
    }
  }
</style>
<style scoped lang="less">
  .page{
    padding-bottom:60px;
    .banner{
      height:590px;
      background:#EFEFEF url("./images/banner.jpg") center top no-repeat;
      overflow:hidden;
      .pic-topic{
        width: 1080px;
        text-align: center;
        margin:160px auto;
        font-size: 68px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        color: white;
      }
      .search-box {
        width: 880px;
        text-align: center;
        margin: -94px auto;
      }
    }
    .pic-num{
      width: 1080px;
      margin: 24px auto;
      overflow: hidden;
      .pic-num-box{
        height:62px;
        width: 216px;
        float: left;
        border-right:1px solid #eeeeee;
        display:flex;
        &.last{
          border-right:0;
        }
        .left{
          flex:1;
          .icon{
            width:46px;
            height:46px;
            margin:12px auto;
            &.icon1{
              background:url("./images/shujvfenlei.png");
            }
            &.icon2{
              background:url("./images/shujvwenjian.png");
            }
            &.icon3{
              background:url("./images/shujvzongshu.png");
            }
            &.icon4{
              background:url("./images/fangwenliang.png");
            }
            &.icon5{
              background:url("./images/xiazailiang.png");
            }
          }
        }
        .right{
          flex:2;
          /*padding:5px 10px;*/
          .label{
            color:#999999;
            font-size:16px;
          }
          .value{
            color:#525252;
            font-size:28px;
            font-weight:600;
          }
        }
      }
    }
    .hr{
      width: 100%;
      height: 1px;
      border-bottom: 1px solid #e7e7e7;
    }
    .body{
      width:1080px;
      margin:10px auto;
      .category{
        margin: 64px auto;
        font-size: 28px;
        color: #333333;
        text-align: center;
        font-weight: normal;
      }
      .category-box{
        padding:5px;
        .card{
          text-align:center;
          cursor:pointer;
          font-size: 16px;
          .icon{
            width:48px;
            height:48px;
            margin:12px auto;
            .icon-default{
              display: block;
            }
            .icon-hover{
              display: none;
            }
          }
          p{
            text-align: center;
            color: #525252;
            font-weight: normal;
          }
          &:hover,&.active{
            .icon{
              .icon-default{
                display: none;
              }
              .icon-hover{
                display: block;
              }
            }
            p{
              color: #4199e5;
            }
          }
        }
      }
      .top-list{
        margin-top: 100px;
        .list{
          padding-right:10px;
          .title{
            margin-bottom: 30px;
            font-size: 20px;
            color: #333333;
            border-left: 5px solid #ff9000;
            padding-left: 10px;
          }
          .data-list{
            padding-left: 34px;
            font-size: 14px;
            height: 32px;
            line-height: 32px;
            color: #525252;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            .data-desc{
              text-align:right;
              color: #999999;
              .num{
                color: #4199e5;
              }
            }
          }
        }
      }
    }
  }
</style>
