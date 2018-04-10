<template>
  <province v-if="searchCondition == 'province'" :item="item" @changeParams="changeParams"></province>
  <city v-else-if="searchCondition == 'city'" :item="item" @changeParams="changeParams"></city>
  <item v-else-if="searchCondition == 'item'" :item="item" @changeParams="changeParams"></item>
  <brand v-else-if="searchCondition == 'brand'" :item="item" @changeParams="changeParams"></brand>
  <date v-else-if="searchCondition == 'date' || searchCondition == 'month' || searchCondition == 'year'" :item="item" @changeParams="changeParams"></date>
</template>

<script>
    import province from "./condition/province";
    import city from "./condition/city";
    import item from "./condition/item";
    import brand from "./condition/brand";
    import date from "./condition/date";
    export default {
      name: "query",
      data(){
        return{

        }
      },
      props:{
        item:Object
      },
      computed: {
        searchCondition:function () {
          return this.item.search_condition;
        }
      },
      components:{
        province,
        city,
        item,
        brand,
        date
      },
      methods:{
        changeParams:function (data) {
          this.$emit("changeParams",data);
        }
      }
    }
</script>

<style scoped>

</style>
