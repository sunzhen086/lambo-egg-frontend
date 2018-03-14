<template>
  <DatePicker :type="item.dimension_type" placeholder="点击选择" style="width: 200px" clearable @on-change="setParam" @on-clear="clearParam">
  </DatePicker>
</template>

<script>
    export default {
      name: "search-date-picket",
      data(){
        return{

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
