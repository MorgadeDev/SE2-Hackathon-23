import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';

// Configura el mapa
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: fromLonLat([-57.542611, -38.005477]), // Centro del mapa (coordenadas iniciales)
    zoom: 12, // Nivel de zoom inicial
  }),
});

// Capa de marcadores
const markerLayer = new VectorLayer({
  source: new VectorSource(),
});
map.addLayer(markerLayer);

// Configura un estilo para los marcadores
const markerStyle = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    src: 'icon.png',
    // Ruta a la imagen del marcador
  }),
});



// Manejo del botón "Guardar Marcador"
const guardarButton = document.getElementById('guardar');
guardarButton.addEventListener('click', () => {
  const latitudInput = document.getElementById('latitud').value;
  const longitudInput = document.getElementById('longitud').value;

  if (latitudInput && longitudInput) {
    const latitud = parseFloat(latitudInput);
    const longitud = parseFloat(longitudInput);

    if (!isNaN(latitud) && !isNaN(longitud)) {
      // Crea un punto con las coordenadas ingresadas
      const coordinates = fromLonLat([longitud, latitud]);
      const marker = new Feature({
        geometry: new Point(coordinates),
      });
      marker.setStyle(markerStyle);

      // Agrega el marcador a la capa de marcadores
      markerLayer.getSource().addFeature(marker);
    }
  }
});






