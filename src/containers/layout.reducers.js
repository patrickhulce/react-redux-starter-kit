import {combineReducers} from 'redux'

const SET_DRAWER = 'UI:LAYOUT:SET_DRAWER'
const TOGGLE_DRAWER = 'UI:LAYOUT:TOGGLE_DRAWER'
const TOGGLE_SIDEBAR = 'UI:LAYOUT:TOGGLE_SIDEBAR'

export function setDrawer(payload) {
  return {type: SET_DRAWER, payload}
}

export function toggleDrawer() {
  return {type: TOGGLE_DRAWER}
}

export function toggleSidebar() {
  return {type: TOGGLE_SIDEBAR}
}

function isDrawerOpen(state = false, action) {
  if (action.type === TOGGLE_DRAWER) {
    return !state
  } else if (action.type === SET_DRAWER) {
    return Boolean(action.payload)
  } else {
    return state
  }
}

function isSidebarOpen(state = false, action) {
  if (action.type === TOGGLE_SIDEBAR) {
    return !state
  } else {
    return state
  }
}

export const path = 'ui:layout'
export default combineReducers({isDrawerOpen, isSidebarOpen})
