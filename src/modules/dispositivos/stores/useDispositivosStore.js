import { ref, computed, unref } from 'vue'
import { defineStore } from 'pinia'
import dispositivosService from '../services/dispositivosService';


export default defineStore('dispositivos', () => {
    //Obtener listado dispositivos
    const dispositivos = ref([]);
    const hayDispositivos = computed(() => dispositivos.value.length > 0);

    const asignarDispositivos = (dataDispositivos) => {
        console.log(dataDispositivos);
    }

    const obtenerDispositivos = async(params=null) => {
        try{
            const res = await dispositivosService.obtenerElementos(params); 
            const data = await res.data
            asignarDispositivos(data);

            return res;
        }catch(error){
            console.error(error);
            throw error;
        }
    }


    //Crear nuevo dispositivo 
    const crearDispositivo = async(dataDispositivo) => {
        try{
            const res = await dispositivosService.crearElemento(unref(dataDispositivo));
            return res;
        }catch(error){
            console.error(error);
            throw error;
        }
    }
    
    
    return {
        dispositivos,
        hayDispositivos,
        obtenerDispositivos,

        crearDispositivo,
    }
});