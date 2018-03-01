import axios from 'axios';
import Vue from 'vue';
import ai from './interceptors';
var qs = require('qs');
var vm = new Vue();

let util = {};
util.title = function (title) {
    title = title || 'lambo';
    window.document.title = title;
};

util.ajax = axios.create({
  baseURL: '/ndp-server/',
});
util.ajax.interceptors.request.use(ai.requestInterceptors,ai.requestError);
util.ajax.interceptors.response.use(ai.responseInterceptors,ai.responseError);

util.params = function (obj){
	return qs.stringify(obj);
}
util.isJson = function(arg){
	return typeof(arg) == "object" &&  Object.prototype.toString.call(arg).toLowerCase() == "[object object]" && !arg.length
}
export default util;
