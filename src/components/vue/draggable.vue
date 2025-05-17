<template>
  <div class="draggable-container mb-8">
    <div class="cart-status flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-4">
      <h3 class="text-lg font-medium">Items in cart: {{ cartItems.length }}</h3>
      <button 
        @click="clearCart" 
        class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        :disabled="!cartItems.length"
      >
        Clear Cart
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Available products section -->
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4 border-b pb-2">Available Products</h3>
        
        <div 
          v-for="item in products" 
          :key="item.id" 
          class="product-item p-3 mb-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-move hover:shadow-md transition"
          draggable="true"
          @dragstart="dragStart($event, item)"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
              <span class="text-indigo-600 font-bold">{{ item.name.charAt(0) }}</span>
            </div>
            <div>
              <h4 class="font-medium">{{ item.name }}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">${{ item.price.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Shopping cart section -->
      <div 
        class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border-2 border-dashed"
        :class="isDraggingOver ? 'border-indigo-500' : 'border-gray-300 dark:border-gray-700'"
        @dragover.prevent="dragOver"
        @drop.prevent="drop"
        @dragleave="dragLeave"
      >
        <h3 class="text-lg font-semibold mb-4 border-b pb-2">Your Cart</h3>
        
        <div v-if="cartItems.length === 0" class="py-8 text-center text-gray-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p>Drag and drop products here</p>
        </div>
        
        <div v-else class="space-y-3">
          <div 
            v-for="(item, index) in cartItems" 
            :key="index"
            class="cart-item flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                <span class="text-indigo-600 font-bold">{{ item.name.charAt(0) }}</span>
              </div>
              <div>
                <h4 class="font-medium">{{ item.name }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">${{ item.price.toFixed(2) }}</p>
              </div>
            </div>
            <button 
              @click="removeFromCart(index)" 
              class="text-red-500 hover:text-red-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div v-if="cartItems.length > 0" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex justify-between mb-2">
            <span class="font-medium">Subtotal:</span>
            <span>${{ calculateTotal().toFixed(2) }}</span>
          </div>
          <button 
            @click="checkout" 
            class="w-full mt-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
          >
            Checkout
          </button>
        </div>
      </div>
      
      <!-- Order summary section -->
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4 border-b pb-2">Order Summary</h3>
        
        <div v-if="orders.length === 0" class="py-8 text-center text-gray-500 dark:text-gray-400">
          <p>No orders yet</p>
        </div>
        
        <div v-else class="space-y-4">
          <div 
            v-for="(order, index) in orders" 
            :key="index"
            class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div class="flex justify-between items-center mb-2">
              <span class="font-medium">Order #{{ index + 1 }}</span>
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ order.date }}</span>
            </div>
            <div class="space-y-1 mb-2">
              <div v-for="item in order.items" :key="item.id" class="flex justify-between text-sm">
                <span>{{ item.name }}</span>
                <span>${{ item.price.toFixed(2) }}</span>
              </div>
            </div>
            <div class="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600 font-medium">
              <span>Total:</span>
              <span>${{ order.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDraggingOver: false,
      products: [
        { id: 1, name: 'Vue Mastery Socks', price: 12.99 },
        { id: 2, name: 'Vue Developer T-Shirt', price: 19.99 },
        { id: 3, name: 'Vue Framework Book', price: 29.99 },
        { id: 4, name: 'Vue Conference Ticket', price: 99.99 },
        { id: 5, name: 'Vue Logo Sticker Pack', price: 8.99 },
      ],
      cartItems: [],
      orders: [],
    }
  },
  methods: {
    dragStart(event, item) {
      event.dataTransfer.setData('itemId', item.id);
    },
    dragOver(event) {
      this.isDraggingOver = true;
    },
    dragLeave() {
      this.isDraggingOver = false;
    },
    drop(event) {
      const itemId = parseInt(event.dataTransfer.getData('itemId'));
      const item = this.products.find(p => p.id === itemId);
      if (item) {
        this.cartItems.push({...item});
      }
      this.isDraggingOver = false;
    },
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
    },
    clearCart() {
      this.cartItems = [];
    },
    calculateTotal() {
      return this.cartItems.reduce((sum, item) => sum + item.price, 0);
    },
    checkout() {
      if (this.cartItems.length === 0) return;
      
      const order = {
        items: [...this.cartItems],
        total: this.calculateTotal(),
        date: new Date().toLocaleDateString()
      };
      
      this.orders.push(order);
      this.cartItems = [];
    }
  }
}
</script>
