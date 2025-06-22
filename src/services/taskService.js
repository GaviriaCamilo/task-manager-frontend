import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: VITE_API_URL,
});

export default {
  async getTasks() {
    const res = await api.get('/tasks');
    return res.data; 
  },

  async getTask(id) {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
  },

  createTask(data) {
    return api.post('/tasks', data);
  },
  
  updateTask(id, data) {
    return api.put(`/tasks/${id}`, data);
  },
  
  // Método específico para actualizar solo el estado de completado
  async toggleTaskCompleted(id, isCompleted) {
    const res = await api.put(`/tasks/${id}`, { 
      is_completed: isCompleted 
    });
    return res.data.task; // Devolver solo la tarea actualizada
  },
  
  deleteTask(id) {
    return api.delete(`/tasks/${id}`);
  },
};