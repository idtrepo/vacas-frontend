import {computed, ref, toValue, unref} from 'vue'
import {defineStore} from 'pinia'
import authService from "@/modules/auth/services/authService.js";


const ls = localStorage;


export default  defineStore('autenticacion', () => {
    //Inicio de sesion
    const accessToken = ref(null);
    const refreshToken = ref(null);
    const sesionVigente = computed(() => !!accessToken.value);

    const verificarSesion = () => {
        accessToken.value = ls.getItem('access');
        refreshToken.value = ls.getItem('refresh');
    }

    const cerrarSesion = () => {
        accessToken.value = null;
        refreshToken.value = null;
        ls.clear();
    }

    const asignarTokens = ({ access, refresh }) => {
        accessToken.value = access;
        refreshToken.value = refresh;
    }

    const guardarTokenLS = ({ access, refresh }) => {
        ls.setItem('access', access);
        ls.setItem('refresh', refresh);
    }

    const guardarTokens = (tokens) => {
        asignarTokens(tokens);
        guardarTokenLS(tokens);
    }

    const iniciarSesion = async (dataUsuario) => {
      try{
        const res = await authService.iniciarSesion(unref(dataUsuario));
        guardarTokens(res.data);

        return res.data;
      }catch(error){
        throw error;
      }
    };

    //Actualizar sesion
    const renovarTokenAccess = ({ access }) => {
        accessToken.value = access;
        ls.setItem('access', access);
    }

    const renovarSesion = async () => {
        try{
            const res = await authService.renovarSesion(unref(refreshToken));
            const data = await res.data;
            renovarTokenAccess(data);

            return data;
        }catch (error){
            throw error;
        }
    }


    return {
        accessToken,
        refreshToken,
        sesionVigente,
        verificarSesion,
        cerrarSesion,
        iniciarSesion,

        renovarSesion,
        renovarTokenAccess,
    }
})