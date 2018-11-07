import { VIEWER_ID } from '../constants'

export class User {}

// Mock user data
export const viewer = new User()
viewer.id = VIEWER_ID

export const usersById = {
  [VIEWER_ID]: viewer
}

export const getUser = (id) => {
  return usersById[id]
}

export const getViewer = () => {
  return getUser(VIEWER_ID)
}
