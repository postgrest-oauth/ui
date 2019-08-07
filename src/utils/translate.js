import strings from '../static/strings.json'

export const t = key => {
  let lng = navigator.language.slice(0, 2)
  const array = Object.keys(strings)
  if (!array.includes(lng)) {
    lng = 'en'
  }
  return strings[lng][key]
}
