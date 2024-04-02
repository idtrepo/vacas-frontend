export default {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('@/modules/usuarios/layouts/UsuariosLayout.vue'),
    children: [
        {
            path: '',
            name: 'usuarios-listado',
            component: () => import('@/modules/usuarios/views/UsuariosView.vue')
        }
    ]
}