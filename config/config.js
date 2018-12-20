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