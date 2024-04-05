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
import Paginator from 'primevue/paginator';


//Dependencias
const toast = useToast();
const usuariosStore = useUsuariosStore();
const { usuarios, mostrarPaginacion } = storeToRefs(usuariosStore);


//Componentes
const UsuarioCarta = defineAsyncComponent(() => import('@/modules/usuarios/components/listado/UsuarioComponent.vue'));
const UsuarioForm = defineAsyncComponent(() => import('@/modules/usuarios/components/form/UsuarioForm.vue'))

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


//Modificar usuarios
const editarUsuario = (dataUsuario) => {
  usuariosStore.asignarInfoUsuario(dataUsuario);
}
</script>

<template>
  <section class="vista">
    <header class="header shadow-md bg-gray-50 flex items-center justify-between pl-5">
      <article class="flex uppercase text-4xl font-bold text-lime-600">
        <i class="fa-solid fa-user mr-2"></i>
        <h2>usuarios</h2>
      </article>
    </header>
    <section class="contenido">
      <section class="listado px-8 pl-16">
        <header class="flex items-center justify-between py-5">
          <i class="fa-solid fa-list text-xl hover:cursor-pointer"></i>
          <Button 
            @click="usuariosStore.crearNuevoUsuario" 
            label="nuevo" 
            severity="info" 
            class="uppercase"/>
        </header>
        <section>
          <UsuarioCarta
              v-for="usuario in usuarios"
              :editar-elemento="() => editarUsuario(usuario)"
              :key="usuario.id">
              <template #icono>
                  <i class="fa-solid fa-user text-2xl"></i>
              </template>
              <template #primer-dato>
                  {{ usuario.nombre }} {{ usuario.apellido }}
              </template>
              <template #segundo-dato>
                  {{ usuario.correo }}
              </template>
          </UsuarioCarta>          
        </section>
        <footer>
          <Paginator v-if="mostrarPaginacion"/>
        </footer>
      </section>
      <section class="formulario px-8 pt-5">
        <UsuarioForm/>
      </section>
    </section>
  </section>
  
  <ConfirmDialog/>
  <Toast/>
</template>

<style scoped>
.vista{
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  width: 100%;
  height: 100%;
}
.header{
  grid-column: 1 / 13;
  grid-row: 1 / 3;
  border-bottom: 10px rgb(101, 163, 13, 0.7) solid;
}
.contenido{
  grid-column: 1 / 13;
  grid-row: 3 / 13;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 100%;
  height: 100%;
}
.listado{
  grid-column: 1 / 9;
}
.formulario{
  grid-column: 9 / 13;
}

</style>