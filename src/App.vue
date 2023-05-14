<template>
  <div id="app">
    <div class="logo-container" @click="resetFilters">
      <img src="@/assets/logo-ubeer.png" alt="Ubeer Logo" />
      <div class="cart-icon" @click="openCartModal">
        <img src="@/assets/logo-panier.png" alt="Panier Logo" />
      </div>
    </div>
    <BeerList ref="beerList" @addToCart="addToCart" />
    <CartModal
      v-model:cartItems="cartItems"
      :totalPrice="totalPrice"
      :showModal="showCartModal"
      @closeModal="closeCartModal"
      @update:cartItems="updateCartItems"
    />
  </div>
</template>

<script>
import BeerList from "@/components/BeerList.vue";
import CartModal from "@/components/CartModal.vue";

export default {
  name: "App",
  components: {
    BeerList,
    CartModal,
  },
  data() {
    return {
      cartItems: [],
      totalPrice: 0,
      showCartModal: false,
    };
  },
  methods: {
    resetFilters() {
      this.$refs.beerList.resetFilters();
    },
    openCartModal() {
      this.showCartModal = true;
    },
    closeCartModal() {
      this.showCartModal = false;
    },
    addToCart(beer) {
      this.cartItems.push(beer);
      this.calculateTotalPrice();
    },
    calculateTotalPrice() {
      this.totalPrice = this.cartItems.reduce(
        (total, beer) => total + beer.price,
        0
      );
    },
    updateCartItems(items) {
      this.cartItems = items;
    },
  },
};
</script>

<style>
.logo-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.logo-container img {
  max-width: 130px;
}

.cart-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
}

.cart-icon img {
  max-width: 50px;
}
</style>
