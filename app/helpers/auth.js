export default function auth () {
  return new Promise((resolve, reject) => {
    FB.login(response => {
      if (response.status === 'connected') {
        return resolve(response)
      } else if (response.status === 'not_authorized') {
        return reject(new Error('Please log into this app.'))
      } else {
        return reject(new Error('Please log into this facebook.'))
      }
    }, {scope: 'public_profile,user_friends'})
  })
}
