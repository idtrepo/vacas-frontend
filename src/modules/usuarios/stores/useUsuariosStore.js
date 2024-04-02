import { ref, computed, toValue, unref } from 'vue'
import { defineStore } from 'pinia'
import usuariosService from '../services/usuariosService';

export default defineStore('usuarios', () => {
    //Obtener listado de usuarios
    const usuarios = ref([]);
    const hayUsuarios = computed(() => usuarios.value.length > 0);

    const asignarUsuarios = ({ data: dataUsuarios }) => {
        usuarios.value = dataUsuarios;

        console.log('listado de usuarios');
        console.log(usuarios.value);
    }

    const obtenerUsuarios = async(params=null) => {
        try{
            const res = await usuariosService.obtenerElementos(params);
            const data = await res.data;

            asignarUsuarios(data);
            return data;
        }catch(error){
            console.error(error);
            throw error;
        }
    }


    //Obtener usuario


    //Crear usuario
    const nuevoUsuario = ref(true);

    const crearNuevoUsuario = () => {
        nuevoUsuario.value = true;
        reiniciarInfoUsuario();
    }

    const crearUsuario = async(data) => {
        try{
            const res = await usuariosService.crearElemento(unref(data));
        }catch(error){
            console.error(error);
            throw error;
        }
    }


    //Obtener info usuario 
    const infoUsuario = ref(null);

    const reiniciarInfoUsuario = () => {
        infoUsuario.value = null;
    }

    const asignarInfoUsuario = (dataUsuario) => {
        nuevoUsuario.value = false;
        infoUsuario.value = dataUsuario;
    }

    const editarUsuario = async(id, data) => {
        try{
            const res = await usuariosService.editarElemento(id, unref(data));
            return res;
        }catch(error){
            throw error;
        }
    }

    return {
        usuarios,
        hayUsuarios,
        obtenerUsuarios,

        nuevoUsuario,
        crearNuevoUsuario,
        crearUsuario,

        infoUsuario,
        asignarInfoUsuario,
        editarUsuario,
    }
});