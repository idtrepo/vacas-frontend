import { ref, computed } from "vue";
import { defineStore } from "pinia";

export default defineStore("vacas-store", () => {
  const vaca = ref({});
  const vacas = ref([
    {
      id: 1,
      nombre: "jimenita",
      peso: 324.54,
      coordenadas: [29.123691714591565, -110.95708891985838],
    },
    {
      id: 2,
      nombre: "josefina",
      peso: 124.54,
      coordenadas: [29.123439515309737, -110.95756707734809],
    },
    {
      id: 3,
      nombre: "alberta",
      peso: 435.1,
      coordenadas: [29.12369762550481, -110.9579347173048],
    },
    {
      id: 4,
      nombre: "ramira",
      peso: 123.54,
      coordenadas: [29.12320110760138, -110.95804749030911],
    },
    {
      id: 5,
      nombre: "maria",
      peso: 321.65,
      coordenadas: [29.123013933094292, -110.95759022922591],
    },
    {
      id: 6,
      nombre: "gilberta",
      peso: 321.65,
      coordenadas: [29.125102742514375, -110.95812114704744],
    },
  ]);
  const numResultados = ref(1);

  const asignarDataVacas = ({ data, resultados }) => {
    vacas.value = data;
    numResultados.value = resultados;
  };

  const asignarDataVaca = ({ data }) => {
    const { id } = data;

    vaca.value["id"] = id;
  };

  return {
    vaca,
    vacas,
    numResultados,
    asignarDataVaca,
    asignarDataVacas,
  };
});
