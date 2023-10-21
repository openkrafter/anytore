<script>
import logger from '@/logger'

export async function requestApi(path, requestData) {
  try {
    var response
    if (requestData == null) {
      response = await fetch(path)
    } else {
      response = await fetch(path, requestData)
    }
    if (!response.ok) {
      throw new Error('Bad fetch response', response)
    }
  } catch (error) {
    logger.error(error)
    throw error
  }

  return await response.json()
}
</script>
