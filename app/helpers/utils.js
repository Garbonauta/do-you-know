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

export function groupsObjectFromArray (groupsArray) {
  return groupsArray.reduce((accum, currVal) => {
    if (currVal.favorite) {
      accum.favorite = currVal.id
    }
    accum.groups[currVal.id] = currVal
    return accum
  }, {groups: {}})
}
