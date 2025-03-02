<template>
  <div class="bg-gray-50 py-16">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-2 text-gray-800">Skills & Expertise</h2>
      <div class="w-24 h-1 bg-indigo-500 mb-8"></div>
      
      <p class="text-gray-600 mb-8">
        Here are the technologies and tools I work with regularly:
      </p>
      
      <div class="space-y-8">
        <div v-for="(skills, category) in skillCategories" :key="category" class="mb-8">
          <h3 class="text-xl font-bold mb-4 text-gray-700">{{ category }}</h3>
          
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div 
              v-for="(skill, index) in skills"
              :key="index"
              class="skill-card bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center transform transition duration-300 hover:scale-105 hover:shadow-lg"
              :class="getCategoryColor(category)"
            >
              <div class="text-2xl mb-3">{{ getSkillIcon(skill) }}</div>
              <h3 class="font-medium">{{ skill }}</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-10 text-center" v-if="showAddSkill">
        <button 
          @click="toggleAddSkillForm"
          class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300"
        >
          Add a Skill
        </button>
      </div>
      
      <div v-if="isAddingSkill" class="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-bold mb-4">Add New Skill</h3>
        <div class="flex gap-2">
          <input 
            v-model="newSkill" 
            type="text" 
            placeholder="Enter skill name" 
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            @click="addSkill"
            class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300"
            :disabled="!newSkill"
          >
            Add
          </button>
          <button 
            @click="toggleAddSkillForm"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  skills: {
    type: Array,
    default: () => []
  }
});

// Organize skills by category
const skillCategories = {
  "Frontend": ["HTML", "CSS", "JavaScript", "React", "Vue", "jQuery", "Tailwind", "Astro"],
  "Backend": ["PHP", "Laravel", "CodeIgniter", "Node.js", "Python Flask", "FastAPI"],
  "Database/Storage": ["Firebase", "Firestore"],
  "APIs & Integration": ["OpenAI API", "Telegram API", "Stripe", "Lekirpay", "Billplz", "Paydip", "Web3"]
};

const userSkills = ref([...props.skills]);
const isAddingSkill = ref(false);
const newSkill = ref('');
const showAddSkill = ref(true);

const displayedSkills = computed(() => {
  return userSkills.value;
});

function toggleAddSkillForm() {
  isAddingSkill.value = !isAddingSkill.value;
  newSkill.value = '';
}

function addSkill() {
  if (newSkill.value.trim()) {
    userSkills.value.push(newSkill.value.trim());
    newSkill.value = '';
    isAddingSkill.value = false;
  }
}

function getSkillIcon(skill) {
  const skillIcons = {
    'HTML': '🌐',
    'CSS': '🎨',
    'JavaScript': '⚡',
    'TypeScript': '📋',
    'Vue': '🟢',
    'React': '⚛️',
    'Angular': '🔺',
    'Node.js': '🟩',
    'Python': '🐍',
    'PHP': '🐘',
    'Java': '☕',
    'C#': '♯',
    'Ruby': '💎',
    'Go': '🔵',
    'Rust': '⚙️',
    'Swift': '🐦',
    'Kotlin': '🎯',
    'SQL': '🗃️',
    'MongoDB': '🍃',
    'GraphQL': '⬢',
    'Docker': '🐳',
    'Kubernetes': '☸️',
    'AWS': '☁️',
    'Firebase': '🔥',
    'Git': '📂',
    'Figma': '🖌️',
    'Sketch': '💎',
    'Photoshop': '🖼️',
    'Illustrator': '✏️',
    'Tailwind': '🌊',
    'Bootstrap': '🅱️',
    'Sass': '💅',
    'Less': '🔻',
    'Redux': '🔄',
    'Vuex': '🗃️',
    'Webpack': '📦',
    'Rollup': '🧻',
    'Jest': '🃏',
    'Mocha': '☕',
    'Chai': '🍵',
    'Cypress': '🌲',
    'Testing Library': '🧪',
    'Storybook': '📚',
    'Astro': '🚀',
    'Writing Docs': '📝'
  };
  
  return skillIcons[skill] || '🔧';
}

function getCategoryColor(category) {
  const categoryColors = {
    'Frontend': 'hover:bg-blue-50 hover:text-blue-600',
    'Backend': 'hover:bg-green-50 hover:text-green-600',
    'Database/Storage': 'hover:bg-purple-50 hover:text-purple-600',
    'APIs & Integration': 'hover:bg-yellow-50 hover:text-yellow-600'
  };
  
  return categoryColors[category] || 'hover:bg-indigo-50 hover:text-indigo-600';
}
</script>