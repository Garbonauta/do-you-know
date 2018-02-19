const server = process.env.SERVER_URL

export function authFromServer (accessToken) {
  return fetch(`${server}/auth`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
    },
  })
}
