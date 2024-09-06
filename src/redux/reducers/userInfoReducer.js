export const userInfoReducer = (state = null, action) => {
  switch (action?.type) {
  case 'ACCESS':
    return action?.userInfo
  case 'LOGOUT':
    return action?.userInfo
  default:
    return state
  }
}
