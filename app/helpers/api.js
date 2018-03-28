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
