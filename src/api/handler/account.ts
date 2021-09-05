import { api } from '../apiClient'

export const getAccount = () => api.get('/account')
