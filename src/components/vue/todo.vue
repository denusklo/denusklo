<template>
  <div class="max-w-xl mx-auto p-5 bg-white rounded-lg shadow-md">
    <!-- Tabs Navigation -->
    <div class="flex justify-center mb-6">
      <button 
        @click="currentTab = 'todo'" 
        :class="['px-4 py-2 mr-2', currentTab === 'todo' ? 'bg-custom-teal text-white' : 'bg-custom-gray']"
      >
        Todo List
      </button>
      <button 
        @click="currentTab = 'billsplit'" 
        :class="['px-4 py-2', currentTab === 'billsplit' ? 'bg-custom-teal text-white' : 'bg-custom-gray']"
      >
        Bill Splitting
      </button>
    </div>

    <!-- Todo List Tab -->
    <div v-if="currentTab === 'todo'">
      <div class="flex gap-2 mb-5">
        <input 
          type="text" 
          v-model="mytodo" 
          placeholder="Enter new task..."
          @keyup.enter="AddTodo"
          class="flex-1 px-3 py-2 bg-custom-gray text-black border border-custom-teal rounded focus:outline-none focus:ring-2 focus:ring-custom-teal"
        />
        <button 
          @click="AddTodo" 
          class="px-4 py-2 bg-custom-teal text-white rounded hover:bg-custom-teal-light transition-colors font-medium"
        >
          Add Task
        </button>
      </div>

      <div class="flex justify-center gap-2 mb-5">
        <button 
          @click="setFilter('all')" 
          :class="['px-3 py-1.5 bg-custom-gray text-black rounded transition-colors', { 'bg-custom-teal text-white font-bold': currentFilter === 'all' }]"
        >
          All
        </button>
        <button 
          @click="setFilter('active')" 
          :class="['px-3 py-1.5 bg-custom-gray text-black rounded transition-colors', { 'bg-custom-teal text-white font-bold': currentFilter === 'active' }]"
        >
          Active
        </button>
        <button 
          @click="setFilter('completed')" 
          :class="['px-3 py-1.5 bg-custom-gray text-black rounded transition-colors', { 'bg-custom-teal text-white font-bold': currentFilter === 'completed' }]"
        >
          Completed
        </button>
      </div>

      <div v-if="!isEmpty" class="mb-5 space-y-2">
        <div 
          v-for="(todo, index) in filteredTodos" 
          :key="index"
          class="flex justify-between items-center p-3 bg-custom-gray rounded transition-colors hover:bg-custom-beige"
          :class="{ 'opacity-70': todo.completed }"
        >
          <div class="flex items-center gap-3">
            <input 
              type="checkbox" 
              :checked="todo.completed" 
              @change="toggleComplete(index)" 
              class="w-4 h-4 cursor-pointer accent-custom-teal"
            />
            <span class="text-black" :class="{ 'line-through text-gray-500': todo.completed }">
              {{ todo.text }}
            </span>
          </div>
          <div class="flex gap-2">
            <button 
              @click="editTodo(index)" 
              class="px-2 py-1 bg-custom-teal-light text-white text-sm rounded hover:bg-custom-teal transition-colors"
            >
              Edit
            </button>
            <button 
              @click="removeTodo(index)" 
              class="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div v-else class="p-5 bg-custom-gray rounded text-center text-gray-500">
        <p>No tasks found. Add a new task to get started!</p>
      </div>

      <div class="flex justify-between items-center text-gray-500 text-sm" v-if="!isEmpty">
        <p>{{ completedCount }} of {{ todos.length }} tasks completed</p>
        <button 
          @click="clearCompleted" 
          class="px-3 py-1 border border-red-400 text-red-500 rounded hover:bg-red-400 hover:text-white transition-colors"
          v-if="completedCount > 0"
        >
          Clear Completed
        </button>
      </div>

      <!-- Edit Modal -->
      <div v-if="isEditing" class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <div class="bg-white p-5 rounded-lg w-80 shadow-lg">
          <h4 class="text-lg font-bold mb-3 text-custom-teal">Edit Task</h4>
          <input 
            type="text" 
            v-model="editText" 
            class="w-full px-3 py-2 mb-4 bg-custom-gray text-black rounded border border-custom-teal focus:outline-none focus:ring-2 focus:ring-custom-teal"
            @keyup.enter="saveEdit"
          />
          <div class="flex justify-end gap-2">
            <button 
              @click="cancelEdit" 
              class="px-3 py-1.5 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="saveEdit" 
              class="px-3 py-1.5 bg-custom-teal text-white rounded hover:bg-custom-teal-light transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bill Splitting Tab -->
    <div v-if="currentTab === 'billsplit'">
      <BillSplit />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useMainStore } from "../../scripts/store.js";
import BillSplit from './billsplit.vue';

export default {
  components: {
    BillSplit
  },
  setup() {
    const main = useMainStore();
    const mytodo = ref("");
    const currentFilter = ref("all");
    const isEditing = ref(false);
    const editIndex = ref(null);
    const editText = ref("");
    const currentTab = ref("todo");

    const AddTodo = () => {
      if (mytodo.value.trim() !== "") {
        main.addTodo({
          text: mytodo.value,
          completed: false,
          createdAt: new Date()
        });
        mytodo.value = "";
      }
    };

    const setFilter = (filter) => {
      currentFilter.value = filter;
    };

    const filteredTodos = computed(() => {
      if (currentFilter.value === "all") {
        return main.getAllTodos;
      } else if (currentFilter.value === "active") {
        return main.getAllTodos.filter(todo => !todo.completed);
      } else {
        return main.getAllTodos.filter(todo => todo.completed);
      }
    });

    const toggleComplete = (index) => {
      main.toggleTodoComplete(index);
    };

    const editTodo = (index) => {
      editIndex.value = index;
      editText.value = main.getAllTodos[index].text;
      isEditing.value = true;
    };

    const saveEdit = () => {
      if (editText.value.trim() !== "") {
        main.updateTodo(editIndex.value, editText.value);
        cancelEdit();
      }
    };

    const cancelEdit = () => {
      isEditing.value = false;
      editIndex.value = null;
      editText.value = "";
    };

    const clearCompleted = () => {
      main.clearCompleted();
    };

    const completedCount = computed(() => {
      return main.getAllTodos.filter(todo => todo.completed).length;
    });

    return {
      AddTodo,
      mytodo,
      todos: computed(() => main.getAllTodos),
      isEmpty: computed(() => main.todoEmpty),
      removeTodo: main.removeTodo,
      currentFilter,
      setFilter,
      filteredTodos,
      toggleComplete,
      editTodo,
      isEditing,
      editText,
      saveEdit,
      cancelEdit,
      clearCompleted,
      completedCount,
      currentTab
    };
  },
};
</script>