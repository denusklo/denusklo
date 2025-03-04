<template>
  <div class="bg-gray-50 py-16">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-2 text-gray-800">Skills & Expertise</h2>
      <div class="w-24 h-1 bg-indigo-500 mb-8"></div>
      
      <p class="text-gray-600 mb-8">
        Here are the technologies and tools I work with regularly:
      </p>
      
      <div class="space-y-8">
        <div v-for="(skills, category) in displayedCategories" :key="category" class="mb-8">
          <h3 class="text-xl font-bold mb-4 text-gray-700">{{ category }}</h3>
          
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div 
              v-for="(skill, index) in skills"
              :key="index"
              class="skill-card bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center transform transition duration-300 hover:scale-105 hover:shadow-lg"
              :class="getCategoryColor(category)"
            >
              <div class="text-2xl mb-3">
                <!-- Show SVG/PNG icons if available, otherwise fallback to emoji -->
                <img v-if="getSkillIconPath(getSkillName(skill))" :src="getSkillIconPath(getSkillName(skill))" alt="skill icon" class="object-contain h-full w-1/2 mx-auto" />
                <span v-else>{{ getSkillEmoji(getSkillName(skill)) }}</span>
              </div>
              <h3 class="font-medium">{{ getSkillName(skill) }}</h3>
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
  // Accept the data from Astro
  skillCategories: {
    type: Object,
    default: () => ({})
  }
});

// Fallback if no data is provided
const defaultCategories = {
  "Frontend": ["HTML", "CSS", "JavaScript", "React", "Vue", "jQuery", "Tailwind", "Astro"],
  "Backend": ["PHP", "Laravel", "CodeIgniter", "Node.js", "Python Flask", "FastAPI"],
  "Database/Storage": ["Firebase", "Firestore"],
  "APIs & Integration": ["OpenAI API", "Telegram API", "Stripe", "Lekirpay", "Billplz", "Paydip", "Web3"]
};

// Use provided categories or fallback to default
const displayedCategories = computed(() => {
  // Check if props.skillCategories has any keys
  return Object.keys(props.skillCategories).length > 0 
    ? props.skillCategories 
    : defaultCategories;
});

const isAddingSkill = ref(false);
const newSkill = ref('');
const showAddSkill = ref(true);
const userAddedSkills = ref([]);

// Helper function to get the skill name whether it's a string or object
function getSkillName(skill) {
  // If skill is an object with name property, return the name
  if (typeof skill === 'object' && skill !== null && 'name' in skill) {
    return skill.name;
  }
  // Otherwise, return the skill as is (assuming it's a string)
  return skill;
}

function toggleAddSkillForm() {
  isAddingSkill.value = !isAddingSkill.value;
  newSkill.value = '';
}

function addSkill() {
  if (newSkill.value.trim()) {
    // You can decide which category to add to
    // For now, let's add to a custom "My Skills" category
    if (!displayedCategories.value["My Skills"]) {
      displayedCategories.value["My Skills"] = [];
    }
    displayedCategories.value["My Skills"].push(newSkill.value.trim());
    userAddedSkills.value.push(newSkill.value.trim());
    newSkill.value = '';
    isAddingSkill.value = false;
  }
}

// Function to get SVG/PNG icon path for skills
function getSkillIconPath(skill) {
  // Map skill names to their respective icon paths
  const skillIconPaths = {
    'HTML': '/assets/icons/html.png',
    'CSS': '/assets/icons/css.png',
    'JavaScript': '/assets/icons/javascript.png',
    'React': '/assets/icons/react.png',
    'Vue': '/assets/icons/vue.svg',
    'jQuery': '/assets/icons/jquery.svg',
    'Tailwind': '/assets/icons/tailwind.png',
    'Astro': '/assets/icons/astro.svg',
    'PHP': '/assets/icons/php.png',
    'Laravel': '/assets/icons/laravel.png',
    'CodeIgniter': '/assets/icons/codeigniter.svg',
    'Node.js': '/assets/icons/nodejs.svg',
    'Python Flask': '/assets/icons/flask.svg',
    'FastAPI': '/assets/icons/fastapi.svg',
    'Firebase': '/assets/icons/firebase.svg',
    'Firestore': '/assets/icons/firestore.svg',
    'OpenAI API': '/assets/icons/openai.svg',
    'Telegram API': '/assets/icons/telegram.svg',
    'Stripe': '/assets/icons/stripe.svg',
    'Lekirpay': '/assets/icons/lekirpay.png',
    'Billplz': '/assets/icons/billplz.png',
    'Paydip': '/assets/icons/paydip.png',
    'Web3': '/assets/icons/web3.png',
  };
  
  return skillIconPaths[skill] || null;
}

// Keep the emoji function as fallback
function getSkillEmoji(skill) {
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
    'Writing Docs': '📝',
    'jQuery': '💲'
  };
  
  return skillIcons[skill] || '🔧';
}

function getCategoryColor(category) {
  const categoryColors = {
    'Frontend': 'hover:bg-blue-50 hover:text-blue-600',
    'Backend': 'hover:bg-green-50 hover:text-green-600',
    'Database/Storage': 'hover:bg-purple-50 hover:text-purple-600',
    'APIs & Integration': 'hover:bg-yellow-50 hover:text-yellow-600',
    'My Skills': 'hover:bg-pink-50 hover:text-pink-600'
  };
  
  return categoryColors[category] || 'hover:bg-indigo-50 hover:text-indigo-600';
}
</script>