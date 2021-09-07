export interface User {
  id: string
  username: string
  email: string
  image: string
  isOnline: boolean
  createdAt: string
  updatedAt: string
  isFriend?: boolean
}

export interface FriendRequest {
  id: string
  username: string
  image: string
  type: number
}

export interface DirectMessage {
  id: string
  user: User
}
