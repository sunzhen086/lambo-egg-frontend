<template>
  <div class="left-category">
    <div class="one-line" v-for="(item,index) in categoryList" v-bind:class="{ first: index==0,select:index == selectIndex }"
         @click="selectOper(item.category_id,index)">
      {{item.category_name}}
      <Icon type="chevron-right" class="fr" size="16"></Icon>
    </div>
  </div>
</template>

<script>
    import util from '@/libs/util';
    export default {
        name: "left-part",
        data(){
          return{
            selectIndex:0,
            categoryList:[]
          }
        },
        methods:{
          initPage:function () {
            var self = this;
            util.ajax.post('/manage/dataCategory/getCategoryList', {

            }).then(function (resp) {
              var result = resp.data;
              self.categoryList = result;
              if(result.length>0){
                self.$emit("changeCategory",result[0].category_id);
              }
            });
          },
          selectOper:function (category_id,index) {
            this.$emit("changeCategory",category_id);
            this.selectIndex = index;
          }
        },
        mounted() {
          this.initPage();
        }
    }
</script>

<style scoped lang="less">
  .left-category{
    .one-line{
      cursor: pointer;
      padding: 10px;
      margin: 10px;
      min-width: 200px;
      background: #e2ddde;
      .fr{
        float: right;
      }
    }
    .one-line.first{
      margin-top: 10px;
    }
    .one-line.select{
      background:#464c5b;
      color: #ffffff;
    }
  }
</style>
