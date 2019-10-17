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
      target: 'http://10.64.146.16:10241',
      changeOrigin: true,
    },
  },
}