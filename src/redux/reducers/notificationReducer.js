export const notificationReducer = (state = 'false', action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return action.payload
  default:
    return state
  }
}
