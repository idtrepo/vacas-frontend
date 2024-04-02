<script setup>
import { ref, computed } from 'vue'
import { NDataTable } from 'naive-ui'


//Datos y columnas
const ALTURA_MAX = 190;
const columnas = computed(() => [{
  title: 'VACUNAS',
  key: 'vacuna'
}])

const datos = computed(() => [
  {
    vacuna: 'sarampion'
  },
  {
    vacuna: 'papiloma'
  },
  {
    vacuna: 'gripe'
  },
  {
    vacuna: 'papiloma'
  },
  {
    vacuna: 'papiloma'
  },
  {
    vacuna: 'gripe'
  },
  {
    vacuna: 'papiloma'
  },
])
</script>

<template>
  <article class="p-5 bg-cyan-500/25 rounded-2xl">
    <header class="flex flex-col items-center">
      <div class="bg-cyan-700 rounded-full p-4 mb-3">
        <i class="fa-solid fa-cow text-slate-100 text-2xl"></i>
      </div>
      <footer>
        <h3 class="uppercase font-bold text-2xl">fernanda</h3>
        <p class="text-center">3256</p>
      </footer>
    </header>
    <section class="grid grid-cols-2 gap-3 justify-items-center mb-5 pt-6">
      <article class="p-3 text-center bg-slate-50 rounded-md w-full">
        <h3 class="uppercase font-bold">peso</h3>
        <p>155.25 kg</p>
      </article>
      <article class="p-3 text-center bg-slate-50 rounded-md w-full">
        <h3 class="uppercase font-bold">edad</h3>
        <p class="uppercase">3 años - 3 meses</p>
      </article>
      <article class="col-span-2 bg-slate-50 rounded-md w-full">
        <NDataTable
            :max-height="ALTURA_MAX"
            :data="datos"
            :columns="columnas"
            :bordered="false"/>
      </article>
    </section>
    <footer class="flex justify-around">
      <article class="flex-grow p-3 flex flex-col items-center hover:text-red-600 hover:cursor-pointer transition-colors duration-150">
        <i class="fa-solid fa-trash"></i>
        <p class="uppercase">eliminar</p>
      </article>
      <article class="flex-grow p-3 flex flex-col items-center hover:text-amber-600 hover:cursor-pointer transition-colors duration-150">
        <i class="fa-solid fa-pen-to-square"></i>
        <p class="uppercase">editar</p>
      </article>
    </footer>
  </article>
</template>
