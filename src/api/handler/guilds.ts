import { api } from '../apiClient'

export const getUserGuilds = () => api.get('/guilds')

export const createGuild = (name: string) => api.post(`/guilds/create`, name)

export const joinGuild = (link: string) => api.post('/guilds/join', link)

export const getInviteLink = (id: string, isPermanent = false) =>
  api.get(`/guilds/${id}/invite${isPermanent ? '?isPermanent=true' : ''}`)
