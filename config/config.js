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
      path: '/test',
      component: './Context',
    },
    {
      path: '/login',
      component: './Login',
    },
    {
      path: '/',
      component: '../layout',
      Routes: ['src/pages/Authorized'],
      routes: [
        {
          path: '/',
          component: './List',
        },
        {
          path: '/user',
          component: './User',
        }
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