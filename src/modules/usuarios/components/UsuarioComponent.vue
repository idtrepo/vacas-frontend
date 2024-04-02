<script setup>
import { ref, computed } from 'vue'
import useUsuariosStore from '../stores/useUsuariosStore';


//Dependencias
const usuariosStore = useUsuariosStore();


//Propiedades
const { usuario } = defineProps({
  usuario: {
    type: Object,
    required: true
  }
})


//Info usuarios
const nombre = computed(() => usuario?.nombre ?? '');
const apellido = computed(() => usuario?.apellido ?? '')
const rol = computed(() => usuario?.rol ?? 'sin asignar')


//Enviar info usuario
const asignarInfoUsuario = () => {
  usuariosStore.asignarInfoUsuario(usuario);
}
</script>

<template>
  <article class="w-full h-28 relative justify-between shadow-sm">
    <header @click="asignarInfoUsuario" class="absolute w-full h-2/3 p-4 z-10 flex items-center bg-cyan-700 hover:bg-cyan-600 hover:cursor-pointer transition-all duration-200 rounded-md shadow-sm shadow-black/30">
      <i class="fa-solid fa-user text-4xl mr-4 text-gray-100"></i>
      <section class="w-full overflow-hidden">
        <p class="uppercase w-full font-bold text-base text-slate-200">{{ nombre }}</p>
        <p class="uppercase w-full font-bold text-xs">{{ apellido }}</p>
      </section>
    </header>
    <footer class="absolute w-full h-1/3 py-2 px-4 bottom-0 bg-gray-200/60 rounded-md shadow-sm">
      <p class="text-sm text-slate-600">{{ rol }}</p>
    </footer>
  </article>
</template>