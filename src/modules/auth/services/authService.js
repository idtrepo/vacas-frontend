import servicio from "@/services/service.js";

const recurso = 'autenticacion';


export default {
    iniciarSesion(data){
        return servicio.post(`${recurso}/login`, data);
    },
    renovarSesion(refreshToken){
        return servicio.post(`${recurso}/actualizar`, {
            refresh: refreshToken
        });
    }
}