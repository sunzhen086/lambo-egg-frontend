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
              <Input v-model="queryText" icon="search" placeholder="请输入关键词" @on-blur="checkString" @on-click="search()" ></Input>
              <div class="sub-title">
                <div class="icon"></div>
                <div class="text">排序方式</div>
              </div>
              <div class="orders">
                <div class="order-item" :class="{ active: formItem.activeOrder ==1 }" @click="changeOrderItem(1)">
                  <div class="icon gengxinshijian"></div>
                  <div class="text">更新时间</div>
                </div>
                <div class="order-item" :class="{ active: formItem.activeOrder ==2 }" @click="changeOrderItem(2)">
                  <div class="icon shujvliang"></div>
                  <div class="text">数据量</div>
                </div>
                <div class="order-item" :class="{ active: formItem.activeOrder ==3 }" @click="changeOrderItem(3)">
                  <div class="icon fangwenliang"></div>
                  <div class="text">访问量</div>
                </div>
                <div class="order-item" :class="{ active: formItem.activeOrder ==4 }" @click="changeOrderItem(4)">
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
                  <Select v-model="formItem.catograyId" clearable>
                    <Option v-for="item in catograyList" :value="item.CATEGORY_ID" :key="item.CATEGORY_ID">{{ item.CATEGORY_NAME }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="时间：" class="form-item-sz">
                  <Select v-model="formItem.periodTypeId" clearable>
                    <Option v-for="item in periodTypeList" :value="item.DICT_KEY" :key="item.DICT_KEY">{{ item.DICT_VALUE }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="组织：" class="form-item-sz">
                  <Select v-model="formItem.organTypeId" clearable>
                    <Option v-for="item in organTypeList" :value="item.DICT_KEY" :key="item.DICT_KEY">{{ item.DICT_VALUE }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="指标：" class="form-item-sz">
                  <div class="tag-container">
                    <div class="tag" v-for="tag in tagList" :key="tag.DICT_KEY" :class="{active:formItem.activeTags.indexOf(tag.DICT_KEY) > -1}" @click="tagActiveChange(tag.DICT_KEY)">
                      {{tag.DICT_VALUE}}
                    </div>
                  </div>
                </FormItem>
                <FormItem label="评价：" class="form-item-sz">
                  <div class="tag-container">
                    <div class="tag"   :class="{active:formItem.activeStars == 1}" @click="starActiveChange(1)">
                      一星
                    </div>
                    <div class="tag"   :class="{active:formItem.activeStars == 2}" @click="starActiveChange(2)">
                      二星
                    </div>
                    <div class="tag"   :class="{active:formItem.activeStars == 3}" @click="starActiveChange(3)">
                      三星
                    </div>
                    <div class="tag"   :class="{active:formItem.activeStars == 4}" @click="starActiveChange(4)">
                      四星
                    </div>
                    <div class="tag"   :class="{active:formItem.activeStars == 5}" @click="starActiveChange(5)">
                      五星
                    </div>
                  </div>
                </FormItem>
              </Form>
            </div>
          </div>
        </Col>
        <Col span="17">
          <div class="right">
              <SearchResult :params="formItem"></SearchResult>
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
        formItem:{
          catograyId:"" ,
          periodTypeId:"",
          organTypeId:"",
          activeTags:[],
          activeStars:"",
          activeOrder:"1",
          searchText:"",
        },
        queryText:"",
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
      },
      tagActiveChange:function(tagId){
        let activeTags = this.formItem.activeTags;
        let index = activeTags.indexOf(tagId);
        if(index> -1){
          activeTags.splice(index,1);
        }else{
          activeTags.push(tagId);
        }
        this.formItem.activeTags = activeTags;
      },
      starActiveChange:function(starId){
        this.formItem.activeStars=starId;
      },
      search:function () {
        var self = this;
        this.formItem.searchText=this.queryText;
      },
      checkString:function () {
        //校验字符串长度

      },
      initPage:function () {
        var self = this;
        //获取
        util.ajax.post('/manage/dataView/getConditionMap',{}).then(function (resp) {
          self.catograyList=resp.data.data.categoryTypeList;
          self.formItem.catograyId=self.$route.params.categoryId;
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
