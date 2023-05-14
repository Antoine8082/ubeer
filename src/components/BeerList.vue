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
    <ul class="beer-list">
      <li v-for="beer in sortedBeers" :key="beer.id">
        <div class="beer-item" @click="openModal(beer)">
          <div class="beer-image">
            <img :src="beer.imageUrl" alt="Beer image" />
          </div>
          <div class="beer-details">
            <strong
              ><p class="beer-name">{{ beer.name }}</p></strong
            >
          </div>
          <div class="beer-price">
            <p>{{ beer.price.toFixed(2) }}€</p>
          </div>
        </div>
      </li>
    </ul>

    <!-- // MODALE // -->
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="beer-image">
          <img
            :src="selectedBeer.imageUrl"
            alt="Beer image"
            class="modal-beer-image"
          />
        </div>
        <div class="beer-details">
          <h2 class="beer-name">{{ selectedBeer.name }}</h2>
          <p class="beer-description">{{ selectedBeer.description }}</p>
          <h3 class="brewery-name">{{ selectedBeer.brewery.name }}</h3>
          <p class="brewery-address">{{ selectedBeer.brewery.address }}</p>
          <h3 class="beer-price">{{ selectedBeer.price.toFixed(2) }}€</h3>
          <div class="quantity">
            <label for="quantity">Quantité:</label>
            <input type="number" id="quantity" v-model="quantity" />
          </div>
          <button @click="addToCart(selectedBeer)">Ajouter au panier</button>
        </div>
      </div>
    </div>
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
      showModal: false,
      selectedBeer: null,
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
    openModal(beer) {
      this.selectedBeer = beer;
      this.showModal = true;
    },
    closeModal() {
      this.selectedBeer = null;
      this.showModal = false;
    },
    addToCart(beer) {
      // Ajouter la bière au panier
      console.log("Added to cart:", beer);
    },
    resetFilters() {
      this.selectedBrewery = "";
      this.minPrice = null;
      this.maxPrice = null;
      this.filterBeers();
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
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}

.beer-list {
  list-style-type: none;
  padding: 0;
  width: 90%;
  margin: 0 auto;
}

.beer-image {
  margin-right: 10px;
}

.beer-image img {
  max-width: 50px;
  margin-right: 20px;
}

.beer-details {
  flex-grow: 1;
}

.beer-price {
  text-align: left;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 75%;
  max-width: 800px;
  margin: 0 auto;
}

.quantity {
  margin-top: 10px;
}

.modal button {
  margin-top: 10px;
}
.modal-beer-image {
  max-width: 300px;
  max-height: 300px;
}
</style>
