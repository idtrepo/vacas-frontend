<script setup>
import { defineAsyncComponent } from 'vue'


//Propiedades
const { usuarios } = defineProps({
  usuarios: {
    type: Array,
    required: true
  }
})


//Componentes
const Usuario = defineAsyncComponent(() => import('@/modules/usuarios/components/UsuarioComponent.vue'));
</script>

<template>
    <Usuario
        v-for="usuario in usuarios"
        :key="usuario"
        :usuario="usuario"/>
</template>