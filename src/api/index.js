import axios from 'axios'

const instance = axios.create({ baseURL: process.env.REACT_APP_OAUTH_API_URL })

export default {
  signup: data => {
    let body = `email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(
      data.password
    )}&phone=${encodeURIComponent(data.phone)}`
    return instance.post('/signup', body)
  },
  signin: data => {
    let body = `username=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}}`
    return instance.post('/signin', body)
  },
  verify: data => {
    let body = `code=${data.code}`
    return instance.post('/verify', body)
  },
}