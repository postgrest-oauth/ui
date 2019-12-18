import React, { Component } from 'react'
import strings from '../static/strings.json'

const withTranslation = WrappedComponent => {
  return class extends Component {
    state = {
      lang: null,
      mounted: false,
      translations: null,
    }

    async componentDidMount() {
      await this.fetchTranslation()
      this.setLangFromNavigator()
      this.setState({ mounted: true })
    }

    fetchTranslation = async () => {
      if (process.env.REACT_APP_HAS_TRANSLATION) {
        const res = await fetch(`${process.env.PUBLIC_URL}/translation.json`, { method: 'GET' })
        const data = await res.json()
        const newStrings = { ...strings, ...data }
        this.setState({ translations: newStrings })
      } else {
        this.setState({ translations: strings })
      }
    }

    setLangFromNavigator = () => {
      const defaultLang = process.env.REACT_APP_DEFAULT_LANG
      if (this.state.translations) {
        const array = Object.keys(this.state.translations)
        if (defaultLang) {
          this.setState({ lang: array.includes(defaultLang) ? defaultLang : 'en' })
        } else {
          let lng = navigator.language.slice(0, 2)
          this.setState({ lang: array.includes(lng) ? lng : 'en' })
        }
      }
    }

    translate = key => {
      const { lang, translations } = this.state
      return translations[lang][key]
    }

    render() {
      return this.state.mounted && <WrappedComponent t={this.translate} {...this.props} />
    }
  }
}

export default withTranslation
