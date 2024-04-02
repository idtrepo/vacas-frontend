<script setup>



//Propiedades




</script>

<template>
    <section class="py-5 px-10 col-span-11 grid grid-cols-12 grid-rows-12 gap-y-5">
        <header class="col-span-12 row-span-1 self-center">
            <h1 class="text-emerald-900 text-3xl uppercase font-bold flex items-center">
                <slot name="titulo-vista"></slot>
            </h1>
        </header>
        <section class="col-span-12 row-span-11 grid grid-cols-12 grid-rows-12 gap-x-5">
            <section class="col-span-9 row-span-12">
                <slot name="listado"></slot>
            </section>
            <section class="col-span-3 row-span-12">
                <slot name="formulario"></slot>
            </section>
        </section>
    </section>
</template>