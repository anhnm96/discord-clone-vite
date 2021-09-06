export interface User {
  id: string
  username: string
  email: string
  image: string
  isOnline: boolean
  createdAt: string
  updatedAt: string
}


export interface FriendRequest {
  id: string
  username: string
  image: string
  type: number
}
