<template>
  <section class="p-5" id="location">
    <div class="container">
      <h1 class="pb-5">Choose the location</h1>
      <div class="row">
        <div class="col">
          <div class="mapbox-wrapper">
            <div id="mapbox"></div>
          </div>
        </div>
        <div class="col">
          <h3>Findyour location</h3>
          <LocationSearch @location-selected="handleLocationSelect" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Marker, Popup, Map } from "mapbox-gl";
import { defineAsyncComponent, onMounted, ref, watch } from "vue";
import { API_TOKEN, API_URL, MAPBOX_TOKEN } from "../config";
import "mapbox-gl/dist/mapbox-gl.css";

const LocationSearch = defineAsyncComponent(() =>
  import("../components/LocationSearch.vue")
);

// variables
let map = null;
let centerMarker = null;

// reactive variables
const stores = ref([]);

async function getStores() {
  const response = await fetch(
    `${API_URL}/api/store-locations?pagination[pageSize]=1000`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const jsonData = await response.json();

  stores.value = jsonData.data.map(({ id, attributes }) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: attributes.coordinates,
    },
    properties: {
      title: attributes.store_name,
      description: "",
    },
  }));
}

function createMap() {
  map = new Map({
    container: "mapbox",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [120.95413173662462, 14.30084647367104],
    zoom: 10,
  });

  map
    .on("load", function () {
      map.resize();
      createCenterMarker(map.getCenter());
    })
    .on("click", (e) => {
      console.log(e);
    })
    .on("move", (e) => {
      createCenterMarker(map.getCenter());
    });
}

function createCenterMarker(mapCenter) {
  const coordinates = [mapCenter.lng, mapCenter.lat];

  if (centerMarker) {
    centerMarker.setLngLat(coordinates);
    return;
  }
  const el = document.createElement("div");
  el.id = "center-marker";
  centerMarker = new Marker(el).setLngLat(coordinates).addTo(map);
}

function handleLocationSelect(location) {
  console.log(location);
}

watch(stores, (val, oldVal) => {
  const geoJson = {
    type: "FeatureCollection",
    features: val,
  };
  geoJson.features.forEach((feature) => {
    const el = document.createElement("div");
    el.className = "marker";

    new Marker(el)
      .setLngLat(feature.geometry.coordinates)
      .setPopup(new Popup({ offset: 25 }).setHTML(`<h3>${feature.properties.title}</h3>`))
      .addTo(map);
  });
});

onMounted(() => {
  getStores();
  createMap();
});
</script>

<style scoped></style>
// mapbox
<style>
#mapbox {
  min-height: 500px;
}
.mapboxgl-map {
  /* overflow: visible; */
  display: flex;
}
.mapboxgl-canvas-container {
  min-height: 100%;
}
.mapboxgl-canvas {
  position: relative;
}
.mapboxgl-control-container {
  padding-bottom: 10px;
  /* overflow: hidden; */
}
.mapboxgl-marker {
  height: 40px;
  width: 40px;
  background-image: url("https://res.cloudinary.com/dnxllo9te/image/upload/v1654310594/mapbox_marker_icon_20px_blue_5c6afb761b.png?updated_at=2022-06-04T02:43:15.652Z");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}
#center-marker {
  background-image: url("https://res.cloudinary.com/dnxllo9te/image/upload/v1654432378/mapbox_marker_icon_20px_red_4083fe90ed.png?updated_at=2022-06-05T12:32:59.368Z");
}
.mapboxgl-popup {
  max-width: 200px;
}
.mapboxgl-popup-content {
  padding: 25px 15px;
  text-align: center;
}
.mapboxgl-popup-content h3 {
  font-size: 16px;
  font-family: "Poppins";
  font-weight: bold;
  margin: 0;
}
</style>
