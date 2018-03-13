<template>
  <div class="main-body">
    <div class="main-title">
    </div>
  </div>
</template>
<script>
  import util from '@/libs/util';
  import Icon from "iview/src/components/icon/icon";

  export default {
    name: "overview",
    components: {Icon},
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
