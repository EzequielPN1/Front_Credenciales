import axiosClient from './axiosClient.js';
const apiClient = axiosClient.getApiClient();


export const userCredencial = {



  ingresarCredencial(token, credencial) {
    return apiClient.post('/credenciales/ingresarCredencial', { token: token, credencial: credencial });
  },



  obtenerCredenciales(token) {
    return apiClient.post('/credenciales/obtenerCredenciales', { token: token });
  },


  
  editarCredencial(token, credencial) {
    return apiClient.post('/credenciales/editarCredencial', { token: token, credencial: credencial });
  },



  obtenerCredencialPorId(token, id) {
    return apiClient.post('/credenciales/obtenerCredencialPorId', { token: token, id: id });
  },


  
  eliminarCredencial(token, credencialId) {
    return apiClient.delete('/credenciales/eliminarCredencial', {  data: {  token: token,credencialId: credencialId}});
  },

}