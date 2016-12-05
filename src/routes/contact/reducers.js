export function saveContact(payload) {
  return {
    type: 'SAVE_CONTACT',
    payload,
  }
}

export default function contact(state = {}, action) {
  if (action.type === 'SAVE_CONTACT') {
    return payload
  } else {
    return state
  }
}
