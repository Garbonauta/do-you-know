import jwtDecode from 'jwt-decode'

export function oAuthAuthToObjAuth(authResult) {
  return {
    accessToken: authResult.accessToken,
    idToken: authResult.idToken,
    expiresAt: authResult.expiresIn * 1000 + new Date().getTime(),
  }
}

export function decodeJwt(token) {
  return jwtDecode(token)
}

export function friendsObjectFromArray(friendsArray) {
  return friendsArray.reduce(
    (accum, { _id: id, info: { fullName, link, pictures } }) => {
      accum[fullName] = {
        id,
        fullName,
        link,
        pictures,
      }
      return accum
    },
    {}
  )
}

export function groupsObjectFromArray(uid, groupsArray) {
  return groupsArray.reduce(
    (
      accum,
      { _id, name, pictureUrl, owner: { _id: ownerId, info }, moderators }
    ) => {
      let isModerator = false
      let moderatorsClean = moderators.map(({ _id: userId, info }) => {
        if (userId === uid) {
          isModerator = true
        }
        return {
          userId,
          ...info,
        }
      })
      accum[_id] = {
        id: _id,
        name,
        isOwner: ownerId === uid,
        isModerator,
        owner: {
          userId: ownerId,
          ...info,
        },
        moderators: moderatorsClean,
      }
      return accum
    },
    {}
  )
}

export function formatPostsPayload(posts) {
  return posts.reduce(
    (
      accum,
      {
        _id: postId,
        groupId,
        text,
        createdAt,
        owner: { _id: userId, info: { fullName, link, pictures: { small } } },
      }
    ) => {
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
    },
    {}
  )
}
