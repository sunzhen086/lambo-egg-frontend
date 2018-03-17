<template>
    <Table :data="formatData" :row-class-name="showRow" v-bind="$attrs"></Table>
</template>

<script>
    import treeToArray from './components/eval'
    import TreeCtrl from './components/tree-ctrl'
    import {deepCopy} from '../../../libs/assist'

    export default {
        name: 'treeTable',
        props: {
            data: {
                type: [Array, Object],
                required: true
            },
            columns: {
                type: Array,
                default: () => [],
                required: true
            },
            evalFunc: Function,
            evalArgs: Array,
            expandAll: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                tableColumns:[]
            }
        },
        computed: {
            // 格式化数据源
            formatData: function () {
                let tmp
                if (!Array.isArray(this.data)) {
                    tmp = [this.data]
                } else {
                    tmp = this.data
                }
                const func = this.evalFunc || treeToArray
                const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
                return func.apply(null, args)
            }
        },
        methods: {
            init:function(){
                let self = this;
                self.tableColumns = deepCopy(self.columns);
                if(self.tableColumns.length !== 0){
                    self.tableColumns[0].render = (h,params) => {
                        h(TreeCtrl,{
                            props:{
                                params
                            },
                            on:{
                                "on-expand-toggle":function(trIndex){
                                    self.toggleExpanded(trIndex);
                                }
                            }
                        })
                    }
                }
            },
            showRow: function (row) {
                const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
                row.row._show = show
                return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
            },
            // 切换下级是否展开
            toggleExpanded: function (trIndex) {
                const record = this.formatData[trIndex]
                record._expanded = !record._expanded
            }

        },
        created(){
            this.init();
        },
        watch:{
            columns(){
                this.init();
            }
        }
    }
</script>
<style rel="stylesheet/css">
    @keyframes treeTableShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @-webkit-keyframes treeTableShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>

<style lang="less" scoped>

</style>
