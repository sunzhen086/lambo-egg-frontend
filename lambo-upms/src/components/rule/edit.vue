
<template>
  <div>
    <Card>
      <p slot="title">
        {{title}}
      </p>
      <div slot="extra">
        <Button v-if="!created" type="primary" @click="formSubmit">保存</Button>
        <a href="#" @click="pageGoBack">
          <Icon type="android-arrow-back"></Icon> 返回</a>

      </div>
      <Row>
        <Col span="12" offset="6">
        <Form ref="form" :model="form" :label-width="80" >
        </Form>
        <Form ref="form" :model="form" :label-width="80" :rules="ruleValidate">
          <FormItem v-if="ruleId"label="规则标识" prop="ruleId">
            <Input  v-model="form.ruleId" readonly placeholder="请输入标识id"></Input>
          </FormItem>
          <FormItem v-else label="规则标识" prop="ruleId">
            <Input  v-model="form.ruleId"  placeholder="请输入标识id"></Input>
          </FormItem>
          <FormItem label="规则描述" prop="ruleDesc">
            <Input  v-model="form.ruleDesc" placeholder="请输入描述"></Input>
          </FormItem>

        </Form>
        </Col>
      </Row>

    <Row >
      <Col span="24">
        <Card :bordered="false" :dis-hover="true">
          <p slot="title">
            <Icon type="help-buoy"></Icon> 规则项信息
          </p>
          <div slot="extra">
            <i-button type="default" style="margin-top: -5px;" @click="newTableData">新增规则项</i-button>
            <i-button type="default" style="margin-top: -5px;" @click="getTableData">获取数据</i-button>
          </div>
          <lambo-edit-table ref="table1"  v-model="datas" :columns="columns" ></lambo-edit-table>
        </Card>
      </Col>
    </Row>
    </Row>
    </Card>
  </div>
</template>
<script>

  import util from '@/libs/util.js';

  //删除按钮
  const deleteButton = (vm, h, currentRow, index) => {
    return h('Button', {
      props: {
        type: "error",
        size: "small"
      },
      style: {
        margin: '0 5px'
      },
      on: {
        'click': () => {
          vm.doDelete(currentRow.ruleId,index);
        }
      }
    }, '删除');
  };
  export default {
    name: 'edittable-dict',
    // components: {
    //   canEditTable
    // },
    data () {
      return {
        created:false,
        datas: [],
        form: {
          ruleId:"",
          ruleDesc:""
        },
        ruleValidate: {

        }
      };
    },
    computed: {
      ruleId: function() {
        return this.$route.query.ruleId;
      },
      title: function() {
        return this.$route.meta.title;
      },
      columns() {
        let columns = [];
        let self = this;

        columns.push(   {
          title: '公司号',
          align: 'center',
          key: 'comId',
          editor:{
            type:"text",
            //校验函数,参数分别为：新值、旧值、行数据、行号
            validate:function(newVal,oldVal,row,index){
              if(newVal.trim() == ""){
                return{
                  valid:false,
                  msg:"输入不能为空！"
                }
              }
              return{valid:true}
            }
          }
        });
        columns.push(   {
          title: '规则值',
          align: 'center',
          key: 'ruleValue',
          editor: {
            type: "text",
          }
         });
        columns.push({
          title: '操作',
          align: "center",
          render: function(h, param) {
            return h('div', [
              deleteButton(self, h, param.row, param.index)
            ]);
          }
        });
        return columns;
      }
    },
    methods: {
      pageGoBack(){
        this.$router.go(-1);
      },
      formSubmit(){

        var self = this;

              var params = {
                ruleId: self.form.ruleId,
                ruleDesc: self.form.ruleDesc,
                ruleKeyList:JSON.stringify(this.$refs.table1.getTableData())

              }

            if(self.ruleId) {  //修改
              util.ajax.post("/manage/lamboRule/update" , params).then(function(resp) {
                if(resp.data && resp.data.code === 1){
                  self.$Message.success('保存成功');
                }else{
                  self.$Message.error("保存失败,请稍后再试");
                }
              })
            } else { //新增
              util.ajax.post("/manage/lamboRule/create", params).then(function(resp) {
                self.$Message.success('新增成功');
                self.created = true;
              })
            }
      },
      getTableData:function(){
        alert(JSON.stringify(this.$refs.table1.getTableData()));
      },
      newTableData:function(){
        let row = {
          comId: '',
          ruleValue:''
        }
        this.datas.push(row);
      },
      initData:function(){
        var self = this;
        if(self.ruleId) {
           util.ajax.get("/manage/lamboRule/getRule/" + self.ruleId).then(function(resp) {
             var data = resp.data;
             for(var i=0;i<data.length;i++){

               self.datas.push(data[i]);
             }
             self.form.ruleId =  data[0].ruleId;
             self.form.ruleName =data[0].ruleName;
             self.form.ruleDesc = data[0].ruleDesc;
          })
        }
      },
      doDelete: function(cellId,index) {
        var self = this;
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要删除吗?</p>',
          onOk: () => {
            self.datas.splice(index,1);
          }
        });
      }
    },
    mounted(){
      this.initData();
    }

  };
</script>
