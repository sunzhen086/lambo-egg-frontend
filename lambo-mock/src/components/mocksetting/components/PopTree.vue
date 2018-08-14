<template>
  <Modal
    v-model="showPopTree"
    title="请选择一个节点"
    :width="600"
    :scrollable=true
    :footer-hide=true>
    <Tree :data="treeData" :load-data="loadTree" ref="popTree" @on-select-change="onRootSelectChange"></Tree>
    <footer>
      <div class="ivu-modal-footer">
        <span class="msg" :class="isSelected">{{msg}}</span>
        <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="checkedCancel"><span>取消</span></button>
        <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="checkedOk"><span>确定</span></button>
      </div>
    </footer>
  </Modal>
</template>

<script>
  import util from '@/libs/util';
  import TreeNode from "./TreeNode";
  export default {
    props:{
      value:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        showPopTree:this.value,
        isSelected:'',
        msg:'',
        selectNodeId:"",
        selectNodeName:"",
        treeData: [
          {
            key:'0',
            title: '数据服务',
            struType:'folder',
            loading: false,
            children: []
          }
        ]
      }
    },
    methods:{
      getTree(){
        this.selectNodeId = "";
        this.selectNodeName = "";
        this.isSelected = '';
        this.msg = "";
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
                if (node.struType == "folder") {
                  obj.loading = false;
                  obj.children = [];
                }
                obj.render=(h, { root, node, data }) => {
                  return  h(TreeNode,{
                    props:{
                      title:data.title,
                      selected:data.selected,
                      struType:data.struType
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
          if(parentNode.key !=0){
            self.setTreeSelected(parentNode);
          }

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

      },
      onRootSelectChange(){
        this.selectNodeId = "";
        this.selectNodeName = "";
        this.treeData[0].selected = false;
        this.isSelected = '';
        this.msg = "* 请选择一个节点";
      },
      setTreeSelected(node){
        let self = this;
        let last = self.$refs.popTree.getSelectedNodes();
        if(last.length>0){
          last.forEach(item => {
            item.selected = false;
          });
        }
        self.$set(node, "selected", true);
        self.selectNodeId = node.key;
        self.selectNodeName = node.title;
        self.isSelected = 'isSelected';
        self.msg = "* 已选择节点 "+self.selectNodeName;
      },
      checkedOk(){
        if(this.selectNodeId==""){
          this.$Message.error("选择一个节点")
        }else{
          this.showPopTree = false;
          this.$emit("on-change",this.selectNodeId);
        }
      },
      checkedCancel(){
        this.showPopTree = false;
      }
    },
    watch:{
      value: {
        handler: function (val, oldVal) {
          this.showPopTree = val;
          if(val){
            this.getTree();
          }
        }
      },
      showPopTree: {
        handler: function (val, oldVal) {
          this.$emit("input",val);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .msg{
    color:#ff0000;
    line-height: 36px;
    float:left;
    &.isSelected{
      color:#00CC66;
    }
  }
  .ivu-tree{
    height:400px;
    overflow: auto;
  }
</style>
