<script setup>
//Propiedades
const { elemento, asignarInfo } = defineProps({
    elemento: {
        type: Object,
        required: true
    },
    asignarInfo: {
        type: Function,
        required: true
    }
});
</script>

<template>
    <article @click="() => asignarInfo(elemento)" class="w-full h-28 relative justify-between shadow-sm">
        <header class="absolute w-full h-2/3 p-4 z-10 flex items-center bg-cyan-700 hover:bg-cyan-600 hover:cursor-pointer transition-all duration-200 rounded-md shadow-sm shadow-black/30">
            <section class="text-4xl mr-4 text-gray-100">
                <slot name="icono"></slot>
            </section>
            <section class="w-full overflow-hidden">
                <p class="uppercase w-full font-bold text-base text-slate-200">
                    <slot name="primer-texto"></slot>
                </p>
                <p class="uppercase w-full font-bold text-xs">
                    <slot name="segundo-texto"></slot>
                </p>
            </section>
        </header>
        <footer class="absolute w-full h-1/3 py-2 px-4 bottom-0 bg-gray-200/60 rounded-md shadow-sm">
            <p class="text-sm text-slate-600">
                <slot name="tercer-texto"></slot>
            </p>
        </footer>
  </article>
</template>