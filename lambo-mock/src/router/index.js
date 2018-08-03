import Vue from 'vue'
import iView from 'iview';
Vue.use(iView);
import Router from 'vue-router'
import login from '@/components/login/login';
import mainnav from '@/components/main-nav';
import mocksetting from '@/components/mocksetting/mocksetting';
import mocktest from '@/components/mocktest/mocktest';

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
          path: '/mock-setting',
          name: '服务定义',
          component: mocksetting
        },
        {
          path: '/mock-test',
          name: '服务测试',
          component: mocktest
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
