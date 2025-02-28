import { TPaginate } from '@/types/site/pagination'
import apiClient from './index'
import { RegisterNotificationPayloads } from '@/types/site/weather'

const weatherService = {
  path: '/weather',
  async findCities(q: string) {
    const { data } = await apiClient.get(`${this.path}/find-cities`, {
      params: {
        q: q,
      },
    })
    return data
  },
  async current(q: string) {
    const { data } = await apiClient.get(`${this.path}/current`, {
      params: {
        q: q,
      },
    })
    return data
  },

  async currentByIpNetwork(ipNetwork: string) {
    const { data } = await apiClient.get(`${this.path}/current-ip`, {
      params: {
        ip: ipNetwork,
      },
    })
    return data
  },
  async forecast(q: string, paginate: TPaginate) {
    const { data } = await apiClient.get(`${this.path}/forecast`, {
      params: {
        q: q,
        page: paginate.page,
        perPage: paginate.perPage,
      },
    })
    return data
  },
  async registerNotification(payloads: RegisterNotificationPayloads) {
    const { data } = await apiClient.post(`${this.path}/register-notifications`, payloads)
    return data
  },
}

export default weatherService
