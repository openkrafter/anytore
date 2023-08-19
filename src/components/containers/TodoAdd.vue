<script>
import MyButton from '@/components/basics/MyButton.vue'

export default {
  emits: ['delete-done', 'add-todo'],

  components: {
    MyButton,
  },

  data() {
    return {
      newTodoText: '',
    }
  },

  methods: {
    todoAdd() {
      this.$emit('add-todo', this.newTodoText)
      this.newTodoText = ''
    },
  },
}
</script>

<template>
  <input type="text" v-model="newTodoText" />
  <MyButton @click="todoAdd">
    テスト追加 <img src="@/assets/icon-plus.svg" height="10" />
  </MyButton>
  <MyButton @click="$emit('delete-done')">完了済みを削除する</MyButton>
</template>
