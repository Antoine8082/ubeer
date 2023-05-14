<template>
  <div v-if="showModal" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h2>Mon Panier</h2>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          {{ item.name }} - {{ item.price.toFixed(2) }}€
        </li>
      </ul>
      <p>Total: {{ totalPrice.toFixed(2) }}€</p>
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
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
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
  