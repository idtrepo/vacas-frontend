export default {
    path: '/estadisticas',
    name: 'estadisticas',
    component: () => import('../layouts/EstadisticasLayout.vue'),
    children: [
        {
            path: '',
            name: 'estadisticas-inicio',
            component: () => import('../views/InicioView.vue')
        }
    ]
}