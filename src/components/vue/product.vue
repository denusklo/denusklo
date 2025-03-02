<template>
  <div class="product-display bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
    <div class="md:flex">
      <div class="product-image md:w-1/3 relative overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img 
          :src="image" 
          :alt="title"
          class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        >
        <div v-if="!inStock" class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <span class="text-white font-bold text-xl">Out of Stock</span>
        </div>
      </div>
      
      <div class="product-info p-6 md:w-2/3">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ title }}</h1>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            Shipping: {{ shipping }}
          </span>
          <span 
            :class="inStock ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'"
            class="px-3 py-1 text-sm rounded-full"
          >
            {{ inStock ? 'In Stock' : 'Out of Stock' }}
          </span>
        </div>
        
        <div class="mb-6">
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available Colors:</h3>
          <div class="flex space-x-3">
            <div 
              v-for="(variant, index) in variants" 
              :key="variant.id" 
              @mouseover="updateVariant(index)" 
              class="color-circle cursor-pointer transition-transform duration-200 hover:scale-110"
              :class="{ 'ring-2 ring-offset-2 ring-indigo-500': selectedVariant === index }"
              :style="{ backgroundColor: variant.color }"
            ></div>
          </div>
        </div>
        
        <div class="flex space-x-4 mb-6">
          <button 
            class="px-4 py-2 rounded-lg font-medium text-white transition-colors duration-200"
            :class="inStock ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'"
            :disabled="!inStock" 
            @click="addToCart"
          >
            Add to Cart
          </button>
          
          <button 
            class="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            @click="removeFromCart"
          >
            Remove from Cart
          </button>
        </div>
        
        <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product Reviews</h3>
            <list :reviews="reviews"></list>
          </div>
          
          <customForm @review-submitted="addReview"></customForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import customForm from './form.vue';
  import list from './review-list.vue';

  export default {
    name: 'product-display',
    components: {
      customForm,
      list,
    },
    props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        product: 'Socks',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
          { id: 2234, color: 'green', image: 'socks1.jpg', quantity: 50 },
          { id: 2235, color: 'blue', image: 'socks2.jpg', quantity: 1 },
        ],
        reviews: [],
      }
    },
    methods: {
      updateVariant(index) {
        this.selectedVariant = index
      },
      addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
      },
      removeFromCart() {
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
      },
      addReview(review) {
        this.reviews.push(review)
      }
    },
    computed: {
      title() {
        return this.brand + ' ' + this.product
      },
      image() {
        return this.variants[this.selectedVariant].image
      },
      inStock() {
        return this.variants[this.selectedVariant].quantity
      },
      shipping() {
        if (this.premium) {
          return 'Free'
        } else {
          return 2.99
        }
      }
    }
  }
</script>

<style>
.color-circle {
  width: 36px;
  height: 36px;
  border: 2px solid #d8d8d8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
