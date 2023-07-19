<template>
  <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>

        <p>Shipping: {{ shipping }}</p>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>

        <div 
          v-for="(variant, index) in variants" 
          :key="variant.id" 
          @mouseover="updateVariant(index)" 
          class="color-circle" 
          :style="{ backgroundColor: variant.color }">
        </div>
        
        <div>
          <button 
            class="button" 
            :class="{ disabledButton: !inStock }" 
            :disabled="!inStock" 
            v-on:click="addToCart">
            Add to Cart
          </button>
        </div>
        <div>
          <button 
            class="button" 
            v-on:click="removeFromCart">
            Remove from Cart
          </button>
        </div>
        <list :reviews="reviews"></list>
        <customForm @review-submitted="addReview"></customForm>
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
      shipping()
      {
        if (this.premium) {
          return 'Free'
        } else {
          return 2.99
        }
      }
    }
  }
</script>