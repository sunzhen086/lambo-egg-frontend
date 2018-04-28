<template>
  <div>
    <div class="title">
      <div class="content">
        <Icon type="pricetags" size="30" color="#fff" class="icon"></Icon>
        <h2 class="text">全行业所有品牌的布局情况</h2>
      </div>
    </div>
    <div class="body">
      <div class="main-tab">
        <Tabs>
          <TabPane label="数据查询" icon="navicon-round">
            <div class="file-list">
              <Row v-for="item in fileList">
                <Col span="20">
                  <p class="file-name"><span class="dot">▪</span>&nbsp;&nbsp;{{item.doc_name}}</p>
                </Col>
                <Col span="4">
                  <p class="download"><Icon type="android-download"></Icon> <a :href="downloadUrl + '/' + item.doc_save_id" :download="item.doc_name">下载</a></p>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane label="数据评价" icon="android-textsms">
            <feedback></feedback>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import feedback from "../feedback/feedback";
  import util from '@/libs/util';
  import config from '@/config/config';

  export default {
    name: "searchTable",
    data(){
      return{
        fileList:[],
        downloadUrl:"/"+config.fileServerContext+"/file/get"
      }
    },
    components: {
      feedback
    },
    computed:{
      subjectId: function () {
        return this.$route.params.subjectId
      },
    },
    methods:{
      initPage:function () {
        var self = this;
        util.ajax.post('/manage/dataSubject/getSubjectDocuments',{subjectId:self.subjectId}).then(function (resp) {
          self.fileList = resp.data.data;
        });
      }
    },
    created(){
      this.initPage()
    }
  }
</script>

<style lang="less" scoped>
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
  .body{
    width:1080px;
    margin:20px auto;
    .main-tab{
      padding: 10px;
      .file-list{
        line-height: 32px;
        .file-name{
          font-size: 14px;
          color: #525252;
          height: 32px;
          .dot{
            color: #ff9000;
            font-weight: bold;
          }
        }
        .download{
          text-align: right;
          color: #999999;
          font-size: 14px;
          height: 32px;
          cursor:pointer;
        }
      }
    }
  }
</style>
