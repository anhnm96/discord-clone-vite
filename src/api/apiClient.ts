import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API as string,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { status } = error.response
    switch (status) {
      case 403:
        localStorage.removeItem('user')
        window.location.replace('/login')
        break
      default:
        break
    }
    return Promise.reject(error)
  }
)
