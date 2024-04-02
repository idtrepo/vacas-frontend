<script setup>
import { defineAsyncComponent } from 'vue'


//Propiedades
const { vacas } = defineProps({
    vacas: {
        type: Array,
        required: true
    }
})


//Componentes
const Vaca = defineAsyncComponent(() => import('@/modules/perfiles/components/listado/VacaComponent.vue'));
</script>

<template>
    <Vaca
        v-for="vaca in vacas"
        :key="vaca"
        :vaca="vaca"/>
</template>