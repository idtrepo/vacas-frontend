import { createRouter, createWebHistory } from "vue-router";
import routerAuth from "@/modules/auth/router";
import routerVacas from "@/modules/vacas/router";
import routerUsuarios from "@/modules/usuarios/router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "inicio",
      redirect: { name: "autenticacion-login" },
    },
    routerAuth,
    routerVacas,
    routerUsuarios,
  ],
});

// router.beforeEach(authGuard);

export default router;
