<template>
    <div>
        <div v-if="!editing" class="read-status">
            <span>{{val}}</span>
            <div class="edit-btn">
                <Button type="text" icon="edit" @click="doEdit"></Button>
            </div>
        </div>
        <div v-if="editing" class="editing-status">
            <span><Input ref="input" type="text" v-model="val" @on-enter="doSave"/></span>
            <div class="save-btn">
                <Button type="text" icon="checkmark" @click="doSave"></Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "text-editor",
        props:{
            row:Object,
            column:Object,
            index:Number,
            mode:String
        },
        data(){
            return {
                editing:false,
                val: this.row[this.column.key]
            }
        },
        methods:{
            doEdit:function(){
                this.oldVal = this.val;
                this.editing = true;
            },
            doSave:function(){
                let newVal = this.val,oldVal = this.oldVal;
                let validate = this.column.editor.validate;
                if(validate){
                    let result = validate(newVal,oldVal,this.row,this.index);
                    if(!result.valid){
                        this.$Message.error(result.msg);
                        this.$ref.input.focus();
                        return ;
                    }
                }
                this.editing = false;
                if(newVal !== oldVal){
                    var param = {
                        rowIndex:this.index,
                        columnKey:this.column.key,
                        value:newVal
                    }
                    this.$emit("cell-on-change",param);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .read-status{
        height:35px;
        line-height:35px;
        margin-right:20px;
        position:relative;
        .edit-btn{
            position:absolute;
            top:0px;
            right:-40px;
        }
    }
    .editing-status{
        height:35px;
        line-height:35px;
        margin-right:20px;
        position:relative;
        .save-btn{
            position:absolute;
            top:0px;
            right:-40px;
        }
    }



      .lambo-edit-table {
          .show-edit-btn {
              /*margin-left: -15px;*/
          }
      }

</style>

