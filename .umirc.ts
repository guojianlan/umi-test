import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    title: 'test',
  },
  mfsu: {},
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000/',
      pathRewrite: { '^/api': '' },
    },
    '/admin': {
      target: 'http://127.0.0.1:3000/',
      pathRewrite: { '^/admin': '/admin' },
    },
  },
  routes: [
    {
      path: '/login',
      layout: false,
      component: '@/pages/Login',
    },
    {
      path: '/permission',
      name: '权限管理',
      routes: [
        {
          path: '/permission',
          redirect: '/permission/list',
          access: 'canReadTest',
        },
        {
          name: '权限列表',
          path: '/permission/list',
          component: '@/pages/Permission',
          access: 'canReadTest',
        },
        {
          name: '权限item',
          path: '/permission/item',
          component: '@/pages/Permission',
          access: 'canReadItem',
        },
      ],
    },
    {
      component: '@/pages/404',
    },
  ],
  fastRefresh: {},
});
