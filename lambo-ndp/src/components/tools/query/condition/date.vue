<template>
  <span>
    {{searchName}}：
    <search :searchType="searchType" :dateType="searchCondition" @onOk="setParam" @onClear="clearParam"></search>
  </span>
</template>

<script>
  import search from "../../search/search";
  export default {
    name: "search-date-picket",
    data(){
      return{
        searchName:"日期",
        searchType:"date"
      }
    },
    props:{
      item:Object
    },
    computed: {
      cellCode:function () {
        return this.item.cell_code;
      },
      searchCondition:function () {
        return this.item.search_condition;
      }
    },
    components:{
      search
    },
    methods:{
      setParam:function (date) {
        var self = this;
        if(date && date != ''){
          var data = {
            operType:"add",
            searchType:'>',
            value:date,
            cellCode:self.cellCode,
            searchCondition:self.searchCondition
          }
          this.$emit("changeParams",data);
        }
      },
      clearParam:function () {
        var self = this;
        var data = {
          operType:"del",
          cellCode:self.cellCode
        }
        this.$emit("changeParams",data);
      }
    }
  }
</script>

<style scoped>

</style>
