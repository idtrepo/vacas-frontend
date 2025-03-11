export default {
  path: "/usuarios",
  name: "usuarios",
  component: () => import("../layouts/UsuariosLayout.vue"),
  children: [
    {
      path: "",
      name: "usuarios-listado",
      component: () => import("../views/UsuariosListadoView.vue"),
    },
  ],
};
