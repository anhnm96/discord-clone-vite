import { api } from '../apiClient'

export const getMessages = (id: string, cursor: number) =>
  api.get(`/messages/${id}/${cursor ? `?cursor=${cursor}` : ''}`)

export const sendMessage = (channelId: string, data: any) =>
  api.post(`/messages/${channelId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const deleteMessage = (id: string) => api.delete(`/messages/${id}`)

export const editMessage = (id: string, text: string) =>
  api.put(`/messages/${id}`, { text })
