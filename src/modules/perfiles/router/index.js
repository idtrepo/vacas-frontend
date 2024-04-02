export default {
    path: '/perfiles',
    name: 'perfiles',
    component: () => import('@/modules/perfiles/layouts/PerfilesLayout.vue'),
    children: [
        {
            path: '',
            name: 'perfiles-listado',
            component: () => import('@/modules/perfiles/views/PerfilesView.vue')
        }
    ]
}