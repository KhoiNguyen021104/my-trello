import Home from '~/pages/Boards/BoardsList/BoardListItem/Home'
import Templates from '~/pages/Boards/BoardsList/BoardListItem/Templates'
import BoardsList from '~/pages/Boards/BoardsList/BoardsList'

export const dashboardPageContentReducer = (state = BoardsList, action) => {
  switch (action.type) {
  case 'BOARDS':
    return BoardsList
  case 'TEMPLATES':
    return Templates
  case 'HOME':
    return Home

  default:
    return state
  }
}
