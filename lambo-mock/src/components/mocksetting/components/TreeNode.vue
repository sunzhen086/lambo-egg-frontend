<template>
  <span @click="onClick" class="node" :class="{selected:selected}">
    <Icon type="ios-folder-outline" :size="14" v-if="struType === 'folder'" class="icon1"></Icon>
    <Icon type="social-reddit-outline" :size="16" v-else class="icon2"></Icon>
    <span class="title">{{title}}</span>
    <span class="devStatus">{{devStatus}}</span>
  </span>
</template>

<script>
    import util from '@/libs/util';
    export default {
        name: "tree-node",
        props:{
          title:String,
          selected:Boolean,
          struType:String,
          devStatus:String
        },
        methods: {
          onClick: function () {
            this.$emit("nodeOnClick");
          }
        }
    }
</script>

<style lang="less" scoped>
  .node{
    cursor:pointer;
    padding:5px;
    overflow: hidden;
    position:relative;
    padding-left:22px;
    &.selected{
      background:#d5e8fc;
    }
    .icon1{
      position:absolute;
      top:5px;
      left:5px;
    }
    .icon2{
      position:absolute;
      top:2px;
      left:5px;
    }
    .devStatus{
      float:right;
      padding:0 10px;
    }
  }
</style>
