<script setup>
import { ref, computed } from 'vue'
import { onMounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import useVacasStore from '../stores/useVacasStore';


//Dependencias
const vacasStore = useVacasStore();
const { vacas, hayVacas } = storeToRefs(vacasStore);


//Componentes
const VacaForm = defineAsyncComponent(() => import('@/modules/perfiles/components/form/VacaForm.vue'));
const BaseListado = defineAsyncComponent(() => import('@/modules/global/views/base/BaseListadoView.vue'))
const CartaVaca = defineAsyncComponent(() => import('@/modules/global/components/listado/CartaComponent.vue'))

//Configuracion vista
const botonConf = {
    titulo: 'Nuevo',
    evento: vacasStore.reiniciarInfoVaca,
}


//Mostrar listado de vacas
onMounted(() => {
    vacasStore.obtenerVacas();
})
</script>

<template>
    <BaseListado :boton="botonConf">
        <template #titulo>
            <span class="text-emerald-900 text-3xl uppercase font-bold mr-2">perfiles</span>
            <i class="fa-solid fa-cow text-2xl text-emerald-900"></i>
        </template>
        <template #listado>
            <CartaVaca
                v-for="vaca in vacas"
                :key="vaca.id">
                    <template #icono>
                        <i class="fa-solid fa-cow"></i>
                    </template>
                    <template #primer-texto>
                        {{ vaca.nombre }}
                    </template>
                    <template #segundo-texto>
                        {{ vaca.anios }} años - {{ vaca.meses }} meses
                    </template>
                    <template #tercer-texto>
                        {{ vaca.peso }} kg
                    </template>
            </CartaVaca>
        </template>
        <template #formulario>
            <VacaForm/> 
        </template>
    </BaseListado>
</template>