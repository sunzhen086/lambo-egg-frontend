<template>
  <Menu ref="sideMenu" :active-name="acticeName" :open-names="openNames" @on-select="changeSubject" width="200px">
    <Submenu :name="item.category_id" v-for="item in categoryList" :key="item.category_id" class="subMaxWidth">
      <template slot="title">
        {{item.category_name}}
      </template>
      <MenuItem :name="item.category_id+'-'+child.subject_id" v-for="child in item.children" :key="child.subject_id"
                class="maxWidth" :title="child.subject_name">
        {{child.subject_name}}
      </MenuItem>
    </Submenu>
  </Menu>
</template>

<script>
    import util from '@/libs/util';
    export default {
        name: "left-part",
        data(){
          return{
            categoryList:[],
            acticeName:"",
            openNames:[],
          }
        },
        computed: {

        },
        methods:{
          initPage:function () {
            var self = this;
            if(this.$route.query.subjectId && this.$route.query.categoryId){
              self.acticeName = this.$route.query.categoryId + '-' +this.$route.query.subjectId;
              self.openNames.push(parseInt(this.$route.query.categoryId));
            }
            util.ajax.post('/manage/dataCategory/getCategoryList',{})
              .then(function (resp) {
              self.categoryList = resp.data;
              self.$nextTick(() => {
                self.$refs.sideMenu.updateOpened();
                self.$refs.sideMenu.updateActiveName();
              });
              self.$emit("changeSubject",parseInt(self.$route.query.subjectId));
            });
          },
          changeSubject:function (data) {
            var tmp = data.split("-");
            this.$emit("changeSubject",parseInt(tmp[1]));
            this.$router.push({
              name:'数据查询',
              query:{
                categoryId:tmp[0],
                subjectId:tmp[1]
              }
            });
          },
        },
        mounted() {
          this.initPage();
        }
    }
</script>

<style scoped lang="less">
  .subMaxWidth{
    max-width: 200px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }
  .maxWidth{
    max-width: 200px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }
</style>
