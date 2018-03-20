<template>
  <province v-if="dimensionType == 'province'" :item="item" @changeParams="changeParams"></province>
  <city v-else-if="dimensionType == 'city'" :item="item" @changeParams="changeParams"></city>
  <item v-else-if="dimensionType == 'item'" :item="item" @changeParams="changeParams"></item>
  <brand v-else-if="dimensionType == 'brand'" :item="item" @changeParams="changeParams"></brand>
  <date v-else-if="dimensionType == 'date' || dimensionType == 'month' || dimensionType == 'year'" :item="item" @changeParams="changeParams"></date>
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
        dimensionType:function () {
          return this.item.dimension_type;
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
