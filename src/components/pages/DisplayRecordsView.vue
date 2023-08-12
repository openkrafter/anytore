<script>
import TodoAdd from '@/components/containers/TodoAdd.vue'
import TodoList from '@/components/containers/TodoList.vue'
import { mapActions, mapStores } from 'pinia'
import { useTodosStore } from '@/stores/todos'

export default {
  components: {
    TodoAdd,
    TodoList,
  },

  computed: {
    ...mapStores(useTodosStore),
  },

  methods: {
    ...mapActions(useTodosStore, ['addTodo', 'clearDoneTodos']),

    addNewTodo(newTodoText) {
      if (!newTodoText) return alert('文字を入力してください')

      if (newTodoText === '') {
        alert('文字を入力してください')
        return
      }

      this.addTodo({
        isDone: false,
        text: newTodoText,
      })
    },
  },
}
</script>

<template>
  <TodoAdd @delete-done="clearDoneTodos" @add-todo="addNewTodo" />
  <p v-if="todosStore.todos.length === 0">ToDoがまだありません！</p>
  <TodoList v-else :todos="todosStore.todos" />
</template>

<style>
.todo-done {
  text-decoration: line-through;
}
</style>
