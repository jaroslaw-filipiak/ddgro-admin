import PageRoutes from './PageRoutes';

const routes = [
  {
    path: '',
    name: 'dashboard',
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ '@/view/dashboard/Dashboard.vue'
      ),
  },
  ...PageRoutes,
];

export default routes;
