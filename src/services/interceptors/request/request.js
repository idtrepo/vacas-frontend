import { storeToRefs } from 'pinia'
import axios from 'axios';
import useAuthStore from "@/modules/auth/stores/useAuthStore.js";


const baseURL = import.meta.env.VITE_BASE_URL;
const recurso = 'autenticacion/actualizar'

export const interceptorAuthRequest = async(request) => {
    //Dependencias
    const authStore = useAuthStore();
    const { access, refresh, sesionVigente, expiracionTokenAccess } = storeToRefs(authStore);

    //Aun no se ha autenticado el usuario
    if(!sesionVigente.value) return request;

    //El usuario ya esta autenticado
    const tiempoExpiracion = new Date(expiracionTokenAccess.value).getTime();
    const tiempoActual = Date.now();

    //Ha caducado el token del usuario
    if(tiempoActual > tiempoExpiracion){
        console.log('caduco la sesion, se debe actualizar')
        const { access:accessToken } = (await axios.post(`${baseURL}${recurso}`, {
            refresh: refresh.value
        })).data;

        console.log('TOKEN ACCES NUEVO: ', accessToken);
        authStore.asignarTokenAccess(accessToken);
    }

    console.log('TOKEN ACCESS: ', access.value);

    request.headers['Authorization'] = `Bearer ${access.value}`;

    return request;
}