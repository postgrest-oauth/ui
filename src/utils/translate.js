import strings from '../static/strings.json'

let lng = 'en'

export const setLng = lang => {
  const array = Object.keys(strings)
  array.includes(lang) ? (lng = lang) : (lng = 'en')
}

export const t = key => strings[lng][key]
