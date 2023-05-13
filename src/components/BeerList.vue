<template>
  <div>
    <div class="filter-container">
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

      <div class="price-filters">
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
    </div>
    <ul>
      <li v-for="beer in sortedBeers" :key="beer.id">
        <div class="beer-item" @click="goToBeer(beer.id)">
          <div class="beer-info">
            <p>
              {{ beer.name }} - <strong>{{ beer.price.toFixed(2) }}€</strong>
            </p>
          </div>
          <div class="beer-image">
            <img :src="beer.imageUrl" alt="Beer image" />
          </div>
        </div>
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
  computed: {
    sortedBeers() {
      return this.filteredBeers.slice().sort((beer1, beer2) => {
        const name1 = beer1.name.toLowerCase();
        const name2 = beer2.name.toLowerCase();

        if (name1 < name2) {
          return -1;
        } else if (name1 > name2) {
          return 1;
        } else {
          return 0;
        }
      });
    },
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

      filtered = filtered.filter((beer) => {
        const beerPrice = parseFloat(beer.price);

        if (!isNaN(minPrice) && beerPrice < minPrice) {
          return false;
        }

        if (!isNaN(maxPrice) && beerPrice > maxPrice) {
          return false;
        }

        return true;
      });

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
.filter-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}

.price-filters {
  display: flex;
  gap: 10px;
  margin-left: 50px;
}

.beer-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}

.beer-info {
  display: flex;
  align-items: center;
}

.beer-image img {
  max-width: 50px;
}
</style>
