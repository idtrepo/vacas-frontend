import servicio from "@/services/service"


const recurso = 'dispositivos';

export default {
    obtenerElementos: (params=null) => {
        return servicio.get(recurso, { params });
    },
    obtenerElemento: (id) => {
        return servicio.get(`${recurso}/${id}`);
    },
    crearElemento: (data) => {
        return servicio.post(recurso, data);
    },
    editarElemento: (id, data) => {
        return servicio.patch(`${recurso}/${id}`, data);
    }
}