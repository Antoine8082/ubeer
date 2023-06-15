<template>
  <div id="app" class="site-background">
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
      <LoginModal
        v-if="!loggedIn"
        @login="login"
        @closeModal="closeLoginModal"
      />
    </div>
  </div>
</template>

<script>
import BeerList from "@/components/BeerList.vue";
import CartModal from "@/components/CartModal.vue";
import LoginModal from "@/components/LoginModal.vue";

export default {
  name: "App",
  components: {
    BeerList,
    CartModal,
    LoginModal,
  },
  data() {
    return {
      cartItems: [],
      totalPrice: 0,
      showCartModal: false,
      loggedIn: false,
      username: "",
      password: "",
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

    async login() {
      try {
        const user = await user.findOne({ where: { username: this.username } });
        if (!user) {
          alert("Invalid username or password");
          return;
        }

        this.loggedIn = true;
        this.closeLoginModal();
      } catch (error) {
        console.error(error);
        alert("An error occurred during login");
      }
    },
    closeLoginModal() {
      this.username = "";
      this.password = "";
      this.$refs.loginModal.closeModal();
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
.site-background {
  background-image: url("@/assets/logo-back-2.png");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>