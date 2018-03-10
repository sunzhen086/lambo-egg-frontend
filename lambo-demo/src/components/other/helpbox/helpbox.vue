<template>
  <div>
    <Card style="width:750px">
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        帮助框示例
      </p>
      <Form :label-width="100">
        <FormItem label="帮助框url">
          <Input v-model="helpBoxUrl" placeholder="帮助框的rest服务" />
        </FormItem>
        <FormItem label="帮助框列描述">
          <Input v-model="helpBoxColumnsStr" type="textarea" :rows="3" placeholder="Enter something..." />
        </FormItem>
        <FormItem label="多选">
          <i-switch v-model="muliSelect">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </FormItem>
        <FormItem label="帮助框标题">
          <Input v-model="helpBoxTitle" placeholder="帮助框标题" />
        </FormItem>
        <FormItem>
          <Button @click="showHelpBox">打开帮助框</Button>
        </FormItem>
      </Form>
      <br/>
      <div>
        {{result}}
      </div>



      <lambo-help-box v-model="helpBoxShow" :url="helpBoxUrl" :columns="helpBoxColumns" :title="helpBoxTitle" :muliSelect="muliSelect" @onOk="onOk" @onClear="onClear">
      </lambo-help-box>
    </Card>




  </div>
</template>

<script>
    let helpBoxColumns = [
      {
        title: '编号',
        key: 'organizationId',
        sortable: "custom"
      },
      {
        title: '组织名称',
        key: 'name'
      },
      {
        title: '组织描述',
        key: 'description'
      }
    ];

    export default {
        name: "helpbox-demo",
        data(){
          return {
            helpBoxShow:false,
            helpBoxUrl:"/helpbox/organ/list",
            helpBoxColumnsStr: JSON.stringify(helpBoxColumns),
            muliSelect:false,
            helpBoxTitle:"组织帮助框",
            result:""
          }
        },
        computed:{
          helpBoxColumns:function(){
            return JSON.parse(this.helpBoxColumnsStr);
          }
        },
        methods:{
          showHelpBox:function(){
            this.helpBoxShow = true;
          },
          onOk:function(result){
            this.result = JSON.stringify(result);
          },
          onClear:function(){
            this.result="";
          }
        }
    }
</script>

<style scoped>

</style>
