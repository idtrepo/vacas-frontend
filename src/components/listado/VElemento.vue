<template>
    <article
        @click="props.accion"
        class="h-max px-3 py-5 flex items-center bg-teal-100 uppercase rounded-xl transition-all duration-150 hover:cursor-pointer hover:bg-teal-300 shadow-sm">
        <header class="mr-3 flex items-center justify-center w-8 h-8 rounded-md bg-teal-700">
            <i class="text-slate-100" :class="icono"></i>
        </header>
        <section>
            <header>
                <h3 class="font-bold text-xs text-gray-700">{{ titulo }}</h3>
            </header>
            <section>
                <p class="text-gray-600">{{ subtitulo }}</p>
            </section>
        </section>
    </article>
</template>

<script setup>
import { toRefs } from 'vue';

//propiedades
const props = defineProps({
    titulo: { type: String, required: true },
    icono: { type: Array, required: true },
    subtitulo: { type: String, default: ''  },
    extra: { type: String, default: '' },
    accion: { type: Function, default: () => {} },
});

const { titulo, subtitulo, icono, extra } = toRefs(props);
</script>