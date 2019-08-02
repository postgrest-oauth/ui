import { createAction } from 'redux-act'

export const createActions = name => ({
  request: createAction(`${name}_REQUEST`),
  success: createAction(`${name}_SUCCESS`),
  failure: createAction(`${name}_FAILURE`),
})
