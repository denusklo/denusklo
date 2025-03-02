<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <div>
      <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
      <input 
        type="text" 
        id="username"
        v-model="username" 
        placeholder="your@email.com"
        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      >
    </div>
    
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
      <input 
        type="password" 
        id="password"
        v-model="password" 
        placeholder="••••••••"
        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      >
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
    
    <button 
      type="submit"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Sign in
    </button>
    
    <div v-if="responseData" class="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
      Login successful!
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      responseData: null,
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch(import.meta.env.PUBLIC_API_URL + '/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.username,
            password: this.password,
          }),
        });

        if (response.ok) {
          console.log('Form submission successful');
          const data = await response.json();
          this.responseData = data;
          const accessToken = data.access_token;
          localStorage.setItem('access_token', accessToken);
        } else {
          console.error('Form submission failed:', response.status);
        }
      } catch (error) {
        console.error('Form submission failed:', error);
      }
    },
  },
};
</script>
