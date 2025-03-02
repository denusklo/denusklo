<template>
  <div class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
    <div class="max-w-4xl mx-auto px-4 py-16 md:py-24">
      <div class="grid md:grid-cols-3 gap-12 items-center">
        <div class="md:col-span-2">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Hi, I'm {{ firstName }}!
          </h1>
          <p class="text-xl mb-6">{{ occupation }} from {{ country }}</p>
          <p class="mb-8 text-indigo-100">
            Welcome to my portfolio site built with Astro and Vue. I'm a Web Developer from Malaysia
            passionate about creating amazing digital experiences using modern web technologies.
          </p>
          <div class="flex gap-4">
            <button 
              @click="scrollToContact"
              class="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors duration-300 shadow-md"
            >
              Contact Me
            </button>
            <button 
              class="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              View Projects
            </button>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30 shadow-xl">
            <span class="text-4xl md:text-5xl font-bold">{{ firstName.charAt(0) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  firstName: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});

function scrollToContact() {
  const contactSection = document.getElementById('contact-section');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>