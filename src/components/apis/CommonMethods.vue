<script>
import logger from '@/logger'
import { useUserStore } from '@/stores/user'

export async function requestApi(path, requestData) {
  var backendServerDomain = ''
  if (import.meta.env.ANYTORE_BACKEND_SERVER !== undefined) {
    backendServerDomain = import.meta.env.ANYTORE_BACKEND_SERVER
  }
  const requestPath = backendServerDomain + path

  const store = useUserStore()
  try {
    var response
    if (requestData == null) {
      var headers = new Headers()
      headers.append('Authorization', 'Bearer ' + store.user.id)

      const request = new Request(requestPath, {
        method: 'GET',
        headers: headers,
      })

      response = await fetch(request)
    } else {
      var headers = new Headers(requestData.headers)
      headers.append('Authorization', 'Bearer ' + store.user.id)
      requestData.headers = headers

      const request = new Request(requestPath, requestData)

      response = await fetch(request)
    }
    if (!response.ok) {
      throw new Error('Error: Bad fetch response', response)
    }
  } catch (error) {
    logger.error(error)
    logger.error('Error: API request failed.')
  }

  if ((await response.clone().text()).length === 0) {
    return null
  }
  return await response.json()
}
</script>
