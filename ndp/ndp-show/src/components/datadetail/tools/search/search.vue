<template>
  <datearea v-if="searchType == 'date' " :dateType="dateType" :placeholder="placeholder" @onOk="onOk" @onClear="onClear"></datearea>
  <helpbox v-else-if=" searchType == 'helpbox' " :helpBoxUrl="helpBoxUrl" :helpBoxColumns="helpBoxColumns" :helpBoxTitle="helpBoxTitle"
           :muliSelect="muliSelect" :inputKey="inputKey" @onOk="onOk" @onClear="onClear"></helpbox>
  <selectarea v-else-if=" searchType == 'select' " :dataUrl="dataUrl" :dataOption="dataOption" @onOk="onOk" @onClear="onClear"></selectarea>
  <inputarea v-else :placeholder="placeholder" @onOk="onOk" @onClear="onClear"></inputarea>
</template>

<script>
    import datearea from "./condition/datearea";
    import helpbox from "./condition/helpbox";
    import inputarea from "./condition/inputarea";
    import selectarea from "./condition/selectarea";
    export default {
      name: "search",
      data(){
        return{

        }
      },
      props:{
        searchType:{
          type:String,
          default:'input'
        },
        dateType:String,
        helpBoxUrl:String,
        helpBoxColumns:Array,
        helpBoxTitle:String,
        muliSelect:Boolean,
        inputKey:String,
        placeholder:String,
        dataUrl:String,
        dataOption:Array
      },
      components:{
        datearea,
        helpbox,
        inputarea,
        selectarea
      },
      methods:{
        onOk:function (data) {
          this.$emit("onOk",data);
        },
        onClear:function (data) {
          this.$emit("onClear",data);
        }
      }
    }
</script>

<style scoped>

</style>
