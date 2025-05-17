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
            <p class="text-sm text-gray-600">{{ githubData.repoCount }} repositories</p>
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
  username: '',
  repoCount: 0,
  activities: []
});
const repositories = ref([]);

const GITHUB_USERNAME = 'denusklo'; // Replace with your actual username
const GITHUB_PAT = import.meta.env.PUBLIC_GITHUB_PAT; // Access the env variable


onMounted(() => {
  fetchData();
});

async function fetchData() {
    try {
        await fetchGithubData();  // Fetch user data and events first
        await fetchRepositories(); // Then, fetch repositories
        loading.value = false;     // Set loading to false only after *both* calls complete
    } catch (err) {
        error.value = `Could not load GitHub data: ${err.message}`;
        loading.value = false;
        console.error(err);
    }
}

async function fetchGithubData() {
  try {
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: {
        'Authorization': `token ${GITHUB_PAT}` // Include PAT for higher rate limits and private access
      }
    });

    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status}`);
    }

    const userData = await userResponse.json();

    const eventsResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events`, {
      headers: {
        'Authorization': `token ${GITHUB_PAT}`
      }
    });

    if (!eventsResponse.ok) {
      throw new Error(`GitHub Events API error: ${eventsResponse.status}`);
    }

    const eventsData = await eventsResponse.json();

    githubData.value = {
      ...githubData.value,  // Keep existing values
      username: userData.login,
      activities: processEvents(eventsData)
    };


  } catch (err) {
    error.value = `Could not load GitHub data: ${err.message}`;
    console.error(err);
    throw err; // Re-throw to be caught in fetchData
  }
}

async function fetchRepositories() {
    try {
        const response = await fetch(`https://api.github.com/user/repos?type=all`, {
            headers: {
                'Authorization': `token ${GITHUB_PAT}`
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub Repositories API error: ${response.status}`);
        }

        const repoData = await response.json();
        repositories.value = repoData;

        //After fetching all the repos we can determine the repoCount correctly
        githubData.value = {
            ...githubData.value,
            repoCount: repositories.value.length,
        }
        
    } catch (err) {
        error.value = `Could not load GitHub repositories: ${err.message}`;
        console.error(err);
        throw err; //Re-throw to be caught in fetchData
    }
}

function processEvents(events) {
  return events.slice(0, 5).map(event => { // Show only the 5 most recent events
    let description = '';
    let icon = '';

    switch (event.type) {
      case 'PushEvent':
        icon = '⬆️';
        description = `Pushed ${event.payload.commits.length} commit(s) to ${event.repo.name}`;
        break;
      case 'CreateEvent':
        icon = '✨';
        description = `Created repository ${event.repo.name}`;
        break;
      case 'PullRequestEvent':
        icon = '🤝';
        description = `${event.payload.action} pull request in ${event.repo.name}`;
        break;
      case 'IssuesEvent':
        icon = '📌';
        description = `${event.payload.action} issue in ${event.repo.name}`;
        break;
      case 'WatchEvent':
        icon = '⭐';
        description = `Starred ${event.repo.name}`;
        break;
      case 'ForkEvent':
        icon = '🌱';
        description = `Forked ${event.repo.name} to ${event.payload.forkee.full_name}`;
        break;
      default:
        icon = '❓';
        description = `Performed ${event.type} on ${event.repo.name}`; // Fallback
    }

    return {
      icon: icon,
      description: description,
      time: timeSince(new Date(event.created_at))
    };
  });
}

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}
</script>