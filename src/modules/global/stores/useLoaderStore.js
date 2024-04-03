import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export default defineStore('loader', () => {
    const cargando = ref(true);
    
    const establecerEstadoCargando = (estado) => {
        cargando.value = estado;
    }

    return {
        cargando,
        establecerEstadoCargando,
    }
})