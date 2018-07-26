// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import lamboUi from 'lambo-ui';
import iView from 'iview';
import App from './App';
import router from './router/index.js';
import 'iview/dist/styles/iview.css';
import 'lambo-ui/src/styles/global.less';
import dynamicRoutes from './router/dynamicRoutes.js';

Vue.use(iView);
Vue.use(lamboUi);

Vue.config.productionTip = false

Vue.prototype.recursionRouter = function(userRouter = [], allRouter = []) {
  var realRoutes = []
  allRouter.forEach((v, i) => {
    userRouter.forEach((item, index) => {
      if (item.name === v.name) {
        if (item.children && item.children.length > 0) {
          v.children = this.recursionRouter(item.children, v.children)
        }
        realRoutes.push(v)
      }
    })
  })
  console.log("realRoutes="+JSON.stringify(realRoutes));
  return realRoutes;
}
Vue.prototype.addRoutes = function(userRouter = []){
  console.log("dynamicRoutes="+JSON.stringify(dynamicRoutes[0].children));
  let routes = this.recursionRouter(userRouter, dynamicRoutes[0].children);
  console.log("routes="+JSON.stringify(routes));
  /*  初始路由 */
  let initialRoutes = router.options.routes;
  console.log("initialRoutes="+JSON.stringify(initialRoutes));
  /*  动态添加路由 */
  router.addRoutes(routes);
}

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

