import { useAuthStore } from '@/stores/auth'

var authStore = null

export function getAuthStore() {
  if (!authStore) {
    authStore = useAuthStore()
  }
  return authStore
}
