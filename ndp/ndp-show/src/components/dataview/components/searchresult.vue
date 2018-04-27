<template>
  <Card :bordered="false" dis-hover>
  <p slot="title">共搜索到<span class="searchResultNumber">{{pageTotal}}</span>个数据目录</p>
    <div class="result">

        <div class="result-item" v-for="result in resultList" >
            <div class="title">{{result.SUBJECT_NAME}}</div>
            <Rate disabled v-model="result.RATE_COUNT" class="rate"></Rate>
            <div class="attr-container">
              <div class="attr-item">
                时间粒度：{{result.periodTypeName}}
              </div>s
              <div class="attr-item">
                组织粒度：{{result.organTypeName}}
              </div>
              <div class="attr-item">
                所属分类：{{result.catograyName}}
              </div>
            </div>
            <div class="desciption">
              {{result.SUBJECT_DESC}}
              <span class="link">查看数据>></span>
            </div>
            <Row>
              <Col span="16">
                <div class="tags">
                  <Tag type="border" v-for="tag in result.tags" :key="tag" class="tag">{{tag}}</Tag>
                </div>
              </Col>
              <Col span="8">
                <div class="infos">
                  <div class="info">
                    <Icon type="ios-clock"></Icon>
                    {{result.createTime}}
                  </div>
                  <div class="info">
                    <Icon type="eye"></Icon>
                    {{result.viewCount}}
                  </div>
                </div>
              </Col>
            </Row>
            <template v-if="result.dataType === 1">
              <div class="type biaoge"></div>
            </template>
            <template v-else>
              <div class="type wenjian"></div>
            </template>
        </div>
        <div class="page-container">
          <Page :total="pageTotal" :current="currentPage" :page-size="pageSize" @on-change="search()" ></Page>
        </div>
    </div>
  </Card>
</template>

<script>
  import util from '@/libs/util';
    export default {
        name: "searchresult",
        props:{
          params:{
            type:Object,
            required:true
          }
        },
        data:function() {
          return {
            pageTotal:0,
            currentPage:1,
            pageSize:10,
            resultList: [
              /*{
                title: "全国品牌布局情况",
                rate: 4,
                periodType: 1,
                periodTypeName: "年",
                organType: 1,
                organTypeName: "省",
                catograyId: 1,
                catograyName: "品牌",
                description: "dsfssdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
                tags: ["销量", "销额1", "销额2", "销额3", "销额4", "销额5"],
                createTime: "2018-03-09",
                viewCount: 1256,
                dataType: 1
              }*/
            ]
          }
        },
        watch: {
          params: {
            deep: true,
            handler: function (value) {
              let self = this;
              value.pageNum="1";
              value.pageSize="5";
              util.ajax.post('/manage/dataView/getSearchResult', value).then(function (resp) {
                console.log(resp);
                let resultData = resp.data.data;
                self.resultList = resultData.list;
                self.pageTotal = resultData.total;
                self.currentPage = resultData.pageNum;
                self.pageSize = resultData.pageSize;

              });
            }
          }
        },
      methods: {
        search: function () {
          let self = this;
          value.pageNum = "1";
          value.pageSize = "5";
          util.ajax.post('/manage/dataView/getSearchResult', value).then(function (resp) {
            console.log(resp);
            let resultData = resp.data.data;
            self.resultList = resultData.list;
            self.pageTotal = resultData.total;
            self.currentPage = resultData.pageNum;
            self.pageSize = resultData.pageSize;

          })
        }
        /*,
      created(){
        util.ajax.post('/manage/dataView/getSearchResult').then(function (resp) {
          self.resultList = resp.data.data;
        })
      }*/
      }}
    </script>

<style lang="less" scoped>
  .result{
    .result-item{
      position:relative;
      padding-right:70px;
      margin-bottom:30px;
      .title{
        font-size:16px;
        font-weight: bold;
        display: inline-block;
      }
      .rate{
        display: inline-block;
        margin-left:10px;
        margin-top:-5px;
      }
      .attr-container{
        .attr-item{
          display: inline-block;
          margin-right:20px;
          color:#999;
          font-size:14px;
        }
      }
      .desciption{
        word-wrap:break-word;
        overflow:hidden;
        .link{
          color: #4199e5;
          cursor:pointer;
          margin-left:5px;
          &:hover{
            text-decoration: underline;
          }
        }
      }
      .tags{
        height:30px;
        overflow:hidden;
        .tag{
          margin-top:5px;
          font-size:14px;
        }
      }
      .infos{
        color:#999;
        text-align:right;
        .info{
          display: inline-block;
          margin-top:7px;
          margin-left:10px;
        }
      }
      .type {
        position: absolute;
        right: 0;
        top: 0;
        width: 70px;
        height: 72px;
        &.biaoge {
          background: url("../../../assets/dataview/biaoge.png");
        }
        &.wenjian {
          background: url("../../../assets/dataview/wenjian.png");
        }
      }
    }
    .page-container{
      text-align:center;
    }
  }
</style>
