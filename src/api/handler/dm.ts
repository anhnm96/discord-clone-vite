import { api } from '../apiClient'

export const getUserDMs = () => api.get('/channels/me/dm')

export const getOrCreateDirectMessage = (id: string) =>
  api.post(`/channels/${id}/dm`)
