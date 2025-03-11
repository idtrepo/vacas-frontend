<template>
    <section class="w-full h-full grid grid-rows-12">
        <header class="row-span-1 flex items-center px-5 py-6 rounded-b-xl bg-teal-400 shadow-sm">
            <h2 class="uppercase font-bold text-gray-700">vacas</h2>
        </header>
        <section class="row-span-11 py-5">
            <div class=" px-5 py-6 w-full h-full bg-slate-100 rounded-xl overflow-y-auto shadow-md">
                <div class="grid gap-3 lg:grid-cols-2">
                    <section class="p-3 rounded-md shadow-md">
                        <header class="px-3 py-4 bg-teal-600 rounded-b-2xl">
                            <h2 class="uppercase font-bold text-gray-100">Informacion de jimenita</h2>
                        </header>
                        <section class="pt-5 grid grid-cols-2 gap-3">
                            <article class="mb-3">
                                <p class="uppercase mb-1">nombre</p>
                                <NInput />
                            </article>
                            <article class="mb-3">
                                <p class="uppercase mb-1">raza</p>
                                <NInput />
                            </article>
                            <article class="mb-3">
                                <p class="uppercase mb-1">edad</p>
                                <NInputNumber :show-button="false" />
                            </article>
                            <article class="mb-3">
                                <p class="uppercase mb-1">tag</p>
                                <NSelect />
                            </article>
                            <article class="mb-3">
                                <p class="uppercase mb-1">color</p>
                                <NInput />
                            </article>
                            <article class="mb-3">
                                <p class="uppercase mb-1">peso</p>
                                <NInputNumber :show-button="false" />
                            </article>
                        </section>
                    </section>
                    <section class="p-3 transition-all duration-200">
                        <header class="px-3 py-4 bg-teal-600 rounded-b-2xl">
                            <h2 class="uppercase font-bold text-gray-100">Listado de vacunas</h2>
                        </header>
                        <section class="pt-5">
                            <header class="grid grid-cols-2 gap-x-3">
                                <article class="mb-3">
                                    <p class="uppercase mb-1">nombre</p>
                                    <NInput />
                                </article>
                                <article class="mb-3">
                                    <p class="uppercase mb-1">fecha</p>
                                    <NDatePicker />
                                </article>
                            </header>
                            <NDataTable />
                        </section>
                    </section>
                </div>
            </div>
        </section>
    </section>
</template>

<script setup>
import { NPagination, NInput, NSelect, NInputNumber, NDataTable, NDatePicker } from 'naive-ui'
import { defineAsyncComponent, ref, computed } from 'vue'
import useVacas from '../composables/useVacas';

// dependencias
const { vacasListado } = useVacas();

// componentes
const VacasElemento = defineAsyncComponent(() => import('../components/listado/VacasElemento.vue'));
</script>