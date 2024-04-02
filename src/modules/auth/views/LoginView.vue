<template>
    <section class="h-full flex justify-center items-center">
      <LoginForm/>
    </section>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'


//Componentes
const LoginForm = defineAsyncComponent(() => import('../components/LoginForm.vue'));
</script>

<style scoped> 
.fondo{
    background-image: url('@/assets/imgs/fondo/fondo5.jpg');
}
</style>