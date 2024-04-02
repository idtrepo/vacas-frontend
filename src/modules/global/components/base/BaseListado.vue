<script setup>
import { computed } from 'vue'


const props = defineProps({
    listado: {
        type: Array,
        default: () => []
    }
})


const hayElementos = computed(() => props.listado.length > 0);
</script>

<template>
    <template v-if="hayElementos">
        <div class="w-full grid grid-cols-4 gap-x-4">
            <article 
                v-for="elemento in props.listado"
                :key="elemento.id">
                <slot name="listado-contenedor"></slot>
            </article>
        </div>
    </template>
    <template v-else>
        <slot name="listado-vacio">sin elementos</slot>
    </template>
</template>