import axios from "axios";
import { interceptorAuthRequest } from '@/services/interceptors/request/request.js'
import { interceptorAuthError } from '@/services/interceptors/request/error.js'

const baseURL = import.meta.env.VITE_BASE_URL;

const servicio = axios.create({
    baseURL,
});

servicio.interceptors.request.use(
    interceptorAuthRequest,
    interceptorAuthError
);

export default servicio;