import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createMuiTheme } from 'material-ui/styles';
import ReactPixel from 'react-facebook-pixel';

if ( !isNaN(process.env.REACT_APP_FACEBOOK_PIXEL) === true ) {
  ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL);
  ReactPixel.pageView();
}

fetch(`${process.env.PUBLIC_URL}/settings.json`, { method: 'GET' })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let theme = createMuiTheme({
        palette: {
          primary: { main: data.styles.activeTabColor}
        },
        overrides: {
          MuiTabs: { indicator: {backgroundColor: data.styles.tabIndicator} },
          MuiTab: { textColorPrimary: { color: data.styles.tabTextColor } },
          MuiInputLabel: { root: {color: data.styles.inputLabelColor} },
          MuiInput: { 
            root: {color: data.styles.inputTextColor},
            underline: {'&:after': {backgroundColor: data.styles.underlineActiveColor}},
            error: {'&:after': {backgroundColor: data.styles.underlineErrorColor}} 
          },
          MuiFormHelperText: { error: {color: data.styles.errorTextColor} },
          MuiButton: { 
            raisedPrimary: { 
              backgroundColor: data.styles.buttonColor, 
              color: data.styles.buttonTextColor, 
              '&:hover': { color: data.styles.buttonTextHoverColor, backgroundColor: data.styles.buttonHoverColor }
            }, 
            disabled: {color: data.styles.disabledButtonTextColor} 
          },
          MuiTypography: { colorPrimary: {color: data.styles.regularTextColor} }
        }
      });

      let language;
      if (navigator.language === 'ru' || navigator.language === 'ru-RU' || navigator.language === 'ru-UA') {
        language = data.russian;
      } else if (navigator.language === 'uk') {
        language = data.ukrainian;
      } else {
        language = data.english;
      }
      ReactDOM.render(<App language = {language} theme = {theme} />, document.getElementById('root'));
    })

registerServiceWorker();