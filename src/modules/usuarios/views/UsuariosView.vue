<script setup>
import { ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import useUsuariosStore from '../stores/useUsuariosStore';
import { DURACION_MENSAJE_TOAST } from '@/modules/global/helpers/constantes';


//Dependencias
const toast = useToast();
const usuariosStore = useUsuariosStore();
const { usuarios, hayUsuarios, nuevoUsuario } = storeToRefs(usuariosStore);


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


//Editar usuario
const usuarioEditar = ref(null);

const reiniciarUsuarioEditar = () => {
  usuarioEditar.value = null;
  obtenerUsuarios();
}

const seleeccionarUsuario = (usuarioSeleccionado) => {
  console.log(usuarioSeleccionado);
  usuarioEditar.value = usuarioSeleccionado;
}
</script>

<template>
  <BaseListado>
    <template #titulo>
      <span class="text-emerald-900 text-3xl uppercase font-bold mr-2">usuarios</span>
      <i class="fa-solid fa-user text-2xl text-emerald-900"></i>
    </template>
    <template #listado>
      <CartaUsuario
        @seleccionar="seleeccionarUsuario"
        v-for="usuario in usuarios"
        :key="usuario.id"
        :elemento="usuario">
        <template #icono>
          <i class="fa-solid fa-user"></i>
        </template>
        <template #primer-texto>
          {{ usuario.nombre }}
        </template>
        <template #segundo-texto>
          {{ usuario.apellido }}
        </template>
      </CartaUsuario>
    </template>
    <template #formulario>
      <UsuarioForm 
        :editar="usuarioEditar"
        @reiniciar="reiniciarUsuarioEditar"/>
    </template>
  </BaseListado>
  
  <Toast/>
</template>
