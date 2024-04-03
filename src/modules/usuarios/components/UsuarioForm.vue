<script setup>
import { ref, computed, watch, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import InputSwitch from "primevue/inputswitch";
import Button from "primevue/button";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import Dropdown from 'primevue/dropdown';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import useUsuariosStore from '../stores/useUsuariosStore';
import { DURACION_MENSAJE_TOAST } from '@/modules/global/helpers/constantes';


//Dependencias 
const toast = useToast();
const usuariosStore = useUsuariosStore();
const { infoUsuario, editar } = storeToRefs(usuariosStore);


//Editar usuarios
const editarPassword = ref(false);
const esEdicion = computed(() => editar.value !== null);

const asignarDatosUsuarioEditar = () => {
  const { nombre, apellido, id, correo } = infoUsuario.value;
  usuario.value.id = id;
  usuario.value.nombre = nombre;
  usuario.value.apellido = apellido;
  usuario.value.correo = correo;
}

watch(editar, newValue => {
  if(newValue !== null){
    asignarDatosUsuarioEditar();
  }else{
    reiniciarValoresUsuario();
  }
})

const editarUsuario = async() => {
  if(!verificarPasswordCorrecto()) return;

  try{
    const { id } = usuario.value;
    const res = await usuariosStore.editarUsuario(id, usuario);
    reiniciarValoresUsuario();
    usuariosStore.obtenerUsuarios();
    toast.add({
      severity: 'success',
      summary: 'Usuario editado',
      detail: 'El usuario se ha editado exitosamente',
      life: DURACION_MENSAJE_TOAST
    });
  }catch(error){
    console.error(error);
    toast.add({
      severity: 'warn',
      summary: 'Error de edicion',
      detail: 'El usuario no pudo editarse, verifique los datos de creacion',
      life: DURACION_MENSAJE_TOAST
    });
  }
}


//Crear usuario
const usuario = ref({
  id: null,
  nombre: '',
  apellido: '',
  correo: '',
  password: '',
});
const perfiles = ref([
  { name: 'Operador', code: 1 },
  { name: 'Supervisor', code: 2 },
  { name: 'Administrador', code: 3 },
])
const verificacionPassword = ref('');
const datosCompletos = computed(() => (
    !!usuario.value.nombre
    && !!usuario.value.apellido
    && !!usuario.value.correo
    && !!usuario.value.password
));
const passwordCorrecto = computed(() => (
  usuario.value.password === verificacionPassword.value
))

const reiniciarValoresUsuario = () => {
  usuario.value.id = null;
  usuario.value.nombre = '';
  usuario.value.apellido = '';
  usuario.value.correo = '';
  usuario.value.password = '';
  verificacionPassword.value = '';
};

const verificarDatosCompletos = () => {
  if(!datosCompletos.value){
    toast.add({
      severity: 'warn',
      summary: 'Datos incompletos',
      detail: 'Debe de llenar todos los campos para crear al usuario',
      life: DURACION_MENSAJE_TOAST
    });

    return false; 
  }

  return true;
}

const verificarPasswordCorrecto = () => {
  if(!passwordCorrecto.value){
    toast.add({
      severity: 'warn',
      summary: 'Contraseña incorrecta',
      detail: 'La contraseña de verificacion no coincide',
      life: DURACION_MENSAJE_TOAST
    });

    return false;
  }

  return true;
}

const crearUsuario = async() => {
  if(!verificarDatosCompletos() || !verificarPasswordCorrecto()) return;

  try{
    const res = await usuariosStore.crearUsuario(usuario);
    reiniciarValoresUsuario();
    usuariosStore.obtenerUsuarios();
    toast.add({
      severity: 'success',
      summary: 'Usuario creado',
      detail: 'El usuario se ha creado exitosamente',
      life: DURACION_MENSAJE_TOAST
    });
  }catch(error){
    console.error(error);
    toast.add({
      severity: 'warn',
      summary: 'Error de creacion',
      detail: 'El usuario no pudo crearse, verifique los datos de creacion',
      life: DURACION_MENSAJE_TOAST
    });
  }
}
</script>

<template>
  <article class="w-full">
    <header>

    </header>
    <section>
      <article class="mb-3">
        <p class="uppercase">nombre</p>
        <InputText v-model="usuario.nombre" class="w-full" :size="'small'"/>
      </article>
      <article class="mb-3">
        <p class="uppercase">apellido</p>
        <InputText v-model="usuario.apellido" class="w-full" :size="'small'"/>
      </article>
      <article class="mb-3">
        <p class="uppercase">correo</p>
        <InputText v-model="usuario.correo" class="w-full" :size="'small'"/>
      </article>
      <article v-if="esEdicion" class="my-5 flex justify-between items-center w-full">
        <p class="uppercase">¿Editar contraseña?</p>
        <InputSwitch v-model="editarPassword"/>
      </article>
      <!-- <article>
        <p class="uppercase">perfil</p>
        <Dropdown :options="perfiles" option-label="name" class="w-full"/>
      </article> -->
      <section v-if="!esEdicion || (esEdicion && editarPassword)">
        <article class="mb-3">
          <p class="uppercase">contraseña</p>
          <Password v-model="usuario.password" :feedback="false" class="w-full" :size="'small'"/>
        </article>
        <article class="mb-3">
          <p class="uppercase">verifique contraseña</p>
          <Password v-model="verificacionPassword" :feedback="false" class="w-full" :size="'small'"/>
        </article>
      </section>
    </section>
    <footer class="pt-3">
      <Button v-if="esEdicion" @click="editarUsuario" label="Guardar" class="w-full"/>
      <Button v-else @click="crearUsuario" label="Crear" class="w-full"/>
    </footer>
  </article>

  <Toast/>
</template>

<style scoped>

</style>