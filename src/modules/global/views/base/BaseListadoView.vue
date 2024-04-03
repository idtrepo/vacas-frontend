<script setup>
import { computed } from 'vue'
import { onMounted } from 'vue'
</script>

<template>
    <div class="w-11/12 h-full mx-auto">
        <header class="w-full py-6 grid grid-cols-12">
            <article class="col-span-9">
                <h2>
                    <slot name="titulo"></slot>
                </h2>
            </article>
            <article class="col-span-3">
                <slot name="elemento"></slot>
            </article>
        </header>
        <section class="w-full h-full grid grid-cols-12">
            <section class="col-span-9 grid grid-cols-4 gap-x-5">
                <slot name="listado"></slot>
            </section>
            <section class="col-span-3">
                <slot name="formulario"></slot>
            </section>
        </section>
    </div>
</template>