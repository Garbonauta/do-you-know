import auth0 from 'auth0-js'
import { oAuthAuthToObjAuth } from 'helpers/utils'

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.AUTH_0_DOMAIN,
    clientID: process.env.AUTH_0_CLIENT_ID,
    redirectUri: process.env.CALLBACK_URL,
    audience: process.env.AUTH_0_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid',
  })

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          const resultObj = oAuthAuthToObjAuth(authResult)
          this.setSession(resultObj)
          return resolve(resultObj)
        } else if (err) {
          return reject(err)
        }
        return reject(new Error('Something Unexpected Occurred'))
      })
    })
  }

  setSession (authResult) {
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', JSON.stringify(authResult.expiresAt))
  }

  logout () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.push('/home')
  }

  isAuthenticated () {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}
