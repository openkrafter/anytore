import { useUserStore } from '@/stores/user'

var userStore = null

export function getUserStore() {
  if (!userStore) {
    userStore = useUserStore()
  }
  return userStore
}
