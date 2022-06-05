import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { SetupCalendar, Calendar, DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";

import mapboxgl from "mapbox-gl";
import { MAPBOX_TOKEN } from "./config";

import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

// import { StripePlugin, StripeElementsPlugin } from "@vue-stripe/vue-stripe";

mapboxgl.accessToken = MAPBOX_TOKEN;

createApp(App)
  .use(SetupCalendar, {})
  // .use(StripePlugin, {
  //   pk: "pk_test_51KKFHkEjdRQATuTkOrnugKl0gGBNSJWLvo2BHvBfpiQvCgxPJmOMgOaTAPHrSc5ArqDZRe42CIf5Qbt7Tz9yDJR900slBBD4d2",
  //   stripeAccount: "",
  //   apiVersion: "v3",
  //   locale: "en-US",
  // })
  .component("Calendar", Calendar)
  .component("DatePicker", DatePicker)
  .component("Carousel", Carousel)
  .component("Slide", Slide)
  .component("Pagination", Pagination)
  .component("Navigation", Navigation)
  .mount("#app");
