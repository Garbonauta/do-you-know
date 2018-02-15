const baseFields = 'id,name,first_name,middle_name,last_name,address,link,picture'

export function getUserFromFacebookAPI (userId, fields = baseFields) {
  return new Promise((resolve, reject) => {
    FB.api(`/${userId}?fields=${fields}`, function (response) {
      resolve(response)
    })
  })
}

export function getUserFriendsFromFacebookAPI (userId, fields = baseFields) {
  return new Promise((resolve, reject) => {
    FB.api(`/${userId}/friends?fields=${fields}`, function (response) {
      resolve(response)
    })
  })
}
