export default {
  path: "/vacas",
  name: "vacas",
  component: () => import("@/modules/vacas/layouts/VacasLayout.vue"),
  children: [
    {
      path: "",
      name: "vacas-listado",
      component: () => import("../views/VacasListadoView.vue"),
    },
    {
      path: ":id",
      name: "vacas-data",
      component: () => import("../views/VacasData.vue"),
    },
    {
      path: ":id/menu",
      name: "vacas-listado-menu",
      component: () => import("../views/VacasListadoMenu.vue"),
    },
    {
      path: "mapas",
      name: "vacas-listado-mapas",
      component: () => import("../views/VacasListadoMapasView.vue"),
    },
  ],
};
