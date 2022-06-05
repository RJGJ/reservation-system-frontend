<template>
  <main>
    <header class="header sticky-top shadow">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img
              src="https://res.cloudinary.com/dnxllo9te/image/upload/v1654434214/278978363_748380232822167_8386637438471639173_n_6615b6e82c.gif?updated_at=2022-06-05T13:03:34.860Z"
              alt=""
              width="30"
              height="24"
            />
            <span class="ps-1">THREE</span>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1">Disabled</a>
              </li>
            </ul>
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </header>

    <Banner />

    <!-- packages -->
    <Packages @pick="(x) => (currentPackage = x)" />

    <!-- reservation date -->
    <ReservationDate
      :package="currentPackage"
      @date-picked="(date) => (reservationDate = date)"
    />

    <!-- location -->
    <Location />

    <!-- payment -->
    <Checkout :package="currentPackage" :date="reservationDate" />

    <!-- reviews -->
    <Reviews />

    <footer></footer>
  </main>
</template>

<script setup>
import { defineAsyncComponent, onBeforeUnmount, ref } from "vue";

//components
const Banner = defineAsyncComponent(() => import("./sections/Banner.vue"));
const Packages = defineAsyncComponent(() => import("./sections/Packages.vue"));
const ReservationDate = defineAsyncComponent(() =>
  import("./sections/ReservationDate.vue")
);
const Location = defineAsyncComponent(() => import("./sections/Location.vue"));
const Checkout = defineAsyncComponent(() => import("./sections/Checkout.vue"));
const Reviews = defineAsyncComponent(() => import("./sections/Reviews.vue"));

const currentPackage = ref({});
const reservationDate = ref();
</script>

<style>
:root {
  --vc-clr-primary: var(--bs-primary) !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  font-family: "Poppins", sans-serif;
}
h1,
h2,
h3,
.navbar-brand {
  font-family: "Abril Fatface", cursive;
}
</style>
