import L from "leaflet";
import { ref, computed, toValue } from "vue";
import { storeToRefs } from "pinia";
import useVacas from "./useVacas";

export default () => {
  // dependencias
  const { vacasListado } = useVacas();

  //store

  // configuracion - generacion de mapas
  const mapa = ref(null);
  const geoCerca = ref([]);

  const generarGeoCerca = (coordenadas) => {
    geoCerca.value = L.polygon(coordenadas, { color: "red" }).addTo(mapa.value);
  };

  const generarMapa = (idMapa, { ubicacion, zoomInicial = 18 } = {}) => {
    mapa.value = L.map(idMapa).setView(ubicacion, zoomInicial);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 21,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapa.value);
  };

  //   señalamientos en mapa
  const senalamientos = ref([]);
  const vacasFueraLugar = ref([]);

  const agregarMarcador = (coordenadas) => {
    L.marker(coordenadas).addTo(mapa.value);
  };

  const agregarRuta = (coordenadas) => {
    L.polyline(coordenadas, { color: "red" }).addTo(mapa.value);
  };

  const resaltarUbicacion = (
    coordenadas,
    listado,
    propiedades = {
      color: "#00a6f4",
      fillColor: "#74d4ff",
    }
  ) => {
    const senalamiento = L.circle(coordenadas, {
      ...propiedades,
      fillOpacity: 0.5,
      radius: 10,
    }).addTo(mapa.value);

    if (listado.length > 0) {
      listado[0].removeFrom(mapa.value);
      listado.pop();
    }

    listado.push(senalamiento);
  };

  const resaltarUbicacionFueraLugar = (coordenadas, listado, propiedades) => {
    const senalamiento = L.circle(coordenadas, {
      ...propiedades,
      fillOpacity: 0.5,
      radius: 7,
    }).addTo(mapa.value);

    listado.push(senalamiento);
  };

  const evaluarPosicionVacas = (coordenadas) => {
    const puntosGeoCerca = geoCerca.value.getLatLngs()[0];
    const [latitud, longitud] = coordenadas;

    let estaDentro = false;

    for (
      let i = 0, j = puntosGeoCerca.length - 1;
      i < puntosGeoCerca.length;
      j = i++
    ) {
      const xi = puntosGeoCerca[i].lat;
      const yi = puntosGeoCerca[i].lng;
      const xj = puntosGeoCerca[j].lat;
      const yj = puntosGeoCerca[j].lng;

      const interseccion =
        yi > longitud != yj > longitud &&
        latitud < ((xj - xi) * (longitud - yi)) / (yj - yi) + xi;

      if (interseccion) estaDentro = !estaDentro;
    }

    if (!estaDentro)
      resaltarUbicacionFueraLugar(coordenadas, toValue(vacasFueraLugar), {
        color: "#e7000b",
        fillColor: "#ffa2a2",
      });
  };

  //   listado vacas
  const vacasListadoMapas = computed(() =>
    vacasListado.value.map((dataVaca) => ({
      ...dataVaca,
      accion: () =>
        resaltarUbicacion(dataVaca.coordenadas, toValue(senalamientos)),
    }))
  );

  return {
    mapa,
    vacasListadoMapas,
    generarMapa,
    generarGeoCerca,
    agregarMarcador,
    agregarRuta,
    resaltarUbicacion,
    evaluarPosicionVacas,
  };
};
