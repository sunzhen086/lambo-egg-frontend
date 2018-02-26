<template>
  <div>{{testData}}</div>
</template>
<script>
  import util from '@/libs/util';

  export default {
    data() {
      return {
        testData:{},
      }
    },
    methods:{
      getData:function(params){
        var self = this;
        util.ajax.post('/manage/queryList').then(function (resp) {
          self.testData = resp.data;
        })
      }
    },
    mounted(){
      this.getData();
    }
  }
</script>
