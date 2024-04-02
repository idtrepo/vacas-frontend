<script setup>
import { ref, computed, watch } from 'vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import Dropdown from 'primevue/dropdown';
import useVacasStore from '@/modules/perfiles/stores/useVacasStore';
import L from 'leaflet'


//Dependencias
const vacasStore = useVacasStore();
const { vacas, ubicacionVaca, coordenadasVaca } = storeToRefs(vacasStore);


//Listado de vacas
const vacaSeleccionada = ref(null);
const opcionesVacas = computed(() => vacas.value.map(({ id, nombre }) => ({
    name: nombre,
    code: id
})))
const obtenerVacas = async() => {
    try{
        const res = await vacasStore.obtenerVacas();
    }catch(error){
        console.error(error);
    }
}

watch(vacaSeleccionada, newValue => {
    if(newValue){
        obtenerUbicacion();
        refUbicacion.value = setInterval(obtenerUbicacion, 5000)
    }else{
        clearInterval(refUbicacion.value);
        vacasStore.reiniciarDatosUbicacion();
    }
})

//Obtener ubicacion de la vaca seleccionada
const refUbicacion = ref(null);

const obtenerUbicacion = async() => {
    try{
        const res = await vacasStore.obtenerUbicacionVaca(vacaSeleccionada.value.code);
        L.polyline(coordenadasVaca.value).addTo(mapa.value);
    }catch(error){
        console.error(error);
    }
}


//crear mapa
const mapa = ref(null); 
const crearMapa = () => {
    mapa.value = L.map('mapa', {
        center: [29.123447, -110.957848],
        zoom: 13
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?', {}).addTo(mapa.value);
    L.marker([29.123447, -110.957848]).addTo(mapa.value);
}


onMounted(() => {
    crearMapa();
    obtenerVacas();
});
</script>

<template>
    <div class="w-11/12 h-full mx-auto">
        <header class="w-full grid grid-cols-12 py-6">
            <section class="col-span-9">
                <h2>
                    <span class="text-emerald-900 text-3xl uppercase font-bold mr-2">mapas</span>
                    <i class="fa-solid fa-map-location-dot text-emerald-900 text-3xl"></i>
                </h2>
            </section>
        </header>
        <section class="w-full h-full max-h-full grid grid-cols-12 gap-x-6">
            <section class="col-span-4">
                <article class="p-3 bg-gray-50/50 shadow-sm rounded-md">
                    <p class="mb-3 uppercase">Seleccione una vaca</p>
                    <Dropdown 
                        v-model="vacaSeleccionada"
                        :options="opcionesVacas"
                        showClear 
                        optionLabel="name"
                        placeholder="Seleccione una vaca en especifico"    
                        class="w-full"/>
                    <pre>{{ coordenadasVaca }}</pre>
                </article>
            </section>
            <section class="col-span-8 p-3 bg-gray-50/50 shadow-sm rounded-md">
                <div id="mapa" class="w-full h-3/4"></div>
            </section>
        </section>
    </div>
</template>