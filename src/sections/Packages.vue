<template>
  <section id="packages">
    <div class="container p-5">
      <h2 class="pb-5">Packages</h2>
      <div v-for="pack in packages" class="package text-start d-flex pb-5">
        <img :src="pack.featuredImgUrl" :alt="pack.name" class="img-fluid w-50 pb-3" />
        <div class="description p-3">
          <h3>{{ pack.name }}</h3>
          <div v-html="pack.description"></div>
          <button class="btn btn-primary" @click="handlePick(pack)">Select</button>
        </div>
      </div>
      <a class="btn btn-primary" href="#">See More</a>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getPackages } from "../services/packages";

const packages = ref([]);

const emit = defineEmits(["pick"]);

const handlePick = (chosenPackage) => {
  // console.log(chosenPackage);
  emit("pick", chosenPackage);
  document.querySelector("#reserve-date").scrollIntoView();
};

onMounted(async () => {
  packages.value = await getPackages();
});
</script>

<style scoped>
.package:nth-child(even) {
  flex-direction: row-reverse;
}
.package img {
  object-fit: cover;
}
</style>
