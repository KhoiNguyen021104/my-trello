export const notificationReducer = (state = {}, action) => {
  if (action.type !== 'NOTIFICATION') return state

  switch (action.type) {
  case 'NOTIFICATION':
    return { ...action.payload }
  default:
    return state
  }
}
