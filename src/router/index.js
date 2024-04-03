import { createRouter, createWebHistory } from 'vue-router'
import routerAuth from '@/modules/auth/router'
import routerUsuarios from '@/modules/usuarios/router'
import routerEstadisticas from '@/modules/estadisicas/router'
import routerMapas from '@/modules/mapas/router'
import routerPerfiles from '@/modules/perfiles/router'
import routerDispositivos from '@/modules/dispositivos/router'
import authGuard from "@/router/guards/authGuard.js";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      redirect: { name: 'autenticacion-login' }
    },
    routerAuth,
    routerUsuarios,
    routerEstadisticas,
    routerMapas,
    routerPerfiles,
    routerDispositivos,
  ]
})

// router.beforeEach(authGuard);

export default router
