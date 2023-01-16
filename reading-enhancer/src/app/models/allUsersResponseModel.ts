export interface AllUsersResponseModel {
  allUsers: UserResponse[]
}

export interface UserResponse {
  id: string
  name: string,
  lastName: string,
  username: string,
  isAdmin: boolean
}


