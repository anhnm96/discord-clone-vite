import { api } from '../apiClient'

export const getUserGuilds = () => api.get('/guilds')

export const createGuild = (name: string) => api.post(`/guilds/create`, name)

export const joinGuild = (body: any) => api.post('/guilds/join', body)

export const getInviteLink = (id: string, isPermanent = false) =>
  api.get(`/guilds/${id}/invite${isPermanent ? '?isPermanent=true' : ''}`)

export const getGuildMembers = (id: string) => api.get(`/guilds/${id}/members`)

export const editGuild = (id: string, body: any) =>
  api.put(`/guilds/${id}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const invalidateInviteLinks = (id: string) =>
  api.delete(`/guilds/${id}/invite`)

export const deleteGuild = (id: string) => api.delete(`/guilds/${id}/delete`)
