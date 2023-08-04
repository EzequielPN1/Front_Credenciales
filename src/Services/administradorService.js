import axiosClient from './axiosClient.js';
const apiClient = axiosClient.getApiClient();

export const administradorService = {
  editarAdministrador(token, usuario) {
    return apiClient.post('/usuarios/editarAdministrador', { token: token, usuario: usuario });
  },

  eliminarCuenta(token, id) {
    return apiClient.delete('/usuarios/eliminarCuentaPorAdministrador', { data: { token: token, id: id } });
  },

  obtenerUsuarios() {
    return apiClient.get('/usuarios/obtenerUsuarios');
  },
};
