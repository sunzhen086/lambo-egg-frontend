import Vue from 'vue'
import iView from 'iview';
Vue.use(iView);
import Router from 'vue-router'
import login from '@/components/login/login';
import mainnav from '@/components/main-nav';
import restsetting from '@/components/restsetting/restsetting';
import resttest from '@/components/resttest/resttest';
import help from '@/components/help/help';
import SettingHelp from '@/components/help/components/SettingHelp';
import SqlHelp from '@/components/help/components/SqlHelp';
import PreFunction from '@/components/help/components/PreFunction';
import BuiltInVariable from '@/components/help/components/BuiltInVariable';

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
      path: '/nav',
      name: '导航',
      component: mainnav,
      children:[
        {
          path: '/rest-setting',
          name: '服务定义',
          component: restsetting
        },
        {
          path: '/rest-test',
          name: '服务测试',
          component: resttest
        },
        {
          path: '/help',
          name: '帮助与设置',
          component: help,
          redirect: {name:'服务配置帮助'},
          children:[
            {
              path: 'setting',
              name: '服务配置帮助',
              component: SettingHelp,
            },
            {
              path: 'sql',
              name: 'SQL模板帮助',
              component: SqlHelp,
            },
            {
              path: 'function',
              name: '预处理函数',
              component: PreFunction,
            },
            {
              path: 'variable',
              name: '内置变量',
              component: BuiltInVariable,
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

export default router;
