<template>
    <div class="lambo-edit-table">
        <Table :columns="tablecolumns" :data="tableDatas" border disabled-hover></Table>
    </div>
</template>

<script>
    import EditorPlugin from "./editorPlugin.js"

    export default {
        name: 'canEditTable',
        props: {
            columns: Array,
            datas: Array
        },
        data() {
            return {
                tablecolumns: this.columns,
                tableDatas: this.datas
            };
        },
        created() {
            this.init();
        },
        methods: {
            init: function () {
                let self = this;
                self.datasClone = JSON.parse(JSON.stringify(self.tableDatas));
                this.tablecolumns.forEach(column => {
                    if ("editor" in column) {
                        column.render = (h, param) => {
                            return h(EditorPlugin, {
                                props: {
                                    row:param.row,
                                    column:param.column,
                                    index:param.index
                                },
                                on:{
                                    "cell-on-change":function(param){
                                        self.cellOnChange(param);
                                    }
                                }
                            })
                        }
                    }
                })
            },
            cellOnChange:function(param){
                let rowIndex = param.rowIndex, columnKey = param.columnKey, value = param.value;
                for(let i=0,len=this.datasClone.length;i<len;i++){
                    if(i === rowIndex){
                        let item = this.datasClone[i];
                        item[columnKey] = value;
                    }
                }
            },
            getTableData:function(){
                return this.datasClone;
            }
        },
        watch:{
            tableDatas:function (data) {
                this.init();
            }
        }
    };
</script>

