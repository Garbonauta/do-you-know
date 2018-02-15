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
