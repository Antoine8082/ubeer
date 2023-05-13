<template>
  <div>
    <select v-model="selectedBrewery" @change="filterBeers">
      <option value="">Liste des brasseries</option>
      <option
        v-for="brewery in breweries"
        :key="brewery.id"
        :value="brewery.id"
      >
        {{ brewery.name }}
      </option>
    </select>

    <div>
      <input
        type="number"
        placeholder="Min price"
        v-model="minPrice"
        @input="filterBeers"
      />
      <input
        type="number"
        placeholder="Max price"
        v-model="maxPrice"
        @input="filterBeers"
      />
    </div>

    <ul>
      <li v-for="beer in filteredBeers" :key="beer.id">
        {{ beer.name }} - {{ beer.price.toFixed(2) }}€
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "BeerList",
  data() {
    return {
      beers: [],
      breweries: [],
      filteredBeers: [],
      selectedBrewery: "",
      minPrice: null,
      maxPrice: null,
    };
  },
  methods: {
    async fetchBreweries() {
      try {
        const response = await api.getBreweries();
        this.breweries = response.data;
      } catch (error) {
        console.error("Error fetching breweries:", error.message);
      }
    },
    filterBeers() {
      let filtered = this.beers;
      if (this.selectedBrewery) {
        filtered = filtered.filter(
          (beer) => beer.breweryId === this.selectedBrewery
        );
      }

      const minPrice = parseFloat(this.minPrice);
      const maxPrice = parseFloat(this.maxPrice);
      if (!isNaN(minPrice) || !isNaN(maxPrice)) {
        filtered = filtered.filter((beer) => {
          const beerPrice = parseFloat(beer.price);
          if (isNaN(minPrice)) {
            return beerPrice <= maxPrice;
          } else if (isNaN(maxPrice)) {
            return beerPrice >= minPrice;
          } else {
            return beerPrice >= minPrice && beerPrice <= maxPrice;
          }
        });
      }

      this.filteredBeers = filtered;
    },
  },
  async created() {
    try {
      const response = await api.getBeers();
      this.beers = response.data;
      this.filteredBeers = this.beers;
      await this.fetchBreweries();
    } catch (error) {
      console.error("Error fetching beers:", error.message);
    }
  },
};
</script>

<style scoped>
/* styles du composant BeerList */
</style>
