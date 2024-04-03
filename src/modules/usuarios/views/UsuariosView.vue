<script setup>
import { ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import ConfirmDialog from 'primevue/confirmdialog';
import useUsuariosStore from '../stores/useUsuariosStore';
import { DURACION_MENSAJE_TOAST } from '@/modules/global/helpers/constantes';
import Button from 'primevue/button';


//Dependencias
const toast = useToast();
const usuariosStore = useUsuariosStore();
const { usuarios } = storeToRefs(usuariosStore);


//Componentes
const UsuarioForm = defineAsyncComponent(() => import('@/modules/usuarios/components/UsuarioForm.vue'))
const BaseListado = defineAsyncComponent(() => import('@/modules/global/views/base/BaseListadoView.vue'));
const CartaUsuario = defineAsyncComponent(() => import('@/modules/global/components/listado/CartaComponent.vue'))

//Obtener usuarios
const obtenerUsuarios = async() => {
  try{
    const res = await usuariosStore.obtenerUsuarios();
  }catch(error){
    console.error(error);
  }
}

onMounted(() => {
  obtenerUsuarios();
})
</script>

<template>
  <BaseListado>
    <template #titulo>
      <span class="text-emerald-900 text-3xl uppercase font-bold mr-2">usuarios</span>
      <i class="fa-solid fa-user text-2xl text-emerald-900"></i>
    </template>
    <template #elemento>
      <Button @click="usuariosStore.reiniciarInfoUsuario" label="nuevo" severity="info" class="w-full uppercase"/>
    </template>
    <template #listado>
      <CartaUsuario
        v-for="usuario in usuarios"
        :key="usuario.id"
        :elemento="usuario"
        :asignar-info="usuariosStore.asignarInfoUsuario">
        <template #icono>
          <i class="fa-solid fa-user"></i>
        </template>
        <template #primer-texto>
          {{ usuario.nombre }}
        </template>
        <template #segundo-texto>
          {{ usuario.apellido }}
        </template>
        <template #tercer-texto>
          {{ usuario.correo }}
        </template>
      </CartaUsuario>
    </template>
    <template #formulario>
      <UsuarioForm />
    </template>
  </BaseListado>
  
  <ConfirmDialog/>
  <Toast/>
</template>
