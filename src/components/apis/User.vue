<script>
import { User } from '@/components/models/User.vue'
import logger from '@/logger'
import { requestApi } from '@/components/apis/CommonMethods.vue'

export async function listUsers() {
  const path = '/users'
  const usersResults = await requestApi(path)

  var users = []
  usersResults.forEach((userResult) => {
    // null check
    if (
      userResult.id == null ||
      userResult.id == '' ||
      userResult.name == null ||
      userResult.name == ''
    ) {
      logger.error('Error: Invalid value of user.')
    }

    // type check
    if (
      typeof userResult.id !== 'number' ||
      typeof userResult.name !== 'string'
    ) {
      logger.error('Error: Invalid type of user.')
    }

    var user = new User(userResult.id, userResult.name)

    users.push(user)
  })
  return users
}

export async function createUser(user) {
  logger.trace('createUser')
  logger.trace(user)

  // null check
  if (user.name == null || user.name == '') {
    logger.error('Error: Invalid value of user.')
  }

  // type check
  if (typeof user.name !== 'string') {
    logger.error('Error: Invalid type of user.')
  }

  const path = '/users'

  const requestBody = {
    name: user.name,
  }

  const requestData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  }
  const results = await requestApi(path, requestData)
}
</script>
