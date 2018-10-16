import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createMuiTheme } from 'material-ui/styles';
import ReactPixel from 'react-facebook-pixel';
import languages from './languages';
import stylesheet from './stylesheet';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab)

if ( !isNaN(process.env.REACT_APP_FACEBOOK_PIXEL) === true && process.env.REACT_APP_FACEBOOK_PIXEL.length > 0 && process.env.REACT_APP_FACEBOOK_PIXEL !== undefined ) {
  ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL);
  ReactPixel.pageView();
}

let theme = createMuiTheme({
  palette: {
    primary: { main: stylesheet.styles.primaryColor}
  },
  overrides: {
    MuiTabs: { indicator: {backgroundColor: stylesheet.styles.tabIndicator} },
    MuiTab: { textColorPrimary: { color: stylesheet.styles.tabTextColor } },
    MuiInputLabel: { root: {color: stylesheet.styles.inputLabelColor} },
    MuiInput: { 
      root: {color: stylesheet.styles.inputTextColor},
        underline: {'&:after': {backgroundColor: stylesheet.styles.underlineActiveColor}},
        error: {'&:after': {backgroundColor: stylesheet.styles.underlineErrorColor}} 
      },
    MuiFormHelperText: { error: {color: stylesheet.styles.errorTextColor} },
    MuiButton: { 
      raisedPrimary: { 
        backgroundColor: stylesheet.styles.buttonColor, 
        color: stylesheet.styles.buttonTextColor, 
          '&:hover': { color: stylesheet.styles.buttonTextHoverColor, backgroundColor: stylesheet.styles.buttonHoverColor }
        }, 
        disabled: {color: stylesheet.styles.disabledButtonTextColor} 
      },
    MuiTypography: { colorPrimary: {color: stylesheet.styles.regularTextColor} }
  }
});

let language;
if (navigator.language === 'ru' || navigator.language === 'ru-RU' || navigator.language === 'ru-UA') {
    language = languages.russian;
  } else if (navigator.language === 'uk') {
    language = languages.ukrainian;
  } else {
    language = languages.english;
  };

const queryString = require('query-string'),
parsed = queryString.parse(window.location.search);
let isUri;

parsed.redirect_uri === undefined ? isUri = false : isUri = true;

ReactDOM.render(<App language = {language} theme = {theme} uri={isUri}/>, document.getElementById('root'));

registerServiceWorker();