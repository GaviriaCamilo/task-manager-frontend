import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default {
  async getTasks(params = {}) {
    const res = await api.get('/tasks', { params });
    return res.data; 
  },

  async getTask(id) {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
  },

  async createTask(data) {
    const res = await api.post('/tasks', data);
    return res.data;
  },

  async updateTask(id, data) {
    const res = await api.put(`/tasks/${id}`, data);
    return res.data;
  },

  async toggleTaskCompleted(id, is_completed) {
    const res = await api.put(`/tasks/${id}`, { is_completed });
    return res.data;
  },

  async deleteTask(id) {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
  },

  async exportTasksToPdf(searchQuery = '') {
    return await api.get(`/tasks/export-pdf`, { params: { search: searchQuery }, responseType: 'blob' });
  }
};