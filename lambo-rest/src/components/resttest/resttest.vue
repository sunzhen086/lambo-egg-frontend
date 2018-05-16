<template>
  <div class="page">
    <Row>
      <Col span="12">
        <Card :bordered="false" dis-hover>
          <p slot="title">基本信息</p>
          <Form :label-width="100">
            <FormItem label="服务ID">
              <Input v-model="restId" placeholder="服务内码" >
              <Button slot="append" icon="ios-search" @click="searchRestId"></Button>
              </Input>
            </FormItem>
            <FormItem label="服务URL">
              <Input v-model="url" placeholder="服务url" >
              <span slot="prepend">/rest/service</span>
              <Button slot="append" icon="ios-search" @click="searchRestUrl"></Button>
              </Input>
            </FormItem>
            <FormItem label="操作类型">
              <span>{{restSetting.operationType}}</span>
            </FormItem>
            <FormItem label="数据源">
              <span>{{restSetting.datasource}}</span>
            </FormItem>
            <FormItem label="服务sql">
              <span>{{restSetting.restSql}}</span>
            </FormItem>
            <FormItem label="mock数据">
              <span>{{restSetting.mockData}}</span>
            </FormItem>
            <FormItem label="备注">
              <span>{{restSetting.note}}</span>
            </FormItem>
          </Form>
        </Card>

        <Card v-if="restSetting.restId != null" :bordered="false" dis-hover >
          <p slot="title">服务测试</p>
          <Form :label-width="100">
            <FormItem label="结果类型">
              <RadioGroup v-model="resultType">
                <Radio label="real">真实数据</Radio>
                <Radio label="mock">MOCK数据</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem :label="param.paramName" v-for="param in params" :key="param.paramKey" :required="param.necessary==='1'">
              <Input v-model="param.value" :placeholder="'请输入'+param.paramName+'参数'" ></Input>
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
      name: "resttest",
      data:function(){
        return {
          restId:"",
          url:"",
          restSetting:{},
          params:[],
          resultType:"real",
          result:""
        }
      },
      created:function(){
        this.restId = this.$route.query.restId;
        this.getRestSetting();
      },
      watch:{
        $route: function(to,from){
          this.restId = to.query.restId;
          this.getRestSetting();
        }
      },
      methods:{
        getRestSetting:function(){
          let self = this;
          if(self.restId){
            util.ajax.get("/client/rest/queryById?restId="+self.restId).then(function(resp){
              let result = resp.data;
              if(result.code == 1){
                self.restSetting = result.data.restSetting;
                self.params = self.setDefaultValue(result.data.paramList);
                self.url = self.restSetting.url;
              }else{
                self.$Message.error("查询不到此服务");
              }
            });
          }else{
            self.$Message.info("请输入服务ID或服务URL");
          }
        },
        searchRestId:function(){
          this.getRestSetting();
        },
        searchRestUrl:function(){
          let self = this;
          if(self.url){
            util.ajax.get("/client/rest/queryByUrl?url="+self.url).then(function(resp){
              let result = resp.data;
              if(result.code == 1){
                self.restSetting = result.data.restSetting;
                self.restId = self.restSetting.restId;
                self.url = self.restSetting.url;
                self.params = self.setDefaultValue(result.data.paramList);
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
          let restUrl = "/rest/service"+self.url;
          let paramObj = {
            mock:self.resultType === "mock"
          };
          for(var param of self.params){
            if(param.necessary === "1" && !param.value){
              self.$Message.error(param.paramName+"为必填参数");
              return ;
            }
            paramObj[param.paramKey] = param.value;
          }
          util.ajax.post(restUrl,paramObj).then(function(resp){
            self.result = JSON.stringify(resp.data);
          })
        },
        setDefaultValue(params){
          for(var param of params){
            param.value = param.defaultValue;
          }
          return params;
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
