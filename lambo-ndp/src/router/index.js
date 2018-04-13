import Vue from 'vue'
import Router from 'vue-router'

//登录
import login from '@/components/login/login';

//后端管理
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

//前端展示
import mainnav from '@/components/userpage/main-nav';
import homepage from '@/components/userpage/homepage/homepage';
import overview from '@/components/userpage/overview/overview';
import datatable from '@/components/userpage/datatable/datatable';
import datadetail from '@/components/userpage/datadetail/datadetail';

import categorynav from '@/components/userpage/category-nav';
import categoryoverview from '@/components/userpage/category/overview/overview';
import dataview from '@/components/userpage/dataview/dataview';
import feedback from '@/components/userpage/feedback/feedback';

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
      path:"/mainnav",
      name: "顶部导航",
      component: mainnav,
      children:[
        {
          path: '/home',
          name:'新首页',
          component: homepage
        },
        {
          path: '/overview',
          name:'烟草指数',
          component: overview
        },
        {
          path:"/datatable",
          name:'新数据目录',
          component:datatable
        },
        {
          path:"/datadetail",
          name:'数据明细',
          component:datadetail
        },
        {
          path: '/categorynav',
          name:'分类',
          component: categorynav,
          children:[
            {
              path: '/category/overview',
              name:'分类总览',
              component: categoryoverview
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
    },
    /*{
      path:"/open-data",
      name: "顶部导航",
      component: mainNav,
      children:[
        {
          path: '/home',
          name:'新首页',
          component: homePage,
          meta:{
            anonymous:true
          }
        },
        {
          path:"/view",
          name:'数据概览',
          component:viewPage,
          meta:{
            anonymous:true
          }
        },
        {
          path:"/data",
          name:'新数据目录',
          component:dataPage,
          meta:{
            anonymous:true
          }
        },
        {
          path:"/detail",
          name:'数据明细',
          component:datadetail,
          meta:{
            anonymous:true
          }
        },
        {
          path: '/category-nav',
          name:'分类',
          component: categoryNav,
          children:[
            {
              path: '/category/overview',
              name:'分类总览',
              component: categoryOverView,
              meta:{
                anonymous:true
              }
            },
            {
              path:"/category/dataview",
              name:'分类数据',
              component:dataview,
              meta:{
                anonymous:true
              }
            },
            {
              path:"/category/feedback",
              name:'分类反馈',
              component:feedback,
              meta:{
                anonymous:true
              }
            }
          ]
        }
      ]
    }*/
  ]
})

export default router;
