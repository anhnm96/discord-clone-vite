import { api } from '../apiClient'

export const getOrCreateDirectMessage = (id: string) =>
  api.post(`/channels/${id}/dm`)
