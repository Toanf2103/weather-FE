import axios from 'axios'

const ipService = {
  path: '/weather',
  async getIpNetwork() {
    const { data } = await axios.get('https://api.bigdatacloud.net/data/client-ip')
    return data
  },
}

export default ipService
