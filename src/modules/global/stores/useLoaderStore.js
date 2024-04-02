import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export default defineStore('loader', () => {
    const cargando = ref(false);
    
    const establecerEstadoCargando = (estado) => {
        cargando.value = estado;
    }

    return {
        cargando,
        establecerEstadoCargando,
    }
})