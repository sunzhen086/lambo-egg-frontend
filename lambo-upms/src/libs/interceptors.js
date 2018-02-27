import axios from 'axios';
import Vue from 'vue';
import Config from '@/config/config';
var qs = require('qs');
let vm = new Vue();

function requestInterceptors(config){
	if(config.method === 'post') {
		config.data = qs.stringify(config.data);
	}
	return config;
}

function requestError(error){
	vm.$Message.error({
        content: '服务器内部异常,请稍候再试',
        duration: 5
    });
    return Promise.reject(error);
}

function responseInterceptors(response){
    var data = response.data;
  if(data instanceof Object){
    var code = data["code"];
    if(code == "10106"){
      vm.$Message.error({
        content: '会话超时,请重新登录',
        duration: 3
      });
      setTimeout(function(){
        window.location.href = Config.login_page_url;
      },3000)
    }
  }
    return response;
}

function responseError(error){
	vm.$Message.error({
        content: '服务器内部异常,请稍候再试',
        duration: 5
    });
    return Promise.reject(error);
}

export default {
	requestInterceptors,
	responseInterceptors,
	requestError,
	responseError
}
