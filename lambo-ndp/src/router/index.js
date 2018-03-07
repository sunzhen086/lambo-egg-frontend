import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import Config from '@/config/config'
import util from '@/libs/util';
import login from '@/components/login/login'
import main from '@/components/main/main'
import frame from '@/components/frame/frame'
import dataSubject from '@/components/dataSubject/dataSubject'
import dataSearch from '@/components/dataSearch/dataSearch'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {name:'登录页'}
    },
    {
      path: '/login',
      name: '登录页',
      component: login,
      meta:{
        anonymous:true
      }
    },
    {
      path: '/main',
      name: '首页',
      component: main
    },
    {
      path: '/dataSubject',
      name: '数据专题',
      component: dataSubject
    },
    {
      path: '/dataSearch',
      name: '数据查询',
      component: dataSearch
    },
    // {
    //   path: "/frame",
    //   name: "菜单框架",
    //   component: frame,
    //   children: [
    //     {
    //       path: 'manage/system/index',
    //       meta:{
    //         title: '系统管理',
    //       },
    //       name:'系统管理',
    //       component: systemIndex
    //     }
    //   ]
    // }
  ]
})

export default router;
