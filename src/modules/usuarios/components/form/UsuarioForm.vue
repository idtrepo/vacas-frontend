<script setup>
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import useUsuariosStore from '../../stores/useUsuariosStore';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";


//Dependencias
const usuariosStore = useUsuariosStore();
const { nuevoUsuario, editarDatosUsuario, infoUsuario } = storeToRefs(usuariosStore);
const toast = useToast();


//Crear usuario
const usuario = ref({
    id: null,
    nombre: '',
    apellido: '',
    correo: '',
    password: ''
})
const idUsuario = computed(() => usuario.value.id)
const passwordConfirmacion = ref('');
const passwordCoincidencia = computed(() => {
    if(!usuario.value.password && !passwordConfirmacion.value) return false;
    return usuario.value.password === passwordConfirmacion.value
});
const datosCompletos = computed(() => 
    !!usuario.value.nombre
    && !!usuario.value.apellido
    && !!usuario.value.correo
    && !!usuario.value.password
)

const reiniciarDatosUsuario = () => {
    usuario.value.id = null;
    usuario.value.nombre = '';
    usuario.value.apellido = '';
    usuario.value.correo = '';
    usuario.value.password = '';
    passwordConfirmacion.value = '';
    editarPassword.value = false;
    editarPerfil.value = false;
}

const validarPassword = () => {
    console.log(passwordCoincidencia.value)
    if(!passwordCoincidencia.value){
        toast.add({
            life: 5000,
            severity: 'warn',
            summary: 'Error en contraseña',
            detail: 'Las contraseñas no coinciden o no han sido ingresadas, favor de verificar',
        })
        return false;
    }

    return true;
}

const validarDatosCompletos = () => {
    console.log(datosCompletos.value)
    if(!datosCompletos.value){
        toast.add({
            life: 5000,
            severity: 'warn',
            summary: 'Datos incompletos',
            detail: 'Debe de ingresar todos los datos del formulario',
        })
        return false;
    }

    return true;
}

const crearUsuario = async() => {
    if(!validarDatosCompletos() || !validarPassword()) return;

    try{
        const res = await usuariosStore.crearUsuario(usuario);
        toast.add({
            severity: 'success',
            summary: 'Usuario creado de forma exitosa',
            detail: 'El usuario se ha creado sin ningun problema',
            life: 5000
        });
        reiniciarDatosUsuario();
        await usuariosStore.obtenerUsuarios();
    }catch(error){
        console.error(error);
        toast.add({
            severity: 'error',
            summary: 'Error al crear al nuevo usuario',
            detail: 'El usuario no ha podido crearse',
            life: 5000
        });
    }
}

watch(nuevoUsuario, newValue => {
    if(newValue) reiniciarDatosUsuario();
})

//Editar usuarios
const editarPerfil = ref(false);
const editarPassword = ref(false);
const mensajeFormulario = computed(() => editarDatosUsuario.value ? 'editar usuario' : 'nuevo usuario');

const validarPasswordEditar = () => {
    if(!passwordCoincidencia.value && editarPassword.value){
        toast.add({
            life: 5000,
            severity: 'warn',
            summary: 'Error en contraseña',
            detail: 'Las contraseñas no coinciden o no han sido ingresadas, favor de verificar',
        })
        return false
    }

    return true;
}

const editarUsuario = async() => {
    if(!validarPasswordEditar()) return;

    try{
        const res  = await usuariosStore.editarUsuario(idUsuario.value, usuario);
        toast.add({
            severity: 'success',
            summary: 'Usuario editado de forma exitosa',
            detail: 'El usuario ha sido modificado sin ningun problema',
            life: 5000
        });
        reiniciarDatosUsuario();
        usuariosStore.reiniciarInfoUsuario();
        await usuariosStore.obtenerUsuarios();
    }catch(error){
        console.error(error);
        toast.add({
            severity: 'error',
            summary: 'Error al editar al usuario seleccionado',
            detail: 'El usuario no ha podido modificarse',
            life: 5000
        });
    }
}

const asignarDatosUsuario = () => {
    console.log('HOLAAAAAAAAAAAAAAAAAA')
    console.log(infoUsuario.value);
    const { id, nombre, apellido, correo } = infoUsuario.value;
    usuario.value.id = id;
    usuario.value.nombre = nombre;
    usuario.value.apellido = apellido
    usuario.value.correo = correo;
}

watch(editarDatosUsuario, newValue => {
    if(!newValue) reiniciarDatosUsuario();
    else asignarDatosUsuario(newValue);
})
</script>

<template>
    <article class="bg-slate-50 rounded-md p-3 pb-4 shadow-md">
        <header class="flex uppercase mb-3 font-bold text-lime-700">
            <h2>{{ mensajeFormulario }}</h2>
        </header>
        <section class="mb-5">
            <section class="flex justify-between mb-3">
                <article class="pr-3">
                    <p class="uppercase text-sm">nombre</p>
                    <InputText v-model="usuario.nombre" class="w-full" type="text" size="small"/>
                </article>
                <article class="pl-3">
                    <p class="uppercase text-sm">apellido</p>
                    <InputText v-model="usuario.apellido" class="w-full" type="text" size="small"/>
                </article>
            </section>
            <article class="mb-3">
                <p class="uppercase text-sm">correo</p>
                <InputText v-model="usuario.correo" class="w-full" type="text" size="small"/>
            </article>
            <section v-if="editarDatosUsuario" class="flex justify-around items-center mb-3">
                <article>
                    <Checkbox v-model="editarPerfil" :binary="true" />
                    <span class="ml-2 uppercase font-bold text-sm text-slate-500">perfil</span>
                </article>
                <article>
                    <Checkbox v-model="editarPassword" :binary="true" />
                    <span class="ml-2 uppercase font-bold text-sm text-slate-500">password</span>
                </article>
            </section>
            <article v-if="!editarDatosUsuario || (editarDatosUsuario && editarPerfil)" class="mb-3">
                <p class="uppercase text-sm">perfil</p>
                <Dropdown class="w-full"/>
            </article>
            <section v-if="!editarDatosUsuario || (editarDatosUsuario && editarPassword)"> 
                <article class="mb-3">
                    <p class="uppercase text-sm">password</p>
                    <Password v-model="usuario.password" class="w-full" :feedback="false"/>
                </article>
                <article>
                    <p class="uppercase text-sm">verificar password</p>
                    <Password v-model="passwordConfirmacion" class="w-full" :feedback="false"/>
                </article>
            </section>
        </section>
        <footer>
            <Button @click="editarUsuario" v-if="editarDatosUsuario" label="guardar" class="uppercase w-full"/>
            <Button @click="crearUsuario" v-else label="crear" class="uppercase w-full"/>
        </footer>
    </article>
</template>