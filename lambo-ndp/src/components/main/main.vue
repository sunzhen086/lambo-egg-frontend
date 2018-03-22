<template>
  <div>
    <div class="page-header">
        <div class="container">
          <div class="logo">
            <div class="logo-img"></div>
            <div class="logo-text">数据开放平台</div>
          </div>
          <div class="search">
            <Input v-model="searchValue">
                <Button slot="append" type="primary" icon="ios-search">搜索</Button>
            </Input>
          </div>
        </div>
    </div>
    <div class="page-nav">
        <div class="container">
          <Menu mode="horizontal" theme="primary" :active-name="activeName" @on-select="changeMenu">
            <MenuItem name="首页">
                <Icon type="home"></Icon>
                首页
            </MenuItem>
            <MenuItem name="行业概览">
                <Icon type="stats-bars"></Icon>
                行业概览
            </MenuItem>
            <MenuItem name="数据查询">
                <Icon type="ios-list-outline"></Icon>
                数据目录
            </MenuItem>
          </Menu>
        </div>
    </div>
    <div class="page-body">
      <router-view></router-view>
    </div>
  </div>


</template>
<script>

  export default {
    data() {
      return {
        searchValue:"",
        activeName:"首页"
      }
    },
    methods:{
      initPage:function () {
        this.activeName = this.$route.name;
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
      overflow:hidden;
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
