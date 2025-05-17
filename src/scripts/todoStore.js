import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: JSON.parse(localStorage.getItem('todos')) || []
  }),
  
  getters: {
    getAllTodos: (state) => state.todos,
    todoEmpty: (state) => state.todos.length === 0
  },
  
  actions: {
    addTodo(todo) {
      this.todos.push(todo);
      this.saveTodos();
    },
    
    removeTodo(index) {
      this.todos.splice(index, 1);
      this.saveTodos();
    },
    
    updateTodo(index, text) {
      this.todos[index].text = text;
      this.saveTodos();
    },
    
    toggleTodoComplete(index) {
      this.todos[index].completed = !this.todos[index].completed;
      this.saveTodos();
    },
    
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
      this.saveTodos();
    },
    
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
});