<template>
  <search :searchType="searchType" :dateType="dimensionType" @onOk="setParam" @onClear="clearParam"></search>
</template>

<script>
    import search from "../../tools/search/search";
    export default {
      name: "search-date-picket",
      data(){
        return{
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
        dimensionType:function () {
          return this.item.dimension_type;
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
              dimensionType:self.dimensionType
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
