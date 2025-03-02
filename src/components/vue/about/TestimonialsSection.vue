<template>
  <div class="py-16 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-2 text-gray-800 text-center">Client Testimonials</h2>
      <div class="w-24 h-1 bg-indigo-500 mb-8 mx-auto"></div>
      
      <p class="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Here's what some of my clients and colleagues have to say about working with me.
      </p>
      
      <div class="relative">
        <!-- Testimonials slider -->
        <div class="overflow-hidden">
          <div 
            class="flex transition-transform duration-300 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="index"
              class="w-full flex-shrink-0 p-4"
            >
              <div class="bg-white rounded-xl shadow-lg p-8 relative">
                <div class="text-5xl text-indigo-200 absolute top-4 left-4 leading-none">"</div>
                <div class="relative z-10">
                  <p class="text-gray-700 mb-6 italic">{{ testimonial.content }}</p>
                  
                  <div class="flex items-center">
                    <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-4">
                      {{ testimonial.name.charAt(0) }}
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-800">{{ testimonial.name }}</h4>
                      <p class="text-sm text-gray-600">{{ testimonial.position }}, {{ testimonial.company }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Navigation buttons -->
        <button 
          @click="prevSlide" 
          class="absolute top-1/2 left-0 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-800 hover:bg-gray-100 focus:outline-none"
          :disabled="currentSlide === 0"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          @click="nextSlide" 
          class="absolute top-1/2 right-0 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-800 hover:bg-gray-100 focus:outline-none"
          :disabled="currentSlide === testimonials.length - 1"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === testimonials.length - 1 }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <!-- Indicator dots -->
      <div class="flex justify-center mt-8 space-x-2">
        <button 
          v-for="(_, index) in testimonials" 
          :key="index"
          @click="goToSlide(index)"
          class="w-3 h-3 rounded-full transition-colors duration-200"
          :class="currentSlide === index ? 'bg-indigo-600' : 'bg-gray-300 hover:bg-gray-400'"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const testimonials = ref([
  {
    content: "Kong is an exceptional web developer who went above and beyond our expectations. His expertise in payment gateway integration saved us countless hours and provided a seamless checkout experience for our customers.",
    name: "Sarah Johnson",
    position: "E-commerce Manager",
    company: "RetailPlus"
  },
  {
    content: "Working with Kong was a fantastic experience. He has a deep understanding of modern web technologies and delivered our project on time and within budget. His attention to detail and problem-solving skills are top-notch.",
    name: "David Chen",
    position: "CTO",
    company: "TechStartup Malaysia"
  },
  {
    content: "The web application Kong built for our company transformed our business operations. His knowledge of both frontend and backend technologies allowed him to create a comprehensive solution that addressed all our needs.",
    name: "Mei Ling",
    position: "Operations Director",
    company: "Global Logistics Ltd"
  },
  {
    content: "Kong's expertise in API integration was invaluable for our project. He seamlessly connected multiple systems and created a unified experience that has received praise from all our users.",
    name: "Raj Patel",
    position: "Product Manager",
    company: "FinTech Solutions"
  }
]);

const currentSlide = ref(0);

function nextSlide() {
  if (currentSlide.value < testimonials.value.length - 1) {
    currentSlide.value++;
  }
}

function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
}

function goToSlide(index) {
  currentSlide.value = index;
}
</script>