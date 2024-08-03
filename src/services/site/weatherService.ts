import apiClient from './index'

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
}

export default weatherService
