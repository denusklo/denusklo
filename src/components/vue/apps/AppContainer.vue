<template>
  <div class="max-w-xl mx-auto p-5 bg-white rounded-lg shadow-md">
    <!-- Tabs Navigation -->
    <div class="flex justify-center mb-6">
      <button 
        @click="switchTab('todo')" 
        :class="['px-4 py-2 mr-2', currentTab === 'todo' ? 'bg-custom-teal text-white' : 'bg-custom-gray']"
      >
        Todo List
      </button>
      <button 
        @click="switchTab('billsplit')" 
        :class="['px-4 py-2', currentTab === 'billsplit' ? 'bg-custom-teal text-white' : 'bg-custom-gray']"
      >
        Bill Splitting
      </button>
    </div>

    <!-- Todo List Tab -->
    <div v-if="currentTab === 'todo'">
      <TodoComponent />
    </div>

    <!-- Bill Splitting Tab -->
    <div v-if="currentTab === 'billsplit'">
      <BillSplitComponent />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TodoComponent from "./TodoComponent.vue";
import BillSplitComponent from "./BillSplitComponent.vue";

export default {
  components: {
    TodoComponent,
    BillSplitComponent
  },
  setup() {
    const currentTab = ref("todo");

    const switchTab = (tab) => {
      currentTab.value = tab;
      
      // Dispatch a custom event to communicate with the Astro page
      window.dispatchEvent(new CustomEvent('tabChanged', { 
        detail: { activeTab: tab } 
      }));
    };
    
    // Emit the initial tab on mount
    onMounted(() => {
      // Short delay to ensure DOM is ready
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('tabChanged', { 
          detail: { activeTab: currentTab.value } 
        }));
      }, 100);
    });

    return {
      currentTab,
      switchTab
    };
  },
};
</script>