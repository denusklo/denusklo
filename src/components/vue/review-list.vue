<template>
  <div class="review-container">
    <div v-if="reviews.length === 0" class="text-gray-500 dark:text-gray-400 italic text-center py-4">
      No reviews yet. Be the first to leave a review!
    </div>
    
    <ul v-else class="space-y-4">
      <li 
        v-for="(review, index) in reviews" 
        :key="index"
        class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="font-medium text-gray-900 dark:text-white">{{ review.name }}</span>
          <div class="flex items-center">
            <span class="text-yellow-400">
              <template v-for="n in 5" :key="n">
                <svg v-if="n <= review.rating" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300 dark:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </template>
            </span>
          </div>
        </div>
        
        <p class="text-gray-600 dark:text-gray-300 mb-2">{{ review.review }}</p>
        
        <div class="text-sm text-gray-500 dark:text-gray-400">
          <span class="font-medium">Recommendation:</span> {{ review.recommend }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  }
}
</script>
