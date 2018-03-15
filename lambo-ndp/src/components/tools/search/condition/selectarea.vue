<template>
  <Select v-model="model1" style="width:200px" @on-change="changeVal">
    <Option v-for="item in options" :value="item.key" :key="item.key">{{ item.value }}</Option>
  </Select>
</template>

<script>
    import util from '@/libs/util';
    export default {
      name: "select",
      data(){
        return{
          model1:'',
          options:[]
        }
      },
      props:{
        dataUrl:String,
        dataOption:Array
      },
      methods:{
        initData:function(){
          if(this.dataOption){
            this.options = this.dataOption;
          }else if(this.dataUrl){
            var self = this;
            util.ajax.get(self.dataUrl).then(function (resp) {
              self.options = resp.data;
            });
          }
          this.options.unshift({
            key:'',
            value:'请选择'
          })
        },
        changeVal:function (val) {
          if(val == ""){
            this.$emit("onClear","");
          }else{
            this.$emit("onOk",val);
          }
        }
      },
      watch:{
        dataUrl:function () {
          this.initData();
        },
        dataOption:function () {
          this.initData();
        }
      },
      created(){
        this.initData();
      }
    }
</script>

<style scoped>

</style>
