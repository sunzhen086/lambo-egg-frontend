<template>
    <Modal v-model="boxShow" :title="boxTitle" @on-ok="onOK" @on-cancel="onCancel" :mask-closable="false" transfer >
        <div v-if="boxShow">
            <lambo-table ref="helpBoxTable" :dataUrl="tableUrl" :columns="tableColumns" @on-row-click="onRowClick" @on-selection-change="onSelectionChange" :searchParams="searchParams">
                <div slot="search">
                    <Input v-model="searchText" placeholder="搜索" style="width: 200px" />
                    <Button type="primary" icon="ios-search" @click="doSearch">查询</Button>
                </div>
            </lambo-table>
        </div>
    </Modal>
</template>

<script>
    import LamboTable from "../../table/index"
    export default {
        name: "helpbox",
        components:{
            "lambo-table":LamboTable
        },
        props:{
            value:Boolean,
            url:String,
            columns:Array,
            title:{
                type:String,
                default:"帮助框"
            },
            muliSelect:{
                type:Boolean,
                default:false
            }

        },
        data(){
            return {
                boxShow:this.value,
                searchText:"",
                selection:[],
                searchParams:{}
            }
        },
        computed:{
            tableUrl:function(){
                return this.url
            },
            tableColumns:function(){
                return this.columns
            },
            boxTitle:function(){
                return this.title
            }
        },
        methods:{
            init:function(){
                let self = this;
                self.selectStore = [];
                let selectColumn = {
                        width: 80,
                        align: 'center',
                        title:"选择"
                    };
                if(this.muliSelect){
                    selectColumn.type = "selection"
                }else{
                    //当前iView版本单选要自己实现
                    selectColumn.render = function(h,params){
                        let index = params.index;
                        return h("Radio",{
                            props:{
                                "value":self.selection[index] === undefined ? false : self.selection[index]
                            },
                            on:{
                                "on-change":function(){
                                    self.selectOnChange(params.row,index);
                                }
                            }
                        })
                    }
                }
                if(self.inited){
                    this.tableColumns.shift();
                }
                this.tableColumns.unshift(selectColumn);
                self.inited = true;

            },
            onOK:function(){
                let selectStore = this.selectStore;
                let result = null;
                console.log(selectStore);
                if(selectStore.length > 0){
                    if(this.muliSelect){
                        result = selectStore
                    }else{
                        result = selectStore[0]
                    }
                }
                this.selection = [];
                this.$emit("onOk",result);
                this.$emit("input",false);

            },
            onCancel:function(){
                this.selection = [];
                this.$emit("input",false);
            },
            doSearch:function(){
                this.selection = [];
                this.searchParams = {
                    "search":this.searchText
                }
            },
            onRowClick:function(row,index){
                this.selectOnChange(row,index);
            },
            //单选
            selectOnChange:function(row,index){
                this.selection = Array(index).fill(false);
                this.selection.splice(index, 1, true);
                this.selectStore=[row];
            },
            //多选
            onSelectionChange:function(rows){
                this.selectStore = rows;
            }
        },
        watch:{
            value:function(){
                if(this.value){
                    this.boxShow = true;
                }
            },
            muliSelect:function(){
                this.init();
            }

        },
        created(){
            this.init();
        }
    }
</script>

<style scoped>

</style>
