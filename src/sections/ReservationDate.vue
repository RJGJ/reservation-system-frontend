<template>
  <section class="section p-5" id="reserve-date">
    <div class="container">
      <h1>Date</h1>
      <p>Pick a reservation date</p>
      <div class="row pt-3">
        <div class="col">
          <DatePicker is-expanded v-model="date" />
        </div>
        <div class="col d-flex align-items-center justify-content-center">
          <div class="piked-package d-flex flex-column align-items-center">
            <h3 v-if="props.package.name" class="package-name">
              {{ props.package.name }}
            </h3>
            <h3 v-else>Choose Package First</h3>
            <span class="date pb-2">{{ prettyDate }}</span>
            <a v-if="props.package.name" href="#location" class="btn btn-primary">
              Proceed
            </a>
            <a v-else href="#packages" class="btn btn-primary">Choose</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { getReservationsByMonth } from "/src/services/reservations.js";

const props = defineProps(["package"]);

const date = ref(new Date());

const prettyDate = computed(() => {
  if (!date.value) return;

  return date.value.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
});

const emit = defineEmits(["date-picked"]);

// methods
// TODO: get all reservations
function populateOccupied() {}

watch(date, (val, oldVal) => {
  emit("date-picked", val);
});

onMounted(() => {
  getReservationsByMonth();

  // console.log(props.package.name);
});
</script>

<style scoped>
.section {
  background-color: #f5f5f5;
}
</style>
