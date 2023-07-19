<style>
.color-circle {
  width: 50px;
  height: 50px;
  margin-top: 8px;
  border: 2px solid #d8d8d8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.disabledButton {
  background-color: #d8d8d8;
  cursor: not-allowed;
}
</style>


<template>
  <p>Cart({{ cart }})</p>
  <product :premium="premium" @add-to-cart="addToCart" @remove-from-cart="removeFromCart"></product>
</template>


<script>
  import product from './product.vue';
  import detail from './product-detail.vue';

  export default {
    components: {
      product,
      detail,
    },
    data() {
      return {
        premium: true,
        cart: [],
      }
    },
    methods: {
      addToCart(id) {
        this.cart.push(id)
      },
      removeFromCart(id) {

        const lastIndex = this.cart.lastIndexOf(id);

        // Check if the item is found in the array
        if (lastIndex !== -1) {
          // Use splice to remove the item at the found index
          this.cart.splice(lastIndex, 1);
        }

      }
    }

  }


</script>