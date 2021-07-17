import axios from 'axios';

const url = `${(process.env.BACKEND || 'http://localhost:4000')}/api`;

const api = {
  getInscriptionNumber: async () => axios.get(url),
  addInscription: async (name, phone, counter) => {
    const res = await axios.post(`${url}`, { name, phone, count: counter });
    return res;
  },
  getCapacity: async () => axios.get(`${url}/capacity`),
};

export default api;
