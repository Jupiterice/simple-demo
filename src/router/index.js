import Vue from 'vue';
import VueRouter from 'vue-router';

import IndexPage from '../pages/index';

/**
 * 使用组件
 */
Vue.use(VueRouter);
/**
 *
 * @type {*[]}
 */
const routers = [
  {
    alias: '/',
    path: '/IndexPage',
    name: 'IndexPage',
    component: IndexPage,
  },
];

// 创建路由
const router = new VueRouter({
  routes: routers,
  mode: 'hash',
});
router.onError((error) => {
  console.error('router.error', error);
});
Array.isEmpty = array => !array || !Array.isArray(array) || array.length === 0;

// 路由守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | simple-demo` : 'simple-demo';
  if (Array.isEmpty(to.matched)) {
    console.log(to.path, 'not found');
    next(false);
    return;
  }
  next();
});
router.afterEach(() => {});

export default router;
