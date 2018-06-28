<template>
  <div>
    <div class="page-header">
      <div class="container">
        <div class="logo">
          <div class="logo-img"></div>
          <div class="logo-img2"></div>
        </div>
        <div class="nav">
          <Menu mode="horizontal" theme="light" :active-name="activeName" @on-select="changeMenu" :open-names="openNames">
            <MenuItem name="首页">
              <Icon type="home"></Icon>
              首页
            </MenuItem>
            <!--<MenuItem name="烟草指数">
              <Icon type="easel"></Icon>
              烟草指数
            </MenuItem>-->
            <Submenu name="数据分类">
              <template slot="title">
                <Icon type="grid"></Icon>
                数据分类
              </template>
              <div class="category-list">
                <Row v-for="n in parseInt(categories.length/6 + 1)">
                  <Col span="4" class="category-box" v-for="(item,index) in categories.slice(n * 6 - 6,n * 6)">
                    <MenuItem :name="item.category_id+'-'+item.category_name" class="card">
                    <!--<div class="card" @click="goCategoryView(item.category_id,item.category_name)">-->
                      <div class="icon">
                        <img :src="item.category_img_path" class="icon-default"/>
                        <img :src="item.category_img1_path" class="icon-hover"/>
                      </div>
                      <p>{{item.category_name}}</p>
                    <!--</div>-->
                    </MenuItem>
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
        openNames:[],
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
            self.categories[j].category_img_path = "/"+config.fileServerContext+"/file/get/"+self.categories[j].category_img.split(',')[0];
            self.categories[j].category_img1_path = "/"+config.fileServerContext+"/file/get/"+self.categories[j].category_img.split(',')[1];
          }
        });
      },
      goFramePage:function () {
        window.location.href = this.framePage;
      },
      changeMenu:function (name) {
        var query = {};
        if(name.indexOf("-")>=0){
          var categoryId = name.split("-")[0];
          var categoryName = name.split("-")[1];
          this.$router.push({
            name:'分类数据',
            query:{
              categoryId:categoryId,
              categoryName:categoryName
            }
          });
        }else{
          this.$router.push({
            name: name
          })
        }
      },
      goCategoryView:function(categoryId,categoryName){
        this.$router.push({
          name:'分类数据',
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
    },
    watch: {
      '$route' (to, from) {
        var name = to.name;
        if(name!='分类数据'){
          this.activeName = name;
        }else{
          var categoryId = to.query.categoryId;
          var categoryName = to.query.categoryName;
          var activeName = categoryId + "-"+categoryName;
          this.activeName = activeName;
          this.openNames = [];
          this.openedNames.push(name);
        }
      }
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
        .ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item-selected{
          background: #f3f3f3;
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
        }
      }
    }
  }
</style>
