import { ref, computed, toValue, unref } from 'vue'
import { defineStore } from 'pinia'
import usuariosService from '../services/usuariosService';
import useRequest from '@/modules/global/composables/request/useRequest';


export default defineStore('usuarios', () => {
    //Dependencias
    const request = useRequest(usuariosService);


    //Obtener listado de usuarios
    const usuarios = ref([]);
    const hayUsuarios = computed(() => usuarios.value.length > 0);

    const asignarUsuarios = (dataUsuarios) => {
        usuarios.value = dataUsuarios;
    }

    const obtenerUsuarios = async(params=null) => {
        try{
            const data = await request.obtenerElementos(params, true);
            asignarUsuarios(data);

            return data;
        }catch(error){
            console.error(error);
            throw error;
        }
    }


    //Obtener usuario


    //Crear usuario
    const crearUsuario = async(dataUsuario) => {
        console.log('creando usuario desde el store');
        try{
            const data = await request.crearElemento(unref(dataUsuario), true);

            return data;
        }catch(error){
            console.error(error);
            throw error;
        }
    }


    //Editar usuario
    const infoUsuario = ref(null);
    const editar = computed(() => infoUsuario.value?.id ?? null);

    const editarUsuario = async(id, dataUsuario) => {
        try{
            const data = await request.editarElemento(id, unref(dataUsuario), true);

            reiniciarInfoUsuario();
            return data;
        }catch(error){
            throw error;
        }
    }

    const reiniciarInfoUsuario = () => {
        infoUsuario.value = null;
    }

    const asignarInfoUsuario = (dataUsuario) => {
        infoUsuario.value = dataUsuario;
    }

    return {
        usuarios,
        hayUsuarios,
        obtenerUsuarios,

        crearUsuario,

        editar,
        infoUsuario,
        reiniciarInfoUsuario,
        asignarInfoUsuario,
        editarUsuario,
    }
});