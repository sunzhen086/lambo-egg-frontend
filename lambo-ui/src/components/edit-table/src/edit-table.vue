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
                let callbackEvent = param.callbackEvent, rowIndex = param.rowIndex, columnKey = param.columnKey, value = param.value;
                if(callbackEvent){
                    this.$emit(callbackEvent,value,rowIndex,columnKey);
                }else{
                    for(let i=0,len=this.tableDatas.length;i<len;i++){
                        if(i === rowIndex){
                            let item = this.tableDatas[i];
                            item[columnKey] = value;
                        }
                    }
                }

            },
            getTableData:function(){
                return this.tableDatas;
            }
        }
    };
</script>

