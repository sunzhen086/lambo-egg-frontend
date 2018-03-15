<template>
  <span>
    <Input v-model="value" placeholder="点击选择" icon="ios-search" style="width: 200px" readonly @on-focus="showHelpBox"></Input>
    <lambo-help-box v-model="helpBoxShow" :url="helpBoxUrl" :columns="helpBoxColumns" :title="helpBoxTitle"
                    :muliSelect="muliSelect" @onOk="onOk" @onClear="onClear">
    </lambo-help-box>
  </span>
</template>

<script>
  export default {
    name: "help-box",
    data(){
      return{
        value:'',
        helpBoxShow:false
      }
    },
    props:{
      helpBoxUrl:String,
      helpBoxColumns:Array,
      helpBoxTitle:String,
      muliSelect:Boolean,
    },
    methods:{
      showHelpBox:function(){
        this.helpBoxShow = true;
      },
      onOk:function (result) {
        this.value = result.name_field;
        this.$emit("onOk",result);
      },
      onClear:function () {
        this.value = "";
        this.$emit("onClear",{});
      }
    }
  }
</script>

<style scoped>

</style>
