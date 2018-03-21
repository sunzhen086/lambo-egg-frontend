import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import main from '@/components/main/main'
import searchTable from '@/components/searchTable/searchTable'
import table from '@/components/table/index'
import tableEdit from '@/components/table/editTable'
import datatable from '@/components/main/components/datatable'
import mainpage from '@/components/main/components/mainpage'
import overview from '@/components/overview/overview'
import category from '@/components/category/index'
import categoryEdit from '@/components/category/edit'
import dict from '@/components/dict/index'
import dictEdit from '@/components/dict/edit'
import subject from '@/components/subject/index'
import subjectEdit from '@/components/subject/edit'
import frame from '@/components/frame/frame'
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
          name:'数据分类',
          component: category
        },
        {
          path: '/category/update',
          name:'修改分类',
          component: categoryEdit
        },
        {
          path: '/category/create',
          name:'新增分类',
          component: categoryEdit
        },
        {
          path: '/dict',
          name:'数据字典查询',
          component: dict
        },
        {
          path: '/dict/update',
          name:'修改数据字典',
          component: dictEdit
        },
        {
          path: '/dict/create',
          name:'新增数据字典',
          component: dictEdit
        },
        {
          path: '/subject',
          name:'数据专题管理',
          component: subject
        },
        {
          path: '/subject/update',
          name:'修改专题',
          component: subjectEdit
        },
        {
          path: '/subject/create',
          name:'新增专题',
          component: subjectEdit
        },


      ]
    },
    {
      path: "/main",
      name: "导航",
      component: main,
      children: [
        {
          path: '/datatable',
          name:'数据目录',
          component: datatable
        },
        {
          path: '/mainpage',
          name:'首页',
          component: mainpage
        },
        {
          path: '/overview',
          name:'行业概览',
          component: overview
        },
        {
          path: '/searchTable',
          name: '数据查询',
          component: searchTable
        },
      ]
    }
  ]
})

export default router;
