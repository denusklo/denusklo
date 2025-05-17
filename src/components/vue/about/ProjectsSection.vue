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
              <a 
                v-if="project.link" 
                :href="project.link" 
                target="_blank"
                class="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
              >
                <span>View Project</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <span v-else class="text-gray-400 text-sm">Private Project</span>
              
              <span class="text-gray-500 text-xs">{{ project.year }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Projects based on your actual GitHub repos and resume
const projects = ref([
  {
    title: "LawBank AI Assistant",
    description: "AI-powered legal chat assistant with OpenAI GPT-4o mini integration, secure document upload with encryption, and subscription management.",
    tags: ["OpenAI API", "BillPlz", "Codeigniter"],
    year: "2024",
    link: null // Private project
  },
  {
    title: "Inhouse Financial Ledger",
    description: "Built inhouse financial ledger system with React.js and G6.js visualization library, featuring real-time currency flow visualization.",
    tags: ["React", "G6.js", "Visualization", "Directus CMS"],
    year: "2023-Present",
    link: null // Private project
  },
  {
    title: "Telegram Forex Bot",
    description: "Python-based Telegram bot for tracking forex data and providing market insights.",
    tags: ["Python", "Telegram API", "Forex"],
    year: "2024",
    link: "https://github.com/denusklo/telegram-forex-py"
  },
  {
    title: "Nova Memorial Booking",
    description: "A memorial booking application built with Nuxt for scheduling and managing memorial services.",
    tags: ["Vue", "Booking System", "Nuxt"],
    year: "2025",
    link: "https://github.com/denusklo/nova-memorial-booking"
  },
  {
    title: "Ethereum USDT Backtesting",
    description: "Cryptocurrency trading strategy backtesting tool for ETH/USDT using historical data.",
    tags: ["Jupyter Notebook", "Cryptocurrency", "Data Analysis"],
    year: "2023-2025",
    link: "https://github.com/denusklo/backtest-ethusdt"
  },
  {
    title: "Flowise AI Chat Integration",
    description: "Customized implementation of Flowise for building LLM workflows with embedded chat interfaces.",
    tags: ["TypeScript", "AI", "React"],
    year: "2025",
    link: "https://github.com/denusklo/FlowiseEmbedReact"
  }
]);

function getProjectGradient(index) {
  const gradients = [
    'from-blue-400 to-indigo-600',
    'from-green-400 to-teal-600',
    'from-purple-400 to-pink-600',
    'from-yellow-400 to-orange-600',
    'from-red-400 to-pink-600',
    'from-indigo-400 to-purple-600',
    'from-cyan-400 to-blue-600',
    'from-emerald-400 to-green-600'
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
    'bg-cyan-100 text-cyan-800',
    'bg-emerald-100 text-emerald-800',
    'bg-orange-100 text-orange-800',
  ];
  
  return colors[index % colors.length];
}
</script>