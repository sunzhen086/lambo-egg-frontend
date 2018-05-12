import Vue from 'vue'
import iView from 'iview';
Vue.use(iView);
import Router from 'vue-router'
import login from '@/components/login/login';
import nav from '@/components/nav';
import restsetting from '@/components/restsetting/restsetting';

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
      component: nav,
      children:[
        {
          path: '/rest-setting',
          name: '服务定义',
          component: restsetting
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
