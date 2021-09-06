import { api } from '../apiClient'

export const getAccount = () => api.get('/account')

export const sendFriendRequest = (id: string) => api.post(`/account/${id}/friend`)
