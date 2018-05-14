<template>
  <Layout>
    <Sider hide-trigger :style="{background: '#fff'}" width="300">
      <Tree :data="treeData" :load-data="loadTree"  @on-select-change="treeClick"></Tree>
    </Sider>
    <Content>
      <div :class="isShown" class="btn-box">
        <Button class="addStru" @click="showPage('insert')">增加</Button>
        <Button class="delete" >删除</Button>
      </div>

      <div v-if="pageType==='insert'" class="stru-box">
        <Insert :parent-id="curStru.struId" :parent-name="curStru.struName"  :stru-path="curStru.struPath"></Insert>
      </div>
      <div v-if="pageType==='update'" class="stru-box">
        <Update :stru-id="curStru.struId" :stru-name="curStru.struName"></Update>
      </div>

    </Content>
  </Layout>
</template>

<script>
  import util from '@/libs/util';
  import Insert from "./components/insert";
  import Update from "./components/update";
  export default {
    data () {
      return {
        isShown:'hidden',
        pageType:'',
        curStru:{
          struId:"",
          struName:"",
          struPath:""
        },
        treeData: [
          {
            key:'0',
            title: '数据服务',
            path:'',
            loading: false,
            children: []
          }
        ]
      }
    },
    components:{
      Insert,
      Update
    },
    methods:{
      getTreeData(){
        this.getChildren(0,'')
      },
      loadTree(item, callback){
        this.getChildren(item.key,item.path,callback)
      },
      getChildren(parentId,path,callback){
        var self = this;
        util.ajax.get('/manage/rest/stru/query?parentId='+parentId).then(function(resp){
          var result = resp.data;
          const nodes = [];
          if(result.code == '1'){
            var nodeDatas = result.data;
            if(nodeDatas.length>0) {
              nodeDatas.forEach(node => {
                let obj = {};
                obj.key = node.struId;
                obj.title = node.struName;
                obj.path = path+node.struUrl;
                if (node.isLeaf == "0") {
                  obj.loading = false;
                  obj.children = [];
                }
                nodes.push(obj);
              });
            }
          }
          if(callback){
            callback(nodes);
          }else if(parentId==0){
            self.$set(self.treeData[0], "expand", true);
            self.$set(self.treeData[0], "children", nodes);
          }
        });
      },
      treeClick(data, index, event){
        var self = this;
        if(data.length>0){
          self.isShown = "shown";
          self.pageType = "update";

          self.curStru.struId = data[0].key;
          self.curStru.struName = data[0].title;
          self.curStru.struPath = data[0].path;
        }else{
          self.isShown = "hidden";
          self.pageType = "";

          self.curStru.struName = "";
          self.curStru.struId = "";
          self.curStru.struPath = "";
        }
      },
      showPage(pageType){
        this.pageType = pageType;
      }
    },
    mounted:function(){
      this.getTreeData();
    }
  }
</script>

<style lang="less" scoped>
  .shown{
    display:block;
  }
  .hidden{
    display:none;
  }
  .btn-box{
    padding:20px;
    border-bottom:1px solid #e9eaec;
  }
  .stru-box{
    padding:20px;
  }
</style>
