<script setup>
import { ref, computed, watch, unref } from 'vue'
import { onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import useVacasStore from '../../stores/useVacasStore';
import { DURACION_MENSAJE_TOAST } from '@/modules/global/helpers/constantes';


//Dependencias
const toast = useToast();
const vacasStore = useVacasStore();
const { infoVaca, editarVacaFlag } = storeToRefs(vacasStore);


//Crear vaca
const vaca = ref({
    nombre: '',
    peso: 0,
    anios: 0,
    meses: 0
})
const datosLlenos = computed(() => (
    !!vaca.value.nombre
    && vaca.value.peso > 0.00
));

const reiniciarDatosVaca = () => {
    vaca.value.nombre = '';
    vaca.value.peso = 0;
    vaca.value.anios = 0;
    vaca.value.meses = 0;
}

const validarDatosCompletos = () => {
    if(datosLlenos.value) return true;
    
    toast.add({
        life: DURACION_MENSAJE_TOAST,
        severity: 'warn',
        summary: 'Datos incompletos',
        detail: 'El nombre y el peso son campos obligatorios'
    })
    return false;
}

const crearVaca = async() => {
    if(!validarDatosCompletos()) return;

    try{
        const res = await vacasStore.crearVaca(unref(vaca));
        vacasStore.obtenerVacas();
        reiniciarDatosVaca();
        toast.add({
            life: DURACION_MENSAJE_TOAST,
            severity: 'success',
            summary: 'Vaca registradas',
            detail: 'Se ha registrado con exito el perfil de la vaca'
        })
    }catch(error){
        console.error(error);
        toast.add({
            life: DURACION_MENSAJE_TOAST,
            severity: 'error',
            summary: 'Error de creacion',
            detail: 'No pudo crearse el perfil de la vaca. Verifique la informacion ingresada'
        })
    }
}


//Editar vaca
const editarVaca = async() => {
    try{
        const res = await vacasStore.editarVaca(vaca);
        vacasStore.obtenerVacas();
        vacasStore.reiniciarInfoVaca();
        reiniciarDatosVaca();
        toast.add({
            life: DURACION_MENSAJE_TOAST,
            severity: 'success',
            summary: 'Vaca editada',
            detail: 'Se ha editado con exito el perfil de la vaca'
        })
    }catch(error){
        console.error(error);
        toast.add({
            life: DURACION_MENSAJE_TOAST,
            severity: 'error',
            summary: 'Error de edicion',
            detail: 'No pudo editarse el perfil de la vaca. Verifique la informacion ingresada'
        })
    }
}

const asignarDatosVaca = () => {
    vaca.value.nombre = infoVaca.value.nombre;
    vaca.value.peso = infoVaca.value.peso;
    vaca.value.anios = infoVaca.value.anios;
    vaca.value.meses = infoVaca.value.meses;
}

watch(infoVaca, newValue => {
    if(newValue !== null){
        asignarDatosVaca();
    }else{
        reiniciarDatosVaca();
    }
});
</script>

<template>
    <article>
        <article class="mb-3">
            <p class="uppercase">nombre</p>
            <InputText v-model="vaca.nombre" class="w-full"/>
        </article>
        <article class="mb-3">
            <p class="uppercase">peso</p>
            <InputNumber 
                v-model="vaca.peso"
                class="w-full" 
                :minFractionDigits="2" 
                :maxFractionDigits="2"/>
        </article>
        <section class="mb-3 grid grid-cols-2 gap-3">
            <article class="mb-3">
                <p class="uppercase">años</p>
                <InputNumber 
                    v-model="vaca.anios"
                    class="w-full" />
            </article>
            <article class="mb-3">
                <p class="uppercase">meses</p>
                <InputNumber 
                    v-model="vaca.meses"
                    class="w-full" />
            </article>  
        </section>
        <footer>
            <Button v-if="editarVacaFlag" @click="editarVaca" class="w-full" label="Guardar"/>
            <Button v-else @click="crearVaca" class="w-full" label="Crear"/>
        </footer>
    </article>

    <Toast/>
</template>