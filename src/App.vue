<script setup>
import { defineAsyncComponent } from 'vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import useAuthStore from "@/modules/auth/stores/useAuthStore.js";
import { DURACION_MENSAJE_TOAST } from './modules/global/helpers/constantes'; 
import rutas from './router/helpers/rutas';


//Dependencias
const authStore = useAuthStore();
const { sesionVigente } = storeToRefs(authStore)
const toast = useToast();

//Componentes
const Nav = defineAsyncComponent(() => import('@/modules/global/components/base/NavComponent.vue'));
const Loader = defineAsyncComponent(() => import('@/modules/global/components/loader/LoaderComponent.vue'));
const MainView = defineAsyncComponent(() => import('@/modules/global/views/base/MainView.vue'))


//Listado de rutas
const renovarSesion = async() => {
  try{
    const res = await authStore.renovarSesion();
  }catch(error){
    console.error(error);
    toast.add({
      life: DURACION_MENSAJE_TOAST,
      severity: 'info',
      summary: 'La sesion ha expirado',
      detail: 'La sesion ha llegado a su limite de tiempo, vuelva a iniciar sesion por favor'
    });
    authStore.cerrarSesion();
  }
}

onMounted(() => {
  authStore.verificarSesion();
  renovarSesion();
})
</script>

<template>
  <MainView>
    <template #nav>
      <Nav :rutas="rutas"/>
    </template>
    <template #contenido>
      <RouterView/>
    </template>
  </MainView>

  <!-- <Loader/> -->
  <Toast/>
</template>