<template>
  <form class="text-start">
    <div class="pb-3">
      <label for="location">Search Location</label>
      <div class="search-wrap">
        <input
          type="search"
          name="location"
          id="location"
          class="form-control"
          placeholder="Search place within Cavite"
          v-model="searchQuery"
          @input="handleSearch"
          autocomplete="none"
          required
        />
        <div v-if="dropdownVisible" class="list-group results">
          <div v-if="isSearching" class="p-2 border rounded">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <button
            v-else
            v-for="feature in searchResult.features"
            class="list-group-item list-group-item-action"
            @click="
              () => {
                selectedPlace = feature;
                dropdownVisible = false;
              }
            "
          >
            {{ feature.place_name }}
          </button>
        </div>
      </div>
      <div class="py-3">
        <p>{{ selectedPlace }}</p>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import { searchPlaces } from "../services/locations";
import { debounce } from "lodash";

const searchQuery = ref("");
const searchResult = ref({});
const dropdownVisible = ref(false);
const isSearching = ref(true);
const selectedPlace = ref({});

const handleSearch = debounce(async () => {
  if (!searchQuery.value) {
    dropdownVisible.value = false;
    return;
  }
  dropdownVisible.value = true;
  searchResult.value = await searchPlaces(searchQuery.value);
  isSearching.value = false;
}, 1000);

const emit = defineEmits(["location-selected"]);

watch(selectedPlace, (val) => {
  emit("location-selected", val);
});
</script>

<style scoped>
.search-wrap {
  position: relative;
}
.results {
  margin-top: 5px;
  position: absolute;
}
</style>
