<template>
    <section class="w-full h-full grid grid-rows-12">
        <header class="row-span-1 flex items-center px-5 py-6 rounded-b-xl bg-teal-400">
            <h2 class="uppercase font-bold text-gray-700">vacas</h2>
        </header>
        <section class="row-span-11 py-5">
            <div class=" px-5 py-6 w-full h-full bg-slate-100 rounded-xl overflow-y-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <VElemento 
                        v-for="elemento in listadoElementos"
                        :="elemento"/>
                </div>
            </div>
        </section>
    </section>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { ICONOS } from '@/utils/iconos';
import { VISTAS } from '@/router/utils/vistas';
import { useRouter, useRoute } from 'vue-router';

// dependencias
const route = useRoute();
const router = useRouter();

// componentes
const VElemento = defineAsyncComponent(() => import('@/components/listado/VElemento.vue'));

const listadoElementos = ref([
    {
        titulo: 'info vaca',
        icono: ICONOS.VACAS,
        accion: () => router.push({ name: VISTAS.VACAS_DATA, params: { id: route.params.id } })
    },
    {
        titulo: 'ubicacion',
        icono: ICONOS.MAPAS
    },
]);
</script>