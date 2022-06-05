<template>
  <section class="p-5">
    <div class="container">
      <h2>Reviews</h2>
      <Carousel :items-to-show="1.5">
        <Slide v-for="slide in 10" :key="slide">
          {{ slide }}
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script setup></script>

<style scoped></style>
