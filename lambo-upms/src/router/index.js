import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import frame from '@/components/frame/frame'
import systemIndex from '@/components/system/index'
import systemEdit from '@/components/system/edit'
import organizationIndex from '@/components/organization/index'
import organizationEdit from '@/components/organization/edit'
import userIndex from '@/components/user/index'
import userEdit from '@/components/user/edit'
import roleIndex from '@/components/role/index'
import roleEdit from '@/components/role/edit'
import rolePermission from '@/components/role/permission'
import permissionIndex from '@/components/permission/index'
import permissionEdit from '@/components/permission/edit'
import sessionIndex from '@/components/session/index'
import logIndex from '@/components/log/index'

Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/',
      redirect: {name:'登录页'}
    },
    {
      path: '/login',
      name: '登录页',
      component: login
    },
    {
      path: "/frame",
      name: "菜单框架",
      component: frame,
      children: [
        {
          path: 'manage/system/index',
          meta:{
            title: '系统管理',
          },
          name:'系统管理',
          component: systemIndex
        },
        {
          path: 'manage/system/create',
          meta:{
            title: '新增系统',
          },
          name:'新增系统',
          component: systemEdit
        },
        {
          path: 'manage/system/update',
          meta:{
            title: '修改系统',
          },
          name:'修改系统',
          component: systemEdit
        },
        {
          path: 'manage/organization/index',
          meta:{
            title: '组织管理',
          },
          name:'组织管理',
          component: organizationIndex
        },
        {
          path: 'manage/organization/create',
          meta:{
            title: '新增组织',
          },
          name:'新增组织',
          component: organizationEdit
        },
        {
          path: 'manage/organization/update',
          meta:{
            title: '修改组织',
          },
          name:'修改组织',
          component: organizationEdit
        },
        {
          path: 'manage/user/index',
          meta:{
            title: '用户管理',
          },
          name:'用户管理',
          component: userIndex
        },
        {
          path: 'manage/user/update',
          meta:{
            title: '修改用户',
          },
          name:'修改用户',
          component: userEdit
        },
        {
          path: 'manage/user/create',
          meta:{
            title: '新增用户',
          },
          name:'新增用户',
          component: userEdit
        },
        {
          path: 'manage/role/index',
          meta:{
            title: '角色管理',
          },
          name:'角色管理',
          component: roleIndex
        },
        {
          path: 'manage/role/create',
          meta:{
            title: '新增角色',
          },
          name:'新增角色',
          component: roleEdit
        },
        {
          path: 'manage/role/update',
          meta:{
            title: '修改角色',
          },
          name:'修改角色',
          component: roleEdit
        },
        {
          path: 'manage/role/permission',
          meta:{
            title: '维护角色权限',
          },
          name:'维护角色权限',
          component: rolePermission
        },
        {
          path: 'manage/permission/create',
          meta:{
            title: '新增资源',
          },
          name:'新增资源',
          component: permissionEdit
        },
        {
          path: 'manage/permission/update',
          meta:{
            title: '修改资源',
          },
          name:'修改资源',
          component: permissionEdit
        },
        {
          path: 'manage/permission/index',
          meta:{
            title: '权限管理',
          },
          name:'权限管理',
          component: permissionIndex
        },
        {
          path: 'manage/log/index',
          meta:{
            title: '日志记录',
          },
          name:'日志记录',
          component: logIndex
        }
      ]
    }
  ]
})

