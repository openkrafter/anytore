import { defineStore } from 'pinia'

export const useTodosStore = defineStore('todos', {
  state: () => {
    return {
      todos: [
        {
          isDone: false,
          text: 'Todo in Pinia Store!',
        },
      ],
    }
  },

  actions: {
    addTodo(todo) {
      this.todos.push(todo)
    },

    clearDoneTodos() {
      this.todos = this.todos.filter((todo) => !todo.isDone)
    },
  },
})
