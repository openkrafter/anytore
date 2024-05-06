<script>
import logger from '@/logger'
import axios from 'axios'

export async function login(user) {
  logger.trace('login API')
  logger.trace(user)

  // null check
  if (
    user.email == null ||
    user.email == '' ||
    user.password == null ||
    user.password == ''
  ) {
    logger.error('Error: Invalid value of user.')
  }

  // type check
  if (typeof user.email !== 'string' || typeof user.password !== 'string') {
    logger.error('Error: Invalid type of user.')
  }

  const path = '/login'

  const requestData = {
    email: user.email,
    password: user.password,
  }

  var headers = {
    'Content-Type': 'application/json',
  }

  try {
    const response = await axios.post(path, requestData, {
      headers: headers,
    })
    return { token: response.data.token, user: response.data.user }
  } catch (error) {
    logger.error(error)
    logger.error('Error: Login API failed.')
    throw error
  }
}
</script>
