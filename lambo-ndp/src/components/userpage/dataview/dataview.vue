<template>
  <div class="page">
    <Layout>
      <Sider hide-trigger width="300" :style="{background: '#fff'}">
        <Card :bordered="false" :dis-hover="true">
          <p slot="title">23个数据目录</p>
          <Form label-position="right" :label-width="60">
            <FormItem label="排序方式">
              <Select value="1">
                <Option value="1">更新时间</Option>
                <Option>数据量</Option>
                <Option>访问量</Option>
                <Option>评分</Option>
              </Select>
            </FormItem>
          </Form>
        </Card>
        <Card :bordered="false" :dis-hover="true">
          <p slot="title">筛选</p>

          <Form label-position="right" :label-width="60">
            <FormItem label="关键字">
              <Input placeholder="">
                <Button slot="append" icon="ios-search"></Button>
              </Input>
            </FormItem>
            <FormItem label="数据分类">
              <Select value="1">
                <Option value="1">品牌</Option>
                <Option>客户</Option>
                <Option>工业</Option>
                <Option>消费者</Option>
                <Option>...</Option>
              </Select>
            </FormItem>
            <FormItem label="时间粒度">
              <Select value="1">
                <Option value="1">全部</Option>
                <Option>季度</Option>
                <Option>月</Option>
                <Option>日</Option>
                <Option>年</Option>
              </Select>
            </FormItem>
            <FormItem label="组织粒度">
              <Select value="1">
                <Option value="1">全部</Option>
                <Option>全国</Option>
                <Option>省</Option>
                <Option>市</Option>
                <Option>区县</Option>
              </Select>
            </FormItem>
          </Form>
        </Card>
      </Sider>
      <Content>
        <div class="content-container" style="margin-top:-10px">
          <Card>
            <Row>
              <Col :lg="1" :md="2" :sm="3" :xs="4" >
                <Tag :checked="false"><h3>标签</h3></Tag>
              </Col>
              <Col :lg="1" :md="2" :sm="3" :xs="4">
                <Tag checkable  color="blue">不限</Tag>
              </Col>
              <Col :lg="22" :md="20" :sm="18" :xs="16">
                <Tag checkable color="blue" :checked="false">销量</Tag>
                <Tag checkable color="blue" :checked="false">销额</Tag>
                <Tag checkable color="blue" :checked="false">同比</Tag>
                <Tag checkable color="blue" :checked="false">全国</Tag>
                <Tag checkable color="blue" :checked="false">环比</Tag>
                <Tag checkable color="blue" :checked="false">非烟</Tag>
                <Tag checkable color="blue" :checked="false">工业</Tag>
                <Tag checkable color="blue" :checked="false">品牌</Tag>
                <Tag checkable color="blue" :checked="false">商品</Tag>
                <Tag checkable color="blue" :checked="false">零售户</Tag>
                <Tag checkable color="blue" :checked="false">消费者</Tag>
                <Tag checkable color="blue" :checked="false">终端</Tag>
                <Tag checkable color="blue" :checked="false">市场</Tag>
                <Tag checkable color="blue" :checked="false">结算</Tag>
                <Tag checkable color="blue" :checked="false">库存</Tag>
                <Tag checkable color="blue" :checked="false">货源</Tag>
                <Tag checkable color="blue" :checked="false">年累</Tag>
                <Tag checkable color="blue" :checked="false">价格</Tag>
                <Tag checkable color="blue" :checked="false">订货方式</Tag>
              </Col>
            </Row>
            <Row>
              <Col :lg="1" :md="2" :sm="3" :xs="4" >
                <Tag :checked="false"><h3>评分</h3></Tag>
              </Col>
              <Col :lg="1" :md="2" :sm="3" :xs="4">
                <Tag checkable  color="blue">不限</Tag>
              </Col>
              <Col :lg="22" :md="20" :sm="18" :xs="16">
                <Tag checkable color="blue" :checked="false">一星</Tag>
                <Tag checkable color="blue" :checked="false">二星</Tag>
                <Tag checkable color="blue" :checked="false">三星</Tag>
                <Tag checkable color="blue" :checked="false">四星</Tag>
                <Tag checkable color="blue" :checked="false">五星</Tag>
              </Col>
            </Row>
          </Card>
          <Row style="margin-top:10px;">
            <Col span="12">
              <div class="view-box">
                <Card>
                  <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    全国品牌布局情况
                  </p>
                  <a href="#" slot="extra" @click.prevent="goDataDetail">
                    <Icon type="android-arrow-forward"></Icon>
                    查看数据
                  </a>
                  <div class="tags">
                    <Tag type="border">销量</Tag>
                    <Tag type="border">销额</Tag>
                    <Tag type="border">同比</Tag>
                    <Tag type="border">销量环比</Tag>
                    <Tag type="border">销额环比</Tag>
                    <Tag type="border">销量同比</Tag>
                    <Tag type="border">销额同比</Tag>
                    <Tag type="border">存销比</Tag>
                  </div>
                  <div class="infos">
                    <div class="item">
                      <div class="left">所属分类：</div>
                      <div class="right">品牌</div>
                    </div>
                    <div class="item">
                      <div class="left">时间粒度：</div>
                      <div class="right">年</div>
                    </div>
                    <div class="item">
                      <div class="left">组织粒度：</div>
                      <div class="right">市</div>
                    </div>
                    <div class="item">
                      <div class="left">发布时间：</div>
                      <div class="right">2018年3月29日</div>
                    </div>
                    <div class="item">
                      <div class="left">评分：</div>
                      <div class="right">
                        <Rate :value="3" :disabled="true" class="rate"></Rate>
                      </div>
                    </div>
                    <div class="item">
                      <div class="left">访问量：</div>
                      <div class="right">3652次</div>
                    </div>
                    <div class="item">
                      <div class="left">描述：</div>
                      <div class="right ovfTwo">
                        本数据涵盖了全行业所有品牌的市场布局情况，数据来源为行业卷烟营销系统，有部分没有上线卷烟营销系统的地区，采用的是手工上报形式.
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
            <Col span="12">
            <div class="view-box">
              <Card>
                <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                  品牌销售月度情况
                </p>
                <a href="#" slot="extra" @click.prevent="goDataDetail">
                  <Icon type="android-radio-button-on"></Icon>
                  查看数据
                </a>
                <div class="tags">
                  <Tag type="border">销量</Tag>
                  <Tag type="border">销额</Tag>
                  <Tag type="border">同比</Tag>
                  <Tag type="border">销量环比</Tag>
                  <Tag type="border">销额环比</Tag>
                  <Tag type="border">销量同比</Tag>
                  <Tag type="border">销额同比</Tag>
                  <Tag type="border">存销比</Tag>
                </div>
                <div class="infos">
                  <div class="item">
                    <div class="left">所属分类：</div>
                    <div class="right">品牌</div>
                  </div>
                  <div class="item">
                    <div class="left">时间粒度：</div>
                    <div class="right">年</div>
                  </div>
                  <div class="item">
                    <div class="left">组织粒度：</div>
                    <div class="right">市</div>
                  </div>
                  <div class="item">
                    <div class="left">发布时间：</div>
                    <div class="right">2018年3月29日</div>
                  </div>
                  <div class="item">
                    <div class="left">评分：</div>
                    <div class="right">
                      <Rate :value="5" :disabled="true" class="rate"></Rate>
                    </div>
                  </div>
                  <div class="item">
                    <div class="left">访问量：</div>
                    <div class="right">8966次</div>
                  </div>
                  <div class="item">
                    <div class="left">描述：</div>
                    <div class="right ovfTwo">
                      本数据涵盖了全行业品牌销售情况，数据来源为行业卷烟营销系统，有部分没有上线卷烟营销系统的地区，采用的是手工上报形式.
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            </Col>
          </Row>
          <Row style="margin-top:10px;">
            <Col span="12">
            <div class="view-box">
              <Card>
                <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                  品牌年度上柜率情况
                </p>
                <a href="#" slot="extra" @click.prevent="goDataDetail">
                  <Icon type="android-arrow-forward"></Icon>
                  查看数据
                </a>
                <div class="tags">
                  <Tag type="border">销量</Tag>
                  <Tag type="border">销额</Tag>
                  <Tag type="border">同比</Tag>
                  <Tag type="border">销量环比</Tag>
                  <Tag type="border">销额环比</Tag>
                  <Tag type="border">销量同比</Tag>
                  <Tag type="border">销额同比</Tag>
                  <Tag type="border">存销比</Tag>
                </div>
                <div class="infos">
                  <div class="item">
                    <div class="left">所属分类：</div>
                    <div class="right">品牌</div>
                  </div>
                  <div class="item">
                    <div class="left">时间粒度：</div>
                    <div class="right">年</div>
                  </div>
                  <div class="item">
                    <div class="left">组织粒度：</div>
                    <div class="right">市</div>
                  </div>
                  <div class="item">
                    <div class="left">发布时间：</div>
                    <div class="right">2018年3月29日</div>
                  </div>
                  <div class="item">
                    <div class="left">评分：</div>
                    <div class="right">
                      <Rate :value="4" :disabled="true" class="rate"></Rate>
                    </div>
                  </div>
                  <div class="item">
                    <div class="left">访问量：</div>
                    <div class="right">24163次</div>
                  </div>
                  <div class="item">
                    <div class="left">描述：</div>
                    <div class="right ovfTwo">
                      本数据涵盖了全行业品牌年度上柜率情况，数据来源为行业卷烟营销系统，有部分没有上线卷烟营销系统的地区，采用的是手工上报形式.
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            </Col>
            <Col span="12">
            <div class="view-box">
              <Card>
                <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                  各品牌引入退出情况
                </p>
                <a href="#" slot="extra" @click.prevent="goDataDetail">
                  <Icon type="android-arrow-forward"></Icon>
                  查看数据
                </a>
                <div class="tags">
                  <Tag type="border">销量</Tag>
                  <Tag type="border">销额</Tag>
                  <Tag type="border">同比</Tag>
                  <Tag type="border">销量环比</Tag>
                  <Tag type="border">销额环比</Tag>
                  <Tag type="border">销量同比</Tag>
                  <Tag type="border">销额同比</Tag>
                  <Tag type="border">存销比</Tag>
                </div>
                <div class="infos">
                  <div class="item">
                    <div class="left">所属分类：</div>
                    <div class="right">品牌</div>
                  </div>
                  <div class="item">
                    <div class="left">时间粒度：</div>
                    <div class="right">年</div>
                  </div>
                  <div class="item">
                    <div class="left">组织粒度：</div>
                    <div class="right">市</div>
                  </div>
                  <div class="item">
                    <div class="left">发布时间：</div>
                    <div class="right">2018年3月29日</div>
                  </div>
                  <div class="item">
                    <div class="left">评分：</div>
                    <div class="right">
                      <Rate :value="4" :disabled="true" class="rate"></Rate>
                    </div>
                  </div>
                  <div class="item">
                    <div class="left">访问量：</div>
                    <div class="right">12558次</div>
                  </div>
                  <div class="item">
                    <div class="left">描述：</div>
                    <div class="right ovfTwo">
                      本数据涵盖了全行业各品牌引入退出情况，数据来源为行业卷烟营销系统，有部分没有上线卷烟营销系统的地区，采用的是手工上报形式.
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            </Col>
          </Row>
          <Row style="margin-top:10px;">
            <Col span="12">
            <div class="view-box">
              <Card>
                <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                  全国品牌布局情况
                </p>
                <a href="#" slot="extra" @click.prevent="goDataDetail">
                  <Icon type="android-arrow-forward"></Icon>
                  查看数据
                </a>
                <div class="tags">
                  <Tag type="border">销量</Tag>
                  <Tag type="border">销额</Tag>
                  <Tag type="border">同比</Tag>
                  <Tag type="border">销量环比</Tag>
                  <Tag type="border">销额环比</Tag>
                  <Tag type="border">销量同比</Tag>
                  <Tag type="border">销额同比</Tag>
                  <Tag type="border">存销比</Tag>
                </div>
                <div class="infos">
                  <div class="item">
                    <div class="left">所属分类：</div>
                    <div class="right">品牌</div>
                  </div>
                  <div class="item">
                    <div class="left">时间粒度：</div>
                    <div class="right">年</div>
                  </div>
                  <div class="item">
                    <div class="left">组织粒度：</div>
                    <div class="right">市</div>
                  </div>
                  <div class="item">
                    <div class="left">发布时间：</div>
                    <div class="right">2018年3月29日</div>
                  </div>
                  <div class="item">
                    <div class="left">评分：</div>
                    <div class="right">
                      <Rate :value="4" :disabled="true" class="rate"></Rate>
                    </div>
                  </div>
                  <div class="item">
                    <div class="left">访问量：</div>
                    <div class="right">12558次</div>
                  </div>
                  <div class="item">
                    <div class="left">描述：</div>
                    <div class="right ovfTwo">
                      本数据涵盖了全行业所有品牌的市场布局情况，数据来源为行业卷烟营销系统，有部分没有上线汗液卷烟营销系统的地区，采用的是手工上报形式.
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            </Col>
            <Col span="12">
            <div class="view-box">
              <Card>
                <p slot="title">
                  <Icon type="ios-film-outline"></Icon>
                  全国品牌布局情况
                </p>
                <a href="#" slot="extra" @click.prevent="goDataDetail">
                  <Icon type="android-arrow-forward"></Icon>
                  查看数据
                </a>
                <div class="tags">
                  <Tag type="border">销量</Tag>
                  <Tag type="border">销额</Tag>
                  <Tag type="border">同比</Tag>
                  <Tag type="border">销量环比</Tag>
                  <Tag type="border">销额环比</Tag>
                  <Tag type="border">销量同比</Tag>
                  <Tag type="border">销额同比</Tag>
                  <Tag type="border">存销比</Tag>
                </div>
                <div class="infos">
                  <div class="item">
                    <div class="left">所属分类：</div>
                    <div class="right">品牌</div>
                  </div>
                  <div class="item">
                    <div class="left">时间粒度：</div>
                    <div class="right">年</div>
                  </div>
                  <div class="item">
                    <div class="left">组织粒度：</div>
                    <div class="right">市</div>
                  </div>
                  <div class="item">
                    <div class="left">发布时间：</div>
                    <div class="right">2018年3月29日</div>
                  </div>
                  <div class="item">
                    <div class="left">评分：</div>
                    <div class="right">
                      <Rate :value="4" :disabled="true" class="rate"></Rate>
                    </div>
                  </div>
                  <div class="item">
                    <div class="left">访问量：</div>
                    <div class="right">12558次</div>
                  </div>
                  <div class="item">
                    <div class="left">描述：</div>
                    <div class="right ovfTwo">
                      本数据涵盖了全行业所有品牌的市场布局情况，数据来源为行业卷烟营销系统，有部分没有上线汗液卷烟营销系统的地区，采用的是手工上报形式.
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  </div>
</template>
<script>
  export default {
    name: "dataview",
    data() {
      return {
        testData:{},
      }
    },
    methods:{
      goDataDetail:function(){
        this.$router.push({name: "数据明细"});
      }
    },
    mounted(){
    }
  }
</script>
<style lang="less" scoped>
  .page{

  }
  .content-container{
    padding:10px;
  }

  .infos{
    margin-top:10px;
    .item{
      overflow: hidden;
      display:flex;
      .left{
        float:left;
        height:40px;
        line-height:40px;
        width:80px;
        text-align:right;
      }
      .right{
        float:left;
        line-height:40px;
        flex:1;
      }
      .ivu-rate{
        font-size:16px;
      }
    }
  }
  .view-box{
    margin-right:10px;
  }

  .ovfTwo{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}

</style>
