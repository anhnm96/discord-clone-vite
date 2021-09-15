import { api } from '../apiClient'

export const getChannels = (id: string) => api.get(`/channels/${id}`)

interface ChannelPayload {
  isPublic: boolean
  name: string
  members: string[]
}
export const createChannel = (id: string, body: ChannelPayload) =>
  api.post(`/channels/${id}`, body)

export const editChannel = (guildId: string, channelId: string, body: any) =>
  api.put(`/channels/${guildId}/${channelId}`, body)
