<template>
  <Layout>
    <Sider hide-trigger :style="{background: '#fff'}" width="400" class="left-sider">
      <Tree :data="treeData" :load-data="loadTree" ref="tree" @on-select-change="onRootSelectChange"></Tree>
    </Sider>
    <Content>

      <div v-if="pageType==='insert'" >
        <Insert @show-page="showPage" @add-tree-node="addTreeNode" :parent-id="curStru.key" :parent-name="curStru.title" :stru-path="curStru.path" :siblings="curStru.children" :copyStruId="copyStruId"></Insert>
      </div>
      <div v-if="pageType==='update'" >
        <Update @show-page="showPage" @update-tree-node="updateTreeNode" :stru-id="curStru.key" :stru-name="curStru.title" :siblings="curSiblings"></Update>
      </div>
      <div v-if="pageType==='datail'" >
        <Datail @show-page="showPage" @delete-tree-node="deleteTreeNode" :stru-id="curStru.key" :stru-name="curStru.title"></Datail>
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
        copyStruId:"",
        treeData: [
          {
            key:'0',
            title: '数据服务',
            struType:'folder',
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
        let self = this;

        util.ajax.get('/manage/mock/stru/queryChildren?hasDevStatus=1&parentId='+parentNode.key).then(function(resp){
          let result = resp.data;
          const nodes = [];
          if(result.code == '1'){
            let nodeDatas = result.data;
            if(nodeDatas.length>0) {
              nodeDatas.forEach(node => {
                let obj = {};
                obj.key = node.struId;
                obj.title = node.struName;
                obj.struType = node.struType;
                obj.struUrl = node.struUrl;
                obj.path = parentNode.path+node.struUrl;
                obj.orderSeq = node.orderSeq;
                obj.mockId = node.mockId;
                obj.devStatus = node.devStatus;
                obj.parentId = parentNode.key;
                if (node.struType == "folder") {
                  obj.loading = false;
                  obj.children = [];
                }
                obj.render=(h, { root, node, data }) => {
                  return  h(TreeNode,{
                    props:{
                      title:data.title,
                      selected:data.selected,
                      struType:data.struType,
                      devStatus:data.devStatus
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
      onRootSelectChange:function(node){
        if(node.length > 0){
          this.addCurStru(node[0]);
          this.$set(node[0], "selected", true);
        }else{
          this.treeData[0].selected = true;
        }

      },
      onTreeSelectChange(data){
        if(!data.children || data.children.length === 0){
          this.getChildren(data);
        }

        this.addCurStru(data);
        this.$set(data, "selected", true);

      },
      showPage(pageType,key){
        console.log(pageType);
        if(pageType=="copy"){
          this.copyStruId = key;
          this.pageType = "insert";
        }else{
          this.copyStruId = "";
          this.pageType = pageType;
        }
      },
      addTreeNode(node){
        let self = this;
        let last = self.$refs.tree.getSelectedNodes();
        let children = last[0].children;
        let addNum = 0;
        if(children && children.length>0){
          for(let i=0;i<children.length;i++) {
            if(node.orderSeq>=children[i].orderSeq) {
              addNum = i+1;
            }
          }
        }else{
          self.$set(last[0], "children", []);
        }

        let obj = {};
        obj.key = node.struId;
        obj.title = node.struName;
        obj.struType = node.struType;
        obj.path = self.curStru.path+node.struUrl;
        obj.parentId = self.curStru.key;
        obj.devStatus = node.devStatus
        obj.orderSeq = node.orderSeq;
        obj.selected = true;
        if (node.struType == "folder") {
          obj.loading = false;
          obj.children = [];
        }
        obj.render=(h, { root, node, data }) => {
          return  h(TreeNode,{
            props:{
              title:data.title,
              selected:data.selected,
              struType:data.struType,
              devStatus:data.devStatus
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
        let self = this;
        let last = self.$refs.tree.getSelectedNodes();
        last[0].title = node.struName;
        last[0].devStatus = node.devStatus;
        last[0].orderSeq = node.orderSeq;

        //更新节点排序

        //设置当前选中节点
        self.addCurStru(last[0]);
      },
      deleteTreeNode(struId,parentId){
        let self = this;
        let parentNode = self.getNodeByKey(parentId,self.treeData[0].children);
        if(parentNode.children && parentNode.children.length>0){
          for(let i=0;i<parentNode.children.length;i++){
            if(struId == parentNode.children[i].key){
              parentNode.children.splice(i,1);
              self.clearCurStru();
              break;
            }
          }
        }
      },
      getNodeByKey(key,treeNodes){
        let self = this;
        let nodes = [];
        if(treeNodes && treeNodes.length>0){
          for(let i=0;i<treeNodes.length;i++){
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
        let self = this;
        let last = self.$refs.tree.getSelectedNodes();
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
    min-height:550px;
    padding-top:10px;
    padding-left:20px;
  }
</style>
