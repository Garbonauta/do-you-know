export function oAuthAuthToObjAuth (authResult) {
  return {
    accessToken: authResult.accessToken,
    idToken: authResult.idToken,
    expiresAt: (authResult.expiresIn * 1000) + new Date().getTime(),
  }
}

export function formatUserInfo ({id: uid, name, link, picture: {data: {url: avatar}}}) {
  return {
    uid,
    name,
    link,
    avatar,
  }
}

export function formatFriends (friends) {
  return friends.reduce((accum, {id: uid, name, link, picture: {data: {url: avatar}}}, curIndex) => {
    accum[uid] = {
      uid,
      name,
      link,
      avatar,
    }
    return accum
  }, {})
}
