import { ref, computed, unref } from 'vue'
import { defineStore } from 'pinia'
import vacasService from '../services/vacasService';


export default defineStore('vacas', () => {
    //Obtener listado de vacas
    const vacas = ref([]);
    const hayVacas = computed(() => vacas.value.length > 0);

    const asignarDataVacas = (dataVacas) => {
        console.log('Obteniendo el listado de vacas');
        vacas.value = dataVacas;
        console.log(vacas.value);
    }

    const obtenerVacas = async(params=null) => {
        try{
            const res = await vacasService.obtenerElementos(params);
            const data = await res.data;
            asignarDataVacas(data);

            return res;
        }catch(error){
            throw error;
        }
    }

    //Obtener ubicacion de la vaca
    const ubicacionVaca = ref(null);
    const coordenadasVaca = computed(() => {
        if(!ubicacionVaca.value) return [];
        return ubicacionVaca.value
            .toReversed()
            .map(({ lat, lon }) => [lat, lon]);
    })
    // const latitudVaca = computed(() => );
    // const longitudVaca = computed(() => );

    const asignarDatosUbicacion = (dataUbicacion) => {
        ubicacionVaca.value = dataUbicacion;
    }
    
    const obtenerUbicacionVaca = async(id) => {
        try{
            const res = await vacasService.obtenerUbicacion(id);
            const data = await res.data;

            asignarDatosUbicacion(data);

            return res;
        }catch(error){
            throw error;
        }
    }

    const reiniciarDatosUbicacion = () => {
        ubicacionVaca.value = null;
    }
    
    //Crear vaca 
    const crearNuevaVaca = () => {
        reiniciarInfoVaca();
    }

    const crearVaca = async(dataVaca) => {
        try{
            const res = await vacasService.crearElemento(dataVaca);
            const data = await res.data;

            return data;
        }catch(error){
            throw error;
        }
    }

    //Editar vaca
    const infoVaca = ref(null);
    const editarVacaFlag = computed(() => infoVaca.value !== null);

    const asignarInfoVaca = (dataVaca) => {
        console.log('asignando datos de la vaca');
        console.log(dataVaca);
        infoVaca.value = dataVaca;
    }

    const reiniciarInfoVaca = () => {
        infoVaca.value = null;
    }

    const editarVaca = async(dataVaca) => {
        try{
            const res = await vacasService.editarElemento(
                infoVaca.value.id, 
                unref(dataVaca)
            );
            const data = await res.data;

            return data;
        }catch(error){
            throw error
        }
    }
    
    return {
        vacas,
        hayVacas,
        obtenerVacas,

        ubicacionVaca,
        coordenadasVaca,
        obtenerUbicacionVaca,
        reiniciarDatosUbicacion,

        crearVaca,
        crearNuevaVaca,

        infoVaca,
        editarVacaFlag,
        asignarInfoVaca,
        reiniciarInfoVaca,
        editarVaca,
    }
})