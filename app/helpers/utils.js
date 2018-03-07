import jwtDecode from 'jwt-decode'

export function oAuthAuthToObjAuth (authResult) {
  return {
    accessToken: authResult.accessToken,
    idToken: authResult.idToken,
    expiresAt: (authResult.expiresIn * 1000) + new Date().getTime(),
  }
}

export function decodeJwt (token) {
  return jwtDecode(token)
}

export function friendsObjectFromArray (friendsArray) {
  return friendsArray.reduce((accum, currVal) => {
    accum[currVal.name] = currVal
    return accum
  }, {})
}
