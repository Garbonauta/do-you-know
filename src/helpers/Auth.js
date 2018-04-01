import auth0 from 'auth0-js'
import { oAuthAuthToObjAuth, decodeJwt } from 'helpers/utils'

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: process.env.REACT_APP_CALLBACK_URL,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
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
  }

  isAuthenticated () {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return expiresAt ? new Date().getTime() < expiresAt : false
  }

  getAuthenticated () {
    const accessToken = localStorage.getItem('access_token')
    const idToken = localStorage.getItem('id_token')
    const expiresAt = localStorage.getItem('expires_at')
    const uid = decodeJwt(accessToken).sub

    return {
      uid,
      accessToken,
      idToken,
      expiresAt,
    }
  }
}
