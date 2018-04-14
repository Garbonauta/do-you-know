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
    (accum, { _id: postId, groupName, groupId, text, createdAt, owner }) => {
      accum[postId] = {
        groupId,
        groupName,
        postId,
        text,
        createdAt: Date.parse(createdAt),
        comments: [],
        owner,
      }
      return accum
    },
    {}
  )
}

export function formatSimpleUseFromStore(user) {
  const { userId, info: { fullName, link, pictures: { small } } } = user.toJS()
  return {
    userId,
    fullName,
    link,
    picture: small,
  }
}
