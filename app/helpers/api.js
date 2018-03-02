const server = process.env.SERVER_URL

export function getAuthUserProfile (accessToken) {
  return fetch(`${server}/auth`, {
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
