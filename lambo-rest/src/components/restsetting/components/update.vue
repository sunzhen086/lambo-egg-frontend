<template>
  <div class="update-box">
    <Form :label-width="100">
      <FormItem label="节点名称：">
        <Input v-model="stru.struName" type="text" required="true" style="width:200px"/>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="updateStru()">保存</Button>
       <!-- <Button type="ghost" @click="struReset()" style="margin-left: 8px">还原</Button> -->
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import util from '@/libs/util';
  export default {
    props: {
      struId: {
        type:String,
        default:''
      },
      struName: {
        type:String,
        default:''
      }
    },
    data(){
      return{
        stru:{
          struId:'',
          struName: '',
          isLeaf: '',
          parentId: '',
          restId:'',
          isUse: '',
        }
      }
    },
    methods:{
      getStru(){
        var self = this;
        util.ajax.get('/manage/rest/stru/queryStru?struId='+self.struId).then(function(resp){
          var result = resp.data;
          if(result.length == 0){
            self.stru.struName = self.struName;
          }else{
            self.stru.struId = result[0].struId;
            self.stru.struName = result[0].struName;
            self.stru.isLeaf = result[0].isLeaf;
            self.stru.parentId = result[0].parentId;
            self.stru.restId = result[0].restId;
            self.stru.isUse = result[0].isUse;
          }
        });
      },
      updateStru() {
        var self = this;
        util.ajax.post('/manage/rest/stru/update/'+self.stru.struId, {
          struName:self.stru.struName,
          isLeaf:self.stru.isLeaf,
          parentId:self.stru.parentId,
          restId:self.stru.restId,
          isUse:self.stru.isUse
        });
      }
    },
    watch: {
      struId(){
        this.getStru();
      }
    },
    mounted:function(){
      this.getStru();
    }
  }
</script>

<style lang="less" scoped>

</style>
