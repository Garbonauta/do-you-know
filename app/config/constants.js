import firebase from 'firebase'
import firestore from 'firebase/firestore'

require('dotenv').config()

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'doyouknow-b0c51.firebaseapp.com',
  databaseURL: 'https://doyouknow-b0c51.firebaseio.com',
  projectId: 'doyouknow-b0c51',
  storageBucket: 'doyouknow-b0c51.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDING_ID,
}

firebase.initializeApp(config)

export const db = firebase.firestore()
export const firebaseAuth = firebase.auth

export const decisionsExpirationLength = 10000
