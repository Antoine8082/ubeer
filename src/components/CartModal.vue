<template>
  <div v-if="showModal" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h2>Mon Panier</h2>
      <ul>
        <li v-for="beer in cartItemsCopy" :key="beer.id">
          <div class="cart-item">
            <div class="beer-details">
              <h3>{{ beer.name }}</h3>
              <p>{{ beer.price.toFixed(2) }}€</p>
            </div>
            <div class="beer-quantity">
              <button
                @click="decrementQuantity(beer)"
                :disabled="beer.quantity === 1"
              >
                -
              </button>
              <span>{{ beer.quantity }}</span>
              <button @click="incrementQuantity(beer)">+</button>
            </div>
            <button class="remove-button" @click="removeFromCart(beer)">
              Supprimer
            </button>
          </div>
        </li>
      </ul>
      <p>Total: {{ calculatedTotalPrice.toFixed(2) }}€</p>
      <button @click="closeModal">Fermer</button>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "CartModal",
  props: {
    cartItems: {
      type: Array,
      default: () => [],
      required: true,
    },
    updateCartItems: {
      type: Function,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cartItemsCopy: [],
      calculatedTotalPrice: 0,
    };
  },
  watch: {
    cartItems: {
      handler(newCartItems) {
        this.cartItemsCopy = JSON.parse(JSON.stringify(newCartItems));
        this.updateTotalPrice();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    incrementQuantity(beer) {
      const index = this.cartItemsCopy.findIndex((item) => item.id === beer.id);
      if (index !== -1) {
        this.cartItemsCopy[index].quantity++;
        this.$emit("updateCartItems", this.cartItemsCopy);
        this.updateTotalPrice();
      }
    },
    decrementQuantity(beer) {
      const index = this.cartItemsCopy.findIndex((item) => item.id === beer.id);
      if (index !== -1 && this.cartItemsCopy[index].quantity > 1) {
        this.cartItemsCopy[index].quantity--;
        this.$emit("updateCartItems", this.cartItemsCopy);
        this.updateTotalPrice();
      }
    },
    removeFromCart(beer) {
      const index = this.cartItemsCopy.findIndex((item) => item.id === beer.id);
      if (index !== -1) {
        this.cartItemsCopy.splice(index, 1);
        this.$emit("updateCartItems", this.cartItemsCopy);
        this.updateTotalPrice();
      }
    },

    updateTotalPrice() {
      this.calculatedTotalPrice = this.cartItemsCopy.reduce(
        (total, beer) => total + beer.price * beer.quantity,
        0
      );
    },
  },
  created() {
    this.cartItemsCopy = JSON.parse(JSON.stringify(this.cartItems));
    this.updateTotalPrice();
  },
};
</script>


    <style scoped>
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

.modal h2 {
  margin-bottom: 10px;
}

.modal ul {
  list-style-type: none;
  padding: 0;
}

.modal li {
  margin-bottom: 5px;
}

.modal p {
  font-weight: bold;
}

.modal button {
  margin-top: 10px;
}
</style>
    