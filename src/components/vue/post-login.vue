<!-- src/components/vue/post-login.vue -->
<template>
  <div>
    <!-- Use store getter for loading state -->
    <div v-if="authStore.getIsLoading" class="flex justify-center py-8">
      <svg class="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Use store getter for user data -->
    <div v-else-if="authStore.getUser" class="space-y-4">
      <!-- Check if user data is an object and not null before attempting to loop -->
      <div v-if="typeof authStore.getUser === 'object' && authStore.getUser !== null" class="space-y-4">
        <template v-for="(value, key) in authStore.getUser" :key="key">
          <div v-if="value !== null && value !== ''" class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <span class="font-medium text-gray-700 dark:text-gray-300">{{ key }}: </span>
            <span class="text-gray-900 dark:text-white">{{ formatValue(key, value) }}</span>
          </div>
        </template>
      </div>
      <!-- Handles cases where user data might be a string or number (not an object to iterate) -->
      <div v-else class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        {{ authStore.getUser }}
      </div>
    </div>

    <!-- Show message if not logged in (no token or fetch failed) -->
    <div v-else class="text-center py-8">
       <!-- You might want to show this specific message only if authStore.isLoggedIn is false -->
       <div v-if="!authStore.isLoggedIn">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Authentication Required</h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400">
              Please sign in to view protected content
            </p>
        </div>
        <!-- Or a different message if fetchUser failed *while* logged in? -->
        <div v-else>
            <p class="mt-2 text-red-500 dark:text-red-400">
               Could not load user data. Please try logging in again.
            </p>
        </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '../../scripts/authStore'; // Import the auth store

// Use the auth store
const authStore = useAuthStore();

// formatValue function remains the same
const formatValue = (key, value) => {
  if (key === 'created_at' || key === 'updated_at') {
    if (value) {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date.toLocaleString();
        } else {
          console.warn("Invalid date value for formatting:", value);
          return value;
        }
      } catch (e) {
        console.error("Error formatting date:", e);
        return value;
      }
    }
  }
  return value;
};

// Fetch user data when the component mounts
onMounted(() => {
  // This ensures that if the user is already logged in (token in localStorage),
  // the user data is fetched and displayed when this component appears.
  // The initializeAuth action in the store is also an option, call it higher up.
  // Calling fetchUser here is simple and works for this component's need.
  authStore.fetchUser();
});

// No need for event listeners as component reacts to store changes
// No need for local isLoading, data refs, use store getters

</script>

<style scoped>
/* Your styles */
</style>