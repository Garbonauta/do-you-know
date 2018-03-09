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

export function getUserGroups (accessToken, uid) {
  return fetch(`${server}/user/${uid}/groups`, {
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
