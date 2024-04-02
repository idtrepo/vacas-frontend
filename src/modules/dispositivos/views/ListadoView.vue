<script setup>
import { defineAsyncComponent } from 'vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useDispositivosStore from '../stores/useDispositivosStore';


//Dependencias
const dispositivosStore = useDispositivosStore();
const { dispositivos, hayDispositivos } = storeToRefs(dispositivosStore);


//Componentes
const BaseListadoView = defineAsyncComponent(() => import('@/modules/global/views/base/BaseListadoView.vue'));


//Obtener listado de dispositivos
const obtenerDispositivos = async() => {
    try{
        const res = await dispositivosStore.obtenerDispositivos();
    }catch(error){
        console.error();
    }
}

onMounted(() => {
    obtenerDispositivos();
})


//Crear nuevo dispositivo
const crearDispositivo = async() => {
    try{
        const res = await dispositivosStore.crearDispositivo();
    }catch(error){
        console.error(error);
    }
}


//Configuracion vista
</script>

<template>
    <BaseListadoView>
        <template #titulo-header>dispositivos</template>
    </BaseListadoView>
</template>