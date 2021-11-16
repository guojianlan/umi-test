import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout:{
    title:"test"
  },
  mfsu:{},
  routes: [
    {
      path: '/permission',
      name: '权限管理',
      routes: [{
        path: '/permission',redirect:'/permission/list',
      },{
        name: '权限列表', path: '/permission/list', component: '@/pages/Permission'
      }]
    },
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
});
