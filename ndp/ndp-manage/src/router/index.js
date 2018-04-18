import Vue from 'vue'
import Router from 'vue-router'

//登录
import login from '@/components/login/login';

import frame from '@/components/manage/frame/frame';
import table from '@/components/manage/table/index';
import tableEdit from '@/components/manage/table/editTable';
import category from '@/components/manage/category/index';
import categoryEdit from '@/components/manage/category/edit';
import categoryOverview from '@/components/manage/category/overview';
import dict from '@/components/manage/dict/index';
import dictEdit from '@/components/manage/dict/edit';
import subject from '@/components/manage/subject/index';
import subjectEdit from '@/components/manage/subject/edit';

Vue.use(Router);
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
      path: "/manage/frame",
      name: "菜单框架",
      component: frame,
      children: [
        {
          path: '/manage/table',
          name:'库表管理',
          component: table
        },
        {
          path: '/manage/table/create',
          meta:{
            title: '新增库表',
          },
          name:'新增库表',
          component: tableEdit
        },
        {
          path: '/manage/table/update',
          meta:{
            title: '修改库表',
          },
          name:'修改库表',
          component: tableEdit
        },
        {
          path: '/manage/category',
          name:'分类管理',
          component: category
        },
        {
          path: '/manage/category/update',
          meta:{
            title: '修改分类',
          },
          name:'修改分类',
          component: categoryEdit
        },
        {
          path: '/manage/category/create',
          meta:{
            title: '新增分类',
          },
          name:'新增分类',
          component: categoryEdit
        },
        {
          path: '/manage/category/overview',
          meta:{
            title: '维护分类概览',
          },
          name:'维护分类概览',
          component: categoryOverview
        },
        {
          path: '/manage/dict',
          name:'字典管理',
          component: dict
        },
        {
          path: '/manage/dict/update',
          meta:{
            title: '修改数据字典',
          },
          name:'修改数据字典',
          component: dictEdit
        },
        {
          path: '/manage/dict/create',
          meta:{
            title: '新增数据字典',
          },
          name:'新增数据字典',
          component: dictEdit
        },
        {
          path: '/manage/subject',
          name:'专题管理',
          component: subject
        },
        {
          path: '/manage/subject/update',
          meta:{
            title: '修改专题',
          },
          name:'修改专题',
          component: subjectEdit
        },
        {
          path: '/manage/subject/create',
          meta:{
            title: '新增专题',
          },
          name:'新增专题',
          component: subjectEdit
        }
      ]
    }
  ]
})

export default router;
