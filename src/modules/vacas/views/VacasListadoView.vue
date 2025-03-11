<template>
    <section class="w-full h-full grid grid-rows-12">
        <header class="row-span-1 flex items-center px-5 py-6 rounded-b-xl bg-teal-400 shadow-sm">
            <h2 class="uppercase font-bold text-gray-700">vacas</h2>
        </header>
        <section class="row-span-11 py-5">
            <div class=" px-5 py-6 w-full h-full bg-slate-100 rounded-xl overflow-y-auto shadow-md">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <VacasElemento 
                        v-for="vaca in vacasListado" 
                        :key="vaca"
                        :="vaca"/>
                </div>
            </div>
        </section>
        <footer class="pb-8 pt-5 flex items-center justify-center">
            <NPagination/>
        </footer>
    </section>
</template>

<script setup>
import { NPagination } from 'naive-ui'
import { defineAsyncComponent } from 'vue'
import useVacas from '../composables/useVacas';

// dependencias
const { vacasListado } = useVacas();

// componentes
const VacasElemento = defineAsyncComponent(() => import('../components/listado/VacasElemento.vue'));
</script>