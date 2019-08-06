import { createAction, createReducer } from 'redux-act'

const defaultState = {
  redirect_uri: null,
  search: null,
}

const setParams = createAction('SETTINGS_SET_PARAMS')

export default createReducer(
  {
    [setParams]: (state, payload) => ({ ...state, redirect_uri: payload.redirect_uri, search: payload.search }),
  },
  defaultState
)

export const actions = { setParams }
