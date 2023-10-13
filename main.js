import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Cluster from 'ol/source/Cluster';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import { Style, Icon, Circle, Fill, Stroke, Text } from 'ol/style';

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


// Configura un estilo para los marcadores
const markerStyle = {
    /*_image: new Icon({
        //anchor: [0.5, 1],
        scale: 0.02,
        src: 'icon.png',
    }),*/
    image: new Circle({
        radius: 10,
        stroke: new Stroke({
            color: '#fff',
        }),
        fill: new Fill({
            color: '#3399CC',
        }),
    }),
    _text: new Text({
        text: "foo",
        fill: new Fill({
            color: '#fff',
        }),
    }),
};

// Capa de marcadores
// const markerLayer = new VectorLayer({
const markerLayer = new VectorLayer({
    style: e => new Style(markerStyle),
    source: new Cluster({
        distance: 20,
        source: new VectorSource({
            url: './data.geojson',
            format: new GeoJSON(),
        })
    })
});
map.addLayer(markerLayer);


// Agregar un evento de clic al mapa para manejar los marcadores interactivos
map.on('singleclick', function (event) {
    map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
        // Verifica que se hizo clic en un marcador
        if (feature) {
            // Define la acción que se ejecutará al hacer clic en el marcador
            // Por ejemplo, muestra una alerta con las coordenadas
            const coords = feature.getGeometry().getCoordinates();
            alert(`Marcador clickeado en coordenadas: ${coords}`);
        }
    });
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
      marker.setStyle(new Style(markerStyle));

      // Agrega el marcador a la capa de marcadores
      markerLayer.getSource().addFeature(marker);
    }
  }
});

