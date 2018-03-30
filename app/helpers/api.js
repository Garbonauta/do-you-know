const server = process.env.SERVER_URL

export function getAuthUserProfile (accessToken) {
  return fetch(`${server}/login`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
    },
  })
    .then(response => {
      return response.json()
        .then(data => response.ok ? data : Promise.reject(data))
    })
}

export function getGroups (accessToken, groups) {
  const url = groups ? `${server}/groups?id=${groups.join()}` : `${server}/groups`
  return fetch(url, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
    },
  })
    .then(response => {
      return response.json()
        .then(data => response.ok ? data : Promise.reject(data))
    })
}

export function postGroupPost (accessToken, groupId, post) {
  return fetch(`${server}/groups/${groupId}/posts`, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then(response => {
      return response.json()
        .then(data => response.ok ? data : Promise.reject(data))
    })
}
