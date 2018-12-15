export default {
  plugins: [
    [
      'umi-plugin-react', {
      antd: true,
      dva: true,
    }],
  ],
  routes: [
    {
      path: '/login',
      component: 'login',
    },
    {
      path: '/',
      component: '../layout',
      routes: [
        {
          path: '/',
          component: 'list',
        },
        {
          path: '/dashboard',
          routes: [
            {path: '/dashboard/analysis', component: 'Dashboard/Analysis'},
            {path: '/dashboard/monitor', component: 'Dashboard/Monitor'},
            {path: '/dashboard/workplace', component: 'Dashboard/Workplace'},
          ],
        },
      ],
    },
  ],
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8081',
      changeOrigin: true,
    },
  },
}