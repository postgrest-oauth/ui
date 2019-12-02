import axios from 'axios'

axios.defaults.withCredentials = true
const instance = axios.create({ baseURL: process.env.REACT_APP_OAUTH_API_URL })

export default {
  signin: data => {
    let body = `username=${encodeURIComponent(data.username)}&password=${encodeURIComponent(data.password)}`
    return instance.post('/signin', body)
  },
  signup: data => {
    let body = `email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(
      data.password
    )}&phone=${encodeURIComponent(data.phone)}`
    return instance.post('/signup', body)
  },
  verify: data => {
    let body = `code=${data.code}`
    return instance.post('/verify', body)
  },
  reverify: data => {
    let body = `username=${encodeURIComponent(data.username)}`
    return instance.post('/re-verify', body)
  },
  passwordRequest: data => {
    let body = `username=${encodeURIComponent(data.username)}`
    return instance.post('/password/request', body)
  },
  passwordReset: data => {
    let body = `code=${data.code}&password=${encodeURIComponent(data.password)}`
    return instance.post('/password/reset', body)
  },
}
