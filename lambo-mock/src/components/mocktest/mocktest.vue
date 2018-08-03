<template>
  <div class="page">
    <Row>
      <Col span="12">
      <Card :bordered="false" dis-hover>
        <p slot="title">基本信息</p>
        <Form :label-width="100">
          <FormItem label="MOCK ID：">
            <Input v-model="mockId" placeholder="MOCK内码" >
            <Button slot="append" icon="ios-search" @click="searchMockId"></Button>
            </Input>
          </FormItem>
          <FormItem label="服务URL：">
            <Input v-model="mockUrl" placeholder="服务URL" >
            <span slot="prepend">/mock/service</span>
            <Button slot="append" icon="ios-search" @click="searchMockUrl"></Button>
            </Input>
          </FormItem>
          <FormItem label="服务类型：">
            <span>{{mockSetting.mockType}}</span>
          </FormItem>
          <FormItem label="服务描述：">
            <span>{{mockSetting.note}}</span>
          </FormItem>
          <FormItem label="mock数据：">
            <span>{{mockSetting.mockData}}</span>
          </FormItem>
          <FormItem label="输出参数说明：">
            <span>{{mockSetting.paramsDes}}</span>
          </FormItem>
        </Form>
      </Card>

      <Card v-if="mockSetting.mockId != null" :bordered="false" dis-hover >
        <p slot="title">服务测试</p>
        <Form :label-width="100">
          <FormItem label="结果类型：">
            <RadioGroup v-model="resultType">
              <Radio label="real" disabled >真实数据</Radio>
              <Radio label="mock">MOCK数据</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem>
            {{params}}
          </FormItem>
          <FormItem :label="param.paramKey" v-for="param in params" :key="param.paramKey" :required="param.necessary==='1'">
            <Input v-model="param.value" :placeholder="'类型：'+param.paramType+'，说明：'+param.note" ></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="doTest">测试</Button>
          </FormItem>
        </Form>
      </Card>

      <Card v-if="result !== ''" :bordered="false" dis-hover >
        <p slot="title">测试结果</p>
        <Input v-model="result" type="textarea" :autosize="{minRows: 5,maxRows: 15}"></Input>
      </Card>
      </Col>
    </Row>

  </div>
</template>

<script>
  import util from '@/libs/util';
  export default {
    name: "mocktest",
    data:function(){
      return {
        mockId:"",
        mockUrl:"",
        mockSetting:{},
        params:[],
        resultType:"mock",
        result:""
      }
    },
    created:function(){
      this.mockId = this.$route.query.mockId;
      this.getMockSetting();
    },
    watch:{
      $route: function(to,from){
        this.mockId = to.query.mockId;
        this.getMockSetting();
      }
    },
    methods:{
      getMockSetting:function(){
        let self = this;
        if(self.mockId){
          util.ajax.get("/client/mock/queryById?mockId="+self.mockId).then(function(resp){
            let result = resp.data;
            if(result.code == 1){

              self.mockSetting = result.data.mockSetting;
              self.mockId = self.mockSetting.mockId;
              self.mockUrl = self.mockSetting.mockUrl;

              self.params.splice(0,self.params.length);
              let paramsList = result.data.mockSettingParamsList;
              if(paramsList && paramsList.length>0){
                paramsList.forEach(params => {
                  let row = {
                    paramKey: params.paramKey,
                    paramType: params.paramType,
                    necessary: params.necessary,
                    note:params.note,
                    value:""
                  };

                  self.params.push(row);

                });
              }

            }else{
              self.$Message.error("查询不到此服务");
            }
          });
        }else{
          self.$Message.info("请输入服务ID或服务URL");
        }
      },
      searchMockId:function(){
        this.getMockSetting();
      },
      searchMockUrl:function(){
        let self = this;
        if(self.mockUrl){
          util.ajax.get("/client/mock/queryByUrl?mockUrl="+self.mockUrl).then(function(resp){
            let result = resp.data;
            if(result.code == 1){

              self.mockSetting = result.data.mockSetting;
              self.mockId = self.mockSetting.mockId;
              self.mockUrl = self.mockSetting.mockUrl;

              self.params.splice(0,self.params.length);
              let paramsList = result.data.mockSettingParamsList;
              if(paramsList && paramsList.length>0){
                paramsList.forEach(params => {
                  let row = {
                    paramKey: params.paramKey,
                    paramType: params.paramType,
                    necessary: params.necessary,
                    note:params.note,
                    value:""
                  };

                  self.params.push(row);

                });
              }

            }else{
              self.$Message.error("查询不到此服务");
            }
          });
        }else{
          self.$Message.info("请输入服务ID或服务URL");
        }
      },
      doTest:function(){
        let self = this;
        let mockUrl = "/mock/service/"+self.mockUrl;
        let paramObj = {
          mock:self.resultType === "mock"
        };
        for(var param of self.params){
          if(param.necessary === "1" && !param.value){
            self.$Message.error(param.paramKey+"为必填参数");
            return ;
          }
          paramObj[param.paramKey] = param.value;
        }
        util.ajax.post(mockUrl,paramObj).then(function(resp){
          self.result = JSON.stringify(resp.data);
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .page{
    margin-left:20px;
    padding-top:10px;
  }
</style>
