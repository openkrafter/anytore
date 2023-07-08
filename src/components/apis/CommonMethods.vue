<script>
import logger from '@/logger'
import { useUserStore } from '@/stores/user'

export async function requestApi(path, requestData) {
  const store = useUserStore()
  try {
    var response
    if (requestData == null) {
      var headers = new Headers()
      headers.append('Authorization', 'Bearer ' + store.user.id)

      const request = new Request(path, {
        method: 'GET',
        headers: headers,
      })

      response = await fetch(request)
    } else {
      var headers = new Headers(requestData.headers)
      headers.append('Authorization', 'Bearer ' + store.user.id)
      requestData.headers = headers

      const request = new Request(path, requestData)

      response = await fetch(request)
    }
    if (!response.ok) {
      throw new Error('Error: Bad fetch response', response)
    }
  } catch (error) {
    logger.error(error)
    logger.error('Error: API request failed.')
  }

  return await response.json()
}
</script>
