import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import useVacasStores from "../stores/useVacasStores";
import { ICONOS } from "@/utils/iconos";
import { VISTAS } from "@/router/utils/vistas";
import { useRouter } from "vue-router";

export default () => {
  // dependencias
  const router = useRouter();
  const vacasStore = useVacasStores();

  //stores
  const { vacas, vaca, numResultados } = storeToRefs(vacasStore);

  //peticiones
  const obtenerElementos = async () => {};
  const crearElemento = async () => {};
  const obtenerElemento = async () => {};
  const editarElemento = async () => {};

  //listados
  const vacasListado = computed(() =>
    vacas.value.map(({ id, nombre, peso, coordenadas }) => ({
      id,
      coordenadas,
      titulo: nombre,
      subtitulo: `peso: ${peso}kg`,
      icono: ICONOS.VACAS,
      accion: () =>
        router.push({ name: VISTAS.VACAS_LISTADO_MENU, params: { id } }),
    }))
  );

  return {
    numResultados,
    vacasListado,
    obtenerElementos,
    crearElemento,
    obtenerElemento,
    editarElemento,
  };
};
