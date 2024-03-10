export default [
  {
    path: '/zgloszenia',
    name: 'reports',
    component: () =>
      import(
        /* webpackChunkName: "Blank" */ '@/view/pages/reports/reports-index.vue'
      ),
    children: [
      {
        path: 'wszystkie',
        name: 'reports-all',
        component: () => import('@/view/pages/reports/reports-all.vue'),
      },
      {
        path: ':id',
        name: 'single-report',
        component: () => import('@/view/pages/reports/id.vue'),
      },
    ],
  },

  {
    path: '/produkty',
    name: 'products',
    component: () =>
      import(
        /* webpackChunkName: "Blank" */ '@/view/pages/products/products-index.vue'
      ),
    children: [
      {
        path: 'wszystkie',
        name: 'products-all',
        component: () => import('@/view/pages/products/products-all.vue'),
      },
    ],
  },
  {
    path: '/akcesoria',
    name: 'accesories',
    component: () =>
      import(
        /* webpackChunkName: "Blank" */ '@/view/pages/accesories/accesories-index.vue'
      ),
    children: [
      {
        path: 'wszystkie',
        name: 'accesories-all',
        component: () => import('@/view/pages/accesories/accesories-all.vue'),
      },
    ],
  },
];
