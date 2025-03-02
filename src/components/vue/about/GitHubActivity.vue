<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="bg-gradient-to-r from-gray-800 to-gray-900 p-4 text-white">
      <h3 class="text-xl font-bold">GitHub Activity</h3>
    </div>
    
    <div class="p-6">
      <div v-if="loading" class="flex justify-center items-center py-8">
        <svg class="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      
      <div v-else-if="error" class="text-center py-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p class="text-gray-600">{{ error }}</p>
      </div>
      
      <div v-else>
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-4">
            {{ githubData.username.charAt(0).toUpperCase() }}
          </div>
          <div>
            <h4 class="font-bold text-gray-800">{{ githubData.username }}</h4>
            <p class="text-sm text-gray-600">{{ githubData.repoCount }} repositories · {{ githubData.contributions }} contributions</p>
          </div>
        </div>
        
        <h4 class="font-medium text-gray-800 mb-4">Recent Activity</h4>
        
        <ul class="space-y-4">
          <li v-for="(item, index) in githubData.activities" :key="index" class="border-b border-gray-100 pb-4 last:border-0">
            <div class="flex">
              <div class="text-2xl mr-3">{{ item.icon }}</div>
              <div>
                <p class="text-gray-800">{{ item.description }}</p>
                <p class="text-sm text-gray-500 mt-1">{{ item.time }}</p>
              </div>
            </div>
          </li>
        </ul>
        
        <div class="mt-6 text-center">
          <a 
            href="https://github.com/denusklo" 
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium"
          >
            View GitHub Profile
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const error = ref(null);
const githubData = ref({
  username: 'denusklo',
  repoCount: 18,
  contributions: 245,
  activities: [
    {
      icon: '🔀',
      description: 'Merged a pull request in web3-integration',
      time: '3 days ago'
    },
    {
      icon: '📝',
      description: 'Created repository payment-gateway-api',
      time: '1 week ago'
    },
    {
      icon: '🔨',
      description: 'Committed 5 changes to openai-telegram-bot',
      time: '1 week ago'
    },
    {
      icon: '⭐',
      description: 'Starred laravel/laravel',
      time: '2 weeks ago'
    }
  ]
});

onMounted(() => {
  fetchGithubData();
});

function fetchGithubData() {
  // Simulate API fetch with timeout
  setTimeout(() => {
    try {
      // This would be replaced with a real GitHub API call
      // const username = 'denusklo';
      // const response = await fetch(`https://api.github.com/users/${username}`);
      
      // For demo, we're just using the mock data
      loading.value = false;
    } catch (err) {
      error.value = "Could not load GitHub data";
      loading.value = false;
    }
  }, 1000);
}
</script>