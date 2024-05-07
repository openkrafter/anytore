<script>
import logger from '@/logger'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { getAuthStore } from '@/stores/authStore'

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

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

export async function requestAuthApi(path, method, requestData) {
  const authStore = getAuthStore()
  var headers = {
    Authorization: 'Bearer ' + authStore.userToken,
  }

  switch (method) {
    case HttpMethod.GET:
      return await getAuthApi(path, headers)
    case HttpMethod.POST:
      return await postAuthApi(path, requestData, headers)
    case HttpMethod.PUT:
      return await putAuthApi(path, requestData, headers)
    case HttpMethod.DELETE:
      return await deleteAuthApi(path, headers)
    default:
      logger.error('Error: Invalid method.')
  }
}

export async function requestBasicAuthApi(path, method, requestData) {
  var headers = {
    Authorization: `Basic ${btoa(
      import.meta.env.ANYTORE_ADMIN_NAME +
        ':' +
        import.meta.env.ANYTORE_ADMIN_PASSWORD
    )}`,
  }

  switch (method) {
    case HttpMethod.GET:
      return await getBasicAuthApi(path, headers)
    case HttpMethod.POST:
      return await postBasicAuthApi(path, requestData, headers)
    case HttpMethod.PUT:
      return await putBasicAuthApi(path, requestData, headers)
    case HttpMethod.DELETE:
      return await deleteBasicAuthApi(path, headers)
    default:
      logger.error('Error: Invalid method.')
  }
}

async function getAuthApi(path, headers) {
  try {
    const response = await axios.get(path, {
      headers: headers,
    })
    return response.data
  } catch (error) {
    logger.error(error)
    logger.error('Error: GET API failed.')
  }
}

async function postAuthApi(path, requestData, headers) {
  headers['Content-Type'] = 'application/json'

  try {
    const response = await axios.post(path, requestData, {
      headers: headers,
    })
    return response.data
  } catch (error) {
    logger.error(error)
    logger.error('Error: POST API failed.')
  }
}

async function putAuthApi(path, requestData, headers) {
  headers['Content-Type'] = 'application/json'

  try {
    const response = await axios.put(path, requestData, {
      headers: headers,
    })
    return response.data
  } catch (error) {
    logger.error(error)
    logger.error('Error: PUT API failed.')
  }
}

async function deleteAuthApi(path, headers) {
  try {
    const response = await axios.delete(path, {
      headers: headers,
    })
    return response.data
  } catch (error) {
    logger.error(error)
    logger.error('Error: DELETE API failed.')
  }
}

async function getBasicAuthApi(path, headers) {
  try {
    const response = await axios.get(path, {
      headers: headers,
    })
    return response.data
  } catch (error) {
    logger.error(error)
    logger.error('Error: GET API failed.')
  }
}

async function postBasicAuthApi(path, requestData, headers) {
  headers['Content-Type'] = 'application/json'

  try {
    const response = await axios.post(path, requestData, {
      headers: headers,
    })
    return response.data
  } catch (error) {
    logger.error(error)
    logger.error('Error: POST API failed.')
  }
}

async function putBasicAuthApi(path, requestData, headers) {
  headers['Content-Type'] = 'application/json'

  try {
    const response = await axios.put(path, requestData, {
      headers: headers,
    })
    return response.data
  } catch (error) {
    logger.error(error)
    logger.error('Error: PUT API failed.')
  }
}

async function deleteBasicAuthApi(path, headers) {
  try {
    const response = await axios.delete(path, {
      headers: headers,
    })
    return response.data
  } catch (error) {
    logger.error(error)
    logger.error('Error: DELETE API failed.')
  }
}
</script>
