<template>
  <div class="py-16 bg-gradient-to-br from-indigo-50 to-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-2 text-gray-800">Services I Offer</h2>
      <div class="w-24 h-1 bg-indigo-500 mb-8"></div>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <div class="w-14 h-14 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
            <span class="text-2xl" v-html="service.icon"></span>
          </div>
          
          <h3 class="text-xl font-bold mb-3 text-gray-800">{{ service.title }}</h3>
          <p class="text-gray-600 mb-4">{{ service.description }}</p>
          
          <ul class="space-y-2 mb-6">
            <li 
              v-for="(feature, featureIndex) in service.features" 
              :key="featureIndex"
              class="flex items-start"
            >
              <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const services = ref([
  {
    title: "Web Development",
    icon: "🖥️",
    description: "Custom web development solutions tailored to your business needs.",
    features: [
      "Responsive design for all devices",
      "SEO-friendly architecture",
      "Performance optimization",
      "Cross-browser compatibility"
    ]
  },
  {
    title: "E-commerce Solutions",
    icon: "🛒",
    description: "Complete e-commerce systems with secure payment integration.",
    features: [
      "Shopping cart & checkout system",
      "Multiple payment gateway integration",
      "Inventory management",
      "Order tracking & customer accounts"
    ]
  },
  {
    title: "API Development & Integration",
    icon: "🔌",
    description: "Custom API development and third-party service integration.",
    features: [
      "RESTful API development",
      "Payment gateway integration",
      "Social media API integration",
      "AI services implementation (OpenAI)"
    ]
  },
  {
    title: "Mobile-First Applications",
    icon: "📱",
    description: "Web applications optimized for mobile devices with responsive design.",
    features: [
      "Progressive Web Apps (PWA)",
      "Touch-friendly interfaces",
      "Offline functionality",
      "Fast loading on mobile networks"
    ]
  },
  {
    title: "Custom CMS Development",
    icon: "📝",
    description: "Tailored content management systems for your specific needs.",
    features: [
      "User-friendly admin interfaces",
      "Custom post types & fields",
      "Multilingual support",
      "Advanced content workflows"
    ]
  },
  {
    title: "Blockchain & Web3 Integration",
    icon: "⛓️",
    description: "Integration of Web3 technologies and cryptocurrency payment solutions.",
    features: [
      "Wallet integration",
      "Smart contract interaction",
      "Cryptocurrency payment processing",
      "NFT implementation"
    ]
  }
]);
</script>