export const accessAction = (userInfo) => {
  return {
    type: 'ACCESS',
    userInfo
  }
}

export const logoutAction = () => {
  return {
    type: 'LOGOUT',
    userInfo: null
  }
}
