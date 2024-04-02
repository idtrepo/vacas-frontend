import { ref, computed } from 'vue'


export default () => {
    const infoData = ref(null);
    
    const asignarData = (data) => {
        infoData.value = data;
    }

    const reiniciarData = () => {
        infoData.value = null;
    }

    return {

    }
}
