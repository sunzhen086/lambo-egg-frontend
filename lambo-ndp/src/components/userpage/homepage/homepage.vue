<template>
  <div class="page">
    <div class="banner">
      <div class="search-box">
        <h1>从这里开始</h1>
        <h4><span class="x">搜索超过</span><span class="y">4,233,785条</span><span class="x">的开放数据</span></h4>
        <Icon type="arrow-down-b" size="25" style="margin-top:10px;"></Icon>
        <Input v-model="searchValue" size="large" placeholder="存销比" style="margin-top:20px;">
          <Button slot="append" type="primary" icon="ios-search" @click="goDataView">搜索</Button>
        </Input>
      </div>
    </div>
    <div class="body">
      <Row>
        <Col span="4" class="category-box" >
          <div @click="goCategoryView">
            <Card class="card" >
              <Icon type="android-contacts" size="80" color="#5C6B77"></Icon>
              <h3>客户</h3>
            </Card>
          </div>
        </Col>
        <Col span="4" class="category-box">
          <div @click="goCategoryView">
            <Card class="card">
              <Icon type="pricetags" size="80" color="#5C6B77"></Icon>
              <h3>品牌</h3>
            </Card>
          </div>
        </Col>
        <Col span="4" class="category-box">
          <Card class="card">
            <Icon type="ios-cart" size="80" color="#5C6B77"></Icon>
            <h3>市场</h3>
          </Card>
        </Col>
        <Col span="4" class="category-box">
          <Card class="card">
            <Icon type="ios-bookmarks" size="80" color="#5C6B77"></Icon>
            <h3>销售</h3>
          </Card>
        </Col>
        <Col span="4" class="category-box">
          <Card class="card">
            <Icon type="ios-box" size="80" color="#5C6B77"></Icon>
            <h3>网建</h3>
          </Card>
        </Col>
        <Col span="4" class="category-box">
          <Card class="card">
            <Icon type="ios-world" size="80" color="#5C6B77"></Icon>
            <h3>物流</h3>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span="4" class="category-box">
        <Card class="card">
          <Icon type="ios-keypad" size="80" color="#5C6B77"></Icon>
          <h3>消费者</h3>
        </Card>
        </Col>
        <Col span="4" class="category-box">
        <Card class="card">
          <Icon type="ios-basketball" size="80" color="#5C6B77"></Icon>
          <h3>终端</h3>
        </Card>
        </Col>
        <Col span="4" class="category-box">
        <Card class="card">
          <Icon type="ios-paw" size="80" color="#5C6B77"></Icon>
          <h3>工业</h3>
        </Card>
        </Col>
        <Col span="4" class="category-box">
        <Card class="card">
          <Icon type="ios-cloudy-night" size="80" color="#5C6B77"></Icon>
          <h3>货源</h3>
        </Card>
        </Col>
        <Col span="4" class="category-box">
        <Card class="card">
          <Icon type="social-twitter" size="80" color="#5C6B77"></Icon>
          <h3>采购</h3>
        </Card>
        </Col>
        <Col span="4" class="category-box">
        <Card class="card">
          <Icon type="social-instagram" size="80" color="#5C6B77"></Icon>
          <h3>库存</h3>
        </Card>
        </Col>
      </Row>
      <Row>
        <Col span="4" class="category-box">
        <Card class="card">
          <Icon type="social-python" size="80" color="#5C6B77"></Icon>
          <h3>结算</h3>
        </Card>
        </Col>
        <Col span="4" class="category-box">
        <Card class="card">
          <Icon type="social-angular" size="80" color="#5C6B77"></Icon>
          <h3>呼叫</h3>
        </Card>
        </Col>
        <Col span="4" class="category-box">
        <Card class="card">
          <Icon type="social-chrome" size="80" color="#5C6B77"></Icon>
          <h3>非烟</h3>
        </Card>
        </Col>
        <Col span="4" class="category-box">
        <Card class="card">
          <Icon type="ios-bookmarks" size="80" color="#5C6B77"></Icon>
          <h3>内管</h3>
        </Card>
        </Col>
        <Col span="4" class="category-box">
        <Card class="card">
          <Icon type="social-codepen" size="80" color="#5C6B77"></Icon>
          <h3>自律小组</h3>
        </Card>
        </Col>
        <Col span="4" class="category-box">
        <Card class="card">
          <Icon type="social-buffer" size="80" color="#5C6B77"></Icon>
          <h3>专卖</h3>
        </Card>
        </Col>
      </Row>

      <Row style="margin-top:20px;">
        <Col span="12" style="padding-right:10px;">
          <Card :bordered="false" :dis-hover="true">
            <p slot="title" style="font-size:20px;">热门数据</p>
            <Row class="data-list">
              <Col span="18">
                【品牌】全国品牌分布情况表
              </Col>
              <Col span="6" style="text-align:right">
                214次下载
              </Col>
            </Row>
            <Row class="data-list">
              <Col span="18">
              【品牌】全国品牌分布情况表
              </Col>
              <Col span="6" style="text-align:right">
              214次下载
              </Col>
            </Row>
            <Row class="data-list">
              <Col span="18">
              【品牌】全国品牌分布情况表
              </Col>
              <Col span="6" style="text-align:right">
              214次下载
              </Col>
            </Row>
            <Row class="data-list">
              <Col span="18">
              【品牌】全国品牌分布情况表
              </Col>
              <Col span="6" style="text-align:right">
              214次下载
              </Col>
            </Row>
            <Row class="data-list">
              <Col span="18">
              【品牌】全国品牌分布情况表
              </Col>
              <Col span="6" style="text-align:right">
              214次下载
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span="12" style="padding-right:10px;">
        <Card :bordered="false" :dis-hover="true">
          <p slot="title" style="font-size:20px;">最新开放</p>
          <Row class="data-list">
            <Col span="18">
            【品牌】全国品牌分布情况表
            </Col>
            <Col span="6" style="text-align:right">
              2018年3月28日
            </Col>
          </Row>
          <Row class="data-list">
            <Col span="18">
            【品牌】全国品牌分布情况表
            </Col>
            <Col span="6" style="text-align:right">
              2018年3月28日
            </Col>
          </Row>
          <Row class="data-list">
            <Col span="18">
            【品牌】全国品牌分布情况表
            </Col>
            <Col span="6" style="text-align:right">
              2018年3月28日
            </Col>
          </Row>
          <Row class="data-list">
            <Col span="18">
            【品牌】全国品牌分布情况表
            </Col>
            <Col span="6" style="text-align:right">
              2018年3月28日
            </Col>
          </Row>
          <Row class="data-list">
            <Col span="18">
            【品牌】全国品牌分布情况表
            </Col>
            <Col span="6" style="text-align:right">
              2018年3月28日
            </Col>
          </Row>
        </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>

  export default {
    name: "homepage",
    data () {
      return {
        value2: 0,
        searchValue:""
      }
    },
    methods:{
      goCategoryView:function(){
        this.$router.push({name:"分类总览"});
      },
      goDataView:function(){
        this.$router.push({name:"新数据目录"});
      }
    }
  }
</script>

<style scoped lang="less">
  .page{
    padding-bottom:60px;
    .banner{
      height:450px;
      background:#EFEFEF url("../../../assets/main1.png") center top no-repeat;
      overflow:hidden;
      .search-box{
          width:1080px;
          text-align:center;
          margin:270px auto;
          .x{
            color: #999;
          }
          .y{
            color:#25A9E5
          }
      }
    }
    .body{
      width:1080px;
      margin:10px auto;
      .category-box{
        padding:5px;
        .card{
          text-align:center;
          cursor:pointer;
        }
      }
      .data-list{
        padding:5px;
      }
    }
  }
</style>
