<template>
  <div>
    <select v-model="selectedBrewery" @change="filterByBrewery">
      <option value="">Select a brewery</option>
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
        @input="filterByPrice"
      />
      <input
        type="number"
        placeholder="Max price"
        v-model="maxPrice"
        @input="filterByPrice"
      />
    </div>

    <ul>
      <li v-for="beer in filteredBeers" :key="beer.id">{{ beer.name }}</li>
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
      prices: [],
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
    async fetchPrices() {
      try {
        const response = await api.getPrices();
        this.prices = response.data;
      } catch (error) {
        console.error("Error fetching prices:", error.message);
      }
    },
    filterByBrewery() {
      if (this.selectedBrewery) {
        this.filteredBeers = this.beers.filter(
          (beer) => beer.breweryId === this.selectedBrewery
        );
      } else {
        this.filteredBeers = this.beers;
      }
    },
    filterByPrice() {
      this.filteredBeers = this.beers.filter((beer) => {
        const beerPrice = parseFloat(beer.price);
        const minPrice = parseFloat(this.minPrice);
        const maxPrice = parseFloat(this.maxPrice);

        if (isNaN(minPrice) && isNaN(maxPrice)) {
          return true; // Si aucune valeur n'est spécifiée, afficher toutes les bières
        } else if (isNaN(minPrice)) {
          return beerPrice <= maxPrice;
        } else if (isNaN(maxPrice)) {
          return beerPrice >= minPrice;
        } else {
          return beerPrice >= minPrice && beerPrice <= maxPrice;
        }
      });
    },
  },
  async created() {
    try {
      const response = await api.getBeers();
      this.beers = response.data;
      this.filteredBeers = this.beers;
      await this.fetchBreweries();
      await this.fetchPrices();
    } catch (error) {
      console.error("Error fetching beers:", error.message);
    }
  },
};
</script>

<style scoped>
/* Les styles du composant BeerList seront ici */
</style>
