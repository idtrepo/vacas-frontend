<script setup>
import { useRouter } from 'vue-router'
import useAuthStore from "@/modules/auth/stores/useAuthStore.js";


//Dependencias
const router = useRouter();
const authStore = useAuthStore();


//Propiedades
const { rutas } = defineProps({
  rutas: {
    type: Array,
    required: true
  }
});

//Cerrar sesion
const cerrarSesion = () => {
  authStore.cerrarSesion();
  router.push({ name: 'autenticacion-login' });
}
</script>

<template>
  <div class="h-full flex p-7 border-r shadow-sm bg-slate-50/75">
    <section class="flex flex-col justify-around items-center w-full">
      <router-link
          v-for="{ ruta, icono } in rutas"
          :to="{ name: ruta }">
        <i class="text-xl text-slate-400 hover:text-cyan-500 hover:cursor-pointer hover:scale-150 transition-all duration-200" :class="icono"></i>
      </router-link>
      <i @click="cerrarSesion" class="text-slate-400 hover:text-cyan-500 hover:cursor-pointer hover:scale-150 transition-all duration-200 fa-solid fa-door-open"></i>
    </section>
  </div>
</template>

<style scoped>
a.router-link-exact-active > i{
  color: rgb(6 182 212);
}
</style>