<template>
  <div class="page">
    <div class="content">
      <Row>
        <Col span="7" >
          <div class="left">
            <div class="title">
              数据目录筛选
            </div>
            <div class="container">
              <Input v-model="searchText" icon="search" placeholder="请输入关键词" @on-blur="checkString" @on-click="searchCategory()"></Input>
              <div class="sub-title">
                <div class="icon"></div>
                <div class="text">排序方式</div>
              </div>
              <div class="orders">
                <div class="order-item" :class="{ active: formItem.activeOrder =='updateTime' }" @click="changeOrderItem('gengxinshijian')">
                  <div class="icon gengxinshijian"></div>
                  <div class="text">更新时间</div>
                </div>
                <div class="order-item" :class="{ active: formItem.activeOrder =='dataCount' }" @click="changeOrderItem('shujvliang')">
                  <div class="icon shujvliang"></div>
                  <div class="text">数据量</div>
                </div>
                <div class="order-item" :class="{ active: formItem.activeOrder =='visitCount' }" @click="changeOrderItem('fangwenliang')">
                  <div class="icon fangwenliang"></div>
                  <div class="text">访问量</div>
                </div>
                <div class="order-item" :class="{ active: formItem.activeOrder =='rateCount' }" @click="changeOrderItem('pingfen')">
                  <div class="icon pingfen"></div>
                  <div class="text">评分</div>
                </div>
              </div>
              <div class="sub-title">
                <div class="icon"></div>
                <div class="text">筛选条件</div>
              </div>
              <Form :model="formItem" :label-width="60" class="form">
                <FormItem label="分类：" class="form-item-sz">
                  <Select v-model="formItem.catograyId">
                    <Option v-for="item in catograyList" :value="item.dictKey" :key="item.dictKey">{{ item.dictValue }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="时间：" class="form-item-sz">
                  <Select v-model="formItem.periodTypeId">
                    <Option v-for="item in periodTypeList" :value="item.dictKey" :key="item.dictKey">{{ item.dictValue }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="组织：" class="form-item-sz">
                  <Select v-model="formItem.organTypeId">
                    <Option v-for="item in organTypeList" :value="item.dictKey" :key="item.dictKey">{{ item.dictValue }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="指标：" class="form-item-sz">
                  <div class="tag-container">
                    <div class="tag" v-for="tag in tagList" :key="tag.dictKey" :class="{active:formItem.activeTags.indexOf(tag.dictKey) > -1}" @click="tagActiveChange(tag.dictKey)">
                      {{tag.dictValue}}
                    </div>
                  </div>
                </FormItem>
                <FormItem label="评价：" class="form-item-sz">
                  <div class="tag-container">
                    <div class="tag" v-for="star in starList" :key="star.starId" :class="{active:formItem.activeStars.indexOf(star.starId) > -1}" @click="starActiveChange(star.starId)">
                      {{star.starName}}
                    </div>
                  </div>
                </FormItem>
              </Form>
            </div>
          </div>
        </Col>
        <Col span="17">
          <div class="right">
            <Card :bordered="false" dis-hover>
              <p slot="title">共搜索到<span class="searchResultNumber">{{searchResultNumber}}</span>个数据目录</p>
              <SearchResult :params="formItem"></SearchResult>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import SearchResult from "./components/searchresult";
  import util from '@/libs/util';
  export default {
    name: "dataview",
    components:{
      "SearchResult":SearchResult
    },
    data() {
      return {
        searchText:"",

        formItem:{
          catograyId:"",
          periodTypeId:"",
          organTypeId:"",
          activeTags:[],
          activeStars:[],
          activeOrder:"updateTime",
        },
        searchResultNumber:0,
        catograyList:[],
        periodTypeList:[],
        organTypeList:[],
        tagList:[],
        starList:[
          {
            starId:1,
            starName:"一星"
          },
          {
            starId:2,
            starName:"二星"
          },
          {
            starId:3,
            starName:"三星"
          },
          {
            starId:4,
            starName:"四星"
          },
          {
            starId:5,
            starName:"五星"
          }
        ]
      }
    },
    methods:{
      changeOrderItem:function(orderItem){
        this.formItem.activeOrder = orderItem;

        //组织查询条件进行查询

      },
      tagActiveChange:function(tagId){
        let activeTags = this.formItem.activeTags;
        let index = activeTags.indexOf(tagId);
        if(index> -1){
          activeTags.splice(index,1);
        }else{
          activeTags.push(tagId);
        }
      },
      starActiveChange:function(starId){
        let activeStars = this.formItem.activeStars;
        let index = activeStars.indexOf(starId);
        if(index> -1){
          activeStars.splice(index,1);
        }else{
          activeStars.push(starId);
        }
      },
      searchCategory:function () {

      },
      checkString:function () {
        //校验字符串长度
        searchText
      },
      initPage:function () {
        var self = this;
        //获取
        util.ajax.post('/manage/dataView/getConditionMap',{}).then(function (resp) {
          self.catograyList=resp.data.data.categoryTypeList;
          self.periodTypeList=resp.data.data.timeTypeList;
          self.organTypeList=resp.data.data.organTypeList;
          self.tagList=resp.data.data.indexTypeList;
        });
      }
    },
    created(){
      this.initPage();
    },
    mounted(){
    }
  }
</script>
<style lang="less" scoped>
  .page{
    background:#fafafa;
    padding-top: 10px;
    .content{
      width:1080px;
      margin:0px auto;
      margin-top: 10px;
      .left{
        background:#fff;
        margin-right:20px;
        .title{
          background:#4199e5;
          color:#fff;
          font-size:16px;
          line-height:34px;
          text-align:center;
        }
        .container{
          padding:22px 16px 22px;
          .sub-title{
            margin-top:10px;
            overflow:hidden;
            .icon{
              width:5px;
              height:14px;
              background:#ff9000;
              float:left;
              margin-top:3px;
            }
            .text{
              font-size:14px;
              float:left;
              margin-left:5px;
            }
          }
          .orders{
            margin-top:10px;
            display:flex;
            .order-item{
              flex:1;
              cursor:pointer;
              .icon{
                width:42px;
                height:42px;
                margin:0 auto;
                &.gengxinshijian{
                  background:url("../../assets/dataview/gengxinshijian_1.png");
                }
                &.shujvliang{
                  background:url("../../assets/dataview/shujvliang_1.png");
                }
                &.fangwenliang{
                  background:url("../../assets/dataview/fangwenliang_1.png");
                }
                &.pingfen{
                  background:url("../../assets/dataview/pingfen_1.png");
                }
              }
              .text{
                margin-top:5px;
                text-align:center;
              }
              &:hover{
                .icon{
                  &.gengxinshijian{
                    background:url("../../assets/dataview/gengxinshijian_2.png");
                  }
                  &.shujvliang{
                    background:url("../../assets/dataview/shujvliang_2.png");
                  }
                  &.fangwenliang{
                    background:url("../../assets/dataview/fangwenliang_2.png");
                  }
                  &.pingfen{
                    background:url("../../assets/dataview/pingfen_2.png");
                  }
                }
                .text{
                  color:#4199e5;
                }
              }
              &.active{
                .icon{
                  &.gengxinshijian{
                    background:url("../../assets/dataview/gengxinshijian_2.png");
                  }
                  &.shujvliang{
                    background:url("../../assets/dataview/shujvliang_2.png");
                  }
                  &.fangwenliang{
                    background:url("../../assets/dataview/fangwenliang_2.png");
                  }
                  &.pingfen{
                    background:url("../../assets/dataview/pingfen_2.png");
                  }
                }
                .text{
                  color:#4199e5;
                }
              }
            }
          }
          .form{
            margin-top:5px;
            .form-item-sz{
              margin-bottom:10px;
            }
            .tag-container{
              .tag{
                cursor:pointer;
                white-space: nowrap;
                float:left;
                line-height:1.1;
                margin-top:5px;
                margin-right:5px;
                padding:4px;
                border-radius:2px;
                &.active{
                  background:#4199e5;
                  color:#fff;
                }
              }
            }

          }
        }
      }
      .right{
        background:#fff;
        .searchResultNumber{
          color:#4199e5;
          font-weight:bold;
        }
      }
    }
  }

</style>
