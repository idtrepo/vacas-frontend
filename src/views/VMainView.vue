<template>
<main class="w-full h-svh">
    <div class="w-full h-full grid grid-cols-12 grid-rows-12">
        <header class="px-4 lg:px-8 flex items-center justify-end col-start-1 lg:col-start-2 col-end-13 bg-teal-100">
            <article class="flex items-center">
                <header class="mr-2 flex justify-center items-center w-8 h-8 bg-teal-700 rounded-lg">
                    <i class="text-slate-200" :class="ICONOS.USUARIOS"></i>
                </header>
                <section>
                    <h3 class="uppercase font-bold text-xs">isaac fierro</h3>
                    <p class="uppercase text-xs">admin</p>
                </section>
            </article>
        </header>
        <section class="lg:px-8 lg:pb-8 col-start-1 lg:col-start-2 col-end-13 row-start-2 row-end-12 lg:row-end-13 bg-slate-200">
            <RouterView/>
        </section>
        <aside class="col-start-1 col-end-13 lg:col-end-2 row-start-12 lg:row-start-1 row-end-13 bg-teal-500">
            <nav class="flex lg:flex-col items-center justify-between w-full h-full">
                <RouterLink     
                    v-for="{ nombre, icono } in VISTAS_MENU" 
                    class="flex-grow lg:w-full flex justify-center items-center h-full transition-all duration-200 hover:bg-slate-50/20" 
                    :key="nombre"
                    :to="{ name: nombre }">
                    <i class="text-slate-200 text-xs" :class="icono"></i>
                </RouterLink>
            </nav>
        </aside>
    </div>
</main>
</template>

<script setup>
import { VISTAS_MENU } from '@/router/utils/vistas';
import { ICONOS } from '@/utils/iconos';
</script>