<template>
  <DatePicker :type="dateType" :placeholder="placeholder" style="width: 140px" clearable @on-change="setParam" @on-clear="clearParam">
  </DatePicker>
</template>

<script>
  export default {
    name: "datearea",
    data(){
      return{

      }
    },
    props:{
      dateType:{
        type:String,
        default:'date'
      },
      placeholder:String
    },
    methods:{
      setParam:function (date) {
        this.$emit("onOk",date);
      },
      clearParam:function () {
        this.$emit("onClear","");
      }
    }
  }
</script>

<style scoped>

</style>
