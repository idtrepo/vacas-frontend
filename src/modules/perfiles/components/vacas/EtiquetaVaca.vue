<script setup>
//Ver detalles
const verDetalles = () => {
  console.log('Ver detalles de la vaca');
}
</script>

<template>
  <article @click="verDetalles" class="flex items-center px-4 py-4 bg-cyan-700 rounded-xl shadow-md hover:cursor-pointer hover:bg-cyan-600 transition-all duration-150">
    <header class="p-2 bg-slate-100 mr-2 rounded-md shadow-sm">
      <i class="fa-solid fa-cow mr-1"></i>
    </header>
    <section>
      <h3 class="uppercase font-bold text-slate-100">maria</h3>
      <h3>2367</h3>
    </section>
  </article>
</template>