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
  name?: string
  user: User
}

export interface Guild {
  id: string
  name: string
  ownerId: string
  icon?: string
  createdAt: string
  updatedAt: string
  hasNotification: boolean
  default_channel_id: string
}

export interface Message {
  id: string
  text: string
  filetype?: any
  url?: string
  createdAt: string
  updatedAt: string
  user: User
}
