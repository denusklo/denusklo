<template>
  <div class="py-16">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-2 text-gray-800">Projects</h2>
      <div class="w-24 h-1 bg-indigo-500 mb-8"></div>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div 
          v-for="(project, index) in projects" 
          :key="index"
          class="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
        >
          <div class="h-48 bg-gradient-to-r" :class="getProjectGradient(index)"></div>
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2">{{ project.title }}</h3>
            <p class="text-gray-600 mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-6">
              <span 
                v-for="(tag, tagIndex) in project.tags" 
                :key="tagIndex"
                class="text-xs px-3 py-1 rounded-full"
                :class="getTagColor(tagIndex)"
              >
                {{ tag }}
              </span>
            </div>
            <div class="flex justify-between">
              <button class="text-indigo-600 hover:text-indigo-800 font-medium">
                View Details
              </button>
              <button class="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const projects = ref([
  {
    title: "Payment Gateway Integration",
    description: "Multi-payment gateway solution with Stripe, Lekirpay, Billplz and Paydip integrations.",
    tags: ["PHP", "Laravel", "API Integration", "Payment"],
    link: "#"
  },
  {
    title: "E-commerce Dashboard",
    description: "Admin dashboard for managing products, orders, and customer data.",
    tags: ["Vue", "Laravel", "Tailwind", "Charts"],
    link: "#"
  },
  {
    title: "AI-Powered Chatbot",
    description: "Telegram bot integrated with OpenAI API for customer service automation.",
    tags: ["Python", "OpenAI API", "Telegram API", "FastAPI"],
    link: "#"
  },
  {
    title: "Web3 Wallet Manager",
    description: "Blockchain wallet integration for cryptocurrency transactions and NFT management.",
    tags: ["JavaScript", "Web3", "React", "API"],
    link: "#"
  },
  {
    title: "Content Management System",
    description: "Custom CMS built for a local business with multilingual support.",
    tags: ["PHP", "CodeIgniter", "MySQL", "jQuery"],
    link: "#"
  },
  {
    title: "Portfolio Site",
    description: "Personal portfolio website showcasing projects and skills.",
    tags: ["Astro", "Vue", "Tailwind", "Responsive"],
    link: "#"
  }
]);

function getProjectGradient(index) {
  const gradients = [
    'from-blue-400 to-indigo-600',
    'from-green-400 to-teal-600',
    'from-purple-400 to-pink-600',
    'from-yellow-400 to-orange-600',
    'from-red-400 to-pink-600',
    'from-indigo-400 to-purple-600'
  ];
  
  return gradients[index % gradients.length];
}

function getTagColor(index) {
  const colors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-purple-100 text-purple-800',
    'bg-yellow-100 text-yellow-800',
    'bg-red-100 text-red-800',
    'bg-indigo-100 text-indigo-800',
    'bg-pink-100 text-pink-800',
  ];
  
  return colors[index % colors.length];
}
</script>