<script>
import { User } from '@/components/models/User.vue'
import logger from '@/logger'
import {
  requestApi,
  requestBasicAuthApi,
} from '@/components/apis/CommonMethods.vue'
import { HttpMethod } from '@/components/apis/CommonMethods.vue'

export async function listUsers() {
  const path = '/admin/users'
  const usersResults = await requestBasicAuthApi(path, HttpMethod.GET)

  var users = []
  usersResults.forEach((userResult) => {
    // null check
    if (
      userResult.id == null ||
      userResult.id == '' ||
      userResult.name == null ||
      userResult.name == '' ||
      userResult.email == null ||
      userResult.email == ''
    ) {
      logger.error('Error: Invalid value of user.')
    }

    // type check
    if (
      typeof userResult.id !== 'number' ||
      typeof userResult.name !== 'string' ||
      typeof userResult.email !== 'string'
    ) {
      logger.error('Error: Invalid type of user.')
    }

    var user = new User(userResult.id, userResult.name, userResult.email)

    users.push(user)
  })
  return users
}

export async function createUser(user) {
  logger.trace('createUser')
  logger.trace(user)

  // null check
  if (
    user.name == null ||
    user.name == '' ||
    user.email == null ||
    user.email == '' ||
    user.password == null ||
    user.password == ''
  ) {
    logger.error('Error: Invalid value of user.')
  }

  // type check
  if (
    typeof user.name !== 'string' ||
    typeof user.email !== 'string' ||
    typeof user.password !== 'string'
  ) {
    logger.error('Error: Invalid type of user.')
  }

  const path = 'admin/users'

  const requestData = {
    name: user.name,
    email: user.email,
    password: user.password,
  }

  const results = await requestBasicAuthApi(path, HttpMethod.POST, requestData)
}

export async function updateUser(user) {
  logger.trace('updateUser')
  logger.trace(user)

  // null check
  if (
    user.id == null ||
    user.id == '' ||
    user.name == null ||
    user.name == '' ||
    user.email == null ||
    user.email == '' ||
    user.password == null ||
    user.password == ''
  ) {
    logger.error('Error: Invalid value of user.')
  }

  // type check
  if (
    typeof user.id !== 'number' ||
    typeof user.name !== 'string' ||
    typeof user.email !== 'string' ||
    typeof user.password !== 'string'
  ) {
    logger.error('Error: Invalid type of user.')
  }

  const path = 'admin/users/' + user.id

  const requestData = {
    name: user.name,
    email: user.email,
    password: user.password,
  }

  const results = await requestBasicAuthApi(path, HttpMethod.PUT, requestData)
}

export async function deleteUser(userId) {
  logger.trace('deleteUser')
  logger.trace(userId)

  // null check
  if (userId == null || userId == '') {
    logger.error('Error: Invalid value of userId.')
  }

  // type check
  if (typeof userId !== 'number') {
    logger.error('Error: Invalid type of userId.')
  }

  const path = 'admin/users/' + userId

  const results = await requestBasicAuthApi(path, HttpMethod.DELETE)
}
</script>
