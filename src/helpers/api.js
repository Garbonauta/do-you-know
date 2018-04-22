import { Client } from 'nes/client'

const server = process.env.REACT_APP_SERVER_URL
const wsUrl = process.env.REACT_APP_WS_URL

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

export async function listenNotifications({ accessToken, userId, handler }) {
  try {
    const client = new Client(wsUrl)
    await client.connect({
      auth: { headers: { authorization: `Bearer ${accessToken}` } },
    })
    client.subscribe(`/notifications/${userId}`, handler)
  } catch (error) {
    throw error
  }
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

export function getGroupPosts(accessToken, groupId, postId) {
  const query = postId ? `?lastId=${postId}` : ''
  return getQuery(accessToken, `${server}/groups/${groupId}/posts${query}`)
}

export function postGroupPost(accessToken, groupId, post) {
  return postQuery(accessToken, `${server}/groups/${groupId}/posts`, post)
}

export function deletePost(accessToken, postId) {
  return deleteQuery(accessToken, `${server}/post/${postId}`)
}

export function addComment(accessToken, comment) {
  return postQuery(accessToken, `${server}/post/${comment.postId}`, comment)
}
