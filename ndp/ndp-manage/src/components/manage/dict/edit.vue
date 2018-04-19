
<template>
  <div>
    <Card>
      <p slot="title">
        {{title}}
      </p>
      <div slot="extra">
        <Button type="primary" @click="formSubmit">保存</Button>
        <a href="#" @click="pageGoBack">
          <Icon type="android-arrow-back"></Icon> 返回</a>

      </div>
      <Row>
        <Col span="12" offset="6">
        <Form ref="form" :model="form" :label-width="80" :rules="ruleValidate">
          <FormItem label="名称" prop="dictName">
            <Input v-model="form.dictName" placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem label="标识" prop="dictId">
            <Input  v-model="form.dictId" placeholder="请输入中文名"></Input>
          </FormItem>
          <FormItem label="描述" prop="dictDesc">
            <Input  v-model="form.dictDesc" placeholder="请输入描述"></Input>
          </FormItem>

        </Form>
        </Col>
      </Row>



    <Row>
      <Col span="24">
        <Card :bordered="false" :dis-hover="true">
          <p slot="title">
            <Icon type="help-buoy"></Icon> 字典项信息
          </p>
          <div slot="extra">
            <i-button type="default" style="margin-top: -5px;" @click="newTableData">新增字典项</i-button>
            <!--i-button type="default" style="margin-top: -5px;" @click="getTableData">获取数据</i-button>-->
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
          vm.doDelete(currentRow.dictId,index);
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

        datas: [],
        form: {
          dictId:"",
          dictName:"",
          dictDesc:""
        },
        ruleValidate: {
          dictId: [
            {required: true,message: '标识不能为空',trigger: 'blur'},
            {type: 'string', max: 20, message: '名称不能超过20个字', trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      dictId: function() {
        return this.$route.query.dictId;
      },
      title: function() {
        return this.$route.meta.title;
      },
      columns() {
        let columns = [];
        let self = this;
        columns.push({
          title: '序号',
          type: 'index',
          align: 'center'
        },);
        columns.push(   {
          title: '编码',
          align: 'center',
          key: 'dictKey',
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
          title: '名称',
          align: 'center',
          key: 'dictValue',
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
        self.$refs.form.validate((valid) => {
          if(valid) {
            var params = {
              dictId: self.form.dictId,
              dictName: self.form.dictName,
              dictDesc: self.form.dictDesc,
              dictKeyList:JSON.stringify(this.$refs.table1.getTableData())
            }
            if(self.dictId) {  //修改
              util.ajax.post("/manage/dictData/update" , params).then(function(resp) {
                if(resp.data && resp.data.code === 1){
                  self.$Message.success('保存成功');
                }else{
                  self.$Message.error("保存失败,请稍后再试");
                }
              })
            } else { //新增
              util.ajax.post("/manage/dictData/create", params).then(function(resp) {
                self.$Message.success('新增成功');
                //self.created = true;
              })
            }

          }
        })
      },
      getTableData:function(){
        alert(JSON.stringify(this.$refs.table1.getTableData()));
      },
      newTableData:function(){
        let row = {
          dictKey: '',
          dictValue:''
        }
        this.datas.push(row);
      },
      initData:function(){
        var self = this;
        if(self.dictId) {
           util.ajax.get("/manage/dictData/get/" + self.dictId).then(function(resp) {
             var data = resp.data.data;
             for(var i=0;i<data.length;i++){

               self.datas.push(data[i]);
             }
             self.form.dictId =  data[0].dictId;
             self.form.dictName =data[0].dictName;
             self.form.dictDesc = data[0].dictDesc;
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
