import { api } from '../apiClient'

export const register = (body: Record<string, any>) => api.post('/account/register', body)

export const login = (body: Record<string, any>) => api.post('/account/login', body)

export const logout = () => null

export const forgotPassword = () => null

export const changePassword = () => null

export const resetPassword = () => null
