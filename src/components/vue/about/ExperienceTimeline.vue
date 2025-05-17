<template>
  <div class="py-16 bg-white">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-2 text-gray-800">Experience & Education</h2>
      <div class="w-24 h-1 bg-indigo-500 mb-8"></div>
      
      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute left-0 md:left-1/2 top-0 h-full w-px bg-gray-200 transform md:translate-x-px"></div>
        
        <div class="space-y-12">
          <div 
            v-for="(item, index) in timeline" 
            :key="index"
            class="relative flex flex-col md:flex-row items-start"
          >
            <!-- Timeline dot -->
            <div 
              class="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-indigo-500 transform -translate-x-1/2 flex items-center justify-center z-10 shadow-md"
            >
              <span class="text-white text-sm" v-html="item.icon"></span>
            </div>
            
            <!-- Content boxes -->
            <div class="md:w-1/2 md:pr-12 pb-8 md:text-right md:mr-4 self-stretch md:self-center mt-8 md:mt-0 ml-12 md:ml-0">
              <div v-if="index % 2 === 0" class="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 inline-block text-left md:text-right">
                <span class="text-sm font-semibold text-indigo-600 block mb-1">{{ item.period }}</span>
                <h3 class="text-lg font-bold text-gray-800 mb-2">{{ item.title }}</h3>
                <h4 class="text-gray-700 mb-3">{{ item.organization }}</h4>
                <p class="text-gray-600">{{ item.description }}</p>
                
                <div v-if="item.technologies" class="mt-4 flex flex-wrap justify-start md:justify-end gap-2">
                  <span 
                    v-for="(tech, techIndex) in item.technologies" 
                    :key="techIndex"
                    class="bg-white text-xs px-2 py-1 rounded text-gray-700 border border-gray-200"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="md:w-1/2 md:pl-12 pb-8 md:ml-4 self-stretch md:self-center mt-8 md:mt-0 ml-12 md:ml-0">
              <div v-if="index % 2 === 1" class="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
                <span class="text-sm font-semibold text-indigo-600 block mb-1">{{ item.period }}</span>
                <h3 class="text-lg font-bold text-gray-800 mb-2">{{ item.title }}</h3>
                <h4 class="text-gray-700 mb-3">{{ item.organization }}</h4>
                <p class="text-gray-600">{{ item.description }}</p>
                
                <div v-if="item.technologies" class="mt-4 flex flex-wrap gap-2">
                  <span 
                    v-for="(tech, techIndex) in item.technologies" 
                    :key="techIndex"
                    class="bg-white text-xs px-2 py-1 rounded text-gray-700 border border-gray-200"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const timeline = ref([
  {
    period: "2021 - Present",
    title: "Senior Web Developer",
    organization: "TechSolutions Malaysia",
    description: "Leading development of web applications and e-commerce solutions for clients across various industries. Specialized in payment gateway integrations and API development.",
    technologies: ["Laravel", "Vue.js", "API Integration", "Payment Gateways"],
    icon: "💼"
  },
  {
    period: "2018 - 2021",
    title: "Full Stack Developer",
    organization: "Digital Innovations Sdn Bhd",
    description: "Developed and maintained web applications for corporate clients, focusing on responsive design and modern web technologies.",
    technologies: ["PHP", "React", "MySQL", "Node.js"],
    icon: "💻"
  },
  {
    period: "2016 - 2018",
    title: "Web Developer",
    organization: "Creative Solutions Agency",
    description: "Created websites and web applications for small to medium businesses, with focus on e-commerce solutions.",
    technologies: ["CodeIgniter", "jQuery", "Bootstrap", "MySQL"],
    icon: "🌐"
  },
  {
    period: "2012 - 2016",
    title: "Bachelor of Computer Science",
    organization: "University of Malaysia",
    description: "Graduated with honors, specializing in web technologies and software development.",
    icon: "🎓"
  },
  {
    period: "2014 - 2015",
    title: "Web Development Internship",
    organization: "Tech Innovations Inc.",
    description: "Gained hands-on experience in web development through a 6-month internship program.",
    technologies: ["HTML/CSS", "JavaScript", "PHP"],
    icon: "✨"
  }
]);
</script>