<template>
    <div>
        <Card>
            <p slot="title">
                test_user修改
            </p>
            <div slot="extra">
                <Button type="primary" @click="formSubmit">保存</Button>
                <a href="#" @click="pageGoBack">
                    <Icon type="android-arrow-back"></Icon> 返回</a>
            </div>
            <Form  ref="formData" :model="formData" :label-width="80" :rules="ruleValidate">
                                                                                                                                                                                                            <FormItem label="user_name" prop="userName">
                                <Input v-model="formData.userName" placeholder="请输入user_name"></Input>
                            </FormItem>
                                                                                                                                                                            <FormItem label="sex" prop="sex">
                                <Input v-model="formData.sex" placeholder="请输入sex"></Input>
                            </FormItem>
                                                                                                                                                                            <FormItem label="age" prop="age">
                                <Input v-model="formData.age" placeholder="请输入age"></Input>
                            </FormItem>
                                                                                                                                                                            <FormItem label="ctime" prop="ctime">
                                <Input v-model="formData.ctime" placeholder="请输入ctime"></Input>
                            </FormItem>
                                                                        </Form>
        </Card>
    </div>
</template>

<script>
        import util from '@/libs/util.js';
    export default {
        data () {
            return {
                formData: {
                                                                        userId:"",
                                                                                                userName:"",
                                                                                                sex:"",
                                                                                                age:"",
                                                                                                ctime:"",
                                                            },
                ruleValidate: {

                }
            };
        },
        computed: {
            userId: function() {
                return this.$route.query.userId;
            }
        },
        watch:{

        },
        methods: {
            pageGoBack(){
                this.$router.go(-1);
            },
            formSubmit(){
                var self = this;
                var params = {
                                                                        userId:self.formData.userId,
                                                                                                userName:self.formData.userName,
                                                                                                sex:self.formData.sex,
                                                                                                age:self.formData.age,
                                                                                                ctime:self.formData.ctime,
                                                            };
                if(self.userId) {  //修改
                    util.ajax.post("/manage/testUser/update/" + self.userId, params).then(function(resp) {
                        self.$Message.success('保存成功');
                        self.pageGoBack();
                    })
                } else { //新增
                    util.ajax.post("/manage/testUser/create", params).then(function(resp) {
                        self.$Message.success('新增成功');
                        self.pageGoBack();
                    })
                }
            },
            initData:function(){
                var self = this;
                //初始化数据
                if(self.userId) { //修改
                    util.ajax.get("/manage/testUser/get/" + self.userId).then(function(resp) {
                        var result = resp.data;
                                                                                    self.formData.userId = result.userId;
                                                                                                                self.formData.userName = result.userName;
                                                                                                                self.formData.sex = result.sex;
                                                                                                                self.formData.age = result.age;
                                                                                                                self.formData.ctime = result.ctime;
                                                                        });
                }
            }
        },
        mounted(){
            this.initData();
        }

    };
</script>
