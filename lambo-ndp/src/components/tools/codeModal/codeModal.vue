<template>
    <Modal v-model="modal1" width="360" @on-visible-change="changeStatus">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>验证码</span>
        </p>
        <div style="text-align:center">
            <span>
                <img :src="codeUrl" @click="reloadCode()" class="viewCode"/>
                <Input v-model="value" placeholder="请输入验证码" style="width: 200px"></Input>
            </span>
            <p v-bind:class="{'db note':note,'dn':!note}">验证码错误，请重新输入！</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="confirmAction">确定</Button>
        </div>
    </Modal>
</template>

<script>
    import Config from '@/config/config';
    import util from '@/libs/util.js';
    export default {
        name: "code-modal",
        data () {
            return {
                modal1: false,
                modal_loading:false,
                codeUrl:'',
                value:'',
                note:false,

            }
        },
        props:{
          openCodeModal:{
            type:Boolean,
            default:false
          }
        },
        methods: {
            initModal(){
                this.reloadCode();
                this.value = '';
                this.note = false;
                this.modal1 = true;
            },
            confirmAction () {
                var self = this;
                self.modal_loading = true;
                util.ajax.get("/manage/IdentityServlet?type=1&code="+self.value)
                    .then(function(resp) {
                    var result = resp.data;
                    if(result.code == "20002" && result.data == "1"){
                        self.modal_loading = false;
                        self.modal1 = false;
                    }else{
                        self.modal_loading = false;
                        self.note = true;
                        self.reloadCode();
                    }
                });
            },
            reloadCode(){
                this.codeUrl = Config.serverContext + "/manage/IdentityServlet?date="+new Date();
            },
            changeStatus(data){
                this.$emit("closeModal",false);
            }
        },
        watch:{
          openCodeModal:function (newVal) {
            if(newVal){
              this.initModal();
            }
          }
        },
        mounted(){

        }
    }
</script>

<style scoped>
    .viewCode{
      float: left;
    }
    .dn{
        display: none;
    }
    .db{
        display: block;
    }
    .note{
      color: #f60;
      margin-top: 10px;
      margin-left: 40px;
    }
</style>
