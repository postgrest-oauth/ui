import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createMuiTheme } from 'material-ui/styles';
import ReactPixel from 'react-facebook-pixel';
import settings from './settings';

if ( !isNaN(process.env.REACT_APP_FACEBOOK_PIXEL) === true && process.env.REACT_APP_FACEBOOK_PIXEL.length > 0 && process.env.REACT_APP_FACEBOOK_PIXEL !== undefined ) {
  ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL);
  ReactPixel.pageView();
}

let theme = createMuiTheme({
  palette: {
    primary: { main: settings.styles.primaryColor}
  },
  overrides: {
    MuiTabs: { indicator: {backgroundColor: settings.styles.tabIndicator} },
    MuiTab: { textColorPrimary: { color: settings.styles.tabTextColor } },
    MuiInputLabel: { root: {color: settings.styles.inputLabelColor} },
    MuiInput: { 
      root: {color: settings.styles.inputTextColor},
        underline: {'&:after': {backgroundColor: settings.styles.underlineActiveColor}},
        error: {'&:after': {backgroundColor: settings.styles.underlineErrorColor}} 
      },
    MuiFormHelperText: { error: {color: settings.styles.errorTextColor} },
    MuiButton: { 
      raisedPrimary: { 
        backgroundColor: settings.styles.buttonColor, 
        color: settings.styles.buttonTextColor, 
          '&:hover': { color: settings.styles.buttonTextHoverColor, backgroundColor: settings.styles.buttonHoverColor }
        }, 
        disabled: {color: settings.styles.disabledButtonTextColor} 
      },
    MuiTypography: { colorPrimary: {color: settings.styles.regularTextColor} }
  }
});

let language;
if (navigator.language === 'ru' || navigator.language === 'ru-RU' || navigator.language === 'ru-UA') {
    language = settings.russian;
  } else if (navigator.language === 'uk') {
    language = settings.ukrainian;
  } else {
    language = settings.english;
  };

const queryString = require('query-string'),
parsed = queryString.parse(window.location.search);
let isUri;

parsed.redirect_uri === undefined ? isUri = false : isUri = true;

ReactDOM.render(<App language = {language} theme = {theme} uri={isUri}/>, document.getElementById('root'));

registerServiceWorker();