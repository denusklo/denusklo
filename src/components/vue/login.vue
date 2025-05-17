<!-- src/components/vue/login.vue -->
<template>
  <!-- Use store getters for conditional rendering and error display -->
  <form v-if="!authStore.isLoggedIn" @submit.prevent="submitForm" class="space-y-4">
    <div v-if="authStore.getIsLoading" class="flex justify-center py-4">
      <svg class="animate-spin h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
      <span class="ml-2 text-gray-700 dark:text-gray-300">Signing in...</span>
    </div>
    <div v-else class="space-y-4"> <!-- Hide form when loading -->
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
        <input type="text" id="username" v-model="emailInput" placeholder="your@email.com"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
        <input type="password" id="password" v-model="passwordInput" placeholder="••••••••"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
          <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">Remember me</label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Forgot password?
          </a>
        </div>
      </div>

      <button type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        :disabled="authStore.getIsLoading">
        Sign in
      </button>

      <!-- Add Registration Link Here -->
      <div class="text-center mt-4">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          Don't have an account?
          <a :href="registrationUrl"
             class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Register here
          </a>
        </p>
      </div>
      <!-- End Registration Link -->

    </div>


    <!-- Use store getter for error display -->
    <div v-if="authStore.getLoginError" class="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
      {{ authStore.getLoginError }}
    </div>

  </form>

  <!-- Use store getter for logged in state and user info -->
  <div v-else class="space-y-4">
    <p class="text-gray-700 dark:text-gray-300">Logged in as {{ authStore.getUserName }}</p>
    <!-- Display username from store -->
    <button @click="authStore.logout"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
      text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
      Logout
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/scripts/authStore'; // Import the auth store

// Use the auth store
const authStore = useAuthStore();

// Local refs for the form inputs only
const emailInput = ref('');
const passwordInput = ref('');

// Calculate the registration URL using the environment variable
const registrationUrl = import.meta.env.PUBLIC_API_URL + '/register';

// Optional: Add a check or warning if PUBLIC_API_URL is not set
if (!import.meta.env.PUBLIC_API_URL) {
  console.warn("PUBLIC_API_URL environment variable is not set. Registration link may be incorrect.");
}


const submitForm = async () => {
  // Call the login action from the store
  await authStore.login({
    email: emailInput.value,
    password: passwordInput.value
  });

  // Clear local password input after submission attempt (success or fail)
  passwordInput.value = '';
  // Optional: Clear email input only on success
  if (authStore.isLoggedIn) {
    emailInput.value = '';
  }
};

// In <script setup>, top-level variables are automatically exposed to the template,
// so `registrationUrl` is available in the template.

</script>

<style scoped>
/* Your styles */
</style>