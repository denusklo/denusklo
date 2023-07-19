<template>
  <form class="review-form flex flex-col max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" @submit.prevent="onSubmit">
    <h3>Leave a review</h3>
    <label for="name">Name:</label>
    <input id="name" v-model="name">

    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>
    
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
    
    <label for="recommend">Would you recommend this product?</label>      
    <textarea id="recommend" v-model="recommend"></textarea>

    <input class="button text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" type="submit" value="Submit">
  </form>
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
    }
  }
}

</script>