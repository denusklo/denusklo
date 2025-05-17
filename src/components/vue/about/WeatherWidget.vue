<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white">
      <h3 class="text-xl font-bold">Weather</h3>
    </div>

    <div class="p-6">
      <div v-if="loading" class="flex justify-center items-center py-8">
        <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

      <div v-else class="text-center">
        <div class="flex justify-center mb-4">
          <div class="text-6xl mb-2">{{ getWeatherEmoji(weather.condition) }}</div>
        </div>

        <div class="mb-6">
          <h4 class="text-4xl font-bold text-gray-800 mb-1">{{ weather.temperature }}°C</h4>
          <p class="text-gray-600">{{ weather.condition }}</p>
        </div>

        <div class="grid grid-cols-3 gap-4 mb-4">
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-gray-500 text-sm mb-1">Humidity</p>
            <p class="font-medium">{{ weather.humidity }}%</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-gray-500 text-sm mb-1">Wind</p>
            <p class="font-medium">{{ weather.wind }} km/h</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-gray-500 text-sm mb-1">Feels like</p>
            <p class="font-medium">{{ weather.feelsLike }}°C</p>
          </div>
        </div>

        <p class="text-gray-600 text-sm">{{ weather.location }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const error = ref(null);
const weather = ref({
  temperature: null,
  feelsLike: null,
  condition: null,
  humidity: null,
  wind: null,
  location: null
});

const OPENWEATHERMAP_API_KEY = import.meta.env.PUBLIC_OPENWEATHERMAP_API_KEY; // Access the env variable

const latitude = ref(2.13); // Default latitude (e.g., Miri)
const longitude = ref(113.96); // Default longitude (e.g., Miri)

onMounted(() => {
  // Get user's location if possible.  Handle errors gracefully if geolocation fails.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
        fetchWeather();
      },
      (error) => {
        console.error("Geolocation error:", error);
        fetchWeather(); // Fetch weather using default coordinates if geolocation fails
      }
    );
  } else {
    console.warn("Geolocation is not supported by this browser.");
    fetchWeather(); // Fetch weather using default coordinates if geolocation is not supported
  }
});

async function fetchWeather() {
  try {

    const apiKey = OPENWEATHERMAP_API_KEY; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.value}&lon=${longitude.value}&units=metric&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    weather.value = {
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      location: data.name + ', ' + data.sys.country
    };

    loading.value = false;
  } catch (err) {
    console.error("Error fetching weather data:", err);
    error.value = "Could not load weather data";
    loading.value = false;
  }
}

function getWeatherEmoji(condition) {
  const conditions = {
    'Clear': '☀️',
    'Sunny': '☀️',
    'Clouds': '☁️', //  'Partly Cloudy', 'Cloudy', 'Overcast' all mapped to Clouds
    'Rain': '🌧️',
    'Drizzle': '🌦️',  //'Showers': '🌦️', Drizzle is a better fit
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '🌫️', //added smoke case
    'Haze': '🌫️',  //added haze case
    'Dust': '🌫️', //added dust case
    'Fog': '🌫️',
    'Sand': '🌫️', // added sand case.
    'Ash': '🌫️', //added ash case
    'Squall': '🌬️', // added squall case
    'Tornado': '🌪️', // added tornado case.

  };

  return conditions[condition] || '🌡️';
}
</script>