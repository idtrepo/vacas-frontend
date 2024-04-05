<script setup>
const { editarElemento, eliminarElemento } = defineProps({
  editarElemento: {
    type: Function,
    required: false
  },
  eliminarElemento: {
    type: Function,
    required: false
  },
});
</script>

<template>
    <article 
        class="usuario bg-slate-50 rounded-md shadow-md mb-4 hover:bg-slate-100 hover:cursor-pointer">
        <section class="usuario__icono">
            <slot name="icono"></slot>
        </section>
        <section class="usuario__info">
            <h3 class="uppercase font-bold text-lime-700">
                <slot name="primer-dato"></slot>
            </h3>
            <p>
                <slot name="segundo-dato"></slot>
            </p>
        </section>
        <section class="usuario__acciones flex px-8">
            <article @click="eliminarElemento" class="grow flex justify-center items-center w-full py-7 transition-all duration-200 hover:bg-red-200 hover:text-red-600">
              <i class="fa-solid fa-trash"></i>
            </article>
            <article @click="editarElemento" class="grow flex justify-center items-center w-full py-7 transition-all duration-200 hover:bg-amber-200/45 hover:text-amber-600">
              <i class="fa-solid fa-pen-to-square"></i>
            </article>
        </section>
    </article>
</template>

<style scoped>
.usuario{
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
.usuario__icono{
  grid-column: 1 / 2;
  align-self: center;
  justify-self: center;
}
.usuario__info{
  grid-column: 2 / 10;
  align-self: center;
}
.usuario__acciones{
  grid-column: 10 / 13;
}
</style>