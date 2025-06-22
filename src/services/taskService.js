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

  /**
   * Llama al backend para generar y descargar un PDF de todas las tareas.
   * @param {string} searchQuery - Es oppcional, para filtrar las tareas en el PDF.
   * @returns {Promise<Response>} - La respuesta de Axios conteniendo el blob del PDF.
   */
  async exportTasksToPdf(searchQuery = '') {
    // ¡MUY IMPORTANTE! responseType: 'blob' le dice a Axios que espere un archivo binario.
    // Esto es crucial para que el navegador sepa cómo manejar el PDF.
    return await api.get(`/tasks/export-pdf`, { params: { search: searchQuery }, responseType: 'blob' });
  }
};