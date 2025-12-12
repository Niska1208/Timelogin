const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: 'daylogs', component: () => import('pages/DayLogsPage.vue'), meta: { requiresAuth: true } },
      { path: 'day/:id', component: () => import('pages/DayView.vue'), meta: { requiresAuth: true } },
      { path: 'login', name: 'LoginPage', component: () => import('pages/LoginPage.vue') },
      { path: 'register', name: 'RegisterPage', component: () => import('pages/RegisterPage.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
