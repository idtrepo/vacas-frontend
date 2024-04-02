export default {
    path: '/dispositivos',
    name: 'dispositivos',
    component: () => import('@/modules/dispositivos/layouts/DispositivosLayout.vue'),
    children: [
        {
            path: '',
            name: 'dispositivos-listado',
            component: () => import('@/modules/dispositivos/views/ListadoView.vue')
        }
    ]
}