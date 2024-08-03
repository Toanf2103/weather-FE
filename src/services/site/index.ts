import axios from 'axios'
import { appConfig } from '@/config/app'

const apiClient = axios.create({
  baseURL: appConfig.api.url,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
