OAuth UI
========

> [!IMPORTANT]
> **This project is archived and is not maintained.** Do not use it for new projects.
> For authentication in front of PostgREST, see the [PostgREST external authentication docs](https://docs.postgrest.org/en/stable/explanations/external_auth.html),
> or use a maintained auth server such as [Supabase Auth](https://github.com/supabase/auth) or [Keycloak](https://www.keycloak.org/).

A ready signin/signup frontend for [postgrest-oauth/api](https://github.com/postgrest-oauth/api), built with React and [Material-UI](https://material-ui.com/). It covers the whole account flow of the API: signup and signin with email or phone, verification code entry, re-verification and password reset.

The app is configured only with environment variables, so one Docker image can serve different products without a rebuild: colors, dark theme, fonts, default language and privacy policy link are all set at container start. Translations for English, Ukrainian and Russian are included, and other languages can be added with a single JSON file (see [Localisation](#Localisation)).

* [Usage](#Usage)
* [Customization](#Customization)
* [Localisation](#Localisation)
* [Advanced](#Advanced)

## Usage

Pass this variables to the container   
Example:

```bash
REACT_APP_OAUTH_API_URL=http://localhost:3684
REACT_APP_PRIVACY_POLICY_URL=http://localhost:3625
```

## Customization

### Colors

You can change primary, secondary and error colors, to change them you need to pass some variables.  
Example:

```bash
REACT_APP_PRIMARY_COLOR=#3f51b5
REACT_APP_SECONDARY_COLOR=#f50057
REACT_APP_ERROR_COLOR=#f44336
```

Oauth-ui uses light theme by default, to switch to dark theme you need to pass `REACT_APP_USE_DARK=true`

### Fonts

Default font size is 14, you can change it by passing your desirable font size, for example: `REACT_APP_FONT_SIZE=14`

Default font is Roboto, you can use system fonts instead, pass `REACT_APP_USE_SYSTEM_FONT=true`

## Localisation

By default, Oauth-ui will try to guess browsers language and use it for localisation.   
Library has translation for English, Ukrainian and Russian languages, if browsers language is different, English will be used as default.

If you want to add more languages to the library, follow this steps:

1. Pass `REACT_APP_HAS_TRANSLATION=true` to the container
2. Add `translation.json` file to the `/public` folder. The content of `translation.json` must be object with keys of desirable languages, each language must be an object with translated strings.
  
Use this example:

```json
{
    "en": {
      "documentTitle": "Sign In / Sign Up",
      "signInTab": "signin",
      "signUpTab": "signup",
      "submitButton": "submit",
      "emailPhoneInput": "Email or phone",
      "passwordInput": "Password",
      "passwordResetLink": "Forgot your password?",
      "reVerifyLink": "Repeat verification",
      "emailInput": "Email address",
      "phoneInput": "Phone number",
      "fieldRequired": "This field is required",
      "emailIncorrect": "Email is incorrect",
      "checkboxLabel": "I agree with",
      "privacyPolicyLink": "Privacy Policy",
      "verifyText": "Please input verification code from email",
      "verifyInput": "Verification code",
      "verifySuccessMessage": "Your account has been successfully verified!",
      "passwordSuccessMessage": "Your password has been successfully updated!",
      "nextButton": "next",
      "reloginMessage": "Please re-login",
      "generalError": "Something bad happened",
      "newPasswordInput": "New password",
      "notFound": "Not Found :("
  }
}
```

Language key must be valid [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

**If you want to use one default language, you must pass language code to the container, for example `REACT_APP_DEFAULT_LANG=en`** .  
**If your default language is not English, Ukrainian or Russian, make sure to provide valid translation to the `translation.json`**

## Advanced

Here will be advanced
