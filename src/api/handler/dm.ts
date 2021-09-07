import { api } from '../apiClient'

export const getUserDMs = () => api.get('/channels/me/dm')

export const getOrCreateDirectMessage = (id: string) =>
  api.post(`/channels/${id}/dm`)

export const closeDirectMessage = (id: string) =>
  api.delete(`/channels/${id}/dm`)
