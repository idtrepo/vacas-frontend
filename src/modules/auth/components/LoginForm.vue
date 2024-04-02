<template>
    <form 
        @submit.prevent="iniciarSesion"
        class="w-1/3 bg-slate-50 p-5 rounded-md shadow-md shadow-slate-100">
        <header class="text-center mb-6">
            <h3 class="text-emerald-900 text-3xl uppercase font-bold">inicio de sesion</h3>
        </header>
        <section class="mb-7">
            <article class="mb-5">
                <article class="mb-2 flex items-center text-slate-500">
                    <p class="mr-2 uppercase">correo</p>
                    <i class="fa-solid fa-envelope"></i>
                </article>
              <InputText
                  v-model="usuario.correo"
                  type="text"
                  class="w-full"
                  :placeholder="PLACE_CORREO"/>
            </article>
            <article>
                <article class="mb-2 flex items-center text-slate-500">
                    <p class="mr-2 uppercase">password</p>
                    <i class="fa-solid fa-lock"></i>
                </article>
              <Password
                  v-model="usuario.password"
                  :feedback="false"
                  :placeholder="PLACE_PASSWORD"
                  class="w-full"
                  toggleMask/>
            </article>
        </section>
        <footer>
          <Button @click="iniciarSesion" label="Ingresar" class="w-full"/>
        </footer>
    </form>

    <Toast/>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import useAuthStore from "@/modules/auth/stores/useAuthStore.js";
import { DURACION_MENSAJE_TOAST } from '@/modules/global/helpers/constantes';


const PLACE_CORREO = 'Introduzca su correo';
const PLACE_PASSWORD = 'Introduzca su contraseña';



//Dependencias
const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();


//Iniciar sesion
const usuario = ref({
  correo: '',
  password: ''
});
const datosCompletos = computed(() => (
    !!usuario.value.correo && !!usuario.value.password
))

const reiniciarDatosUsuario = () => {
  usuario.value.correo = '';
  usuario.value.password = '';
}

const validarDatos = () => {
  if(datosCompletos.value) return true;

  toast.add({
    severity: 'warn',
    detail: 'Debe de llenar todos los campos para acceder',
    summary: 'Datos faltantes',
    life: DURACION_MENSAJE_TOAST
  });

  return false;
}

const errorAutenticacion = () => {
  toast.add({
    severity: 'error',
    detail: 'Las credenciales ingresadas son invalidas o incorrectas',
    summary: 'Error de autenticacion',
    life: DURACION_MENSAJE_TOAST
  });
}

const iniciarSesion = async() => {
    if(!validarDatos()) return;

    try{
        const res = await authStore.iniciarSesion(usuario);
        toast.add({
          life: DURACION_MENSAJE_TOAST,
          severity: 'success',
          summary: 'Inicio de sesion exitoso',
          detail: 'Bienvenido de nuevo'
        })
        reiniciarDatosUsuario();
        router.push({ name: 'estadisticas-inicio' });
    }catch(error){
      console.log(error);
      errorAutenticacion();
    }
}
</script>