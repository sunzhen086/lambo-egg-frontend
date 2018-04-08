<template>
  <div>
    <div class="page-header">
      <div class="container">
        <div class="logo">
          <div class="logo-img"></div>
          <div class="logo-text">数据开放平台</div>
        </div>
        <div class="nav">
          <Menu mode="horizontal" theme="light" :active-name="activeName" @on-select="changeMenu">
            <MenuItem name="新首页">
              <Icon type="home"></Icon>
              首页
            </MenuItem>
            <MenuItem name="数据概览">
              <Icon type="ios-world-outline"></Icon>
              数据概览
            </MenuItem>
            <Submenu name="数据分类">
              <template slot="title">
                <Icon type="stats-bars"></Icon>
                数据分类
              </template>
              <div class="category-list">
                <Row>
                  <Col span="4" class="category-box">
                    <div @click="goCategoryView">
                      <Icon type="android-contacts" size="40" color="#5C6B77"></Icon>
                      <h3>客户</h3>
                    </div>
                  </Col>
                  <Col span="4" class="category-box">
                    <div @click="goCategoryView">
                      <Icon type="pricetags" size="40" color="#5C6B77"></Icon>
                      <h3>品牌</h3>
                    </div>
                  </Col>
                  <Col span="4" class="category-box">
                    <Icon type="ios-cart" size="40" color="#5C6B77"></Icon>
                    <h3>市场</h3>
                  </Col>
                  <Col span="4" class="category-box">
                    <Icon type="ios-bookmarks" size="40" color="#5C6B77"></Icon>
                    <h3>销售</h3>
                  </Col>
                  <Col span="4" class="category-box">
                    <Icon type="ios-box" size="40" color="#5C6B77"></Icon>
                    <h3>网建</h3>
                  </Col>
                  <Col span="4" class="category-box">
                    <Icon type="ios-world" size="40" color="#5C6B77"></Icon>
                    <h3>物流</h3>
                  </Col>
                </Row>
                <Row>
                  <Col span="4" class="category-box">
                    <Icon type="ios-keypad" size="40" color="#5C6B77"></Icon>
                    <h3>消费者</h3>
                  </Col>
                  <Col span="4" class="category-box">
                    <Icon type="ios-basketball" size="40" color="#5C6B77"></Icon>
                    <h3>终端</h3>
                  </Col>
                  <Col span="4" class="category-box">
                    <Icon type="ios-paw" size="40" color="#5C6B77"></Icon>
                    <h3>工业</h3>
                  </Col>
                  <Col span="4" class="category-box">
                    <Icon type="ios-cloudy-night" size="40" color="#5C6B77"></Icon>
                    <h3>货源</h3>
                  </Col>
                  <Col span="4" class="category-box">
                    <Icon type="social-twitter" size="40" color="#5C6B77"></Icon>
                    <h3>采购</h3>
                  </Col>
                  <Col span="4" class="category-box">
                    <Icon type="social-instagram" size="40" color="#5C6B77"></Icon>
                    <h3>库存</h3>
                  </Col>
                </Row>
                <Row>
                  <Col span="4" class="category-box">
                    <Icon type="social-python" size="40" color="#5C6B77"></Icon>
                    <h3>结算</h3>
                  </Col>
                  <Col span="4" class="category-box">
                    <Icon type="social-angular" size="40" color="#5C6B77"></Icon>
                    <h3>呼叫</h3>
                  </Col>
                  <Col span="4" class="category-box">
                    <Icon type="social-chrome" size="40" color="#5C6B77"></Icon>
                    <h3>非烟</h3>
                  </Col>
                  <Col span="4" class="category-box">
                    <Icon type="ios-bookmarks" size="40" color="#5C6B77"></Icon>
                    <h3>内管</h3>
                  </Col>
                  <Col span="4" class="category-box">
                    <Icon type="social-codepen" size="40" color="#5C6B77"></Icon>
                    <h3>自律小组</h3>
                  </Col>
                  <Col span="4" class="category-box">
                    <Icon type="social-buffer" size="40" color="#5C6B77"></Icon>
                    <h3>专卖</h3>
                  </Col>
                </Row>
              </div>
            </Submenu>
            <MenuItem name="新数据目录">
              <Icon type="ios-list-outline"></Icon>
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
  import Config from '@/config/config';
  export default {
    data() {
      return {
        searchValue:"",
        activeName:"首页",
        frameBtnPermission:'1',
        framePage:Config.framePage
      }
    },
    methods:{
      initPage:function () {
        this.activeName = this.$route.name;
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
      goCategoryView:function(){
        this.$router.push({name:"分类总览"});
      }
    },
    mounted(){
      this.initPage();
    }
  }
</script>

<style scoped lang="less">
  .page-header{
    height:100px;
    .container{
      width:1080px;
      margin:0 auto;
      .logo{
        width:530px;
        float:left;
        display:flex;
        .logo-img{
          width:219px;
          height:67px;
          background:url("../../assets/tobaccologo.png") no-repeat;
          flex:1;
          margin-top:15px;
        }
        .logo-text{
          font-weight: bolder;
          font-size: 28px;
          flex:1;
          margin-top:15px;
          line-height:67px;
        }
      }
      .nav{
        float:right;
        width:500px;
        margin-top:20px;
        .ivu-menu-horizontal.ivu-menu-light:after{
          background:none;
        }
        .category-list{
          width:600px;
          line-height:1.1;
          padding:0 5px;
          .category-box{
            text-align:center;
            padding:10px;
            h3{
              line-height:1.1;
              color:#333;
            }
            &:hover{
              background: #e9e9e9;
            }
          }
        }
      }
      .search{
        width:400px;
        float:right;
        margin-top:33px;
      }
    }
  }
  .page-nav{
    height:60px;
    background:#2d8cf0;
    .container{
      width:1080px;
      margin:0 auto;
    }
  }
</style>
