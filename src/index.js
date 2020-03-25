import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';

var view = new View({
  center: [0, 0],
  minZoom: 2,
  zoom: 2,
});

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: 'map',
  view: view
});

console.log({map});

const rect = document.getElementById('map').getBoundingClientRect();

const canvas = document.createElement('canvas');
canvas.style.width = String(rect.width) + 'px';
canvas.style.height = String(rect.height) + 'px';
canvas.style.position = 'absolute';
canvas.style.top = String(-rect.height / 2) + 'px';
canvas.style.left = String(-rect.width / 2) + 'px';
const ctx = canvas.getContext('2d');

function clock() {
  ctx.save();
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.fillStyle = '#00000088';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';

  // Hour marks
  ctx.save();
  ctx.rect(0, 0, rect.width, rect.height);
  ctx.fill();
  ctx.restore();

  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);

const overlay = document.createElement('div');
overlay.appendChild(canvas);

var canvasOverlay = new Overlay({
  element: overlay,
  stopEvent: false,
});
canvasOverlay.setPosition([0, 0]);
map.addOverlay(canvasOverlay);

map.on('moveend', () => {
  canvasOverlay.setPosition(map.getView().getCenter());
});
