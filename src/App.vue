<template>
  <div id="app">
    <div class="logo-container" @click="resetFilters">
      <div class="logo-left">
        <img
          class="logo-ubeer"
          src="@/assets/logo-ubeer.png"
          alt="Ubeer Logo"
        />
      </div>
      <div class="logo-right">
        <img
          class="logo-centre"
          src="@/assets/logo-centre.png"
          alt="Logo Centre"
        />
      </div>
      <div class="cart-icon" @click="openCartModal">
        <img
          v-if="cartItems.length > 0"
          :src="require('@/assets/logo-panier-full.png')"
          alt="Panier plein"
        />
        <img
          v-else
          :src="require('@/assets/logo-panier.png')"
          alt="Panier vide"
        />
      </div>
    </div>
    <BeerList
      ref="beerList"
      @addToCart="addToCart"
      @updateCartItems="updateCartItems"
      style="margin-left: 10px"
    />
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

      if (this.totalPrice === 0) {
        this.cartItems = [];
      }
    },

    updateCartItems(items) {
      this.cartItems = items;
      this.calculateTotalPrice();
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
.logo-right {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-centre {
  width: 50%;
  max-width: none !important;
}

.logo-left {
  display: flex;
  align-items: center;
}

.cart-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
}

.cart-icon img {
  max-width: 50px;
  margin-right: 20px;
}
</style>