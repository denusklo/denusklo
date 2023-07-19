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

  <div class="cart">Cart({{ cart }})</div>

  <h1>
    <!-- {{ product }} -->
    {{ title }}
  </h1>
  <p>{{ description }}</p>
  <div class="product-image">
    <a :href="url">
      <img :src="image" :class="{ 'out-of-stock-img' : !inStock }">
    </a>
    <p v-show="onSale">On Sale</p>
    <p>{{ isOnSale }}</p>
    <ul>
      Details:
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
    <!-- <ul>
      Variants:
      <li v-for="variant in variants" :key="variant.id">{{ variant.color }}</li>
    </ul> -->
    <div 
      v-for="(variant, index) in variants" 
      :key="variant.id" 
      @mouseover="updateVariant(index)"
      class="color-circle"
      :style="{ backgroundColor: variant.color }"
    >
      {{ variant.color }}
    </div>
  </div>
  <p>Inventory: {{ inventory }}</p>
  <p v-if="inventory > 10">In Stock</p>
  <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
  <p v-else>Out of Stock</p>

  <button 
    class="button" 
    @click="addToCart" 
    :disabled="!inStock"
    :class="{ disabledButton : !inStock }"
  >
    Add to Cart
  </button>
  <button class="button" @click="removeFromCart">Remove From Cart</button>

</template>


<script>

  export default {
    data() {
      return {
        product: 'Socks',
        description: 'it is green',
        // image: '../../../public/socks1.jpg',
        // image_2: '../../../public/socks2.jpg',
        url: '#socks1',
        // inStock: false,
        inventory: 100,
        onSale: false,
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
          { id: 2234, color: 'green', image: '../../../public/socks1.jpg', quantity: 50 },
          { id: 2235, color: 'blue', image: '../../../public/socks2.jpg', quantity: 0 },
        ],
        cart: 0,
        style: {
          'color': 'red',
          'font-size': '14px',
        },
        activeClass: true, 
        isActive: true, 
        brand: 'John',
        selectedVariant: 0,
      }
    },
    methods: {
      addToCart() {
        this.cart += 1;
      },
      removeFromCart() {
        this.cart -= 1;
      },
      updateImage(image) {
        this.image = image;
      },
      updateVariant(index) {
        this.selectedVariant = index;
      },
    },
    computed: {
      title() {
        return `${this.brand} ${this.product}` 
      },
      image() {
        return this.variants[this.selectedVariant].image;
      },
      inStock() {
        return this.variants[this.selectedVariant].quantity;
      },
      inventory() {
        return this.variants[this.selectedVariant].quantity;
      },
      isOnSale() {
        if (this.onSale) {
          return `${this.brand} ${this.product} is on Sale`
        }
      }
    },
  }


</script>