<template>
    <section class="w-full h-full grid grid-rows-12">
        <header class="row-span-1 flex items-center px-5 py-6 rounded-b-xl bg-teal-400">
            <h2 class="uppercase font-bold text-gray-700">vacas / ubicacion</h2>
        </header>
        <section class="row-span-11 py-5">
            <div class=" px-5 py-6 w-full h-full bg-slate-100 rounded-xl">
                <div class="w-full h-full grid grid-cols-2 grid-rows-2 gap-5">
                    <section class="col-start-1 col-end-3 lg:col-end-2 lg:row-span-2 ">
                        <div id="map" class="w-full h-full bg-slate-500"></div>
                    </section>
                    <section class="pt-3 lg:pt-0 col-start-1 lg:col-start-2 col-end-3 lg:row-span-2">
                        <div class="grid gap-5 w-full h-full overflow-y-auto">
                            <VacasElemento 
                                v-for="vaca in vacasListadoMapas" 
                                :key="vaca"
                                :="vaca" />
                        </div>
                    </section>
                </div>
            </div>
        </section>
        <footer class="pb-8 pt-5 flex items-center justify-center">
            <NPagination />
        </footer>
    </section>
</template>

<script setup>
import { onMounted, defineAsyncComponent, ref } from 'vue'
import { NPagination } from 'naive-ui';
import useMapas from '../composables/useMapas';
import L from 'leaflet'

// dependencias
const { generarMapa, generarGeoCerca, agregarMarcador, vacasListadoMapas, resaltarUbicacion, evaluarPosicionVacas, agregarRuta } = useMapas();

// componentes
const VacasElemento = defineAsyncComponent(() => import('../components/listado/VacasElemento.vue'))

// const map = ref(null);
// const geoCerca = ref(null);
// const listadoMarcadores = [];

// ciclo de vida
onMounted(() => {
    const coordenadasGeoCerca = [
        [29.123303250575116, -110.95784756172705],
        [29.12430141014337, -110.956839051177],
        [29.123903084716755, -110.95583054062693],
        [29.122829941478265, -110.95565887925673],
        [29.123448523227342, -110.95638844008015],
    ];
    
    generarMapa('map', {
        ubicacion: [29.12332812984487, -110.95776060345443],
    })

    generarGeoCerca(coordenadasGeoCerca);

    vacasListadoMapas.value.forEach(({ coordenadas }) => {
        agregarMarcador(coordenadas);
        evaluarPosicionVacas(coordenadas);
    });

    agregarRuta(coordenadasGeoCerca);


    // geoCerca.value = L.polygon(coordenadasGeoCerca, { color: 'red' }).addTo(mapa.value);

    // L.marker([29.123691714591565, -110.95708891985838]).addTo(map.value);
    // L.marker([29.123439515309737, -110.95756707734809]).addTo(map.value);
    // L.marker([29.12369762550481, -110.9579347173048]).addTo(map.value);
    // L.marker([29.12320110760138, -110.95804749030911]).addTo(map.value);
    // L.marker([29.123013933094292, -110.95759022922591]).addTo(map.value);

    // const {lat, lng} = geoCerca.value.getCenter();
    // const centroGeocerca = [lat, lng];
    // L.marker(centroGeocerca).addTo(map.value);

    // console.log('OBJETO DE LA GEOCERCA');
    // console.log(geoCerca.value);
    // console.log(centroGeocerca);
})
</script>
