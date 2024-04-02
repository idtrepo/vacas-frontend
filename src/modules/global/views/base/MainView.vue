<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useAuthStore from '@/modules/auth/stores/useAuthStore';


//Dependencias
const authStore = useAuthStore();
const { sesionVigente } = storeToRefs(authStore);


//Layer
const espacioContenido = computed(() => ({
    'col-span-11': sesionVigente.value,
    'col-span-12': !sesionVigente.value,
}));
</script>

<template>
    <main class="grid grid-cols-12 w-screen h-screen">
        <aside class="col-span-1 h-full" v-if="sesionVigente">
            <slot name="nav"></slot>
        </aside>
        <section class="h-full" :class="espacioContenido">
            <slot name="contenido"></slot>
        </section>
    </main>
</template>