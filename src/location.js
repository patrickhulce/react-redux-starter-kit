
export const updateLocation = store => payload => {
  return store.dispatch({type: 'LOCATION_CHANGE', payload})
}

export default function location(state = null, action) {
  return action.type === 'LOCATION_CHANGE' ? action.payload : state
}
