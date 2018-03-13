<template>
  <div class="right-subject">
    <div class="one-part" @click="selectSubject(item.subject_id)" v-for="(item,index) in subjectList" >
      <Card :key="item.subject_id">
        <p slot="title" class="title" :title="item.subject_name">
          {{index+1}}、{{item.subject_name}}
        </p>
        <div class="desc" :title="item.title">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.subject_desc}}
        </div>
      </Card>
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
              for(var i=0;i<result.length;i++){
                var tmp = result[i].subject_desc;
                if(tmp && tmp.length>=53){
                  tmp = tmp.substring(0,53) + "...";
                }
                result[i].title = result[i].subject_desc;
                result[i].subject_desc = tmp;
              }
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
      margin: 10px;
      cursor: pointer;
      width: 200px;
      float: left;
      .title{
        white-space:nowrap;
        overflow:hidden;
        text-overflow: ellipsis;
      }
      .desc{
        height: 108px;
        overflow:hidden;
      }
    }
  }
</style>
