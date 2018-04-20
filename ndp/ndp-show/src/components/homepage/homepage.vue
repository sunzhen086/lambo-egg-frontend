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
      <Row>
        <Col span="4" class="category-box">
          <div class="card" @click="goCategoryView(2)">
            <div class="icon icon1"></div>
            <h3>客户</h3>
          </div>
        </Col>
        <Col span="4" class="category-box">
          <div class="card" @click="goCategoryView(3)">
            <div class="icon icon2"></div>
            <h3>品牌</h3>
          </div>
        </Col>
        <Col span="4" class="category-box">
          <div class="card">
            <div class="icon icon3"></div>
            <h3>市场</h3>
          </div>
        </Col>
        <Col span="4" class="category-box">
          <div class="card">
            <div class="icon icon4"></div>
            <h3>销售</h3>
          </div>
        </Col>
        <Col span="4" class="category-box">
          <div class="card">
            <div class="icon icon5"></div>
            <h3>网建</h3>
          </div>
        </Col>
        <Col span="4" class="category-box">
          <div class="card">
            <div class="icon icon6"></div>
            <h3>物流</h3>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span="4" class="category-box">
        <div class="card">
          <div class="icon icon7"></div>
          <h3>消费者</h3>
        </div>
        </Col>
        <Col span="4" class="category-box">
        <div class="card">
          <div class="icon icon8"></div>
          <h3>终端</h3>
        </div>
        </Col>
        <Col span="4" class="category-box">
        <div class="card">
          <div class="icon icon9"></div>
          <h3>工业</h3>
        </div>
        </Col>
        <Col span="4" class="category-box">
        <div class="card">
          <div class="icon icon10"></div>
          <h3>货源</h3>
        </div>
        </Col>
        <Col span="4" class="category-box">
        <div class="card">
          <div class="icon icon11"></div>
          <h3>采购</h3>
        </div>
        </Col>
        <Col span="4" class="category-box">
        <div class="card">
          <div class="icon icon12"></div>
          <h3>库存</h3>
        </div>
        </Col>
      </Row>
      <Row>
        <Col span="4" class="category-box">
        <div class="card">
          <div class="icon icon13"></div>
          <h3>结算</h3>
        </div>
        </Col>
        <Col span="4" class="category-box">
        <div class="card">
          <div class="icon icon14"></div>
          <h3>呼叫</h3>
        </div>
        </Col>
        <Col span="4" class="category-box">
        <div class="card">
          <div class="icon icon15"></div>
          <h3>非烟</h3>
        </div>
        </Col>
        <Col span="4" class="category-box">
        <div class="card">
          <div class="icon icon16"></div>
          <h3>内管</h3>
        </div>
        </Col>
        <Col span="4" class="category-box">
        <div class="card">
          <div class="icon icon17"></div>
          <h3>自律小组</h3>
        </div>
        </Col>
        <Col span="4" class="category-box">
        <div class="card">
          <div class="icon icon18"></div>
          <h3>专卖</h3>
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
        });
        util.ajax.get('/main/homepage/getHotSubject',{}).then(function (resp) {
          self.hotSubject = resp.data.data;
        });
        util.ajax.get('/main/homepage/getNewSubject',{}).then(function (resp) {
          self.newSubject = resp.data.data;
        });
      },
      goCategoryView:function(categoryId){
        this.$router.push({
          name:'分类总览',
          query:{
            categoryId:categoryId
          }
        });
      },
      goDataView:function(){
        this.$router.push({name:"新数据目录"});
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
          .icon{
            width:48px;
            height:48px;
            margin:12px auto;
            &.icon1{
              background:url("./images/kehu_1.png");
            }
            &.icon2{
              background:url("./images/pinpai_1.png");
            }
            &.icon3{
              background:url("./images/shichang_1.png");
            }
            &.icon4{
              background:url("./images/xiaoshou_1.png");
            }
            &.icon5{
              background:url("./images/wangjian_1.png");
            }
            &.icon6{
              background:url("./images/wuliu_1.png");
            }
            &.icon7{
              background:url("./images/xiaofeizhe_1.png");
            }
            &.icon8{
              background:url("./images/zhongduan_1.png");
            }
            &.icon9{
              background:url("./images/gongye_1.png");
            }
            &.icon10{
              background:url("./images/huoyuan_1.png");
            }
            &.icon11{
              background:url("./images/caigou_1.png");
            }
            &.icon12{
              background:url("./images/kucun_1.png");
            }
            &.icon13{
              background:url("./images/jiesuan_1.png");
            }
            &.icon14{
              background:url("./images/hujiao_1.png");
            }
            &.icon15{
              background:url("./images/feiyan_1.png");
            }
            &.icon16{
              background:url("./images/neiguan_1.png");
            }
            &.icon17{
              background:url("./images/zilvxiaozu_1.png");
            }
            &.icon18{
              background:url("./images/zhuanmai_1.png");
            }
          }
          h3{
            text-align: center;
            font-size: 16px;
            color: #525252;
            font-weight: normal;
          }

          &:hover,&.active{
            .icon{
              &.icon1{
                background:url("./images/kehu_2.png");
              }
              &.icon2{
                background:url("./images/pinpai_2.png");
              }
              &.icon3{
                background:url("./images/shichang_2.png");
              }
              &.icon4{
                background:url("./images/xiaoshou_2.png");
              }
              &.icon5{
                background:url("./images/wangjian_2.png");
              }
              &.icon6{
                background:url("./images/wuliu_2.png");
              }
              &.icon7{
                background:url("./images/xiaofeizhe_2.png");
              }
              &.icon8{
                background:url("./images/zhongduan_2.png");
              }
              &.icon9{
                background:url("./images/gongye_2.png");
              }
              &.icon10{
                background:url("./images/huoyuan_2.png");
              }
              &.icon11{
                background:url("./images/caigou_2.png");
              }
              &.icon12{
                background:url("./images/kucun_2.png");
              }
              &.icon13{
                background:url("./images/jiesuan_2.png");
              }
              &.icon14{
                background:url("./images/hujiao_2.png");
              }
              &.icon15{
                background:url("./images/feiyan_2.png");
              }
              &.icon16{
                background:url("./images/neiguan_2.png");
              }
              &.icon17{
                background:url("./images/zilvxiaozu_2.png");
              }
              &.icon18{
                background:url("./images/zhuanmai_2.png");
              }
            }
            h3{
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
