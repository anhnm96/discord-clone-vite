import { api } from '../apiClient'

export const getAccount = () => api.get('/account')

export const getFriends = () => api.get('/account/me/friends')

export const sendFriendRequest = (id: string) =>
  api.post(`/account/${id}/friend`)

export const getPendingRequests = () => api.get('/account/me/pending')

export const acceptFriendRequest = (id: string) =>
  api.post(`/account/${id}/friend/accept`)

export const declineFriendRequest = (id: string) =>
  api.post(`/account/${id}/friend/cancel`)
