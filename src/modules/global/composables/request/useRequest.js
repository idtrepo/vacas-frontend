import { ref, computed } from 'vue'

const cargando = ref(false);
const verEstatus = ref(false);
const estatus = computed(() => {
    if(!verEstatus.value) return false;
    return cargando.value;
});

export default (servicioModulo=null) => {
    const servicio = servicioModulo;

    const obtenerElementos = async (params=null, estat=false) => {
        cargando.value = true;
        verEstatus.value = estat;

        try{
            const res = await servicio.obtenerElementos(params);
            const data = res.data; 
            console.log(res);

            return data;
        }catch(error){
            console.error(error);
        }finally{
            cargando.value = false;
            verEstatus.value = false;
        }
    }

    const obtenerElemento = async (id, estat=false) => {
        cargando.value = true;
        verEstatus.value = estat;

        try{
            const res = await servicio.obtenerElemento(id);
            const data = res.data; 
            console.log(res);

            return data;
        }catch(error){
            console.error(error);
        }finally{
            cargando.value = false;
            verEstatus.value = false;
        }
    }

    const crearElemento = async (dataElemento, estat=false) => {
        cargando.value = true;
        verEstatus.value = estat;

        try{
            const res = await servicio.crearElemento(dataElemento);
            const data = res.data; 
            console.log(res);

            return data;
        }catch(error){
            console.error(error);
        }finally{
            cargando.value = false;
            verEstatus.value = false;
        }
    }

    const editarElemento = async (id, dataElemento, estat=false) => {
        cargando.value = true;
        verEstatus.value = estat;

        try{
            const res = await servicio.editarElemento(id, dataElemento);
            const data = res.data; 
            console.log(res);

            return data;
        }catch(error){
            console.error(error);
        }finally{
            cargando.value = false;
            verEstatus.value = false;
        }
    }

    const eliminarElemento = async (id, estat=false) => {
        cargando.value = true;
        verEstatus.value = estat;

        try{
            const res = await servicio.eliminarElemento(id);
            const data = res.data; 
            console.log(res);

            return data;
        }catch(error){
            console.error(error);
        }finally{
            cargando.value = false;
            verEstatus.value = false;
        }
    }

    const customEndpoint = async (metodo, conf=null, estat=false) => {
        cargando.value = true;
        verEstatus.value = estat;

        try{
            const res = await servicio[metodo](conf);
            const data = res.data; 
            console.log(res);

            return data;
        }catch(error){
            console.error(error);
        }finally{
            cargando.value = false;
            verEstatus.value = false;
        }
    }

    return {
        estatus,
        obtenerElemento, 
        obtenerElementos,
        crearElemento,
        editarElemento,
        eliminarElemento,
        customEndpoint
    }
}