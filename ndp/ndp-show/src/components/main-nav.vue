<template>
  <div>
    <div class="page-header">
      <div class="container">
        <div class="logo">
          <div class="logo-img"></div>
          <div class="logo-img2"></div>
        </div>
        <div class="nav">
          <Menu mode="horizontal" theme="light" :active-name="activeName" @on-select="changeMenu">
            <MenuItem name="首页">
              <Icon type="home"></Icon>
              首页
            </MenuItem>
            <MenuItem name="烟草指数">
              <Icon type="easel"></Icon>
              烟草指数
            </MenuItem>
            <Submenu name="数据分类">
              <template slot="title">
                <Icon type="grid"></Icon>
                数据分类
              </template>
              <div class="category-list">
                <Row v-for="n in parseInt(categories.length/6 + 1)">
                  <Col span="4" class="category-box" v-for="(item,index) in categories.slice(n * 6 - 6,n * 6)">
                    <div class="card" @click="goCategoryView(item.category_id,item.category_name)">
                      <div class="icon">
                        <img :src="item.category_img_path"/>
                      </div>
                      <p>{{item.category_name}}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Submenu>
            <MenuItem name="数据目录">
              <Icon type="ios-list"></Icon>
              数据目录
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
    <div class="page-body">
      <router-view></router-view>
    </div>
  </div>


</template>
<script>
  import util from '@/libs/util';
  import config from '@/config/config';

  export default {
    data() {
      return {
        searchValue:"",
        activeName:"数据分类",
        frameBtnPermission:'1',
        framePage:config.framePage,
        categories: []
      }
    },
    methods:{
      initPage:function () {
        var self = this;
        this.activeName = this.$route.name;
        util.ajax.get('/main/homepage/getAllCategory',{}).then(function (resp) {
          self.categories = resp.data.data;
          for (var j = 0; j < self.categories.length; j++){
            self.categories[j].category_img_path = "/"+config.fileServerContext+"/file/get/"+self.categories[j].category_img;
          }
        });
      },
      goFramePage:function () {
        window.location.href = this.framePage;
      },
      changeMenu:function (name) {
        var query = {};
        if(name == "数据查询"){
          query = {
            subjectId:1,
            categoryId:1
          }
        }
        this.$router.push({
          name: name,
          query:query
        })
      },
      goCategoryView:function(categoryId,categoryName){
        this.$router.push({
          name:'分类总览',
          query:{
            categoryId:categoryId,
            categoryName:categoryName
          }
        });
      },
    },
    created(){
      this.initPage();
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .page-header{
    .container{
      .nav{
        .ivu-menu-item,.ivu-menu-submenu-title{
          font-size: 18px;
        }
      }
    }
  }
</style>
<style scoped lang="less">
  .page-header{
    height: 80px;
    .container{
      width:1080px;
      margin:0 auto;
      .logo{
        width:430px;
        float:left;
        .logo-img{
          width:158px;
          height:44px;
          background:url("./homepage/images/yancaologo.png") no-repeat;
          float: left;
          margin-top:18px;
          border-right: 1px solid #e2e2e2;
        }
        .logo-img2{
          width:237px;
          height:44px;
          background:url("./homepage/images/pingtailogo.png") no-repeat;
          float: left;
          margin-left:16px;
          margin-top:18px;
        }
      }
      .nav{
        float:right;
        width:560px;
        margin-top:20px;
        .ivu-menu-horizontal.ivu-menu-light:after{
          background:none;
        }
        .category-list{
          width:600px;
          line-height:1.1;
          padding:0 5px;
          .category-box{
            padding:5px;
            .card{
              text-align:center;
              cursor:pointer;
              font-size: 14px;
              .icon{
                width:48px;
                height:48px;
                margin:12px auto;
                &.icon1{
                  background:url("./homepage/images/kehu_1.png");
                }
                &.icon2{
                  background:url("./homepage/images/pinpai_1.png");
                }
                &.icon3{
                  background:url("./homepage/images/shichang_1.png");
                }
                &.icon4{
                  background:url("./homepage/images/xiaoshou_1.png");
                }
                &.icon5{
                  background:url("./homepage/images/wangjian_1.png");
                }
                &.icon6{
                  background:url("./homepage/images/wuliu_1.png");
                }
                &.icon7{
                  background:url("./homepage/images/xiaofeizhe_1.png");
                }
                &.icon8{
                  background:url("./homepage/images/zhongduan_1.png");
                }
                &.icon9{
                  background:url("./homepage/images/gongye_1.png");
                }
                &.icon10{
                  background:url("./homepage/images/huoyuan_1.png");
                }
                &.icon11{
                  background:url("./homepage/images/caigou_1.png");
                }
                &.icon12{
                  background:url("./homepage/images/kucun_1.png");
                }
                &.icon13{
                  background:url("./homepage/images/jiesuan_1.png");
                }
                &.icon14{
                  background:url("./homepage/images/hujiao_1.png");
                }
                &.icon15{
                  background:url("./homepage/images/feiyan_1.png");
                }
                &.icon16{
                  background:url("./homepage/images/neiguan_1.png");
                }
                &.icon17{
                  background:url("./homepage/images/zilvxiaozu_1.png");
                }
                &.icon18{
                  background:url("./homepage/images/zhuanmai_1.png");
                }
              }
              p{
                text-align: center;
                color: #525252;
                font-weight: normal;
              }

              &:hover,&.active{
                .icon{
                  &.icon1{
                    background:url("./homepage/images/kehu_2.png");
                  }
                  &.icon2{
                    background:url("./homepage/images/pinpai_2.png");
                  }
                  &.icon3{
                    background:url("./homepage/images/shichang_2.png");
                  }
                  &.icon4{
                    background:url("./homepage/images/xiaoshou_2.png");
                  }
                  &.icon5{
                    background:url("./homepage/images/wangjian_2.png");
                  }
                  &.icon6{
                    background:url("./homepage/images/wuliu_2.png");
                  }
                  &.icon7{
                    background:url("./homepage/images/xiaofeizhe_2.png");
                  }
                  &.icon8{
                    background:url("./homepage/images/zhongduan_2.png");
                  }
                  &.icon9{
                    background:url("./homepage/images/gongye_2.png");
                  }
                  &.icon10{
                    background:url("./homepage/images/huoyuan_2.png");
                  }
                  &.icon11{
                    background:url("./homepage/images/caigou_2.png");
                  }
                  &.icon12{
                    background:url("./homepage/images/kucun_2.png");
                  }
                  &.icon13{
                    background:url("./homepage/images/jiesuan_2.png");
                  }
                  &.icon14{
                    background:url("./homepage/images/hujiao_2.png");
                  }
                  &.icon15{
                    background:url("./homepage/images/feiyan_2.png");
                  }
                  &.icon16{
                    background:url("./homepage/images/neiguan_2.png");
                  }
                  &.icon17{
                    background:url("./homepage/images/zilvxiaozu_2.png");
                  }
                  &.icon18{
                    background:url("./homepage/images/zhuanmai_2.png");
                  }
                }
                p{
                  color: #4199e5;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
