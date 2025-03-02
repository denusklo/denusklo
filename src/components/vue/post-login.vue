<template>
  <div>
    <div v-if="isLoading" class="flex justify-center py-8">
      <svg class="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    
    <div v-else-if="data" class="space-y-4">
      <div v-if="typeof data === 'object'" class="space-y-4">
        <div v-for="(value, key) in data" :key="key" class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
          <span class="font-medium text-gray-700 dark:text-gray-300">{{ key }}:</span> 
          <span class="text-gray-900 dark:text-white">{{ value }}</span>
        </div>
      </div>
      <div v-else class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        {{ data }}
      </div>
    </div>
    
    <div v-else class="text-center py-8">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Authentication Required</h3>
      <p class="mt-2 text-gray-500 dark:text-gray-400">
        Please sign in to view protected content
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      data: null,
    };
  },
  async created() {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        this.isLoading = false;
        return;
      }

      const response = await fetch(import.meta.env.PUBLIC_API_URL + '/v1/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.data = data;
      } else {
        localStorage.removeItem('access_token');
      }
    } catch (error) {
      console.error('API request error');
    } finally {
      this.isLoading = false;
    }
  },
};
</script>
