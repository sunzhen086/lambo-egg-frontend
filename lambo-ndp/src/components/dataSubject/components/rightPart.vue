<template>
  <div class="right-subject">
    <div class="one-part" v-for="(item,index) in subjectList" v-bind:class="{first:index==0}"
     @click="selectSubject(item.subject_id)">
      <div class="name">{{index+1}}、{{item.subject_name}}</div>
      <div class="desc">&nbsp;&nbsp;&nbsp;&nbsp;{{item.subject_desc}}</div>
    </div>
  </div>
</template>

<script>
    import util from '@/libs/util';
    export default {
        name: "right-part",
        data(){
          return{
            subjectList:[]
          }
        },
        props:{
          category_id:Number
        },
        methods:{
          initPage(category_id){
            var self = this;
            util.ajax.post('/manage/dataSubject/getSubjectList', {
              categoryId:self.category_id
            }).then(function (resp) {
              var result = resp.data;
              self.subjectList = result;
            });
          },
          selectSubject:function (subject_id) {
            this.$router.push({
              path: '/datasearch',
              query:{
                subjectId:subject_id
              }
            })
          }
        },
        watch:{
          category_id:function (newVal,oldVal) {
            this.initPage(newVal);
          }
        }
    }
</script>

<style scoped lang="less">
  .right-subject{
    .one-part{
      padding: 10px;
      cursor: pointer;
      width: 200px;
      float: left;
      .name{
        background: #2b85e4;
        padding: 5px 10px;
        color: #ffffff;
      }
      .desc{
        background:#5cadff;
        padding: 5px 10px;
        color: #ffffff;
        height: 115px;
      }
    }
    .one-part.first{

    }
  }
</style>
