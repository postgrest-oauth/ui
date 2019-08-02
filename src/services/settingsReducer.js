import { createAction, createReducer } from 'redux-act'

const defaultState = {
  params: {
    redirect_uri: null,
    response_type: null,
    client_id: null,
    state: null,
  },
}

const setParams = createAction('SETTINGS_SET_PARAMS')

export default createReducer(
  {
    [setParams]: (state, payload) => ({ ...state, params: payload }),
  },
  defaultState
)

export const actions = { setParams }
