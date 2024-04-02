export default {
    path: '/mapas',
    name: 'mapas',
    component: () => import('@/modules/mapas/layouts/MapasLayout.vue'),
    children: [
        {
            path: '',
            name: 'mapas-inicio',
            component: () => import('@/modules/mapas/views/MapaView.vue')
        }
    ]
}