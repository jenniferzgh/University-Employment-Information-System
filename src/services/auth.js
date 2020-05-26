const TokenKey = 'zhaopin_token'

export function getToken () {
  return localStorage.getItem(TokenKey)
}

export function setToken (token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return localStorage.removeItem(TokenKey)
}

export function setUserType (typeId) {
  return localStorage.setItem('userType', typeId)
}

export function getUserType () {
  if (localStorage.getItem(TokenKey) != null) {
    return localStorage.getItem('userType')
  } else {
    return '0'
  }

}

export function removeUserType () {
  return localStorage.removeItem('userType')
}
