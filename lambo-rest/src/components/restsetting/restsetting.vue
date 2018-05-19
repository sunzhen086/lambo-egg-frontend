<template>
  <Layout>
    <Sider hide-trigger :style="{background: '#fff'}" width="300" class="left-sider">
      <Tree :data="treeData" :load-data="loadTree" ref="tree"></Tree>
    </Sider>
    <Content>

      <div v-if="pageType==='insert'" >
        <Insert @show-page="showPage" @add-tree-node="addTreeNode" @check-rest="doCheck" :parent-id="curStru.key" :parent-name="curStru.title" :stru-path="curStru.path" :siblings="curStru.children"></Insert>
      </div>
      <div v-if="pageType==='update'" >
        <Update @show-page="showPage" @update-tree-node="updateTreeNode" @check-rest="doCheck" :stru-id="curStru.key" :stru-name="curStru.title" :siblings="curSiblings"></Update>
      </div>
      <div v-if="pageType==='datail'" >
        <Datail @show-page="showPage" @delete-tree-node="deleteTreeNode" @check-rest="doCheck" :stru-id="curStru.key" :stru-name="curStru.title"></Datail>
      </div>

    </Content>
  </Layout>
</template>

<script>
  import util from '@/libs/util';
  import config from '@/config/config';
  import Insert from "./components/insert";
  import Update from "./components/update";
  import Datail from "./components/datail";
  import TreeNode from "./components/TreeNode";
  export default {
    data () {
      return {
        pageType:'',
        curStru:{},
        curSiblings:[],
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
                obj.orderSeq = node.orderSeq;
                obj.restId = node.restId;
                obj.parentId = parentNode.key;
                if (node.isLeaf == "0") {
                  obj.loading = false;
                  obj.children = [];
                }
                obj.render=(h, { root, node, data }) => {
                  return  h(TreeNode,{
                    props:{
                      title:data.title,
                      selected:data.selected,
                      isLeaf:data.isLeaf
                    },
                    on:{
                      "nodeOnClick":function(){
                        self.onTreeSelectChange(data);
                      }
                    }
                  })
                };
                nodes.push(obj);
              });
            }
          }
          self.addCurStru(parentNode);
          self.setTreeSelected(parentNode);

          if(callback){
            callback(nodes);
          }else{
            self.$set(parentNode, "expand", true);
            self.$set(parentNode, "children", nodes);
          }
        });
      },
      onTreeSelectChange(data){
        if(!data.children || data.children.length === 0){
          this.getChildren(data);
        }

        this.addCurStru(data);
        this.$set(data, "selected", true);

        let expand = data.expand;
        this.$set(data, "expand", !expand);

      },
      showPage(pageType){
        this.pageType = pageType;
      },
      doCheck(restId){
        window.open(config.appContext+"/#/rest-test?restId="+restId);
      },
      addTreeNode(node){
        var self = this;
        var last = self.$refs.tree.getSelectedNodes();
        var children = last[0].children;
        var addNum = 0;
        if(children && children.length>0){
          for(var i=0;i<children.length;i++) {
            if(node.orderSeq && children[i].orderSeq && node.orderSeq>children[i].orderSeq) {
              addNum = i+1;
            }
          }
        }else{
          self.$set(last[0], "children", []);
        }

        let obj = {};
        obj.key = node.struId;
        obj.title = node.struName;
        obj.isLeaf = node.isLeaf;
        obj.path = self.curStru.path+node.struUrl;
        obj.parentId = self.curStru.key;
        obj.selected = true;
        if (node.isLeaf == "0") {
          obj.loading = false;
          obj.children = [];
        }
        obj.render=(h, { root, node, data }) => {
          return  h(TreeNode,{
            props:{
              title:data.title,
              selected:data.selected,
              isLeaf:data.isLeaf
            },
            on:{
              "nodeOnClick":function(){
                self.onTreeSelectChange(data);
              }
            }
          })
        };
        last[0].children.splice(addNum,0,obj);

        //设置当前选中节点
        self.addCurStru(obj);
      },
      updateTreeNode(node){
        var self = this;
        var last = self.$refs.tree.getSelectedNodes();
        last[0].title = node.struName;
        last[0].orderSeq = node.orderSeq;

        //更新节点排序

        //设置当前选中节点
        self.addCurStru(last[0]);
      },
      deleteTreeNode(struId,parentId){
        var self = this;
        var parentNode = self.getNodeByKey(parentId,self.treeData[0].children);
        if(parentNode.children && parentNode.children.length>0){
          for(var i=0;i<parentNode.children.length;i++){
            if(struId == parentNode.children[i].key){
              parentNode.children.splice(i,1);
              self.clearCurStru();
              break;
            }
          }
        }
      },
      getNodeByKey(key,treeNodes){
        var self = this;
        var nodes = [];
        if(treeNodes && treeNodes.length>0){
          for(var i=0;i<treeNodes.length;i++){
            if(key == treeNodes[i].key){
              nodes = treeNodes[i];
              break;
            }
            if(treeNodes[i].children && treeNodes[i].children.length>0){
              nodes = self.getNodeByKey(key,treeNodes[i].children);
            }
          }
        }
        return nodes;
      },
      setTreeSelected(node){
        var self = this;
        var last = self.$refs.tree.getSelectedNodes();
        if(last.length>0){
          last.forEach(item => {
            item.selected = false;
          });
        }
        self.$set(node, "selected", true);
      },
      addCurStru(node){
        this.pageType = "datail";

        if(this.curStru.selected){
          this.curStru.selected = false;
        }

        this.$set(node, "selected", true);
        this.curStru = node;

        if(node.key !=0){
          this.curSiblings = this.getNodeByKey(node.parentId,this.treeData[0].children).children;
        }else{
          this.curSiblings = [];
        }
      },
      clearCurStru(){
        this.pageType = "";
        this.curStru = {};
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
  .left-sider{
    padding-top:10px;
    padding-left:20px;
  }
</style>
