<template>
	<div class="login" @keydown.enter="handleSubmit">
		<div class="login-con">
			<Card :bordered="false">
				<p slot="title">
					<Icon type="log-in"></Icon>
					欢迎登录
				</p>
				<div class="form-con">
					<Form ref="loginForm" :model="form" :rules="rules">
						<FormItem prop="userName">
							<Input v-model="form.userName" placeholder="请输入用户名">
							<span slot="prepend">
			                     <Icon :size="16" type="person"></Icon>
			                </span>
							</Input>
						</FormItem>
						<FormItem prop="password">
							<Input type="password" v-model="form.password" placeholder="请输入密码">
							<span slot="prepend">
			                  <Icon :size="14" type="locked"></Icon>
			                </span>
							</Input>
						</FormItem>
						<FormItem>
							<Button @click="handleSubmit" type="primary" long>登录</Button>
						</FormItem>
					</Form>
					<p class="login-tip">使用用户名密码登录</p>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			defaultUserName:String,
			defaultPassword:String
		},
		data() {
			return {
				form: {
					userName: this.defaultUserName,
					password: this.defaultPassword
				},
				rules: {
					userName: [{
						required: true,
						message: '账号不能为空',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			handleSubmit() {
				var self = this;
				self.$refs.loginForm.validate((valid) => {
					if(valid) {
						self.doLogin(self.form.userName, self.form.password, "false");
					}
				});
			},
			doLogin(username, password, rememberMe) {
				this.$emit("do-login", {
					username,
					password,
					rememberMe
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.login {
		width: 100%;
		height: 100%;
		background: url("../styles/login_bg.jpg") center;
		background-size: cover;
		position: relative;
		&-con {
			position: absolute;
			right: 160px;
			top: 50%;
			transform: translateY(-60%);
			width: 300px;
			&-header {
				font-size: 16px;
				font-weight: 300;
				text-align: center;
				padding: 30px 0;
			}
			.form-con {
				padding: 10px 0 0;
			}
			.login-tip {
				font-size: 10px;
				text-align: center;
				color: #c3c3c3;
			}
		}
	}
</style>