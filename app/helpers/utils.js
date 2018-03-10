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
  return friendsArray.reduce((accum, {_id: id, info: {fullName, link, pictures}}) => {
    accum[fullName] = {
      id,
      fullName,
      link,
      pictures,
    }
    return accum
  }, {})
}

export function groupsObjectFromArray (groupsArray) {
  return groupsArray.reduce((accum, {groupId: {_id, name, pictureUrl}, favorite}) => {
    if (favorite) {
      accum.favoriteGroup = _id
    }
    accum.groups[_id] = {
      id: _id,
      name,
      pictureUrl,
    }
    return accum
  }, {groups: {}})
}
