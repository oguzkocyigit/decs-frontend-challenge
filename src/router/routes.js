const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
      { path: '/home', component: () => import('pages/HomePage.vue') },
      { path: '/create', component: () => import('pages/CreatePage.vue') },
      { path: '/edit/:id', component: () => import('pages/CreatePage.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
