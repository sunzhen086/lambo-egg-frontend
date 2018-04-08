import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'

import frame from '@/components/frame/frame'

import table from '@/components/manage/table/index'
import tableEdit from '@/components/manage/table/editTable'
import category from '@/components/manage/category/index'
import categoryEdit from '@/components/manage/category/edit'
import dict from '@/components/manage/dict/index'
import dictEdit from '@/components/manage/dict/edit'
import subject from '@/components/manage/subject/index'
import subjectEdit from '@/components/manage/subject/edit'

import mainNav from '@/components/open-data/main-nav'
import categoryNav from '@/components/open-data/category-nav'
import homePage from '@/components/open-data/mainpage/mainpage'
import categoryOverView from '@/components/open-data/category/overview/overview'
import dataview from '@/components/open-data/dataview/dataview';
import datadetail from '@/components/open-data/datadetail/datadetail';
import viewPage from '@/components/open-data/overview/overview';
import dataPage from '@/components/open-data/datatable/datatable';
import feedback from '@/components/open-data/feedback/feedback';
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
      path: "/frame",
      name: "菜单框架",
      component: frame,
      children: [
        {
          path: 'table',

          name:'库表管理',
          component: table
        },
        {
          path: '/table/create',
          meta:{
            title: '新增库表',
          },
          name:'新增库表',
          component: tableEdit
        },
        {
          path: '/table/update',
          meta:{
            title: '修改库表',
          },
          name:'修改库表',
          component: tableEdit
        },
        {
          path: '/category',
          name:'分类管理',
          component: category
        },
        {
          path: '/category/update',
          meta:{
            title: '修改分类',
          },
          name:'修改分类',
          component: categoryEdit
        },
        {
          path: '/category/create',
          meta:{
            title: '新增分类',
          },
          name:'新增分类',
          component: categoryEdit
        },
        {
          path: '/dict',
          name:'字典管理',
          component: dict
        },
        {
          path: '/dict/update',
          meta:{
            title: '修改数据字典',
          },
          name:'修改数据字典',
          component: dictEdit
        },
        {
          path: '/dict/create',
          meta:{
            title: '新增数据字典',
          },
          name:'新增数据字典',
          component: dictEdit
        },
        {
          path: '/subject',
          name:'专题管理',
          component: subject
        },
        {
          path: '/subject/update',
          meta:{
            title: '修改专题',
          },
          name:'修改专题',
          component: subjectEdit
        },
        {
          path: '/subject/create',
          meta:{
            title: '新增专题',
          },
          name:'新增专题',
          component: subjectEdit
        },


      ]
    },
    // {
    //   path: "/main",
    //   name: "导航",
    //   component: main,
    //   children: [
    //     {
    //       path: '/datatable',
    //       name:'数据目录',
    //       component: datatable
    //     },
    //     {
    //       path: '/mainpage',
    //       name:'首页',
    //       component: mainpage
    //     },
    //     {
    //       path: '/overview',
    //       name:'行业概览',
    //       component: overview
    //     },
    //     {
    //       path: '/searchTable',
    //       name: '数据查询',
    //       component: searchTable
    //     }
    //   ]
    // },
    {
      path:"/open-data",
      name: "顶部导航",
      component: mainNav,
      children:[
        {
          path: '/home',
          name:'新首页',
          component: homePage
        },
        {
          path:"/view",
          name:'数据概览',
          component:viewPage
        },
        {
          path:"/data",
          name:'新数据目录',
          component:dataPage
        },
        {
          path:"/detail",
          name:'数据明细',
          component:datadetail
        },
        {
          path: '/category-nav',
          name:'分类',
          component: categoryNav,
          children:[
            {
              path: '/category/overview',
              name:'分类总览',
              component: categoryOverView
            },
            {
              path:"/category/dataview",
              name:'分类数据',
              component:dataview
            },
            {
              path:"/category/feedback",
              name:'分类反馈',
              component:feedback
            }
          ]
        }
      ]

    }
  ]
})

export default router;
