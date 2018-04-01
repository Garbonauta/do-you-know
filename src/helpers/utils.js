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
  return groupsArray.reduce((accum, {_id, ...groupInfo}) => {
    accum[_id] = {
      id: _id,
      ...groupInfo,
    }
    return accum
  }, {})
}

export function formatPostsPayload ({_id: groupId, posts}) {
  return posts.reduce((accum, {_id: postId, text, createdAt, owner: {_id: userId, info: {fullName, link, pictures: {small}}}}) => {
    accum[postId] = {
      groupId,
      postId,
      text,
      createdAt: Date.parse(createdAt),
      owner: {
        userId,
        fullName,
        link,
        small,
      },
    }
    return accum
  }, {})
}
