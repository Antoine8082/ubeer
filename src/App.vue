<template>
  <div id="app">
    <div class="logo-container" @click="resetFilters">
      <img src="@/assets/logo-ubeer.png" alt="Ubeer Logo" />
    </div>
    <BeerList ref="beerList" />
  </div>
</template>

<script>
import BeerList from "@/components/BeerList.vue";

export default {
  name: "App",
  components: {
    BeerList,
  },
  methods: {
    resetFilters() {
      this.$refs.beerList.resetFilters();
    },
  },
};
</script>

<style>
.logo-container {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.logo-container img {
  max-width: 130px;
}
</style>
