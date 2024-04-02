import { storeToRefs } from 'pinia'
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import useAuthStore from "@/modules/auth/stores/useAuthStore.js";


const baseURL = import.meta.env.VITE_BASE_URL;
const recurso = 'autenticacion/actualizar'

export const interceptorAuthRequest = async(request) => {
    //Dependencias
    const authStore = useAuthStore();
    const { accessToken, refreshToken, sesionVigente } = storeToRefs(authStore);

    //Aun no se ha autenticado el usuario
    if(!sesionVigente.value) return request;

    //El usuario ya esta autenticado
    const tokenDecodificado = jwtDecode(accessToken.value);
    const tiempoExpiracion = new Date(tokenDecodificado.exp * 1000).getTime();
    const tiempoActual = Date.now();

    //Ha caducado el token del usuario
    if(tiempoActual > tiempoExpiracion){
        const { access } = (await axios.post(`${baseURL}${recurso}`, {
            refresh: refreshToken.value
        })).data;
    }

    request.headers['Authorization'] = `Bearer ${accessToken.value}`;

    return request;
}