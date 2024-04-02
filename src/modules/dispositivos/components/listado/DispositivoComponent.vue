<script setup>
import { ref, computed } from 'vue'
import useDispositivosStore from '../../stores/useDispositivosStore';


//Dependencias
const dispositivosStore = useDispositivosStore();


//Propiedades
const { dispositivo } = defineProps({
    dispositivo: {
        type: Object,
        required: true
    }
})


//Info vaca
const numeroSerie = computed(() => dispositivo?.ns ?? '');

// const asignarInfoVaca = () => {
//     vacasStore.asignarInfoVaca(vaca);
// }
</script>

<template>
    <article @click="asignarInfoVaca" class="w-full h-28 relative justify-between shadow-sm">
        <header @click="asignarInfoUsuario" class="absolute w-full h-2/3 p-4 z-10 flex items-center bg-cyan-700 hover:bg-cyan-600 hover:cursor-pointer transition-all duration-200 rounded-md shadow-sm shadow-black/30">
            <i class="fa-solid fa-tower-cell text-4xl mr-4 text-gray-100"></i>
            <section class="w-full overflow-hidden">
                <p class="uppercase w-full font-bold text-base text-slate-200">dispositivo</p>
                <p class="uppercase w-full font-bold text-xs">{{ numeroSerie }}</p>
            </section>
        </header>
        <footer class="absolute w-full h-1/3 py-2 px-4 bottom-0 bg-gray-200/60 rounded-md shadow-sm">
        <p class="text-sm text-slate-600"></p>
        </footer>
  </article>
</template>