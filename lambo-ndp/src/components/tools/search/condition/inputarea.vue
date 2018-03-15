<template>
  <input v-model="value" :placeholder="placeholder" style="width: 300px" on-blur="changeInput"/>
</template>

<script>
    export default {
      name: "input",
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
