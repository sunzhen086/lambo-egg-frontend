<template>
  <Layout>
    <Sider hide-trigger :style="{background: '#fff'}" width="300">
      <Tree :data="treeData" :load-data="loadTree" ref="tree" @on-select-change="treeClick"></Tree>
    </Sider>
    <Content>
      <div v-if="pageType!=''" class="btn-box" >
        <Button class="datailStru" @click="showPage('datail')" v-if="pageType=='insert' || pageType=='update'">返回</Button>
        <Button class="addStru" @click="showPage('insert')" v-if="pageType=='datail' && curStruIsLeaf=='0'">增加</Button>
        <Button class="updateStru" @click="showPage('update')" v-if="pageType=='datail' && curStruId!=0">修改</Button>
        <Button class="delete" @click="doDelete" v-if="pageType=='datail' && curStruId!=0">删除</Button>
      </div>

      <div v-if="pageType==='insert'" class="stru-box">
        <Insert :parent-id="curStruId" :parent-name="curStruName"  :stru-path="curStruPath"></Insert>
      </div>
      <div v-if="pageType==='update'" class="stru-box">
        <Update :stru-id="curStruId" :stru-name="curStruName" @update-tree-node="updateTreeNode"></Update>
      </div>
      <div v-if="pageType==='datail'" class="stru-box">
        <Datail :stru-id="curStruId" :stru-name="curStruName" ></Datail>
      </div>

    </Content>
  </Layout>
</template>

<script>
  import util from '@/libs/util';
  import Insert from "./components/insert";
  import Update from "./components/update";
  import Datail from "./components/datail";
  export default {
    data () {
      return {
        pageType:'',
        curStruId:'',
        curStruName:'',
        curStruIsLeaf:'',
        curStruPath:'',
        treeData: [
          {
            key:'0',
            title: '数据服务',
            isLeaf:'0',
            path:'',
            loading: false,
            children: []
          }
        ]
      }
    },
    components:{
      Insert,
      Update,
      Datail
    },
    methods:{
      getTreeData(){
        this.getChildren(this.treeData[0]);
      },
      loadTree(item, callback){
        this.getChildren(item,callback)
      },
      getChildren(parentNode,callback){
        var self = this;
        util.ajax.get('/manage/rest/stru/queryChildren?parentId='+parentNode.key).then(function(resp){
          var result = resp.data;
          const nodes = [];
          if(result.code == '1'){
            var nodeDatas = result.data;
            if(nodeDatas.length>0) {
              nodeDatas.forEach(node => {
                let obj = {};
                obj.key = node.struId;
                obj.title = node.struName;
                obj.isLeaf = node.isLeaf;
                obj.path = parentNode.path+node.struUrl;
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
          }else{
            self.$set(parentNode, "expand", true);
            self.$set(parentNode, "children", nodes);
          }
        });
      },
      treeClick(data, index, event){
        var self = this;
        if(data.length>0){
          self.pageType = "datail";

          self.getChildren(data[0]);

          self.curStruId = data[0].key;
          self.curStruName = data[0].title;
          self.curStruIsLeaf = data[0].isLeaf;
          self.curStruPath = data[0].path;

        }else{
          self.pageType = "";

          self.curStruId = "";
          self.curStruName = "";
          self.curStruIsLeaf = "";
          self.curStruPath = "";
        }
      },
      showPage(pageType){
        this.pageType = pageType;
      },
      doDelete(){
        var self = this;
        util.ajax.get('/manage/rest/stru/queryChildren?parentId='+self.curStruId).then(function(resp){
          var result = resp.data;
          if(result.code == '1'){
            if(result.data && result.data.length>0){
              self.$Modal.confirm({
                title: '',
                content: '<p>含有下级节点，不能删除！</p>'
              });
            }else{
              self.$Modal.confirm({
                title: '',
                content: '<p>确定要删除吗?</p>',
                onOk: () => {
                  util.ajax.post("/manage/rest/stru/delete/" + self.curStruId).then(function(resp) {
                    self.$Message.success('删除成功');
                  }).catch(function(err) {
                    self.$Message.error('删除失败,请联系系统管理员');
                  });
                }
              });
            }
          }
        });
      },
      updateTreeNode(node){
        var self = this;
        if(self.treeData[0].children && self.treeData[0].children.length>0){
          self.setCheckedNode(node,self.treeData[0].children);
        }
      },
      setCheckedNode(node,treeNodes){
        var self = this;
        for(var i=0;i<treeNodes.length;i++){
          if(node.struId == treeNodes[i].key){
            treeNodes[i].title = node.struName;
            break;
          }
          if(treeNodes[i].children && treeNodes[i].children.length>0){
            self.setCheckedNode(node,treeNodes[i].children);
          }
        }
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
