export interface IContactState {

}

export function saveContact(payload: IContactState) {
  return {
    type: 'SAVE_CONTACT',
    payload,
  }
}

export default function contact(state = {}, action: any) {
  if (action.type === 'SAVE_CONTACT') {
    return action.payload
  } else {
    return state
  }
}
