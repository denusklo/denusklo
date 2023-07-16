<template>
  <input type="text" v-model="mytodo" style="color: black;"/>
  <button @click="AddTodo">Add Todo</button>
  <div v-if="!isEmpty">
    <p v-for="(todo, index) in todos" :key="index">
      {{ index }}. {{ todo }} <button @click="removeTodo(index)">delete</button>
    </p>
  </div>
  <div v-else>No todos found</div>
</template>

<script>
import { computed, ref } from "vue";
import { useMainStore } from "../../scripts/store.js";
export default {
  setup() {
    const main = useMainStore();
    const mytodo = ref("");
    const AddTodo = () => {
      if (mytodo.value != "") {
        main.addTodo(mytodo.value);
        mytodo.value = "";
      }
    };
    return {
      AddTodo,
      mytodo,
      todos: computed(() => main.getAllTodos),
      isEmpty: computed(() => main.todoEmpty),
      removeTodo: main.removeTodo,
    };
  },
};
</script>