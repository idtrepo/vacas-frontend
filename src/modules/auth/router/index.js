export default {
    path: '/autenticacion',
    name: 'autenticacion',
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
        {
            path: 'login',
            name: 'autenticacion-login',
            component: () => import('../views/LoginView.vue')
        }
    ]
}