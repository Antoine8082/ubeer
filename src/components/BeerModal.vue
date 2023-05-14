<template>
  <div class="beer-modal">
    <div class="beer-image">
      <img :src="beer.imageUrl" alt="Beer image" />
    </div>
    <div class="beer-details">
      <h2>{{ beer.name }}</h2>
      <p>{{ beer.description }}</p>
      <p>Price: {{ beer.price.toFixed(2) }}€</p>
      <p>Brewery: {{ brewery.name }}</p>
      <p>Address: {{ brewery.address }}</p>
      <div class="quantity-container">
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" v-model="quantity" min="1" />
      </div>
      <button @click="addToCart">Add to Cart</button>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "BeerModal",
  props: {
    beer: Object,
    brewery: Object,
  },
  data() {
    return {
      quantity: 1,
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", {
        beer: this.beer,
        brewery: this.brewery,
        quantity: this.quantity,
      });
      this.$emit("close");
    },
  },
};
</script>
  
  <style scoped>
.beer-modal {
}

.beer-image img {
  width: 100px;
}

.beer-details {
}

.quantity-container {
  margin-top: 10px;
}

button {
  margin-top: 10px;
}
</style>
  