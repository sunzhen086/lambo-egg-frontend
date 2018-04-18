import axios from 'axios';
import Vue from 'vue';
import ai from './interceptors';
import config from '@/config/config';
var qs = require('qs');
var vm = new Vue();

let util = {};
util.title = function (title) {
    title = title || 'lambo';
    window.document.title = title;
};
util.ajax = axios.create({
  baseURL: '/' +config.serverContext,
});
util.ajax.interceptors.request.use(ai.requestInterceptors,ai.requestError);
util.ajax.interceptors.response.use(ai.responseInterceptors,ai.responseError);

util.params = function (obj){
	return qs.stringify(obj);
}
util.isJson = function(arg){
	return typeof(arg) == "object" &&  Object.prototype.toString.call(arg).toLowerCase() == "[object object]" && !arg.length
}
util.openNewPage = function (name, argu, query) {
    var pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [];
    var openedPageLen = pageOpenedList.length;
    var i = 0;
    var tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) {  // 页面已经打开
            var openedPage = pageOpenedList[i];
            if (argu) {
                openedPage.argu = argu;
            }
            if (query) {
                openedPage.query = query;
            }
            pageOpenedList.splice(i, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        var tagsList = JSON.parse(localStorage.tagsList);
        var tag = null;
        for(var i=0;i<tagsList.length;i++){
            var item = tagsList[i];
            if (item.children) {
                if(name === item.children[0].name){
                    tag = item;
                    break;
                }
            } else {
                if(name === item.name){
                    tag = item;
                    break;
                }
            }
        }
        if(tag != null){
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            pageOpenedList.push(tag);
            localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
        }
    }
    localStorage.currentPageName = name;
};
export default util;
