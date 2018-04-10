<template>
  <Input v-model="value" :placeholder="placeholder" style="width: 140px" @on-blur="changeInput" ></Input>
</template>

<script>
    export default {
      name: "inputarea",
      data(){
        return{
          value:''
        }
      },
      props:{
        placeholder:{
          type:String,
          default:"请输入"
        }
      },
      methods:{
        changeInput:function () {
          if(this.value == ""){
            this.$emit("onClear","");
          }else{
            this.$emit("onOk",this.value);
          }
        }
      }
    }
</script>

<style scoped>

</style>
