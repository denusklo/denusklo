<template>
  <div class="review-form-container">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leave a Review</h3>
    
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name:</label>
        <input 
          id="name" 
          v-model="name"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
      </div>
      
      <div>
        <label for="review" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Review:</label>      
        <textarea 
          id="review" 
          v-model="review"
          rows="3"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        ></textarea>
      </div>
      
      <div>
        <label for="rating" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating:</label>
        <select 
          id="rating" 
          v-model.number="rating"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option disabled value="null">Select a rating</option>
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </div>
      
      <div>
        <label for="recommend" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Would you recommend this product?</label>      
        <textarea 
          id="recommend" 
          v-model="recommend"
          rows="2"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        ></textarea>
      </div>
      
      <button 
        type="submit"
        class="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
      >
        Submit Review
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      review: '',
      rating: null,
      recommend: '',
    }
  },
  methods: {
    onSubmit() {
      if (this.name === '' || this.review === '' || this.rating === null) {
        alert('Review is incomplete. Please fill out every field.')
        return
      }

      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
        recommend: this.recommend,
      }
      this.$emit('review-submitted', productReview)
  
      this.name = ''
      this.review = ''
      this.rating = null
      this.recommend = ''
    }
  }
}
</script>