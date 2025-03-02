<template>
  <div class="vue-app-container">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">Shopping Cart</h2>
      <div class="relative">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
          Cart
          <span class="ml-1 px-2 py-0.5 text-xs rounded-full bg-indigo-200 dark:bg-indigo-800">{{ cart.length }}</span>
        </span>
      </div>
    </div>
    
    <product 
      :premium="premium" 
      @add-to-cart="addToCart" 
      @remove-from-cart="removeFromCart"
      class="mb-8"
    ></product>
    
    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Account Login</h3>
        <login></login>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">User Profile</h3>
        <postLogin></postLogin>
      </div>
    </div>
  </div>
</template>

<script>
  import product from './product.vue';
  import login from './login.vue';
  import postLogin from './post-login.vue';
  import detail from './product-detail.vue';

  export default {
    components: {
      product,
      detail,
      login,
      postLogin,
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
        if (lastIndex !== -1) {
          this.cart.splice(lastIndex, 1);
        }
      }
    }
  }
</script>
