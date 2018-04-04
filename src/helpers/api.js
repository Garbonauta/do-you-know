const server = process.env.REACT_APP_SERVER_URL

function getQuery(accessToken, url) {
  return fetch(url, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  }).then(response => {
    return response
      .json()
      .then(data => (response.ok ? data : Promise.reject(data)))
  })
}

export function postQuery(accessToken, url, payload) {
  return fetch(url, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(response => {
    return response
      .json()
      .then(data => (response.ok ? data : Promise.reject(data)))
  })
}

async function deleteQuery(accessToken, url) {
  const response = await fetch(url, {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  })
  return response.status === 204 && response.ok
}

export function getAuthUserProfile(accessToken) {
  return getQuery(accessToken, `${server}/login`)
}

export function getGroups(accessToken, groups) {
  const url = groups
    ? `${server}/groups?id=${groups.join()}`
    : `${server}/groups`
  return getQuery(accessToken, url)
}

export function getGroupPosts(accessToken, groupId) {
  return getQuery(accessToken, `${server}/groups/${groupId}/posts`)
}

export function postGroupPost(accessToken, groupId, post) {
  return postQuery(accessToken, `${server}/groups/${groupId}/posts`, post)
}

export function deleteGroupPost(accessToken, groupId, postId) {
  return deleteQuery(accessToken, `${server}/groups/${groupId}/posts/${postId}`)
}
